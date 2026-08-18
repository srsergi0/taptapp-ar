import { describe, it, expect } from 'vitest';
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

describe('Image Embeddings Matrix Invariants', () => {
    it('should satisfy identity similarity and bounded noise floor across variations', async () => {
        const embedder = new ImageEmbedder('standard');

        const baseJimp = await Jimp.read(resolve(__dirname, '../assets/test-image.png'));
        baseJimp.resize({ w: 512, h: 512 });

        const variations = [
            baseJimp.clone(),
            baseJimp.clone().brightness(0.2),
            baseJimp.clone().contrast(0.2),
            baseJimp.clone().blur(1)
        ];

        const embeddings = variations.map(img => {
            const gray = jimpToGrayscale(img);
            return embedder.embed(gray.data, gray.width, gray.height);
        });

        // Identity self-similarity
        for (let i = 0; i < embeddings.length; i++) {
            const simSelf = embedder.compare(embeddings[i], embeddings[i]);
            expect(simSelf).toBeCloseTo(1.0, 2);
        }

        // Intra-image variations must maintain significant similarity (> 0.35)
        for (let i = 1; i < embeddings.length; i++) {
            const sim = embedder.compare(embeddings[0], embeddings[i]);
            expect(sim).toBeGreaterThan(0.35);
        }
    });
});
