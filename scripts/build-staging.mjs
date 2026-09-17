import { spawnSync } from 'node:child_process';
import { unlinkSync, existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

const cwd = fileURLToPath(new URL('../', import.meta.url));
const base = '/sjs-staging/';
const origin = 'https://heartlandtranspersonalalliance.github.io';
const build = spawnSync('npm', ['run', 'build', '--', '--base', base, '--site', origin], { cwd, stdio: 'inherit' });
if (build.status !== 0) process.exit(build.status ?? 1);
// Only remove the generated artifact; preserve the tracked custom-domain config.
const cname = new URL('../dist/CNAME', import.meta.url);
if (existsSync(cname)) unlinkSync(cname);
const validation = spawnSync(process.execPath, ['scripts/validate-site.mjs'], {
  cwd, stdio: 'inherit', env: { ...process.env, SITE_BASE: base, SITE_ORIGIN: origin }
});
process.exit(validation.status ?? 1);
