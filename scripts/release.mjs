import { $, fs } from 'zx';
const { version } = await fs.readJSON('package.json');

await $`git add .`;
await $`git commit -m "chore: release v${version}"`;
await $`git tag v${version}`;
await $`git push`;
await $`git push origin --tags`;
