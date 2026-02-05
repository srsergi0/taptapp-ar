# Prompts de Generación de Imágenes

## Figure 1: System Architecture (Conceptual Architecture)
[GENERATED]

### Phase 1: Planner Output
**Description:** A detailed conceptual architecture diagram of the TapTapp AR V11 tracking pipeline flowing from left to right.
**Main Blocks:**
- **Input:** "Web Camera Feed" represented by a camera lens icon.
- **Processing Core:** "Nanite Vision Codec" as a central large block containing sub-modules: "Octave Stratification", "Fourier Encoding", and "Binary Matching".
- **Output:** "3D Pose Matrix" represented by a 3D axis icon.
**Interactions:** Directional arrows showing data flowing from Camera -> Codec -> Pose.
**Purpose:** Illustrate the high-level data flow and the central role of the vision codec.

### Phase 2: Stylist Output
**Style:** NeurIPS 2025 Technical Diagram.
**Visuals:** Clean lines, minimal color palette (blues, greys, and white), sans-serif fonts (Inter/Roboto). High contrast for readability.
**Details:** No shadows or 3D effects on the blocks themselves, flat design with outlined borders.
**Background:** White or very pale blue (#E6F3FF).

### Phase 3: Visualizer Input (Final Prompt)
```text
Eres un ilustrador experto en diagramas científicos. Genera diagramas científicos de alta calidad basados en las solicitudes del usuario.

NOTA: NO incluir títulos de figura en la imagen.

DESCRIPCIÓN DEL DIAGRAMA A GENERAR:
A conceptual architecture diagram of the TapTapp AR V11 tracking pipeline.
Layout: Horizontal flow (Left-to-Right).
Style: NeurIPS 2025 "Soft Tech", clean lines, flat design, high contrast.
Background: White or #E6F3FF (Pale Blue).

Components:
1. [INPUT] "Web Camera Feed" (Icon: Camera Lens) -> connecting to center.
2. [CORE] "Nanite Vision Codec" (Large Central Block).
   - Inside Core: Three sub-modules labeled "Octave Stratification", "Fourier Encoding", "Binary Matching".
3. [OUTPUT] "3D Pose Matrix" (Icon: 3D Axis) -> emerging from center.

Colors:
- Core connection lines: Dark Grey/Black.
- Active Modules: Medium Blue.
- Background: #E6F3FF.

PARÁMETROS:
- Aspect Ratio: 16:9
- Resolución: 2K
- Fondo: White/Pale Blue
```

### Phase 4: Critic Rules
Check for clarity of text, meaningful flow, and adherence to the "Nanite" concept (stratification). Ensure no caption text is in the image.

---

## Figure 2: Nanite Feature Extraction (Methodological Pipeline)
[GENERATED]

### Phase 1: Planner Output
**Description:** A vertical "Layered Stack" diagram showing the Multi-Octave Feature Extraction process.
**Main Blocks:**
- Top Layer: "Octave 0 (Full Res)".
- Middle Layers: "Octave 1", "Octave 2", "Octave 3" (Getting progressively smaller/abstract).
- Bottom Layer: "Octave 5 (Low Res)".
**Detailed Components:**
- Connect each layer to a central "Feature Selector" block.
- Show "Dynamic Scale Filter" acting as a gatekeeper to the selector.
**Interactions:** Downward arrows representing the image pyramid, side arrows pointing to the selector.

### Phase 2: Stylist Output
**Style:** Academic schematic using gradients to represent resolution density (Darker = Higher Res, Lighter = Lower Res).
**Colors:** Use "Mint/Sage" (#E0F2F1) for the background zone of the stack.

### Phase 3: Visualizer Input (Final Prompt)
```text
Eres un ilustrador experto en diagramas científicos. Genera diagramas científicos de alta calidad basados en las solicitudes del usuario.

NOTA: NO incluir títulos de figura en la imagen.

DESCRIPCIÓN DEL DIAGRAMA A GENERAR:
A vertical "Layered Stack" diagram representing Multi-Octave Feature Extraction.
Style: Academic Schematic, NeurIPS 2025.

Structure:
1. Vertical Stack of 6 layers (Pyramid style representation, top is wide/detailed, bottom is narrow/abstract).
   - Label Top: "Octave 0 (Full Res)"
   - Label Middle: "Octave 1", "Octave 2", "Octave 3"
   - Label Bottom: "Octave 5 (Low Res)"
   - Gradient: Darker blue at top, fading to lighter blue at bottom.
2. Central Block: "Feature Selector" (Rounded Rectangle, Distinct Color like Orange).
3. Logic Gate: "Dynamic Scale Filter" connected to the Selector.
4. Arrows: Downward flow through stack, lateral flow into Selector.

PARÁMETROS:
- Aspect Ratio: 3:4 (Vertical)
- Resolución: 2K
- Fondo: White
```

### Phase 4: Critic Rules
Ensure the pyramid structure is clear and the "Selector" concept is distinct from a simple resizing operation.

---

## Figure 3: Matching Engine Logic (System Block Diagram)
[GENERATED]

### Phase 1: Planner Output
**Description:** A block diagram of the Binary Matching Engine logical circuit.
**Layout:** Central processing unit style.
**Main Blocks:**
- Left Input: "Target Descriptors (64-bit LSH)".
- Right Input: "Search Window Descriptors".
- Center Processing: "XOR + PopCount Engine".
- Output: "Hamming Distance".
**Interactions:** Two inputs feeding into the center, one output arrow.

### Phase 2: Stylist Output
**Style:** Circuit-like abstract representation.
**Details:** Use binary motifs (1s and 0s) subtly in the background texture.
**Colors:** "Pale Lavender" (#F3E5F5) background for the logic zone.

### Phase 3: Visualizer Input (Final Prompt)
```text
Eres un ilustrador experto en diagramas científicos. Genera diagramas científicos de alta calidad basados en las solicitudes del usuario.

NOTA: NO incluir títulos de figura en la imagen.

DESCRIPCIÓN DEL DIAGRAMA A GENERAR:
System Block Diagram of a Binary Matching Engine.
Style: Abstract Circuit / Logical Flow.

Components:
1. Input A (Left): "Target Descriptors (64-bit LSH)" -> Block.
2. Input B (Right): "Search Window Descriptors" -> Block.
3. Center Unit: "XOR + PopCount Engine" (Hexagon or Diamond shape).
4. Output (Bottom): "Hamming Distance".

Visuals:
- Background: Very subtle pattern of 0s and 1s light grey.
- Lines: Orthogonal (Right angles), sharp.
- Palette: Purple/Lavender tones for logic.

PARÁMETROS:
- Aspect Ratio: 16:9
- Resolución: 2K
- Fondo: Pale Lavender (#F3E5F5)
```

### Phase 4: Critic Rules
Verify the inputs and outputs are clearly labeled. Check "XOR + PopCount" text.

---

## Figure 4: Experimental Setup (Experimental Setup)
[GENERATED]

### Phase 1: Planner Output
**Description:** A split-screen comparison diagram depicting the simulated testing environment.
**Layout:** Split vertically.
**Main Blocks:**
- Left Panel: "Control Group (MindAR)" -> Icon: Server + GPU.
- Right Panel: "Experimental Group (TapTapp)" -> Icon: Mobile Phone + CPU chip.
- Bottom: "Metrics Collection" (Icons: Clock for Time, Scale for Size).
**Interactions:** Dotted lines connecting both groups to the metrics.

### Phase 2: Stylist Output
**Style:** Comparative info-graphic style, strictly academic.
**Colors:** Color coding for contrast (Red/Orange tint for Control/MindAR to imply heaviness, Green/Teal tint for Experimental/TapTapp to imply lightness).

### Phase 3: Visualizer Input (Final Prompt)
```text
Eres un ilustrador experto en diagramas científicos. Genera diagramas científicos de alta calidad basados en las solicitudes del usuario.

NOTA: NO incluir títulos de figura en la imagen.

DESCRIPCIÓN DEL DIAGRAMA A GENERAR:
A split-screen comparative diagram for Experimental Setup.
Style: Comparative Academic Infographic.

Layout:
- Left Side (Control): Label "MindAR". Visual: Icon of a Server rack or heavy GPU. Tint: Subtle Orange/Red.
- Right Side (Experimental): Label "TapTapp". Visual: Icon of a Mobile Device or CPU chip. Tint: Subtle Green/Teal.
- Bottom Center: "Metrics Collection". Connected to both sides via dotted lines. Icons for "Time" (Clock) and "Size" (Weight Scale).

PARÁMETROS:
- Aspect Ratio: 16:9
- Resolución: 2K
- Fondo: White
```

### Phase 4: Critic Rules
Check for balanced visual weight between the two sides. Ensure "MindAR" and "TapTapp" labels are legible.
