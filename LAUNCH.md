# SJS launch checks

The confirmed destination is https://heartlandtranspersonalalliance.github.io/sjs-staging/. The workflow deploys staging on pushes to `main` and also supports manual dispatch. The Pages environment allows `main` only. It does not change `safejourneysanctum.org`.

## Validate and preview

- Custom-domain build: `npm run build && npm run validate`
- GitHub Pages staging build: `npm run build:staging`
- Root-path local preview: `npm run preview -- --host 127.0.0.1 --port 8082`
- Staging-path local preview after a staging build: `npm run preview -- --host 127.0.0.1 --port 8082 --base /sjs-staging/`

The staging command checks `/sjs-staging/` links and canonical URLs and removes only the generated `dist/CNAME`. It never changes the tracked `public/CNAME` or live domain settings. Rebuild for the intended destination before deployment; both commands use `dist`.

## Publish

1. Run `npm run build:staging` and confirm all checks pass.
2. After verifying the release is a fast-forward from remote `main`, push via SSH: `git push git@github.com:HeartlandTranspersonalAlliance/sjs-staging.git HEAD:main`. Never force-push.
3. The push starts the staging workflow. The workflow uses `npm run build:staging`, including its subpath validation and generated CNAME removal.
4. Keep the `github-pages` environment's `main` branch protection intact. Do not change custom-domain or DNS settings as part of this staging release.
5. Wait for the deployment to succeed. Check the published homepage, organizer page, donation destination, volunteer form, training options, resource anchors, photos, and legacy article redirects at the actual public URL.

## Content constraints

- Keep “nonordinary states” intentionally undefined.
- Fentanyl reagent testing is an active additional service.
- HTA's homepage is the intended donation destination; monthly giving is available.
- Training is available by request for groups, organizations, and communities: Narcan/opioid overdose response, CPR, and peer support. Do not claim certification.
- Integration circles accept inquiries; do not promise availability.
- Cosmic Kinection coverage was 24/7 from June 4 through the morning of June 7, 2026, in Astral Valley.
