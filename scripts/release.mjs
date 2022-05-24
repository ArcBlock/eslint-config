// 用于发布 github release

import { $, fs, path } from 'zx';
import { execSync } from 'child_process';

execSync(`zx ${path.join(__dirname, 'bump-version.mjs')} --quiet`, { stdio: 'inherit' });

const { version } = await fs.readJSON('package.json');

await $`git add .`;
// await $`git commit -m "chore: release v${version}"`;
// await $`git tag v${version}`;
// await $`git push`;
// await $`git push origin --tags`;
// await $`blocklet version ${version}`;
// await $`git add CHANGELOG.md blocklet.yml`;
