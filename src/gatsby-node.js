import { compileFileSync, runBuildSync } from 'bsb-js';

import path from 'path';

const REASON_TEST = /\.(ml|re)$/;

const isReasonFile = fileName => REASON_TEST.test(fileName);

export const modifyWebpackConfig = ({ config }) =>
    config.loader('reason', {
        test: REASON_TEST,
        loader: 'bs-loader'
    });

const jsFilePath = (buildDir, moduleDir, resourcePath, inSource, bsSuffix) => {
    const mlFileName = resourcePath.replace(buildDir, '');
    const jsFileName = mlFileName.replace(REASON_TEST, bsSuffix);

    if (inSource) {
        return path.join(buildDir, jsFileName);
    }

    return path.join(buildDir, 'lib', moduleDir, jsFileName);
};

export const preprocessSource = ({ filename }) => {
    if (!isReasonFile(filename)) {
        return null;
    }
    const moduleDir = 'js';
    const compiledFilePath = jsFilePath(process.cwd(), moduleDir, filename, false, '.bs.js');
    try {
        return compileFileSync(moduleDir, compiledFilePath);
    } catch (e) {
        // Don't need to print error message since bsb will already do that
    }
};

export const resolvableExtensions = () => ['.ml', '.re'];
