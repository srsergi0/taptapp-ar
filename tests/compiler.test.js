import { describe, it, expect } from 'vitest';
import { OfflineCompiler } from '../src/compiler/offline-compiler.js';
import { createSyntheticTestImage } from './helpers/test-utils.js';

describe('OfflineCompiler Unit & Integration Tests', () => {
    it('should compile an image and extract valid tracking points', async () => {
        const compiler = new OfflineCompiler();
        const targetImage = createSyntheticTestImage({ width: 256, height: 256, type: 'geometric' });

        const progressCalls = [];
        const result = await compiler.compileTrack({
            progressCallback: (percent) => {
                progressCalls.push(percent);
            },
            targetImages: [{
                width: targetImage.width,
                height: targetImage.height,
                data: targetImage.grayscaleData
            }],
            basePercent: 0
        });

        // 1. Structure validation
        expect(Array.isArray(result)).toBe(true);
        expect(result.length).toBe(1);

        const trackingData = result[0];
        expect(Array.isArray(trackingData)).toBe(true);
        expect(trackingData.length).toBeGreaterThanOrEqual(1);

        // 2. Feature verification
        const firstLevel = trackingData[0];
        expect(firstLevel).toHaveProperty('points');
        expect(firstLevel.points.length).toBeGreaterThan(10);
        expect(firstLevel.points[0]).toHaveProperty('x');
        expect(firstLevel.points[0]).toHaveProperty('y');

        // 3. Progress callback verification
        expect(progressCalls.length).toBeGreaterThan(0);
        expect(progressCalls[progressCalls.length - 1]).toBeCloseTo(100, 1);
        for (let i = 1; i < progressCalls.length; i++) {
            expect(progressCalls[i]).toBeGreaterThanOrEqual(progressCalls[i - 1]);
        }
    });

    it('should compile full target (matching + tracking) and correctly export/import .taar data', async () => {
        const compiler = new OfflineCompiler();
        const targetImage = createSyntheticTestImage({ width: 256, height: 256, type: 'checkerboard' });

        const compiled = await compiler.compileImageTargets([
            { width: targetImage.width, height: targetImage.height, data: targetImage.data }
        ], () => {});

        expect(compiled).toHaveLength(1);
        expect(compiled[0]).toHaveProperty('matchingData');
        expect(compiled[0]).toHaveProperty('trackingData');

        // Verify serialization
        const taarBuffer = compiler.exportData();
        expect(taarBuffer).toBeInstanceOf(Uint8Array);
        expect(taarBuffer.byteLength).toBeGreaterThan(100);

        // Verify deserialization
        const imported = compiler.importData(taarBuffer);
        expect(imported).toHaveProperty('dataList');
        expect(imported.dataList).toHaveLength(1);
        expect(imported.dataList[0].targetImage.width).toBe(256);
        expect(imported.dataList[0].targetImage.height).toBe(256);
    });

    it('should throw an informative error when given invalid image structures', async () => {
        const compiler = new OfflineCompiler();

        // Null / undefined image
        await expect(compiler.compileImageTargets([null], () => {}))
            .rejects.toThrow(/Imagen inválida/);

        // Missing dimensions
        await expect(compiler.compileImageTargets([{ data: new Uint8Array(100) }], () => {}))
            .rejects.toThrow(/Imagen inválida/);

        // Mismatched data buffer size
        await expect(compiler.compileImageTargets([{ width: 100, height: 100, data: new Uint8Array(50) }], () => {}))
            .rejects.toThrow(/Formato de datos de imagen no soportado/);
    });

    it('should accept both RGBA (4 bytes/px) and Grayscale (1 byte/px) buffers seamlessly', async () => {
        const compiler = new OfflineCompiler();
        const target = createSyntheticTestImage({ width: 128, height: 128, type: 'geometric' });

        // Compile with Grayscale buffer (1 byte/px)
        const resGray = await compiler.compileImageTargets([
            { width: target.width, height: target.height, data: target.grayscaleData }
        ], () => {});
        expect(resGray).toHaveLength(1);

        // Compile with RGBA buffer (4 bytes/px)
        const resRgba = await compiler.compileImageTargets([
            { width: target.width, height: target.height, data: target.data }
        ], () => {});
        expect(resRgba).toHaveLength(1);
    });
});
