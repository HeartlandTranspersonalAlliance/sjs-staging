# SJS launch checks

The existing deployment workflow is manual and currently builds for the custom domain. Do not dispatch it to the staging URL without selecting the matching build command below. Publishing a branch alone does not deploy the site.

## Validate and preview

- Custom-domain build: `npm run build && npm run validate`
- GitHub Pages staging build: `npm run build:staging`
- Root-path local preview: `npm run preview -- --host 127.0.0.1 --port 8082`
- Staging-path local preview after a staging build: `npm run preview -- --host 127.0.0.1 --port 8082 --base /sjs-staging/`

The staging command checks `/sjs-staging/` links and canonical URLs and removes only the generated `dist/CNAME`. It never changes the tracked `public/CNAME` or live domain settings. Rebuild for the intended destination before deployment; both commands use `dist`.

## Publish

1. Confirm whether the destination is the staging GitHub Pages URL or `safejourneysanctum.org`. Those currently host different sites.
2. Push via SSH: `git push git@github.com:HeartlandTranspersonalAlliance/sjs-staging.git HEAD:launch-root-domain-pages`.
3. Configure the workflow build step for the confirmed destination: `npm run build:staging` for staging, or the existing `npm run build` plus `npm run validate` for the custom domain. For staging, remove the separate root-mode validation step; the staging command already validates with the correct base.
4. Verify the repository's Pages settings match the intended destination, then manually run the workflow on the release branch. A custom-domain migration needs the correct Pages/DNS settings; this build does not change those settings.
5. Wait for the deployment to succeed. Check the published homepage, organizer page, donation destination, volunteer form, training options, resource anchors, photos, and legacy article redirects at the actual public URL.

## Content constraints

- Keep “nonordinary states” intentionally undefined.
- Fentanyl reagent testing is an active additional service.
- HTA's homepage is the intended donation destination; monthly giving is available.
- Training is available by request for groups, organizations, and communities: Narcan/opioid overdose response, CPR, and peer support. Do not claim certification.
- Integration circles accept inquiries; do not promise availability.
- Cosmic Kinection coverage was 24/7 from June 4 through the morning of June 7, 2026, in Astral Valley.
