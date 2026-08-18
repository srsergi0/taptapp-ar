import { existsSync } from 'fs';
import { resolve, dirname } from 'path';

export default {
    resolve: {
        alias: {
            'locus-ar/client': resolve(__dirname, 'src/client/index.ts'),
            'locus-ar/compiler': resolve(__dirname, 'src/compiler/offline-compiler.ts'),
            'locus-ar': resolve(__dirname, 'src/index.ts'),
        }
    },
    plugins: [
        {
            name: 'resolve-ts-imports',
            enforce: 'pre',
            resolveId(source, importer) {
                if (source.endsWith('.js') && importer) {
                    const dir = dirname(importer);
                    const tsPath = resolve(dir, source.replace(/\.js$/, '.ts'));
                    if (existsSync(tsPath)) {
                        return tsPath;
                    }
                    const tsxPath = resolve(dir, source.replace(/\.js$/, '.tsx'));
                    if (existsSync(tsxPath)) {
                        return tsxPath;
                    }
                }
                return null;
            }
        }
    ],
    server: {
        allowedHosts: true,
        fs: {
            allow: ['.']
        }
    }
};
