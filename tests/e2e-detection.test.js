import { describe, it, expect } from 'vitest';
import { OfflineCompiler } from '../src/compiler/offline-compiler.js';
import { Matcher } from '../src/core/matching/matcher.js';
import { DetectorLite } from '../src/core/detector/detector-lite.js';
import { Estimator } from '../src/core/estimation/estimator.js';
import { loadTestAsset, createSyntheticTestImage } from './helpers/test-utils.js';

describe('End-to-End AR Pipeline (Protocol V9 - LSH & HDC)', () => {
    it('should compile target, export/import .taar, and match query with high inlier confidence', async () => {
        const targetImage = await loadTestAsset('test-image.png');

        // 1. Compile target
        const compiler = new OfflineCompiler();
        await compiler.compileImageTargets([
            { width: targetImage.width, height: targetImage.height, data: targetImage.data }
        ], () => {});

        // 2. Export & Import
        const exportedBuffer = compiler.exportData();
        const { dataList } = compiler.importData(exportedBuffer);
        expect(dataList).toHaveLength(1);
        const matchingData = dataList[0].matchingData;

        // 3. Detect query features
        const detector = new DetectorLite(targetImage.width, targetImage.height, { useLSH: true, useHDC: true });
        const { featurePoints } = detector.detect(targetImage.grayscaleData);
        expect(featurePoints.length).toBeGreaterThan(20);

        // 4. Perform Matching
        const matcher = new Matcher(targetImage.width, targetImage.height, true);
        const result = matcher.matchDetection(matchingData, featurePoints);

        // 5. Assertions
        expect(result.keyframeIndex).toBeGreaterThanOrEqual(0);
        expect(result.screenCoords).toBeDefined();
        expect(result.worldCoords).toBeDefined();
        expect(result.screenCoords.length).toBeGreaterThanOrEqual(15);
        expect(result.worldCoords.length).toBe(result.screenCoords.length);

        // Verify valid geometric 2D/3D structure
        expect(result.screenCoords[0]).toHaveProperty('x');
        expect(result.screenCoords[0]).toHaveProperty('y');
        expect(result.worldCoords[0]).toHaveProperty('x');
        expect(result.worldCoords[0]).toHaveProperty('y');
        expect(result.worldCoords[0]).toHaveProperty('z');

        // 6. Estimate 3D Pose / ModelViewTransform
        const projectionTransform = [
            [256, 0, 128],
            [0, 256, 128],
            [0, 0, 1]
        ];
        const estimator = new Estimator(projectionTransform);
        const modelViewTransform = estimator.estimate({
            screenCoords: result.screenCoords,
            worldCoords: result.worldCoords
        });

        expect(modelViewTransform).toBeDefined();
        expect(modelViewTransform).toHaveLength(3);
        expect(modelViewTransform[0]).toHaveLength(4);
    });

    it('should correctly match target in real camera scene query (test-query.jpg)', async () => {
        const target = await loadTestAsset('test-image.png');
        const queryScene = await loadTestAsset('test-query.jpg');

        const compiler = new OfflineCompiler();
        await compiler.compileImageTargets([
            { width: target.width, height: target.height, data: target.data }
        ], () => {});

        const { dataList } = compiler.importData(compiler.exportData());
        const matchingData = dataList[0].matchingData;

        const detector = new DetectorLite(queryScene.width, queryScene.height, { useLSH: true, useHDC: true });
        const { featurePoints } = detector.detect(queryScene.grayscaleData);

        const matcher = new Matcher(queryScene.width, queryScene.height, false);
        const result = matcher.matchDetection(matchingData, featurePoints);

        // Target must be identified on the monitor screen (Layer index >= 0)
        expect(result.keyframeIndex).toBeGreaterThanOrEqual(0);
        expect(result.screenCoords).toBeDefined();
        expect(result.screenCoords.length).toBeGreaterThanOrEqual(10);
    });

    it('should correctly reject unmatched/unrelated images without false positive matches', async () => {
        const target = await loadTestAsset('test-image.png');
        const unrelatedQuery = createSyntheticTestImage({ width: 512, height: 512, type: 'checkerboard' });

        const compiler = new OfflineCompiler();
        await compiler.compileImageTargets([
            { width: target.width, height: target.height, data: target.data }
        ], () => {});

        const { dataList } = compiler.importData(compiler.exportData());
        const matchingData = dataList[0].matchingData;

        const detector = new DetectorLite(unrelatedQuery.width, unrelatedQuery.height, { useLSH: true, useHDC: true });
        const { featurePoints } = detector.detect(unrelatedQuery.grayscaleData);

        const matcher = new Matcher(unrelatedQuery.width, unrelatedQuery.height, false);
        const result = matcher.matchDetection(matchingData, featurePoints);

        // Unrelated image should fail to achieve consensus
        expect(result.keyframeIndex).toBe(-1);
    });
});
