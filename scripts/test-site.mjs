import { spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const cwd = fileURLToPath(new URL('../', import.meta.url));
const target = process.env.SITE_DEPLOYMENT || 'staging';
if (!['production', 'staging'].includes(target)) throw new Error(`Unknown deployment target: ${target}`);
// The final dist directory is the destination's tested artifact.
const order = target === 'production' ? ['staging', 'production'] : ['production', 'staging'];
function run(script, env) {
  const result = spawnSync('npm', ['run', script], { cwd, stdio: 'inherit', env });
  if (result.status !== 0) process.exit(result.status ?? 1);
}
for (const destination of order) {
  const env = { ...process.env, SITE_BASE: '/', SITE_ORIGIN: 'https://safejourneysanctum.org' };
  if (destination === 'staging') {
    run('build:staging', env);
    env.SITE_BASE = '/sjs-staging/';
    env.SITE_ORIGIN = 'https://heartlandtranspersonalalliance.github.io';
  } else {
    run('build', env);
    run('validate', env);
  }
  run('test:browser', env);
}
