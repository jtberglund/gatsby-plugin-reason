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
    const moduleDir = 'js';
    const compiledFilePath = jsFilePath(process.cwd(), moduleDir, filename, false, '.js');
    return isReasonFile(filename) ? compileFileSync(moduleDir, compiledFilePath) : null;
};

export const resolvableExtensions = () => ['.ml', '.re'];
