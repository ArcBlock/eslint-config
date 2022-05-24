// 用于发布 github release

import { execSync } from 'child_process';
import fs from 'fs-extra';
import { $ } from 'zx';

execSync('pnpx bumpp package.json packages/*/package.json', { stdio: 'inherit' });

const { version } = await fs.readJSON('package.json');
// await $`git add .`;
// await $`git commit -m "chore: release v${version}"`;
// await $`git tag v${version}`;
// await $`git push`;
// await $`git push origin --tags`;
await $`blocklet version ${version}`;
await $`git add CHANGELOG.md blocklet.yml`;
