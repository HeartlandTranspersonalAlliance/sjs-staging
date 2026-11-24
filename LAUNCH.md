# SJS validation and launch

`sjs-staging` is the redesign and preview repository. Its public preview is https://heartlandtranspersonalalliance.github.io/sjs-staging/. When ready, copy the finalized, validated Astro source into `HeartlandTranspersonalAlliance/sjs-org` to replace Minimal Mistakes. `sjs-org` keeps `safejourneysanctum.org` and its domain configuration. Do not point the domain at staging.

## Validate the release candidate

Use Node 24 (at least 24.13.0), matching CI.

```sh
npm ci
npm audit
npm run test:ci
```

The default sequence tests the production root build, then the staging subpath build. The final `dist` is the tested staging artifact. To rehearse the production release, run:

```sh
SITE_DEPLOYMENT=production npm run test:ci
```

This tests staging first and production last, leaving the tested root-path artifact in `dist`. Both sequences run type checking, link/anchor/image/metadata/sitemap validation, Chromium accessibility checks on every content page, keyboard navigation, the volunteer journey, JavaScript-disabled navigation, 320px/900px/1200px/1201px widths and a 1280×320 viewport. The web server uses `--ignore-lock` to remain in the foreground under Astro 7.

Individual commands:

- `npm run build && npm run validate`: custom-domain build.
- `npm run build:staging`: `/sjs-staging/` build, including validation and generated CNAME removal.
- `npm run preview -- --ignore-lock --host 127.0.0.1 --port 8082`: root-path preview after a production build.
- `npm run preview -- --ignore-lock --host 127.0.0.1 --port 8082 --base /sjs-staging/`: subpath preview after a staging build.

Staging pages have `noindex, follow`. Production pages must not inherit it. The staging build removes only `dist/CNAME`; it leaves `public/CNAME` and domain settings intact. Production robots.txt advertises the root sitemap. Staging does not advertise a sitemap, and allows crawlers to read its page-level noindex directives.

## Finish before launch

- [ ] Review the homepage, volunteer flow, organizer information and gallery with the SJS owner.
- [ ] Confirm minimum volunteer age, typical shifts, training commitment and application follow-up owner. Publish confirmed details on `/volunteer/`.
- [ ] Verify a real application reaches the intended HTA workflow and receives the expected follow-up. The review only opened the form; it submitted no application.
- [ ] Confirm `info@safejourneysanctum.org` receives general and partnership inquiries. Agree who monitors it; do not promise a response time until confirmed.
- [ ] Check donation and monthly-giving instructions with HTA. The agreed destination remains HTA’s homepage. Confirm how donors designate SJS and receive receipts.
- [ ] Have the service lead review testing, consent, privacy, emergency-escalation and resource information. Confirm external resource destinations and current availability.
- [ ] Confirm upcoming dates or keep the explicit “No upcoming dates are confirmed” notice.
- [ ] Record photo permission and photographer credit details. Approved Cosmic images are included. Select Nocturnal photos only after reviewing an accessible album and confirmed recap facts.
- [ ] Inventory published URLs using the old site, its sitemap/feed and any campaign/download links. Keep `/about/`, `/model/`, `/faq/`, `/volunteer/`, `/news/`, `/contact/` and `/events/`. The current `/getter/` and `/welcome-to-safe-journey-sanctum/` aliases already redirect to the corresponding news pages. Decide what to do with the old feed and any other published routes or assets. A future-dated 2050 post exists in the old source; determine whether it was ever public before adding a redirect.
- [ ] Add and validate a useful custom 404 page; decide whether to preserve `/feed.xml` as RSS or retire it deliberately.
- [ ] Check public preview on an actual phone and keyboard, including reduced motion, menu scrolling, menu focus/Escape behavior, direct URLs, internal navigation and photo crops. Review the Chromium accessibility evidence; include a Safari/Firefox spot check before launch.
- [ ] Merge the dependency configuration and confirm npm/Actions update jobs run on default main. Verify Dependabot alerts/security updates in repository settings. Keep `Website release gate` required; do not infer settings from the YAML file alone.
- [ ] Run the complete validation sequence on the final commit. Record its SHA, audit result, CI URL and the owner’s release decision.

