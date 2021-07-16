/* eslint-disable consistent-return */
/* eslint-disable import/no-dynamic-require */
/* eslint-disable global-require */
/* eslint-disable array-callback-return */
const fs = require('fs');
const path = require('path');

const packages = fs.readdirSync(path.join(__dirname, '../packages'));
const packageList = packages.map(x => {
  const packageFile = path.join(__dirname, '../packages', x, 'package.json');
  if (fs.existsSync(packageFile)) {
    const packageJson = require(packageFile);
    return `- [${packageJson.name} v${packageJson.version}](./packages/${x})`;
  }
});

const readmeFile = path.join(__dirname, '../README.md');
const readmeContent = `![ESLint Library](https://www.arcblock.io/.netlify/functions/badge/?text=ESLint%20Library)

## Introduction

[![lerna](https://img.shields.io/badge/maintained%20with-lerna-cc00ff.svg)](https://lernajs.io/)

> Collection of ESLint config that can be used by arcblock products

## Packages

${packageList.join('\n')}

`;

fs.writeFileSync(readmeFile, readmeContent);
// eslint-disable-next-line no-console
console.log('README.md updated');
