import { describe, it, expect } from 'vitest';
import { existsSync, readFileSync } from 'fs';
import { resolve } from 'path';

describe('Production Bundle & Exports Verification', () => {
    const distPath = resolve('./dist');

    it('should contain all required entry files in dist/', () => {
        expect(existsSync(resolve(distPath, 'index.js'))).toBe(true);
        expect(existsSync(resolve(distPath, 'index.d.ts'))).toBe(true);
        expect(existsSync(resolve(distPath, 'client/index.js'))).toBe(true);
        expect(existsSync(resolve(distPath, 'client/index.d.ts'))).toBe(true);
        expect(existsSync(resolve(distPath, 'compiler/offline-compiler.js'))).toBe(true);
        expect(existsSync(resolve(distPath, 'compiler/offline-compiler.d.ts'))).toBe(true);
    });

    it('should contain the dynamic matcher and estimator chunks without unresolved imports', () => {
        const indexContent = readFileSync(resolve(distPath, 'index.js'), 'utf8');
        expect(indexContent.length).toBeGreaterThan(1000);

        // Check package.json exports mapping
        const pkg = JSON.parse(readFileSync('./package.json', 'utf8'));
        expect(pkg.exports).toBeDefined();
        expect(pkg.exports['.']).toBeDefined();
        expect(pkg.exports['./client']).toBeDefined();
        expect(pkg.exports['./compiler']).toBeDefined();
    });

    it('should import successfully from built dist without hanging or throwing', async () => {
        const { Controller, BioInspiredController, OfflineCompiler } = await import('../dist/index.js');
        expect(Controller).toBeDefined();
        expect(BioInspiredController).toBeDefined();
        expect(OfflineCompiler).toBeDefined();

        const { Locus, useLocus } = await import('../dist/client/index.js');
        expect(Locus).toBeDefined();
        expect(useLocus).toBeDefined();
    });
});
