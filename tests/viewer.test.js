import { describe, it, expect } from 'vitest';
import { Controller } from '../src/runtime/controller.js';
import { OfflineCompiler } from '../src/compiler/offline-compiler.js';
import { loadTestAsset } from './helpers/test-utils.js';

describe('Controller Lifecycle & Features', () => {
    it('should initialize with valid projection matrix and aspect ratio', () => {
        const controller = new Controller({
            inputWidth: 640,
            inputHeight: 480
        });

        const proj = controller.getProjectionMatrix();
        expect(Array.isArray(proj)).toBe(true);
        expect(proj).toHaveLength(16);
        expect(proj[0]).toBeGreaterThan(0);
        expect(proj[5]).toBeGreaterThan(0);
        expect(proj[15]).toBe(0);

        controller.dispose();
    });

    it('should process targets, run dummy warmups, and match full input', async () => {
        const testImage = await loadTestAsset('test-image.png');

        const compiler = new OfflineCompiler();
        await compiler.compileImageTargets([
            { width: testImage.width, height: testImage.height, data: testImage.data }
        ], () => {});
        const taarBuffer = compiler.exportData();

        const controller = new Controller({
            inputWidth: testImage.width,
            inputHeight: testImage.height
        });

        await controller.addImageTargetsFromBuffer(taarBuffer);

        // Dummy run
        expect(() => controller.dummyRun(testImage.grayscaleData)).not.toThrow();

        // Detect & Match
        const { featurePoints } = await controller.detect(testImage.grayscaleData);
        expect(featurePoints.length).toBeGreaterThan(50);

        const { targetIndex, modelViewTransform } = await controller.match(featurePoints, 0);
        expect(targetIndex).toBe(0);
        expect(modelViewTransform).toBeDefined();

        // Matrix calculation
        const worldMatrix = controller.getWorldMatrix(modelViewTransform, 0);
        expect(worldMatrix).toHaveLength(16);
        expect(worldMatrix[15]).toBe(1);

        controller.dispose();
    });

    it('should apply rotation matrix adjustment for portrait orientations', () => {
        const controller = new Controller({ inputWidth: 640, inputHeight: 480 });
        const identity16 = [
            1, 0, 0, 0,
            0, 1, 0, 0,
            0, 0, 1, 0,
            0, 0, 0, 1
        ];

        const rotated = controller.getRotatedZ90Matrix(identity16);
        expect(rotated).toHaveLength(16);
        expect(rotated[0]).toBe(-0);
        expect(rotated[1]).toBe(1);

        controller.dispose();
    });
});
