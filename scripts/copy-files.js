// @flow weak
/* eslint-disable no-console */

import path from 'path';
import fse from 'fs-extra';

function copyFile(file) {
  const buildPath = path.resolve(__dirname, '../build/', path.basename(file));
  return new Promise((resolve) => {
    fse.copy(
      file,
      buildPath,
      (err) => {
        if (err) throw err;
        resolve();
      },
    );
  }).then(() => console.log(`Copied ${file} to ${buildPath}`));
}

function copyTypes(src, dst) {
  const buildPath = path.resolve(__dirname, '../build/', dst);
  return new Promise((resolve) => {
    fse.copy(
      src,
      buildPath,
      (err) => {
        if (err) throw err;
        resolve();
      },
    );
  }).then(() => console.log(`Copied ${src} to ${buildPath}`));
}

function createPackageFile() {
  return new Promise((resolve) => {
    fse.readFile(path.resolve(__dirname, '../package.json'), 'utf8', (err, data) => {
      if (err) {
        throw err;
      }

      resolve(data);
    });
  }).then((data) => JSON.parse(data))
    .then((packageData) => {
      const {
        version,
        description,
        contributors,
        keywords,
        repository,
        license,
        bugs,
        homepage,
        peerDependencies,
        dependencies,
      } = packageData;

      const minimalPackage = {
        name: 'react-move',
        version,
        description,
        contributors,
        main: './index.js',
        module: './index.es.js',
        'jsnext:main': './index.es.js',
        types: './index.d.ts',
        keywords,
        repository,
        license,
        bugs,
        homepage,
        peerDependencies,
        dependencies,
      };

      return new Promise((resolve) => {
        const buildPath = path.resolve(__dirname, '../build/package.json');
        const data = JSON.stringify(minimalPackage, null, 2);
        fse.writeFile(buildPath, data, (err) => {
          if (err) throw (err);
          console.log(`Created package.json in ${buildPath}`);
          resolve();
        });
      });
    });
}

const files = [
  'README.md',
  'LICENSE',
];

const types = [
  ['src/index.d.ts', 'index.d.ts'],
  ['src/core/index.d.ts', 'core/index.d.ts'],
  ['src/Animate/index.d.ts', 'Animate/index.d.ts'],
  ['src/NodeGroup/index.d.ts', 'NodeGroup/index.d.ts'],
];

Promise
  .all(files.map((file) => copyFile(file)))
  .then(() => Promise.all(types.map((file) => copyTypes(...file))))
  .then(() => createPackageFile());

