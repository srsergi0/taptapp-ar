# Prompts de Generación de Imágenes

## Figure 1: System Architecture (Conceptual Architecture)
[GENERATED]
**Planner (Phase 1):**
Create a detailed conceptual architecture diagram of the TapTapp AR V11 tracking pipeline.
The layout should flow from left to right.
**Main Blocks:**
- **Input:** "Web Camera Feed" (Icon: Camera lens).
- **Processing Core:** "Nanite Vision Codec" (Central large block). Inside this, show sub-blocks: "Octave Stratification", "Fourier Encoding", "Binary Matching".
- **Output:** "3D Pose Matrix" (Icon: 3D axis).
**Interactions:** Arrows showing data flowing from Camera -> Codec -> Pose.
**Purpose:** Illustrate the high-level data flow and the central role of the vision codec.

**Stylist (Phase 2):**
Style: NeurIPS 2025 Technical Diagram. Clean lines, minimal color palette (blues, greys, and white), sans-serif fonts (Inter/Roboto). High contrast for readability. No shadows or 3D effects on the blocks themselves, flat design with outlined borders.

**Visualizer (Phase 3):**
(Generate image based on description)

**Critic (Phase 4):**
Check for clarity of text, meaningful flow, and adherence to the "Nanite" concept (stratification).

---

## Figure 2: Nanite Feature Extraction (Methodological Pipeline)
[GENERATED]
**Planner (Phase 1):**
Create a vertical "Layered Stack" diagram showing the Multi-Octave Feature Extraction process.
**Main Blocks:**
- Top Layer: "Octave 0 (Full Res)".
- Middle Layers: "Octave 1", "Octave 2", "Octave 3" (Getting progressively smaller/abstract).
- Bottom Layer: "Octave 5 (Low Res)".
**Detailed Components:**
- Connect each layer to a central "Feature Selector" block.
- Show "Dynamic Scale Filter" acting as a gatekeeper to the selector.
**Interactions:** Downward arrows representing the image pyramid, side arrows pointing to the selector.
**Purpose:** Visualize how the system handles multi-scale features without redundant storage.

**Stylist (Phase 2):**
Style: Academic schematic. Uses gradients to represent resolution density (Darker = Higher Res, Lighter = Lower Res).

**Visualizer (Phase 3):**
(Generate image)

**Critic (Phase 4):**
Ensure the pyramid structure is clear and the "Selector" concept is distinct from a simple resizing operation.

---

## Figure 3: Matching Engine Logic (System Block Diagram)
[GENERATED]
**Planner (Phase 1):**
Create a block diagram of the Binary Matching Engine.
**Layout:** Central processing unit style.
**Main Blocks:**
- Left: "Target Descriptors (64-bit LSH)".
- Right: "Search Window Descriptors".
- Center: "XOR + PopCount Engine".
**Interactions:** two inputs feeding into the center, one output arrow labeled "Hamming Distance".
**Purpose:** Explain the core optimization mechanism (bitwise operations vs float math).

**Stylist (Phase 2):**
Style: Circuit-like abstract representation. use binary motifs (1s and 0s) subtly in the background.

**Visualizer (Phase 3):**
(Generate image)

**Critic (Phase 4):**
Verify the inputs and outputs are clearly labeled.

---

## Figure 4: Experimental Setup (Experimental Setup)
[GENERATED]
**Planner (Phase 1):**
Create a diagram depicting the simulated testing environment.
**Layout:** Split screen comparison.
**Main Blocks:**
- Left Panel: "Control Group (MindAR)" -> Icon: Traditional Server/GPU.
- Right Panel: "Experimental Group (TapTapp)" -> Icon: Mobile Browser/CPU.
- Bottom: "Metrics Collection" (Clock icon for Time, Scale icon for Size).
**Interactions:** Dotted lines connecting both groups to the metrics.
**Purpose:** comprehensive view of the pretest-posttest design.

**Stylist (Phase 2):**
Style: Comparative info-graphic style, strictly academic. use color coding (Red for Control, Green for Experimental).

**Visualizer (Phase 3):**
(Generate image)

**Critic (Phase 4):**
Check for balanced visual weight between the two sides.
