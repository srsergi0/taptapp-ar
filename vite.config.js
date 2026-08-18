import { existsSync } from 'fs';
import { resolve, dirname } from 'path';

export default {
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
