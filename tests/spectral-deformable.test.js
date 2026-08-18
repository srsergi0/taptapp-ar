import { describe, it, expect } from 'vitest';
import { computeLaplacianEigenmaps, validateDeformableMatches } from '../src/core/matching/spectralDeformableMatcher.js';

describe('Spectral Deformable Matching (Laplacian Eigenmaps)', () => {
    
    describe('computeLaplacianEigenmaps', () => {
        it('should compute non-trivial 2D spectral coordinates for a grid of keypoints', () => {
            // Generate a 5x5 grid of keypoints
            const points = [];
            for (let y = 0; y < 5; y++) {
                for (let x = 0; x < 5; x++) {
                    points.push({ x: x * 50, y: y * 50 });
                }
            }

            const { sx, sy } = computeLaplacianEigenmaps(points);

            expect(sx).toBeInstanceOf(Float32Array);
            expect(sy).toBeInstanceOf(Float32Array);
            expect(sx.length).toBe(points.length);
            expect(sy.length).toBe(points.length);

            // Verify coordinates are non-trivial (not all zeroes)
            let sumSqX = 0, sumSqY = 0;
            for (let i = 0; i < points.length; i++) {
                sumSqX += sx[i] * sx[i];
                sumSqY += sy[i] * sy[i];
            }
            expect(sumSqX).toBeGreaterThan(1e-4);
            expect(sumSqY).toBeGreaterThan(1e-4);
        });

        it('should handle small point sets gracefully', () => {
            const points = [{ x: 10, y: 10 }, { x: 20, y: 20 }, { x: 30, y: 30 }];
            const { sx, sy } = computeLaplacianEigenmaps(points);
            expect(sx.length).toBe(3);
            expect(sx[0]).toBe(0);
        });
    });

    describe('validateDeformableMatches', () => {
        it('should identify inliers and estimate local affine model under deformation', () => {
            // 1. Generate grid of template points
            const points = [];
            for (let y = 0; y < 6; y++) {
                for (let x = 0; x < 6; x++) {
                    points.push({ x: x * 40, y: y * 40 });
                }
            }

            // 2. Compute spectral coordinates
            const { sx, sy } = computeLaplacianEigenmaps(points);
            for (let i = 0; i < points.length; i++) {
                points[i].sx = sx[i];
                points[i].sy = sy[i];
            }

            // 3. Define a local affine transformation for deformation
            // q_x = 200 * s_x - 50 * s_y + 100
            // q_y = 30 * s_x + 180 * s_y + 120
            const a = 200, b = -50, tx = 100;
            const c = 30, d = 180, ty = 120;

            const matches = [];

            // Add correct matches (inliers)
            for (let i = 0; i < points.length; i++) {
                const px = a * points[i].sx + b * points[i].sy + tx;
                const py = c * points[i].sx + d * points[i].sy + ty;

                // Add small perturbation noise (< 3 pixels)
                const noiseX = (Math.random() - 0.5) * 2;
                const noiseY = (Math.random() - 0.5) * 2;

                matches.push({
                    querypoint: { x: px + noiseX, y: py + noiseY },
                    keypoint: points[i]
                });
            }

            // Add some outlier matches
            for (let i = 0; i < 10; i++) {
                matches.push({
                    querypoint: { x: Math.random() * 500, y: Math.random() * 500 },
                    keypoint: points[Math.floor(Math.random() * points.length)]
                });
            }

            // 4. Validate matches using Spectral RANSAC
            const result = validateDeformableMatches({
                matches,
                thresholdPx: 10,
                minInliers: 15
            });

            expect(result).toBeDefined();
            expect(result).not.toBeNull();
            expect(result.isDeformable).toBe(true);
            expect(result.inliers.length).toBeGreaterThanOrEqual(25); // Most inliers should be found
            
            // Verify affine model estimates are close to ground truth (within reasonable margin of noise)
            expect(Math.abs(result.model.a - a)).toBeLessThan(30);
            expect(Math.abs(result.model.b - b)).toBeLessThan(30);
            expect(Math.abs(result.model.tx - tx)).toBeLessThan(30);
            expect(Math.abs(result.model.c - c)).toBeLessThan(30);
            expect(Math.abs(result.model.d - d)).toBeLessThan(30);
            expect(Math.abs(result.model.ty - ty)).toBeLessThan(30);
        });

        it('should return null when matches do not achieve consensus', () => {
            const matches = [];
            for (let i = 0; i < 10; i++) {
                matches.push({
                    querypoint: { x: Math.random() * 500, y: Math.random() * 500 },
                    keypoint: { x: Math.random() * 200, y: Math.random() * 200, sx: Math.random(), sy: Math.random() }
                });
            }

            const result = validateDeformableMatches({
                matches,
                thresholdPx: 5,
                minInliers: 8
            });

            expect(result).toBeNull();
        });
    });
});
