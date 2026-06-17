#!/usr/bin/env bun
/**
 * compile-to-taar.mjs
 * Compila cualquier imagen (PNG, JPEG, WebP, HEIC, AVIF) a formato .taar
 * Usa Bun.Image nativo — sin dependencias npm para el procesado de imagen.
 *
 * Uso: bun scripts/compile-to-taar.mjs <imagen> [output.taar]
 */

import { OfflineCompiler } from '../src/compiler/offline-compiler.js';
import { inflateSync } from 'zlib';
import path from 'path';
import fs from 'fs';

// ---------------------------------------------------------------------------
// Mini-decoder PNG → Uint8Array grayscale (sin deps externas)
// Bun.Image no expone píxeles raw, así que dejamos que emita PNG y lo
// parseamos aquí con zlib nativo de Bun/Node.
// ---------------------------------------------------------------------------

/**
 * Decodifica bytes PNG a un array de luminancias (un byte por píxel).
 * Optimizado para RGBA (color type 6) que es lo que Bun.Image siempre emite.
 * Usa aritmética entera en lugar de flotante para máxima velocidad.
 * @param {Uint8Array} pngBytes
 * @returns {{ width: number, height: number, data: Uint8Array }}
 */
function decodePNGToGrayscale(pngBytes) {
    const view = new DataView(pngBytes.buffer, pngBytes.byteOffset, pngBytes.byteLength);
    let offset = 8;

    let width = 0, height = 0, bitDepth = 0, colorType = 0;
    const idatChunks = [];

    while (offset < pngBytes.length) {
        const chunkLen  = view.getUint32(offset);
        const chunkType = (pngBytes[offset+4] << 24 | pngBytes[offset+5] << 16 | pngBytes[offset+6] << 8 | pngBytes[offset+7]) >>> 0;
        const chunkData = pngBytes.subarray(offset + 8, offset + 8 + chunkLen);
        offset += 12 + chunkLen;

        if (chunkType === 0x49484452) { // 'IHDR'
            const hv = new DataView(chunkData.buffer, chunkData.byteOffset);
            width = hv.getUint32(0); height = hv.getUint32(4);
            bitDepth = chunkData[8]; colorType = chunkData[9];
        } else if (chunkType === 0x49444154) { // 'IDAT'
            idatChunks.push(chunkData);
        } else if (chunkType === 0x49454E44) { // 'IEND'
            break;
        }
    }

    if (bitDepth !== 8) throw new Error(`Bit depth ${bitDepth} no soportado.`);

    const bppMap = { 0: 1, 2: 3, 3: 1, 4: 2, 6: 4 };
    const bpp = bppMap[colorType];
    if (!bpp) throw new Error(`Color type ${colorType} no soportado.`);

    // Concatenar + descomprimir IDAT
    const totalLen = idatChunks.reduce((s, c) => s + c.length, 0);
    const compressed = new Uint8Array(totalLen);
    let pos = 0;
    for (const chunk of idatChunks) { compressed.set(chunk, pos); pos += chunk.length; }

    const raw      = inflateSync(compressed);
    const stride   = 1 + width * bpp;
    const grayscale = new Uint8Array(width * height);
    const prevRow   = new Uint8Array(width * bpp);

    // ⚡ Constantes de luminancia ITU-R BT.601 escaladas a enteros ×1024
    // evita Math.round/float multiply en el inner loop
    const LR = 306, LG = 601, LB = 117; // 0.299*1024≈306, 0.587*1024≈601, 0.114*1024≈117

    for (let y = 0; y < height; y++) {
        const base   = y * stride;
        const filter = raw[base];
        const scan   = raw.subarray(base + 1, base + stride);
        const recon  = new Uint8Array(scan.length);

        // ⚡ Fast paths por tipo de filtro (evitar switch en inner loop)
        if (filter === 0) {
            recon.set(scan);
        } else if (filter === 1) {
            // Sub
            for (let i = 0; i < bpp; i++) recon[i] = scan[i];
            for (let i = bpp; i < scan.length; i++) recon[i] = (scan[i] + recon[i - bpp]) & 0xFF;
        } else if (filter === 2) {
            // Up
            for (let i = 0; i < scan.length; i++) recon[i] = (scan[i] + prevRow[i]) & 0xFF;
        } else if (filter === 3) {
            // Average
            for (let i = 0; i < scan.length; i++) {
                const a = i >= bpp ? recon[i - bpp] : 0;
                recon[i] = (scan[i] + ((a + prevRow[i]) >> 1)) & 0xFF;
            }
        } else if (filter === 4) {
            // Paeth
            for (let i = 0; i < scan.length; i++) {
                const a = i >= bpp ? recon[i - bpp] : 0;
                const b = prevRow[i];
                const c = i >= bpp ? prevRow[i - bpp] : 0;
                const p = a + b - c;
                const pa = p > a ? p - a : a - p;
                const pb = p > b ? p - b : b - p;
                const pc = p > c ? p - c : c - p;
                recon[i] = (scan[i] + (pa <= pb && pa <= pc ? a : pb <= pc ? b : c)) & 0xFF;
            }
        }

        prevRow.set(recon);

        // ⚡ Extraer luminancia con aritmética entera (sin float, sin Math.round)
        const rowBase = y * width;
        if (colorType === 0) {
            // Grayscale directo
            grayscale.set(recon, rowBase);
        } else if (colorType === 6) {
            // RGBA → luma entera: (306*R + 601*G + 117*B) >> 10
            for (let x = 0; x < width; x++) {
                const o = x << 2; // x * 4
                grayscale[rowBase + x] = (LR * recon[o] + LG * recon[o+1] + LB * recon[o+2] + 512) >> 10;
            }
        } else {
            for (let x = 0; x < width; x++) {
                const o = x * bpp;
                grayscale[rowBase + x] = (colorType === 4)
                    ? recon[o]
                    : (LR * recon[o] + LG * recon[o+1] + LB * recon[o+2] + 512) >> 10;
            }
        }
    }

    return { width, height, data: grayscale };
}

