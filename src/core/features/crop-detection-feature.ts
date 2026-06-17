import { ControllerFeature, FeatureContext } from "./feature-base.js";
import { CropDetector } from "../detector/crop-detector.js";

export class CropDetectionFeature implements ControllerFeature {
    id = "crop-detection";
    name = "Crop Detection";
    description = "Optimizes detection by focusing on areas with motion, reducing CPU usage.";
    enabled = true;

    private cropDetector: CropDetector | null = null;
    private debugMode: boolean = false;

    init(context: FeatureContext) {
        this.debugMode = context.debugMode;
        this.cropDetector = new CropDetector(context.inputWidth, context.inputHeight, this.debugMode);
    }

    detect(inputData: any, isMoving: boolean = true) {
        if (!this.enabled || !this.cropDetector) return null;

        if (isMoving && this.enabled) {
            return this.cropDetector!.detectMoving(inputData);
        } else {
            return this.cropDetector!.detect(inputData);
        }
    }
}
