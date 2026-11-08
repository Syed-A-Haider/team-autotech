# Search Console and Google listing

Owner checklist from T6.3. Do it once the sitemap is live. Tick as you go.

**Status: steps 1 to 4 completed by Haider (reported 2026-11-08).** Nothing else is outstanding. Step 3 is a monthly habit, so keep doing it. Which branch of each step applied (an existing property or a new TXT record, an existing Business Profile link or a new one) was not recorded.

## Why this exists

- The old WordPress site crashed, so teamautotech.co.uk went live on this site early. It is the same domain as the old site, only the DNS now points here. Google already knows the domain, so this is lower risk than launching a new one: the domain keeps its history, its Search Console property probably exists and there is no new-domain delay
- It is not risk-free. Google still holds the old WordPress URLs (T6.2 redirects the known ones) and probably the old WordPress sitemap, and it has no list of the new pages, so it learns them slowly by following links
- `/sitemap.xml` lists the pages worth indexing (home, About and every live service) and `/robots.txt` points Google to it. New pages find their way into Google faster, which matters for local search ("car remapping near me")
- Every later content batch (T6.7 to T6.12) joins the sitemap on its own when its status becomes `live`. Nothing to resubmit
- Coming-soon pages are left out on purpose. They are `noindex`, and listing a noindex page sends Google a conflicting signal
- Search Console is how we see what Google actually did: which pages it indexed, and which old WordPress URLs still 404 (these feed `src/lib/redirects.ts`)

## 1. Prove we own the domain (Haider, then Syd, then Haider)

The old site may already have a Search Console property, so check before adding one. We cannot see this from the repo, so it is unverified.

- [x] **Haider:** ask Syd (or whoever built the old site) whether a Search Console property for teamautotech.co.uk exists. If it does, ask for Owner access and skip to the last tick of this step. The old DNS TXT record may still be there, because only the website records were repointed
- [x] **Haider:** only if no property exists. search.google.com/search-console > Add property > **Domain** > `teamautotech.co.uk`. Copy the TXT record
- [x] **Haider:** send the TXT record to Syd (he does not read the repo)
- [x] **Syd:** at the domain registrar, open DNS and add a **TXT** record. Host: `@`. Value: the text from Haider. Do not edit or delete any other record (email depends on them)
- [x] **Haider:** click **Verify**. If it fails, wait a few hours and retry (DNS can take up to a day)
- [x] **Haider:** Settings > Users > add Syd's business Google account as **Owner**, so access survives either of you leaving

## 2. Submit the sitemap (Haider)

- [x] Open https://teamautotech.co.uk/sitemap.xml and check it loads
- [x] Sitemaps page: if an old WordPress sitemap is listed (such as `sitemap_index.xml` or `wp-sitemap.xml`), remove it. It no longer exists and will show an error
- [x] Search Console > **Sitemaps** > type `sitemap.xml` > **Submit**
- [x] Within a few days the status reads **Success**

## 3. Catch broken old links (Haider, monthly)

- [x] Search Console > **Pages** > **Not found (404)**. Expect many old WordPress URLs on the first look, because Google still holds them
- [x] An old URL that matches a page we have: add it to `src/lib/redirects.ts` (T6.2 rules)
- [x] Shop, basket and account URLs: leave them as 404

## 4. Google Business Profile website (Syd, once owner access arrives)

- [x] Check first: the profile may already show the right address, because the domain is unchanged. If so, nothing to do
- [x] Google Business Profile > **Edit profile** > **Contact** > Website: `https://teamautotech.co.uk` (the plain address, the site has no analytics to read a tag)
- [x] Save