// ---------------------------------------------------------------------------
// CLI
// ---------------------------------------------------------------------------

const args = process.argv.slice(2);

if (args.length === 0) {
    console.error('❌ Uso: bun scripts/compile-to-taar.mjs <imagen> [output.taar]');
    process.exit(1);
}

const inputPath  = path.resolve(args[0]);
const outputPath = args[1]
    ? path.resolve(args[1])
    : inputPath.replace(/\.(png|jpe?g|webp|heic|avif)$/i, '.taar');

if (!fs.existsSync(inputPath)) {
    console.error(`❌ No se encontró el archivo: ${inputPath}`);
    process.exit(1);
}

console.log(`\n🖼️  Imagen de entrada : ${inputPath}`);
console.log(`📦 Archivo de salida : ${outputPath}`);
console.log(`⏳ Compilando...`);

const startTime = Date.now();

try {
    // 1. Bun.Image: una sola llamada que decodifica, convierte a grayscale y emite PNG.
    //    modulate({saturation:0}) → PNG color type 0 (grayscale, 1 byte/px) → decoder trivial.
    //    Se hacen metadata + conversión en paralelo con Promise.all.
    const imageRef = Bun.file(inputPath).image();
    const [meta, pngBytes] = await Promise.all([
        imageRef.metadata(),
        imageRef.modulate({ saturation: 0 }).png().bytes(),
    ]);
    const { width, height, format } = meta;
    console.log(`   Formato: ${format}  |  Dimensiones: ${width}×${height} px`);

    // 2. Decoder inline: PNG grayscale → Uint8Array de luminancias
    const { data: grayscaleData } = decodePNGToGrayscale(pngBytes);

    // 3. OfflineCompiler → .taar
    const compiler = new OfflineCompiler();

    await compiler.compileImageTargets(
        [{ width, height, data: grayscaleData }],
        (progress) => {
            process.stdout.write(`\r   Progreso: ${Math.round(progress * 100)}%   `);
        }
    );

    process.stdout.write('\n');

    const buffer = compiler.exportData();
    await Bun.write(outputPath, buffer);

    const elapsed    = ((Date.now() - startTime) / 1000).toFixed(1);
    const inputSize  = fs.statSync(inputPath).size;
    const outputSize = fs.statSync(outputPath).size;

    console.log(`\n✅ ¡Compilación exitosa!`);
    console.log(`   Tiempo      : ${elapsed}s`);
    console.log(`   Entrada     : ${(inputSize  / 1024).toFixed(1)} KB`);
    console.log(`   .taar salida: ${(outputSize / 1024).toFixed(1)} KB`);
    console.log(`   Compresión  : ${((1 - outputSize / inputSize) * 100).toFixed(1)}% más pequeño\n`);

} catch (err) {
    console.error(`\n❌ Error durante la compilación:`, err.message);
    process.exit(1);
}
