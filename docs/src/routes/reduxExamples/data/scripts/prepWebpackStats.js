/* eslint global-require: "off", import/no-absolute-path: "off" */
/* eslint flowtype/require-valid-file-annotation: "off" */

const stats = require('/Users/steve/Desktop/stats.json');
const fs = require('fs');

// from https://github.com/chrisbateman/webpack-visualizer/blob/master/src/shared/buildHierarchy.js
function getChild(arr, name) { // eslint-disable-line consistent-return
  for (let i = 0; i < arr.length; i++) {
    if (arr[i].name === name) {
      return arr[i];
    }
  }
}

function getFile(module, fileName, parentTree) {
  const charIndex = fileName.indexOf('/');

  if (charIndex !== -1) {
    let folder = fileName.slice(0, charIndex);

    if (folder === '~') {
      folder = 'node_modules';
    }

    let childFolder = getChild(parentTree.children, folder);

    if (!childFolder) {
      childFolder = {
        name: folder,
        children: [],
      };

      parentTree.children.push(childFolder);
    }

    getFile(module, fileName.slice(charIndex + 1), childFolder);
  } else {
    module.name = fileName; // eslint-disable-line no-param-reassign
    parentTree.children.push(module);
  }
}

function buildHierarchy(modules) {
  let maxDepth = 1;

  const root = {
    children: [],
    name: 'root',
  };

  modules.forEach((module) => {
    const extractInIdentifier = module.identifier.indexOf('extract-text-webpack-plugin') !== -1;
    const extractInIssuer = module.issuer && module.issuer.indexOf('extract-text-webpack-plugin') !== -1;

    if (extractInIdentifier || extractInIssuer || module.index === null) {
      return;
    }

    const mod = {
      fullName: module.name,
      size: module.size,
    };

    const depth = mod.fullName.split('/').length - 1;

    if (depth > maxDepth) {
      maxDepth = depth;
    }

    let fileName = mod.fullName;

    const beginning = mod.fullName.slice(0, 2);

    if (beginning === './') {
      fileName = fileName.slice(2);
    }

    getFile(mod, fileName, root);
  });

  root.maxDepth = maxDepth;

  return root;
}

const tree = buildHierarchy(stats.modules);
const data = { byID: {}, allIDs: [] };

let nid = -1;

const stack = [{ node: tree, parentID: null }];

while (stack.length) {
  const next = stack.pop();

  data.allIDs.push(++nid);

  if (next.parentID !== null) {
    data.byID[next.parentID].childIDs.push(nid);
  }

  data.byID[nid] = {
    name: next.node.name || null,
    size: next.node.size || null,
    fullName: next.node.fullName || null,
    childIDs: [],
  };

  if (next.node.children) {
    next.node.children.forEach((node) => { // eslint-disable-line no-loop-func
      stack.unshift({ node, parentID: nid });
    });
  }
}

fs.writeFile('./docs/src/routes/reduxExamples/data/webpack-stats.json', JSON.stringify(data, null, 2), 'utf-8', (err) => {
  if (err) {
    console.log('ERROR: ', err);
  } else {
    console.log('Saved Successfully!');
  }
});