## Update the staging preview

Open a PR to `sjs-staging/main`. Let `Website release gate` pass. After merging, the Pages workflow deploys the validated staging artifact. Check the actual public homepage, volunteer application destination, organizer page, contact actions, donation destination, resources, gallery and legacy article aliases. Preserve the `github-pages` environment’s main-only protection.

The workflow selects `SITE_DEPLOYMENT=production` only when its repository is named `sjs-org`; it selects staging in `sjs-staging`. This prevents a source copy from accidentally deploying `/sjs-staging/` URLs at the production root.

## Replace Minimal Mistakes in sjs-org

1. Record the current `sjs-org/main` SHA, Pages source/custom-domain/HTTPS settings, required checks, environment rules and current DNS. Preserve the old source and last working artifact or commit as the rollback release. Check for changes made after the review.
2. In an isolated branch of `sjs-org`, replace the Jekyll source with the tested Astro source from the approved `sjs-staging` commit. Include `src`, `public`, config, npm manifest/lockfile, validation scripts, browser tests, Dependabot config and the Actions workflow. Preserve repository history and the existing domain settings. Remove obsolete Jekyll layouts, Gemfiles and conflicting Jekyll workflows as part of the reviewed migration diff. Do not copy `.git`, `.jj`, secrets, caches or `node_modules`.
3. Open a migration PR against `sjs-org/main` and inspect the entire replacement diff. Run `SITE_DEPLOYMENT=production npm run test:ci` there. The final artifact must use root URLs, `https://safejourneysanctum.org` canonicals, production robots/sitemap and no staging noindex. Verify redirects and external destinations. Require `Website release gate` in production branch protection.
4. At the release window, merge the approved migration PR and configure `sjs-org` Pages to use GitHub Actions if it currently publishes from a branch. Ensure the `github-pages` environment permits main and keeps its protections. The deployment job uploads and deploys the tested root artifact. Do not enable the old Jekyll build alongside it.
5. Keep the Pages custom domain set to `safejourneysanctum.org`. With a custom Actions workflow, GitHub Pages uses its repository setting; the CNAME file is not what binds the domain. Because hosting stays in `sjs-org`, DNS should usually remain unchanged. Verify existing records before changing anything; preserve MX/TXT records for email and domain verification. Confirm HTTPS and the desired www-to-apex behavior.
6. Wait for the successful production deployment. Check the actual domain’s home, volunteer, organizer, contact, donation, resources, gallery, old article URLs, 404, sitemap and feed decision. Check page source for correct canonicals, image URLs and absence of noindex. Confirm HTTPS and no mixed content.
7. Submit the production sitemap to Search Console if the organization uses it. Watch application/inbox delivery and broken URLs after release. Keep staging on its preview URL with noindex for future work.

GitHub guidance: [custom-domain management](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/managing-a-custom-domain-for-your-github-pages-site), [publishing with a custom Actions workflow](https://docs.github.com/en/pages/getting-started-with-github-pages/using-custom-workflows-with-github-pages).

## Rollback

Before release, rehearse how to restore the previous `sjs-org` release and its publishing source. If the Astro release fails, redeploy the last verified artifact, or revert the migration commit and restore the recorded Jekyll Pages publishing configuration. A source revert alone is insufficient if the publishing mechanism changed. Keep the domain and email DNS in place. Verify the restored public homepage and volunteer/contact routes before closing the incident.

## Content constraints

- Keep “nonordinary states” intentionally undefined.
- Fentanyl reagent testing is an active additional service.
- HTA’s homepage is the intended donation destination; monthly giving is available.
- Training is available by request for groups, organizations and communities: Narcan/opioid overdose response, CPR and peer support. Do not claim certification.
- Integration circles accept inquiries; do not promise availability.
- Cosmic Kinection coverage was 24/7 from June 4 through the morning of June 7, 2026, in Astral Valley. Album upload dates do not extend those service hours.
