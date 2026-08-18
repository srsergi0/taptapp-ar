import { describe, it, expect } from 'vitest';
import { binarizeFREAK128 } from '../src/core/utils/lsh-binarizer.js';

describe('LSH Binarizer (FREAK-128)', () => {
    // Standard Hamming distance calculation for 128-bit vector (4x uint32)
    const popcount32 = (n) => {
        n = n >>> 0;
        n = n - ((n >>> 1) & 0x55555555);
        n = (n & 0x33333333) + ((n >>> 2) & 0x33333333);
        return (((n + (n >>> 4)) & 0x0F0F0F0F) * 0x01010101) >>> 24;
    };

    const hamming128 = (a, b) => {
        return popcount32(a[0] ^ b[0]) +
               popcount32(a[1] ^ b[1]) +
               popcount32(a[2] ^ b[2]) +
               popcount32(a[3] ^ b[3]);
    };

    it('should generate deterministic hashes for identical descriptors', () => {
        const descriptor = new Uint8Array(84);
        for (let i = 0; i < 84; i++) descriptor[i] = (i * 37) % 256;

        const h1 = binarizeFREAK128(descriptor);
        const h2 = binarizeFREAK128(descriptor);

        expect(h1).toBeInstanceOf(Uint32Array);
        expect(h1).toHaveLength(2);
        expect(Array.from(h1)).toEqual(Array.from(h2));
    });

    it('should distinguish completely different descriptors with substantial Hamming distance', () => {
        const d1 = new Uint8Array(84).fill(0);
        const d2 = new Uint8Array(84).fill(255);

        const h1 = binarizeFREAK128(d1);
        const h2 = binarizeFREAK128(d2);

        const dist = hamming128(h1, h2);
        expect(dist).toBeGreaterThanOrEqual(32); // Significant bit flip across 128 bits
    });

    it('should satisfy locality-sensitive hashing: Dist(Similar) < Dist(Different)', () => {
        const base = new Uint8Array(84);
        for (let i = 0; i < 84; i++) base[i] = 170; // 10101010

        const similar = new Uint8Array(base);
        similar[0] ^= 1; // Only 1 bit flipped

        const different = new Uint8Array(84);
        for (let i = 0; i < 84; i++) different[i] = 85; // 01010101 (inverted bit pattern)

        const hBase = binarizeFREAK128(base);
        const hSimilar = binarizeFREAK128(similar);
        const hDifferent = binarizeFREAK128(different);

        const dSimilar = hamming128(hBase, hSimilar);
        const dDifferent = hamming128(hBase, hDifferent);

        expect(dSimilar).toBeLessThan(dDifferent);
    });
});
