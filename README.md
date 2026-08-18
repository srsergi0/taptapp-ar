<div align="center">
  
# 🛰️ Locus AR

<img src="https://raw.githubusercontent.com/srsergiolazaro/locus-ar/main/docs/images/hero-banner.png" alt="Locus AR - High Performance Augmented Reality" width="100%"/>

[![npm version](https://img.shields.io/npm/v/locus-ar.svg?style=flat-square&color=00D4AA)](https://www.npmjs.com/package/locus-ar)
[![npm downloads](https://img.shields.io/npm/dm/locus-ar.svg?style=flat-square&color=7C3AED)](https://www.npmjs.com/package/locus-ar)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=flat-square)](./LICENSE)
[![Bundle Size](https://img.shields.io/bundlephobia/minzip/locus-ar?style=flat-square&color=F59E0B)](https://bundlephobia.com/package/locus-ar)
[![TypeScript](https://img.shields.io/badge/TypeScript-Ready-3178C6?style=flat-square&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Zero Dependencies](https://img.shields.io/badge/Dependencies-Zero_TFJS-22C55E?style=flat-square)](https://www.npmjs.com/package/locus-ar)

### 🚀 Ultra-Fast AR Tracking • 100% Pure JavaScript • No TensorFlow.js Required

</div>

---

**Locus AR** is a next-generation Augmented Reality (AR) image tracking engine for **React**, **Three.js**, **Node.js**, and the **Browser**.

- ⚡ **100% Pure JavaScript**: Zero TensorFlow.js dependencies, instant startup, sub-millisecond overhead.
- 🧬 **Bio-Inspired Vision**: Foveal attention and predictive coding reducing CPU consumption by up to 98%.
- 📐 **Full Multi-Scale Pyramids**: Robust tracking from close-up (scale 1.0) to far-distance (scale 0.05).
- 📦 **JIT & Offline Compilers**: Pass an image URL directly or load pre-compiled `.taar` files.

---

## 📖 Table of Contents
- [🛠 Installation](#-installation)
- [⚡ Quick Start (Copy-Paste Ready)](#-quick-start)
  - [1. React Component (`<Locus />`)](#1-react-component-locus-)
  - [2. Vanilla JavaScript / HTML (`createTracker`)](#2-vanilla-javascript--html-createtracker)
  - [3. Three.js 3D WebGL Scene](#3-threejs-3d-webgl-scene)
- [🖼️ Image Compiler API](#️-image-compiler-api)
- [📊 Performance Benchmarks](#-performance-benchmarks)
- [🔍 Visual Search & Embeddings](#-visual-search--embeddings)
- [📄 License](#-license)

---

## 🛠 Installation

```bash
# npm
npm install locus-ar

# bun
bun add locus-ar

# pnpm
pnpm add locus-ar
```

---

## ⚡ Quick Start

### 1. React Component (`<Locus />` + `<LocusTransform />`)

The simplest and most elegant way to embed AR in a React app with automatic 3D homography:

```tsx
import React from 'react';
import { Locus, LocusTransform } from 'locus-ar/client';

export const MyARApp = () => {
  return (
    <div style={{ width: '100vw', height: '100vh', position: 'relative' }}>
      <Locus targets={{ image: '/assets/card-target.png', label: 'business-card' }}>
        {(detections) =>
          detections.map((det) => (
            <LocusTransform
              key={det.targetIndex}
              matrix={det.worldMatrix}
              screenCoords={det.screenCoords}
            >
              <div style={{
                width: '100px',
                height: '100px',
                background: 'rgba(15, 23, 42, 0.9)',
                border: '2px solid #6366f1',
                borderRadius: '12px',
                padding: '12px',
                color: 'white',
                backdropFilter: 'blur(8px)',
                boxShadow: '0 8px 32px rgba(99, 102, 241, 0.35)'
              }}>
                <h3>🎯 Marcador Detectado</h3>
                <p>Inliers: {det.inliersCount}</p>
                <p>Estabilidad: {((det.stability || 1) * 100).toFixed(0)}%</p>
              </div>
            </LocusTransform>
          ))
        }
      </Locus>
    </div>
  );
};
```

---

### 2. Full Control: Hook `useLocus`

For advanced React developers who need custom Three.js scenes, canvas overlays, or fine-grained pipeline control:

```tsx
import React, { useEffect, useRef, useMemo } from 'react';
import { useLocus } from 'locus-ar/client';

export const CustomAR = () => {
  const videoRef = useRef<HTMLVideoElement>(null);

  const targets = useMemo(() => [
    { image: '/assets/target.png', label: 'poster' }
  ], []);

  const {
    state,               // 'idle' | 'initializing' | 'compiling' | 'tracking' | 'error'
    detections,          // Array of LocusDetection
    compilationProgress, // 0 - 100%
    error,               // Error string if any
    start,               // start(videoElement | canvasElement)
    stop,                // stop()
    getProjectionMatrix  // () => number[] (16 elements for Three.js)
  } = useLocus(targets, {
    width: 1280,
    height: 720,
    bioInspired: true
  });

  useEffect(() => {
    if (videoRef.current) {
      start(videoRef.current);
    }
    return () => stop();
  }, [start, stop]);

  return (
    <div>
      <video ref={videoRef} playsInline autoPlay muted />
      {state === 'compiling' && <p>Compilando: {compilationProgress}%</p>}
      {detections.map(det => (
        <div key={det.targetIndex}>
          Fijado: {det.label} ({det.inliersCount} inliers)
        </div>
      ))}
    </div>
  );
};
```

---

### 2. Vanilla JavaScript / HTML (`createTracker`)

Zero-configuration camera tracking with DOM overlays:

```html
<!DOCTYPE html>
<html>
<head>
  <style>
    #ar-container { width: 100vw; height: 100vh; position: relative; overflow: hidden; }
    #overlay-card {
      position: absolute;
      display: none;
      background: #10b981;
      color: white;
      padding: 20px;
      border-radius: 8px;
    }
  </style>
</head>
<body>
  <div id="ar-container">
    <div id="overlay-card">
      <h2>🚀 Locus AR Active</h2>
    </div>
  </div>

  <script type="module">
    import { startTracking } from 'locus-ar';

    const tracker = await startTracking({
      targetSrc: './assets/my-target.png', // Image URL or pre-compiled .taar
      container: document.getElementById('ar-container'),
      overlay: document.getElementById('overlay-card'),
      callbacks: {
        onFound: (data) => console.log('Target found!', data),
        onLost: () => console.log('Target lost'),
        onUpdate: (data) => {
          // data.worldMatrix -> 4x4 matrix
          // data.screenCoords -> 2D points on screen
        }
      }
    });
  </script>
</body>
</html>
```

---

### 3. Three.js 3D WebGL Scene

Render real 3D models and geometry directly over the marker:

```typescript
import * as THREE from 'three';
import { Controller, OfflineCompiler } from 'locus-ar';

// 1. Setup Three.js Scene
const scene = new THREE.Scene();
const camera = new THREE.Camera();
camera.matrixAutoUpdate = false;

const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// 2. Create AR Anchor Group
const anchorGroup = new THREE.Group();
anchorGroup.matrixAutoUpdate = false;
anchorGroup.visible = false;
scene.add(anchorGroup);

// Add a 3D Mesh (e.g. 3D Target Plane)
const planeGeo = new THREE.PlaneGeometry(1024, 1024);
const planeMat = new THREE.MeshBasicMaterial({ color: 0x10b981, transparent: true, opacity: 0.5 });
const plane = new THREE.Mesh(planeGeo, planeMat);
plane.position.set(512, 512, 0); // Center of 1024x1024 marker
anchorGroup.add(plane);

// 3. Initialize Locus AR Controller
const controller = new Controller({
  inputWidth: 1280,
  inputHeight: 720,
  onUpdate: (data) => {
    if (data.type === 'updateMatrix' && data.worldMatrix) {
      anchorGroup.visible = true;
      anchorGroup.matrix.fromArray(data.worldMatrix);
    } else if (data.type === 'updateMatrix' && !data.worldMatrix) {
      anchorGroup.visible = false;
    }
  }
});

// Set camera projection matrix
camera.projectionMatrix.fromArray(controller.getProjectionMatrix());

// 4. Load & Compile Target
const response = await fetch('./assets/target.png');
const blob = await response.blob();
const imgBitmap = await createImageBitmap(blob);

const canvas = document.createElement('canvas');
canvas.width = imgBitmap.width;
canvas.height = imgBitmap.height;
const ctx = canvas.getContext('2d');
ctx.drawImage(imgBitmap, 0, 0);
const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);

const compiler = new OfflineCompiler();
await compiler.compileImageTargets([{
  width: imgData.width,
  height: imgData.height,
  data: new Uint8Array(imgData.data.buffer)
}], () => {});

await controller.addImageTargetsFromBuffer(compiler.exportData());

// 5. Start Processing Video Stream
const video = document.createElement('video');
video.srcObject = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } });
await video.play();
controller.processVideo(video);

// Render loop
function animate() {
  renderer.render(scene, camera);
  requestAnimationFrame(animate);
}
animate();
```

---

## 🖼️ Image Compiler API

Locus AR compiles target images into compact binary `.taar` files with multi-scale feature pyramids.

### Compile programmatically:

```typescript
import { OfflineCompiler } from 'locus-ar';

const compiler = new OfflineCompiler();

// Compile target (accepts ImageData, RGBA buffers, or grayscale)
await compiler.compileImageTargets([
  { width: 1024, height: 1024, data: rgbaUint8Array }
], (progress) => {
  console.log(`Compilation progress: ${progress.toFixed(1)}%`);
});

// Export compressed .taar buffer (~70-100KB)
const taarBuffer = compiler.exportData();
```

---

## 📊 Performance Benchmarks

| Metric | MindAR (TFJS) | **Locus AR** | Advantage |
| :--- | :--- | :--- | :--- |
| **Compilation Time** | ~23.50s | **~0.46s** | 🚀 **~50x Faster** |
| **Output Size (.taar)** | ~770 KB | **~68 KB** | 📉 **91% Smaller** |
| **TFJS Dependency** | ~20 MB | **0 KB (Pure JS)**| 📦 **100% Elimination** |
| **Memory Footprint** | ~180 MB | **~18 MB** | ⚡ **10x Lighter** |
| **Frame Detection** | ~45 ms | **< 10 ms** | 🎯 **Real-Time 60 FPS** |

---

## 🔍 Visual Search & Embeddings

Convert any image into a compact mathematical fingerprint (HDC vector) for instant similarity matching:

```typescript
import { visualSearch } from 'locus-ar';

// Compute 16-byte embedding
const embedding1 = await visualSearch.compute('product-a.jpg');
const embedding2 = await visualSearch.compute('product-b.jpg');

// Instant cosine similarity
const similarity = await visualSearch.compare('product-a.jpg', 'product-b.jpg');
console.log(`Similarity: ${(similarity * 100).toFixed(1)}%`);
```

---

## 📄 License

MIT © [srsergiolazaro](https://github.com/srsergiolazaro) — Free for commercial and open-source use.
