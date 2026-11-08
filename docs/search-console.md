# Search Console and Google listing

Owner checklist from T6.3. Do it once the sitemap is live. Tick as you go.

## Why this exists

- The old WordPress site crashed, so teamautotech.co.uk went live on this site early. Google has no map of the new site and learns of pages slowly, by following links
- `/sitemap.xml` lists the pages worth indexing (home, About and every live service) and `/robots.txt` points Google to it. New pages find their way into Google faster, which matters for local search ("car remapping near me")
- Every later content batch (T6.7 to T6.12) joins the sitemap on its own when its status becomes `live`. Nothing to resubmit
- Coming-soon pages are left out on purpose. They are `noindex`, and listing a noindex page sends Google a conflicting signal
- Search Console is how we see what Google actually did: which pages it indexed, and which old WordPress URLs still 404 (these feed `src/lib/redirects.ts`)

## 1. Prove we own the domain (Haider, then Syd, then Haider)

- [ ] **Haider:** search.google.com/search-console > Add property > **Domain** > `teamautotech.co.uk`. Copy the TXT record
- [ ] **Haider:** send the TXT record to Syd (he does not read the repo)
- [ ] **Syd:** at the domain registrar, open DNS and add a **TXT** record. Host: `@`. Value: the text from Haider. Do not edit or delete any other record (email depends on them)
- [ ] **Haider:** click **Verify**. If it fails, wait a few hours and retry (DNS can take up to a day)
- [ ] **Haider:** Settings > Users > add Syd's business Google account as **Owner**, so access survives either of you leaving

## 2. Submit the sitemap (Haider)

- [ ] Open https://teamautotech.co.uk/sitemap.xml and check it loads
- [ ] Search Console > **Sitemaps** > type `sitemap.xml` > **Submit**
- [ ] Within a few days the status reads **Success**

## 3. Catch broken old links (Haider, monthly)

- [ ] Search Console > **Pages** > **Not found (404)**
- [ ] An old URL that matches a page we have: add it to `src/lib/redirects.ts` (T6.2 rules)
- [ ] Shop, basket and account URLs: leave them as 404

## 4. Google Business Profile website (Syd, once owner access arrives)

- [ ] Google Business Profile > **Edit profile** > **Contact** > Website: `https://teamautotech.co.uk` (the plain address, the site has no analytics to read a tag)
- [ ] Save
