import { describe, it, expect } from 'vitest';
import { generateBasis, projectDescriptor, compressToSignature } from '../src/core/matching/hdc.js';

describe('Hyperdimensional Computing (HDC)', () => {
    it('should generate a deterministic basis given the same seed and dimension', () => {
        const seed = 0x1337CAFE;
        const basis1 = generateBasis(seed, 64);
        const basis2 = generateBasis(seed, 64);

        expect(basis1).toHaveLength(64);
        expect(basis2).toHaveLength(64);
        for (let i = 0; i < basis1.length; i++) {
            expect(Array.from(basis1[i])).toEqual(Array.from(basis2[i]));
        }
    });

    it('should produce identical hypervectors and signatures for identical input descriptors', () => {
        const basis = generateBasis(0x12345678, 128);
        const desc = new Uint32Array([0xDEADBEEF, 0xCAFEBABE]);

        const hv1 = projectDescriptor(desc, basis);
        const hv2 = projectDescriptor(desc, basis);

        expect(Array.from(hv1)).toEqual(Array.from(hv2));

        const sig1 = compressToSignature(hv1);
        const sig2 = compressToSignature(hv2);

        expect(typeof sig1).toBe('number');
        expect(sig1).toBe(sig2);
    });

    it('should preserve relative similarity in HDC hypervector projection space', () => {
        const basis = generateBasis(0xABCDEF01, 512);

        const dBase = new Uint32Array([0xFFFFFFFF, 0xFFFFFFFF]);
        const dSimilar = new Uint32Array([0xFFFFFFFE, 0xFFFFFFFF]); // 1 bit flip
        const dOrthogonal = new Uint32Array([0x00000000, 0x00000000]); // completely inverted

        const hvBase = projectDescriptor(dBase, basis);
        const hvSimilar = projectDescriptor(dSimilar, basis);
        const hvOrthogonal = projectDescriptor(dOrthogonal, basis);

        const popcount = (n) => {
            n = n >>> 0;
            n = n - ((n >>> 1) & 0x55555555);
            n = (n & 0x33333333) + ((n >>> 2) & 0x33333333);
            return (((n + (n >>> 4)) & 0x0F0F0F0F) * 0x01010101) >>> 24;
        };

        const computeDist = (v1, v2) => {
            let dist = 0;
            for (let i = 0; i < v1.length; i++) {
                dist += popcount(v1[i] ^ v2[i]);
            }
            return dist;
        };

        const distSimilar = computeDist(hvBase, hvSimilar);
        const distOrthogonal = computeDist(hvBase, hvOrthogonal);

        expect(distSimilar).toBeLessThan(distOrthogonal);
    });
});
