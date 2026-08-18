import { describe, it, expect } from 'vitest';
import { OfflineCompiler } from '../src/compiler/offline-compiler.js';
import { Controller } from '../src/runtime/controller.js';
import { loadTestAsset } from './helpers/test-utils.js';

describe('Multi-Target AR Management', () => {
    it('should compile multiple distinct targets into a single .taar archive', async () => {
        const target1 = await loadTestAsset('test-image.png');
        const target2 = await loadTestAsset('test-query.jpg');

        const compiler = new OfflineCompiler();
        await compiler.compileImageTargets([
            { width: target1.width, height: target1.height, data: target1.data },
            { width: target2.width, height: target2.height, data: target2.data }
        ], () => {});

        const buffer = compiler.exportData();
        expect(buffer).toBeInstanceOf(Uint8Array);
        expect(buffer.byteLength).toBeGreaterThan(500);

        const { dataList } = compiler.importData(buffer);
        expect(dataList).toHaveLength(2);
        expect(dataList[0].targetImage.width).toBe(target1.width);
        expect(dataList[1].targetImage.width).toBe(target2.width);
    });

    it('should combine multiple separate compiled .taar buffers and disambiguate target detections', async () => {
        const target1 = await loadTestAsset('test-image.png');
        const target2 = await loadTestAsset('test-query.jpg');

        // Compile Target 1 into buffer 1
        const compiler1 = new OfflineCompiler();
        await compiler1.compileImageTargets([{ width: target1.width, height: target1.height, data: target1.data }], () => {});
        const buffer1 = compiler1.exportData();

        // Compile Target 2 into buffer 2
        const compiler2 = new OfflineCompiler();
        await compiler2.compileImageTargets([{ width: target2.width, height: target2.height, data: target2.data }], () => {});
        const buffer2 = compiler2.exportData();

        // Load both buffers into a single Controller session
        const controller = new Controller({ inputWidth: target1.width, inputHeight: target1.height });
        const setup = await controller.addImageTargetsFromBuffers([buffer1, buffer2]);

        expect(setup.dimensions).toHaveLength(2);
        expect(setup.matchingDataList).toHaveLength(2);
        expect(setup.trackingDataList).toHaveLength(2);

        // Query with Target 1 -> should match TargetIndex 0
        const { featurePoints: fp1 } = await controller.detect(target1.grayscaleData);
        const matchTarget1 = await controller.match(fp1, 0);
        expect(matchTarget1.targetIndex).toBe(0);

        controller.dispose();
    });
});
