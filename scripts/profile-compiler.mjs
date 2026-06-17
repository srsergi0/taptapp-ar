#!/usr/bin/env bun
/**
 * profile-compiler.mjs - Mide el tiempo real por fase del pipeline de compilación
 */
import { DetectorLite } from '../src/core/detector/detector-lite.js';
import { computeLaplacianEigenmaps } from '../src/core/matching/spectralDeformableMatcher.js';
import { buildTrackingImageList } from '../src/core/image-list.js';
import { extractTrackingFeatures } from '../src/core/tracker/extract-utils.js';
import { build as hierarchicalClusteringBuild } from '../src/core/matching/hierarchical-clustering.js';
import { inflateSync } from 'zlib';

// ---- decode PNG → grayscale Float32Array ----
function decodePNGtoGray(pngBytes) {
    const view = new DataView(pngBytes.buffer, pngBytes.byteOffset, pngBytes.byteLength);
    let offset = 8;
    let width, height, colorType;
    const idats = [];
    while (offset < pngBytes.length) {
        const len  = view.getUint32(offset);
        const type = String.fromCharCode(pngBytes[offset+4],pngBytes[offset+5],pngBytes[offset+6],pngBytes[offset+7]);
        const data = pngBytes.subarray(offset + 8, offset + 8 + len);
        offset += 12 + len;
        if (type === 'IHDR') {
            const dv = new DataView(data.buffer, data.byteOffset);
            width = dv.getUint32(0); height = dv.getUint32(4); colorType = data[9];
        } else if (type === 'IDAT') {
            idats.push(Uint8Array.from(data));  // copy to avoid subarray issues
        } else if (type === 'IEND') break;
    }
    const bpp = colorType === 6 ? 4 : colorType === 2 ? 3 : 1;
    const totalLen = idats.reduce((s, c) => s + c.length, 0);
    const comp = new Uint8Array(totalLen);
    let pos = 0;
    for (const c of idats) { comp.set(c, pos); pos += c.length; }
    const raw = inflateSync(comp);
    const stride = 1 + width * bpp;
    const gray = new Float32Array(width * height);
    const prev = new Uint8Array(width * bpp);
    for (let y = 0; y < height; y++) {
        const filter = raw[y * stride];
        const scan   = raw.subarray(y * stride + 1, y * stride + stride);
        const recon  = new Uint8Array(scan.length);
        for (let i = 0; i < scan.length; i++) {
            const a  = i >= bpp ? recon[i - bpp] : 0;
            const b  = prev[i];
            const c  = i >= bpp ? prev[i - bpp] : 0;
            switch (filter) {
                case 0: recon[i] = scan[i]; break;
                case 1: recon[i] = (scan[i] + a) & 255; break;
                case 2: recon[i] = (scan[i] + b) & 255; break;
                case 3: recon[i] = (scan[i] + Math.floor((a + b) / 2)) & 255; break;
                case 4: {
                    const pa = Math.abs(b - c), pb = Math.abs(a - c), pc = Math.abs(a + b - 2 * c);
                    recon[i] = (scan[i] + (pa <= pb && pa <= pc ? a : pb <= pc ? b : c)) & 255;
                    break;
                }
            }
        }
        prev.set(recon);
        for (let x = 0; x < width; x++) {
            const o = x * bpp;
            gray[y * width + x] = bpp === 1 ? recon[o]
                : 0.299 * recon[o] + 0.587 * recon[o+1] + 0.114 * recon[o+2];
        }
    }
    return { gray, width, height };
}

const t0 = performance.now();
const pngBytes = await Bun.file('./tests/assets/test-image.png').image().png().bytes();
console.log(`Image load+decode to PNG: ${(performance.now()-t0).toFixed(0)}ms`);

const t1 = performance.now();
const { gray, width, height } = decodePNGtoGray(pngBytes);
console.log(`PNG→grayscale decode:     ${(performance.now()-t1).toFixed(0)}ms  (${width}×${height})`);

console.log('\n=== PIPELINE MATCHING ===');
const detector = new DetectorLite(width, height, { useLSH: true });

let t = performance.now();
const pyramid = detector._buildGaussianPyramid(gray, width, height);
console.log(`1. Gaussian pyramid:       ${(performance.now()-t).toFixed(0)}ms  (${pyramid.filter(Boolean).length} octaves)`);

t = performance.now();
const dog = detector._buildDogPyramid(pyramid);
console.log(`2. DoG pyramid:            ${(performance.now()-t).toFixed(0)}ms`);

t = performance.now();
const extremas = detector._findExtremas(dog, pyramid);
console.log(`3. Find extremas:          ${(performance.now()-t).toFixed(0)}ms  (${extremas.length} raw)`);

t = performance.now();
const pruned = detector._applyPrune(extremas);
console.log(`4. Prune:                  ${(performance.now()-t).toFixed(0)}ms  (${pruned.length} kept)`);

t = performance.now();
detector._computeOrientations(pruned, pyramid);
console.log(`5. Orientations:           ${(performance.now()-t).toFixed(0)}ms`);

t = performance.now();
detector._computeFreakDescriptors(pruned, pyramid);
console.log(`6. FREAK descriptors:      ${(performance.now()-t).toFixed(0)}ms`);

t = performance.now();
const maxPts = pruned.filter(p => p.score > 0);
const minPts = pruned.filter(p => p.score <= 0);
computeLaplacianEigenmaps(maxPts.map(p => ({ x: p.x, y: p.y })));
computeLaplacianEigenmaps(minPts.map(p => ({ x: p.x, y: p.y })));
console.log(`7. Laplacian Eigenmaps:    ${(performance.now()-t).toFixed(0)}ms  (max:${maxPts.length} min:${minPts.length})`);

t = performance.now();
hierarchicalClusteringBuild({ points: maxPts });
hierarchicalClusteringBuild({ points: minPts });
console.log(`8. H-Clustering:           ${(performance.now()-t).toFixed(0)}ms`);

console.log('\n=== PIPELINE TRACKING ===');
const imgObj = { data: gray, width, height };

t = performance.now();
const imgList = buildTrackingImageList(imgObj);
console.log(`9.  Build image list:      ${(performance.now()-t).toFixed(0)}ms  (${imgList.length} scales)`);

t = performance.now();
extractTrackingFeatures(imgList, () => {});
console.log(`10. Extract tracking:      ${(performance.now()-t).toFixed(0)}ms`);

console.log(`\nTOTAL: ${(performance.now()-t0).toFixed(0)}ms`);
