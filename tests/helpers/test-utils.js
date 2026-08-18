/**
 * Test Utilities and Synthetic Image Generators for Locus AR Test Suite
 */

import { Jimp } from 'jimp';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

/**
 * Seeded linear congruential generator for reproducible pseudo-random numbers
 */
export function createRNG(seed = 123456789) {
    let s = seed;
    return function next() {
        s = (s * 1664525 + 1013904223) >>> 0;
        return s / 4294967296;
    };
}

/**
 * Loads a real test asset from tests/assets/ and returns RGBA + Grayscale buffers
 */
export async function loadTestAsset(filename = 'test-image.png') {
    const assetPath = resolve(__dirname, '..', 'assets', filename);
    const img = await Jimp.read(assetPath);
    const { width, height } = img.bitmap;
    const rgba = new Uint8Array(img.bitmap.data);
    const grayscale = new Uint8Array(width * height);

    for (let i = 0; i < width * height; i++) {
        const r = rgba[i * 4];
        const g = rgba[i * 4 + 1];
        const b = rgba[i * 4 + 2];
        grayscale[i] = (r * 77 + g * 150 + b * 29) >> 8;
    }

    return {
        width,
        height,
        data: rgba,
        grayscaleData: grayscale,
        bitmap: img.bitmap
    };
}

/**
 * Generates a synthetic image with rich, high-contrast features
 */
export function createSyntheticTestImage(options = {}) {
    const {
        width = 256,
        height = 256,
        type = 'geometric',
        seed = 42
    } = options;

    const rng = createRNG(seed);
    const grayscale = new Uint8Array(width * height);
    const rgba = new Uint8Array(width * height * 4);

    if (type === 'checkerboard') {
        const blockSize = Math.max(8, Math.floor(width / 16));
        for (let y = 0; y < height; y++) {
            for (let x = 0; x < width; x++) {
                const isWhite = ((Math.floor(x / blockSize) + Math.floor(y / blockSize)) % 2) === 0;
                const val = isWhite ? 240 : 15;
                const idx = y * width + x;
                grayscale[idx] = val;
                rgba[idx * 4] = val;
                rgba[idx * 4 + 1] = val;
                rgba[idx * 4 + 2] = val;
                rgba[idx * 4 + 3] = 255;
            }
        }
    } else {
        const blockSize = Math.max(16, Math.floor(width / 8));
        for (let y = 0; y < height; y++) {
            for (let x = 0; x < width; x++) {
                const idx = y * width + x;
                const blockX = Math.floor(x / blockSize);
                const blockY = Math.floor(y / blockSize);
                const cellX = x % blockSize;
                const cellY = y % blockSize;

                let val = ((blockX + blockY) % 2 === 0) ? 225 : 30;
                if (cellX > blockSize / 4 && cellX < (3 * blockSize) / 4 &&
                    cellY > blockSize / 4 && cellY < (3 * blockSize) / 4) {
                    val = 255 - val;
                }

                grayscale[idx] = val;
                rgba[idx * 4] = val;
                rgba[idx * 4 + 1] = val;
                rgba[idx * 4 + 2] = val;
                rgba[idx * 4 + 3] = 255;
            }
        }
    }

    return {
        width,
        height,
        data: rgba,
        grayscaleData: grayscale
    };
}
