import { compileFileSync, runBuildSync } from 'bsb-js';

import fs from 'fs';
import { getPathForComponent } from './utils';
import path from 'path';

const BS_TEST = /\.(bs.js)$/;
const REASON_TEST = /\.(ml|re)$/;

const isCompiledFile = fileName => BS_TEST.test(fileName);
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

export const onCreatePage = ({ page, boundActionCreators: { createPage, deletePage } }, { derivePathFromComponentName }) => {
    return new Promise((resolve, reject) => {
        const oldPage = Object.assign({}, page);
        const { component, path } = page;

        if (isCompiledFile(component)) {
            // Remove .bs components so we don't have duplicates
            deletePage(oldPage);
        } else if (derivePathFromComponentName && isReasonFile(component) && !path.endsWith('.html')) {
            // Try to grab the name of the component from the ReasonReact
            // component instead of using the file name
            const source = fs.readFileSync(component, 'utf-8');
            const newPath = getPathForComponent(source);
            if (newPath !== undefined) {
                const newPage = Object.assign({}, page, { path: newPath });
                deletePage(oldPage);
                createPage(newPage);
            }
        }

        resolve();
    });
};
