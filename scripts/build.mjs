import { execSync } from 'child_process';
import esbuild from 'esbuild';
import { readdirSync, statSync, unlinkSync, readFileSync, writeFileSync, rmSync, existsSync } from 'fs';
import { join, extname, resolve } from 'path';

const DIST_DIR = './dist';

async function build() {
    console.log('🏗️  Starting Locus AR Ultra-Optimized Build...');

    // 0. Clean previous dist
    if (existsSync(DIST_DIR)) {
        rmSync(DIST_DIR, { recursive: true, force: true });
    }

    // 0.5 Bundle worker into standalone inline Blob code
    console.log('⚡ Bundling standalone worker blob...');
    const workerBuild = await esbuild.build({
        entryPoints: ['src/runtime/controller.worker.js'],
        bundle: true,
        minify: true,
        format: 'iife',
        write: false,
    });
    const workerCode = workerBuild.outputFiles[0].text;
    writeFileSync('src/runtime/worker-blob.ts', `export const WORKER_CODE = ${JSON.stringify(workerCode)};\n`);

    // 1. Run TSC to generate type definitions
    console.log('📊 Generating type definitions (tsc)...');
    execSync('bunx tsc', { stdio: 'inherit' });

    // 2. Define external dependencies
    const externals = [
        '@msgpack/msgpack', 'ml-matrix', 'tinyqueue', 'react', 'react-dom', 'three', 'aframe'
    ];

    // 3. Bundle with code splitting
    console.log('🚀 Bundling with code splitting (esbuild)...');
    await esbuild.build({
        entryPoints: ['src/index.ts', 'src/client/index.ts', 'src/compiler/offline-compiler.ts'],
        bundle: true,
        minify: true,
        splitting: true,
        format: 'esm',
        platform: 'browser',
        external: externals,
        outdir: DIST_DIR,
        allowOverwrite: true,
    });

    // 4. Aggressive Resource Cleanup
    console.log('🧹 Cleaning up redundant resources...');

    function getFiles(dir) {
        let results = [];
        const list = readdirSync(dir);
        for (const file of list) {
            const fullPath = resolve(dir, file);
            if (statSync(fullPath).isDirectory()) {
                results = results.concat(getFiles(fullPath));
            } else {
                results.push(fullPath);
            }
        }
        return results;
    }

    const allFiles = getFiles(DIST_DIR);
    let minifiedDts = 0;

    for (const file of allFiles) {
        const ext = extname(file);

        if (ext === '.d.ts') {
            // Minify .d.ts files by removing comments to save space
            const content = readFileSync(file, 'utf8');
            const minified = content
                .replace(/\/\*[\s\S]*?\*\/|([^:]|^)\/\/.*/g, '$1') // Remove comments but keep URL schemes
                .split('\n')
                .map(line => line.trim())
                .filter(line => line.length > 0)
                .join('\n');
            writeFileSync(file, minified);
            minifiedDts++;
        } else if (ext === '.map') {
            unlinkSync(file);
        }
    }

    console.log(`   ✨ Minified ${minifiedDts} type definition files.`);

    let finalSize;
    try {
        const { execSync: _exec } = await import('child_process');
        let totalBytes = 0;
        const _getFiles = (dir) => {
            const list = readdirSync(dir);
            for (const file of list) {
                const fullPath = resolve(dir, file);
                if (statSync(fullPath).isDirectory()) {
                    _getFiles(fullPath);
                } else {
                    totalBytes += statSync(fullPath).size;
                }
            }
        };
        _getFiles(DIST_DIR);
        const kb = (totalBytes / 1024).toFixed(1);
        finalSize = `${kb} KB`;
    } catch {
        finalSize = '(size unavailable)';
    }
    console.log(`\n✅ Build complete! Final size: ${finalSize}`);
}

build().catch(err => {
    console.error('❌ Build failed:', err);
    process.exit(1);
});
