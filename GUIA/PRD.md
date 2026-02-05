# Product Requirements Document (PRD) - IEEE Scientific Article Generation

Based on GUIA.md and the research idea defined in ./IDEA.md, this document outlines the tasks and constraints for generating the scientific article.

## 1. General Format & Technology Stack
- [ ] **LaTeX Environment**: All content must be inside a folder named `project`.
- [ ] **Document Class**: Must use `\documentclass[journal]{IEEEtran}`.
- [ ] **Required Packages**:
  - `cite` (citation management)
  - `amsmath`, `amssymb`, `amsfonts` (mathematics)
  - `graphicx` (figures)
  - `booktabs` (professional tables)
  - `url` (if strictly necessary)
- [ ] **Restrictions**:
  - NO `article` or `report` classes.
  - NO "Lorem Ipsum" or placeholder text.
  - NO direct Python scripts in text (use pseudocode/math description).
- [ ] **Compilation**: The project must compile using `qtex .\project\`.

## 2. Directory Structure (Mandatory)
The following structure must be created exactly:
```text
/project
 ├── main.tex
 ├── assets/
 │    ├── abstract.tex
 │    ├── introduction.tex
 │    ├── methodology.tex
 │    ├── results.tex
 │    ├── discussion.tex
 │    ├── conclusions.tex
 ├── references.bib
 ├── imagenes-generadas.md
```

## 3. Scientific Outline (Pre-requisite)
Before generating content, define:
- [ ] **Title**: Technical, impactful, max 15 words.
- [ ] **Objectives**: General and Specific.
- [ ] **Variables**: Independent (Cause) and Dependent (Effect).
- [ ] **Indicators**: Metrics for Before vs After.
- [ ] **Sample Size**: Simulated collection of 30–45 data points.
- [ ] **Statistics**: Define which tests to use (Shapiro–Wilk, t-test, etc.).
- [ ] **Figure List**: Enumerate all figures (Fig. 1, Fig. 2...).

## 4. Figure Requirements (Visual Outline)

> **⚠️ MANDATORY:** Follow `./IMAGE_GENERATOR_GUIDE.md` for complete image generation guidelines (PaperBanana SOTA Framework).

- [ ] Create ALWAYS a file `project/imagenes-generadas.md` containing all COMPLETE prompts of the figures to be generated.
- [ ] **Follow 4-Phase Pipeline** (from IMAGE_GENERATOR_GUIDE.md):
  - [ ] **Phase 1 (Planner):** Generate ultra-detailed textual description
  - [ ] **Phase 2 (Stylist):** Apply NeurIPS 2025 style guidelines
  - [ ] **Phase 3 (Visualizer):** Generate the image
  - [ ] **Phase 4 (Critic):** Evaluate and refine (T=3 iterations)
- [ ] **Visual Style**: High-quality editorial outline (see Style Guides in IMAGE_GENERATOR_GUIDE.md Sections 7-8).
- [ ] **Error Handling & Logging**:
  - If there is an error in the image generation, regenerate following Critic Agent rules.
  - Add the tag `[GENERATED]` to the corresponding prompt once the image is successfully created and placed.
- [ ] **Type**: Conceptual Architecture, Pipeline, Block Diagram, or Setup.
- [ ] **Attributes**:
  - Must be "Methodological" and "Sequential".
  - Source must be cited as "Elaboración propia" (Own elaboration).
- [ ] **Persistent Image Management** (MANDATORY):
  - [ ] **Immediate Copy:** As soon as an image is generated, copy it to `project/figures/`.
  - [ ] **Variation Naming:** Use numbered suffixes for alternatives or non-optimal versions: `image.png`, `image(1).png`, `image(2).png`.
  - [ ] **Add Tag:** Add `[GENERATED]` to the corresponding prompt once the image is successfully created and placed.
- [ ] **Detailed Description Per Figure** (use Prompt Templates from IMAGE_GENERATOR_GUIDE.md Section 12):
  - Layout structure (flow, layers).
  - Main blocks and detailed components.
  - Interactions (arrows, data flow).
  - Scientific purpose justification.
- [ ] **Evaluation Criteria** (from IMAGE_GENERATOR_GUIDE.md Section 11):
  - Faithfulness (fidelity to methodology)
  - Readability (clear visual flow)
  - Conciseness (high signal-to-noise ratio)
  - Aesthetics (professional NeurIPS-style)

## 5. Content Requirements by Section

### 5.1 Main File (`main.tex`)
- [ ] Standard IEEE configuration.
- [ ] Generic Academic Authors.
- [ ] Inputs for all `assets/` files.
- [ ] Bibliography setup (`IEEEtran` style).

### 5.2 Abstract (`abstract.tex`)
- [ ] Single paragraph.
- [ ] Must cover: Problem, Tech Proposal, Applied Research approach, Pretest–Posttest design, Sample (30–45), Quantitative results, and p-value < 0.05.

### 5.3 Introduction (`introduction.tex`)
- [ ] International Context.
- [ ] Peru/Local Context.
- [ ] Clear Research Gap.
- [ ] Technological Justification.
- [ ] Explicit General Objective.

### 5.4 Methodology (`methodology.tex`)
- [ ] **Type**: Applied research.
- [ ] **Design**: Pretest–Posttest.
- [ ] **Flow**: Sequential steps (A, B, C...) mapping to figures.
- [ ] **Style**: Technical redaction, no code blocks.

### 5.5 Results (`results.tex`)
- [ ] **Data**: Realistic simulated results.
- [ ] **Comparisons**: Before vs After indicators.
- [ ] **Statistical Tests (Mandatory)**:
  - Normality: Shapiro–Wilk or Kolmogorov–Smirnov.
  - Hypothesis: Paired Student’s t-test.
- [ ] **Output**: Formal statistical interpretation and IEEE formatted tables.

### 5.6 Discussion (`discussion.tex`)
- [ ] Deep interpretation of findings.
- [ ] Comparison with indexed literature (IEEE/Scopus).
- [ ] Focus on efficiency, optimization, or performance impact.

### 5.7 Conclusions (`conclusions.tex`)
- [ ] Direct answer to objectives.
- [ ] Clear statements of scientific/technological contribution.
- [ ] Scalability notes.
- [ ] No repetition of tables/stats.

### 5.8 References (`references.bib`)
- [ ] **Quantity**: Minimum 25 references.
- [ ] **Quality**: 80% from Indexed Journals (IEEE, ACM, Springer, Elsevier).
- [ ] **Recency**: 70% from the last 5 years (2021-2026).
- [ ] **Format**: Must include DOIs.

## 6. Editorial Guidelines
- [ ] **Voice**: Passive & Impersonal.
- [ ] **Tense**: Past for Method/Results; Present for Intro/Discussion.
- [ ] **Vocabulary**: Formal academic (avoid "very", "good"; use "significant", "optimal").

## 7. Submission Tasks (Strict Integrity)
- [ ] **Validation Protocol (MANDATORY)**:
  - Run `qtex .\project\ --verify` (Verify structure/assets).
  - Run `qtex .\project\` (Compile to PDF).
- [ ] **Git Rule**: ONLY if both commands yield `✔ success`, perform `git commit` and `git push`.
- [ ] **Correction Loop**: If `qtex` fails, analyze logs, fix LaTeX/BibTeX errors, and repeat validation.
