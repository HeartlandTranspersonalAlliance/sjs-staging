import { readFileSync, readdirSync, existsSync } from 'node:fs';
import { join, relative } from 'node:path';
import assert from 'node:assert/strict';

const root = new URL('../dist/', import.meta.url).pathname;
const base = process.env.SITE_BASE || '/';
const origin = process.env.SITE_ORIGIN || (base === '/' ? 'https://safejourneysanctum.org' : 'https://heartlandtranspersonalalliance.github.io');
const errors = [];
const pages = new Map();
function walk(dir) {
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const file = join(dir, entry.name);
    if (entry.isDirectory()) walk(file);
    else if (file.endsWith('.html')) pages.set('/' + relative(root, file).replace(/index\.html$/, ''), readFileSync(file, 'utf8'));
  }
}
walk(root);
function attrs(tag) {
  // Astro may serialize empty attributes as `alt` rather than `alt=""`.
  return Object.fromEntries([...tag.matchAll(/\s([\w:-]+)(?:="([^"]*)")?/g)].map(m => [m[1], m[2] ?? '']));
}
function checkLink(value, from) {
  if (!value || /^(https?:|mailto:|tel:|data:|\/\/)/.test(value)) return;
  const url = new URL(value.replaceAll('&amp;', '&'), 'https://local.test' + base.replace(/\/$/, '') + from);
  let path = decodeURIComponent(url.pathname);
  if (base !== '/') {
    if (!path.startsWith(base)) { errors.push(`${from}: link escapes site base: ${value}`); return; }
    path = '/' + path.slice(base.length);
  }
  const html = pages.get(path) ?? pages.get(path + '/');
  if (!html && !existsSync(join(root, path))) errors.push(`${from}: missing target ${value}`);
  if (url.hash && html && !html.includes(`id="${decodeURIComponent(url.hash.slice(1))}"`)) errors.push(`${from}: missing anchor ${value}`);
}
for (const [path, html] of pages) {
  // Legacy article routes are intentionally redirect-only.
  if (html.includes('http-equiv="refresh"')) {
    const target = html.match(/<a\b[^>]*href="([^"]+)"/);
    if (!target) errors.push(`${path}: redirect missing fallback link`);
    else checkLink(target[1], path);
    continue;
  }
  if ((html.match(/<h1\b/g) || []).length !== 1) errors.push(`${path}: expected one h1`);
  if (!html.includes('name="description"')) errors.push(`${path}: missing description`);
  const robots = html.match(/<meta\b[^>]*name="robots"[^>]*>/)?.[0];
  const staging = new URL(origin).hostname === 'heartlandtranspersonalalliance.github.io';
  if (staging && (!robots || !attrs(robots).content?.includes('noindex'))) errors.push(`${path}: staging must be noindex`);
  if (!staging && robots && attrs(robots).content?.includes('noindex')) errors.push(`${path}: production must not inherit staging noindex`);
  if (/fonts\.(googleapis|gstatic)\.com|g38MyF11DWDqsCLU7/.test(html)) errors.push(`${path}: obsolete remote font or volunteer URL`);
  if ((html.match(/as="font"/g) || []).length !== 2) errors.push(`${path}: expected two self-hosted font preloads`);
  const canonicalTag = html.match(/<link\b[^>]*rel="canonical"[^>]*>/)?.[0];
  if (!canonicalTag || attrs(canonicalTag).href !== origin + base.replace(/\/$/, '') + path) errors.push(`${path}: wrong canonical URL`);
  if (/assets\/placeholders|four days and nights|By request \/ dates to be announced|temporary donation destination|Not typically offered/.test(html)) errors.push(`${path}: stale copy/assets`);
  for (const match of html.matchAll(/<(?:a|img|script|link)\b[^>]*>/g)) {
    const a = attrs(match[0]);
    if (a.href) checkLink(a.href, path);
    if (a.src) checkLink(a.src, path);
    if (a.srcset) for (const item of a.srcset.split(',')) checkLink(item.trim().split(/\s+/)[0], path);
    if (match[0].startsWith('<img')) {
      if (!('alt' in a)) errors.push(`${path}: image missing alt`);
      if (!a.width || !a.height) errors.push(`${path}: image missing dimensions: ${a.src}`);
    }
  }
}
const home = pages.get('/');
assert(home.includes('nonordinary states'), 'Keep intentionally undefined terminology');
assert(home.includes('/organizers/'), 'Organizer entry point');
assert(home.includes('srcset='), 'Responsive photography');
assert(home.includes('role="group" aria-label="Primary actions"'), 'Primary actions have group semantics');
for (const path of ['/volunteer/', '/faq/', '/news/getter/', '/news/cosmic-kinection-2026/']) {
  assert(pages.get(path).includes('https://forms.gle/iZt6DJF9YRQfXHHx5'), `Current general volunteer application: ${path}`);
}
assert(pages.get('/donate/').includes('Give monthly through HTA'), 'Monthly giving remains');
assert(pages.get('/donate/').includes('https://heartlandta.org'), 'HTA donation destination remains');
assert(pages.get('/events/').includes('Inquiries welcome'), 'Inquiry-only events');
assert(pages.get('/events/').includes('Available by request'), 'Training by request');
for (const option of ['Narcan / opioid overdose response', 'CPR', 'Peer support']) assert(pages.get('/training/').includes(option), `Training option: ${option}`);
assert(pages.get('/why-sjs/').includes('Fentanyl reagent testing'), 'Testing service remains');
if (errors.length) { console.error(errors.join('\n')); process.exit(1); }
console.log(`Validated ${pages.size} pages: links, anchors, image dimensions, responsive assets, headings, metadata, and agreed content.`);
