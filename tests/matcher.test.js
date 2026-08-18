import { describe, it, expect } from 'vitest';
import { Matcher } from '../src/core/matching/matcher.js';
import { OfflineCompiler } from '../src/compiler/offline-compiler.js';
import { DetectorLite } from '../src/core/detector/detector-lite.js';
import { createSyntheticTestImage } from './helpers/test-utils.js';

describe('Matcher Unit Tests', () => {
    it('should match features with high precision on identical target', async () => {
        const testImage = createSyntheticTestImage({ width: 256, height: 256, type: 'geometric', seed: 123 });

        const compiler = new OfflineCompiler();
        await compiler.compileImageTargets([
            { width: testImage.width, height: testImage.height, data: testImage.data }
        ], () => {});

        const taarBuffer = compiler.exportData();
        const { dataList } = compiler.importData(taarBuffer);
        const matchingData = dataList[0].matchingData;

        const detector = new DetectorLite(testImage.width, testImage.height, { useLSH: true });
        const { featurePoints } = detector.detect(testImage.grayscaleData);

        const matcher = new Matcher(testImage.width, testImage.height, true);
        const { keyframeIndex, screenCoords, worldCoords } = matcher.matchDetection(matchingData, featurePoints);

        expect(keyframeIndex).toBeGreaterThanOrEqual(0);
        expect(Array.isArray(screenCoords)).toBe(true);
        expect(Array.isArray(worldCoords)).toBe(true);
        expect(screenCoords.length).toBeGreaterThanOrEqual(10);
        expect(screenCoords.length).toBe(worldCoords.length);
    });

    it('should handle empty or malformed feature point arrays gracefully', () => {
        const matcher = new Matcher(256, 256, false);
        const mockMatchingData = {
            maximaPointsList: [],
            minimaPointsList: [],
            numOctaves: 1
        };

        // Empty feature array
        const resEmpty = matcher.matchDetection(mockMatchingData, []);
        expect(resEmpty.keyframeIndex).toBe(-1);

        // Null / undefined inputs
        const resNull = matcher.matchDetection(null, []);
        expect(resNull.keyframeIndex).toBe(-1);
    });
});
