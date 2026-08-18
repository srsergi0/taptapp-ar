import { describe, it, beforeAll, expect } from 'vitest';
import { Jimp } from 'jimp';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';
import { ImageEmbedder } from '../../src/core/embeddings/image-embedding.js';

const __dirname = dirname(fileURLToPath(import.meta.url));

function jimpToGrayscale(image) {
    const width = image.bitmap.width;
    const height = image.bitmap.height;
    const grayscale = new Float32Array(width * height);
    const buffer = image.bitmap.data;

    for (let i = 0; i < width * height; i++) {
        const r = buffer[i * 4];
        const g = buffer[i * 4 + 1];
        const b = buffer[i * 4 + 2];
        grayscale[i] = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
    }

    return { data: grayscale, width, height };
}

describe('All-vs-All Image Embedding Robustness', () => {
    let embedder;
    let baseImg;
    let queryImg;
    let baseEmb;
    let queryEmb;

    beforeAll(async () => {
        embedder = new ImageEmbedder('standard');

        const baseJimp = await Jimp.read(resolve(__dirname, '../assets/test-image.png'));
        baseJimp.resize({ w: 512, h: 512 });
        baseImg = jimpToGrayscale(baseJimp);
        baseEmb = embedder.embed(baseImg.data, baseImg.width, baseImg.height);

        const queryJimp = await Jimp.read(resolve(__dirname, '../assets/test-query.jpg'));
        queryJimp.resize({ w: 512, h: 512 });
        queryImg = jimpToGrayscale(queryJimp);
        queryEmb = embedder.embed(queryImg.data, queryImg.width, queryImg.height);
    });

    it('should maintain high embedding similarity under photometric changes', async () => {
        const baseJimp = await Jimp.read(resolve(__dirname, '../assets/test-image.png'));
        baseJimp.resize({ w: 512, h: 512 }).brightness(0.3);
        const mod = jimpToGrayscale(baseJimp);
        const modEmb = embedder.embed(mod.data, mod.width, mod.height);

        const similarity = embedder.compare(baseEmb, modEmb);
        expect(similarity).toBeGreaterThan(0.7);
    });

    it('should distinguish different image targets with low cross-target similarity', () => {
        const crossSim = embedder.compare(baseEmb, queryEmb);
        // Different scenes must not be confused with each other
        expect(crossSim).toBeLessThan(0.4);
    });
});
