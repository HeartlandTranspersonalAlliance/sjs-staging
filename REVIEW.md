# SJS website review

Reviewed November 24, 2026. The redesign source is `sjs-staging`. At launch, its validated Astro source replaces the Minimal Mistakes source in `sjs-org`, which keeps `safejourneysanctum.org`.

## Changes in this update

- Volunteering leads the homepage and the persistent desktop/tablet navigation. On small phones, the first homepage button and menu provide the same path. Organizers retain a direct homepage action; donations remain in the menu and footer.
- The team portrait replaces the dark outreach photo on the homepage. It keeps its full portrait proportions, so faces are not cropped to fit a landscape frame. The Cosmic recap adds daytime and nighttime sanctuary photos with responsive WebP sizes, lazy loading, captions and descriptive alt text.
- Humanizer reviewed all 17 content pages (14 page routes and three articles), plus shared navigation and copy. Most current page copy was already direct. Edits address the three articles, five dense FAQ answers, and the homepage. No content page was omitted. Original dates, names, links, attendance, service boundaries and training claims remain. Getter’s future-event sentence is explicitly historical.
- Contact has a visible email address next to its inquiry options.
- npm and SHA-pinned Actions now have weekly Dependabot checks. npm minor/patch version updates are grouped, security updates have a separate group, and major npm releases stay separate. Actions are grouped. No blanket major-version ignore or automatic merge is configured.
- Astro moves from 5 to 7.4.13 and the checker to 0.9.12. Tailwind 3 remains through the existing PostCSS pipeline; the obsolete Astro Tailwind integration is removed. Node 24 is declared for local/CI consistency. Compatible transitive updates accompany the upgrade.
- The initial locked install reported 27 dependency vulnerabilities (two critical). The updated install/audit reports zero. Counts describe the installed dependency graph, not proof that the public static site was exploitable. GitHub Pages serves generated files, while build tools still process repository content and images.
- The production sitemap lists canonical content pages and excludes legacy redirects. Production robots.txt advertises it; staging continues to expose page-level noindex and does not advertise a sitemap.
- CI tests both root and `/sjs-staging/` URLs. In `sjs-org`, the production artifact is built and tested last; elsewhere staging is last. This prepares the source for migration without changing the current domain or production repository.

## Dependabot and repository settings

There was no `.github/dependabot.yml` in the inspected local checkout or remote main. The config added here monitors npm at `/` and GitHub Actions at `/`, Monday at 09:00 America/Chicago. Version-PR limits are five for npm and three for Actions; GitHub separately limits security PRs.

After merging the configuration into the default branch, check GitHub’s dependency graph, Dependabot alerts and security-update settings. A YAML schedule alone does not establish that those repository settings are enabled. Check that the update jobs run and that generated PRs reach `Website release gate`. Keep that required check when replacing the production source. Review grouped security PRs promptly. Do not auto-merge major framework changes.

Sources: [Dependabot options](https://docs.github.com/en/code-security/reference/supply-chain-security/dependabot-options-reference), [Astro 6 migration](https://docs.astro.build/en/guides/upgrade-to/v6/), [Astro 7 migration](https://docs.astro.build/en/guides/upgrade-to/v7/).

## Photo review

The owner approved public use of the Cosmic Kinection and Nocturnal Valley photos, including identifiable people and required credits, during this review. Keep a record of that approval with the media sources.

The shared Cosmic Kinection Google Photos album was inspected. The strongest website choices are already in the repository: team portrait for recruiting, outreach/handshake for showing interaction, daylight interior for explaining the space, and the lit tent/interior for event recaps. Existing raw Cosmic files did not contain GPS EXIF tags in the check performed here.

The new selection uses existing repository files, so the website does not depend on Google Photos sharing links. The album also has broader festival scenes and resting attendees. Those add less to the volunteer journey; keep the public gallery focused on the team and the space. Album contributor names do not by themselves establish photographer credit.

Drive search found `Cosmic Kinection 2026` and its `CK 2026 Media` subfolder, but returned no accessible files inside the media folder. No Nocturnal Valley photos were returned by the event-name image search or the event operations folder listing. No guest logs or volunteer response sheets were read. The owner confirmed that no Nocturnal Valley album link is available, so this update uses the approved Cosmic Kinection images.

For a later addition, choose a Nocturnal exterior with legible SJS signage and one approved team/setup image. A short recap should give confirmed dates, location, actual coverage and what volunteers learned. Do not infer coverage or attendance from album dates. Keep the Cosmic service dates at June 4 through the morning of June 7 even though the album includes June 8 uploads.

## Remaining opportunities

| Priority | Work | Reason |
| --- | --- | --- |
| Completed | Published age 21+, typical six-to-eight-hour shifts, a two-hour structured training course and HTA application review committee follow-up | Gives applicants the confirmed commitment and follow-up owner |
| Before launch | Confirm donation steps on HTA and check a real receipt with the donation owner | Current links intentionally go to HTA’s homepage, which adds a step |
| Before launch | Review resource, testing and escalation copy with the service lead | Editorial review does not validate operational or clinical protocols |
| Before launch | Inventory published legacy URLs, feeds, downloads and campaign links | Two existing article aliases are covered; the full legacy surface needs a deliberate decision |
| Before launch | Add a useful custom 404 page and decide how to preserve the existing RSS feed | These are still missing from the redesign |
| Before launch | Recheck current event dates, inbox delivery, photo credits and training availability | Avoids stale launch content or broken follow-up |
| Later | Consolidate overlapping About/Model/Why SJS and Impact/News pages if usage supports it | Fewer destinations may be easier to maintain; current routes remain available |
| Later | Add a short Nocturnal Valley recap and selected photos | Brings the field notes beyond June without inventing impact numbers |
| Later | Add a direct HTA donation URL and confirmed public social accounts | Removes extra steps once the destinations are approved |
| Later | Consider Tailwind 4 separately | It is not needed to validate this design; it changes the CSS toolchain |

## Validation record

The final source passed `SITE_DEPLOYMENT=production npm run test:ci`: 40 Chromium checks at the staging subpath and 40 at the production root, including automated accessibility checks on all 17 content pages. Both builds passed type checking with zero errors, warnings or hints, and both validated 20 HTML outputs (17 content pages and three article redirects), links, anchors, metadata, images and sitemap coverage. The npm audit after the dependency update reported zero vulnerabilities, compared with 27 in the starting lockfile (two critical, 17 high, six moderate and two low). These are advisory-database results for the checked dependency snapshot.

The upgrade uses Astro 7.4.13, updates its type checker and Node types, and removes the incompatible `@astrojs/tailwind` integration. Tailwind 3 continues through the existing PostCSS configuration. Node 24 matches CI. No production server adapter or dynamic runtime was added.

The current HTA volunteer form was opened and its SJS description checked without submitting data. No production deploy, DNS change, application, email or donation was made during validation. Follow `LAUNCH.md` for the migration. Keep the exact tested commit as the release candidate; a later content or dependency change requires relevant checks again.
