# Double Joy Cookies — Working Notes

## Live Site
The site is live at **doublejoycookies.com**, deployed via Cloudflare Workers (static assets) connected to the GitHub repo `mulhernmarketingsolutions-ux/Double-Joy-Cookies`. Deploys are triggered by pushing/uploading new files to the `main` branch on GitHub — Cloudflare picks up the change and redeploys automatically. Domain DNS is on Cloudflare (nameservers switched from Namecheap), with existing Namecheap email-forwarding MX/TXT records preserved. Domain is registered under John's Namecheap account for now; plan is to hand ownership to Emily later.

## Favicon
Generated a full favicon set from `images/Favicon.png` (John's uploaded 256x256 source): `favicon.ico` (multi-size, at the repo root so browsers find it at `/favicon.ico` automatically), plus `images/favicon-32x32.png`, `images/favicon-16x16.png`, and `images/apple-touch-icon.png` (180x180, for iOS home-screen icons). Linked via `<link rel="icon">` / `<link rel="apple-touch-icon">` tags in the `<head>` of all 6 live pages.

## Mobile Nav
Added a proper hamburger toggle menu (all 6 live pages) — below 780px width, the plain nav links (Home/About/Dream Up Your Cookies/Recipes/Contact) collapse behind a hamburger icon that expands into a vertical stacked menu. The **Custom Order button stays visible outside the hamburger** at all times (next to the icon on mobile, at the end of the nav on desktop) so the primary call-to-action is never hidden behind a menu tap. Also disabled the cookie-menu preview panel's `position: sticky` on mobile (only needed next to a tall sidebar on desktop; on mobile it's a single stacked column so sticky wasn't doing anything useful).

## Reference
- Instagram: [@doublejoycookies](https://www.instagram.com/doublejoycookies) — 40 posts, custom cookie orders, "Inspired by my girls"
- Visual style confirmed from IG grid: soft sage green, blush pink, ivory, gold, dusty blue — matches the palette used in the interactive menu prototype. Recurring themes: milestone birthdays (numbers, "wild one," dinosaurs), bridal/wedding (florals, script names), holidays (USA/4th of July, Christmas), sports (baseball, basketball), baby/kids (onesies, animals), florals, and hand-lettered names/monograms.
- Signature strength: highly custom, one-off designs per occasion — not a fixed catalog. Reinforces that the site's portfolio needs strong filtering/categories (by occasion) rather than a flat product grid.

## Costs (for future pricing work)
- COGS: $12 per 1.5 dozen → **$0.66/cookie** in ingredients
- Labor: ~3.5 hrs baking + 1.5 hrs decorating for 3 dozen (~36 cookies) → ~5 hrs total per 3 dozen
- Not yet factored: packaging, overhead, desired margin/hourly rate — needed before finalizing box pricing on the site (current interactive menu uses placeholder pricing: $7/cookie).

## Custom Order Questions (from her current Instagram DM flow)
These are the real questions she walks customers through today — this becomes the backbone of the Custom Order Form:
1. Occasion — what's it for (birthday, bridal shower, etc.)
2. How many
3. Need by (date)
4. Theme (often shown via an invite photo)
5. Spelling of names
6. Cookie designs they love, or creative freedom
7. Upload photos/inspiration

## Brand Kit (Draft 1 — SUPERSEDED, see Draft 2 below)
- Logo: circular scalloped badge, "DOUBLE" arced top / "COOKIES" arced bottom, center wordmark "J♥Y" (gold serif letters, blush heart standing in for the O). This was John's own placeholder before Noah's real logo arrived — no longer in use.
- Colors: Blush `#F7DADC`, Sage `#A8B49A`, Cream `#FFF7EF`, Taupe `#C2B098`, Warm Gold `#D4AF37`, Chocolate `#5A473A` — John confirmed this whole draft was a placeholder, not final.
- Fonts: Playfair Display (headings), Quicksand (subheadings/UI), Dancing Script (accents) — these three fonts are staying in Draft 2, just paired with a new logo font.
- Brand voice snippets: "Custom Cookies · Inspired by my girls · Baked with love (and a little chaos)" / "Made to celebrate life's sweetest moments" — still current.
- Brand pillars: Made Locally, Premium Ingredients, Custom Designs, Made for Life's Sweet Moments — still current.

## Brand Kit (Draft 2 — current)
- Logo: Noah designed a real wordmark — "Double" / "Cookies" / "Joy" in bubbly, rounded lettering with a clever bite-mark + crumb detail on the "D." He delivered it in 4 color treatments (2 light-background, 2 dark-background). John picked the top-left (cool slate-blue + sage) as the hero version, then we recolored it into the new toned-down palette below for cohesion with the site.
- Real logo file now in hand (`Double Joy Logo.png`, from Noah) and swapped in everywhere — nav logo and hero logo on all 6 pages now use the actual exported file (`images/double-joy-logo.png`) instead of the earlier Baloo 2 recreation.
- Colors (replaces Draft 1 — "more toned-down blues, greens, and pinks; playful but elevated," per John):
  - Dusty Blue `#8CA3AE` — new primary brand color: nav, links, buttons on hover, logo wordmark
  - Muted Sage `#9BAA8E` — secondary accent (was `#A8B49A`)
  - Dusty Rose `#D9ACA7` — secondary accent (was bright Blush `#F7DADC`)
  - Warm Cream `#FBF6EE` — background (was `#FFF7EF`)
  - Charcoal Ink `#463C34` — text/button color (was Chocolate `#5A473A`)
  - Honey Gold `#C9A24A` — sparing accent only (kicker text, small decorative details) — no longer a primary interactive color
- Fonts: Playfair Display (headings), Quicksand (UI/subheadings), Dancing Script (script accents), **Baloo 2** (new — logo wordmark only)

## Brand Story (for the About page)
- Origin: started making cookies for her girls' birthdays, realized she was good at it, and wanted to turn it into something more.
- Name meaning — "Double Joy": joy the customer feels receiving the cookies, and joy she feels making them. Happiness shared both ways.

## Pricing Tiers — now "My Approach" section on About page (was a standalone page)
Originally built as its own page (`double_joy_complexity_guide.html`), but it wasn't clear what the page was for sitting alone in the nav — **folded into the About page as a "My Approach" section** (`#approach` anchor, between the brand pillars and the closing CTA band). The standalone page file still exists but is no longer linked anywhere; nothing removed unless John wants it deleted.
- Photos are now **square-cropped** (`images/Easy-square.jpg`, `Medium-square.jpg`, `Hard-square.jpg`, cropped from the original portrait HEIC-converted files) instead of the original wide rectangular canvas.
- Fixed the "weird ovals" problem: the original circle-and-line SVG callouts were stretched into ellipses because the SVG's square 0–100 viewBox was rendered across a non-square (very wide) container via `preserveAspectRatio="none"`. New version uses plain numbered HTML/CSS dot markers (① ②) positioned by percentage directly over the now-square photo, with a small numbered legend underneath instead of leader lines — no stretching possible, reads cleaner at this smaller/condensed size anyway.
- Content condensed to 2 callouts per tier instead of 3, no dollar figures (same as before):
  - **01 — Basic / Clean & Simple** (suitcase cookies): flat color blocks, one shape repeated with clean piped lines.
  - **02 — Standard / Custom & Coordinated** (map/Bon Voyage cookies): hand-piped fine linework + tiny gold accents, custom shapes + hand-lettered script.
  - **03 — Complex / Showstopper** (baby shower cookies): hand-painted wet-on-wet shading, dimensional bows + miniature appliqué.
- Section ends with "Follow along on Instagram →" linking out to @doublejoycookies for more real examples, per John's suggestion instead of trying to maintain an exhaustive gallery on-site.
- The Contact page's "How does pricing work?" FAQ now links to `double_joy_about.html#approach` instead of the retired standalone page.
- About page's closing CTA band was also changed from "Dream Up Your Cookies" to **"Start a Custom Order"** (linking to the order form) — it was sending people back to the inspiration tool right after they'd already seen real finished work, instead of toward actually ordering.

## Contact/FAQ Decision
FAQ moved above the contact cards on the Contact page (it was getting buried) — "Still Have Questions?" contact cards now come after. Decided against a separate generic contact form: the custom order form is the primary channel for orders, and email + Instagram DM cover everything else, so a second form would just add confusion (and another backend destination). Response time updated everywhere to 24–48 hours (real number from Emily, not the 1–2 days placeholder).

## Footer Email Signup (wired to the backend, live)
Small "🍪 Get the occasional sweet note from Emily" email capture in the footer on all 6 pages — framed as occasional notes, not a newsletter. POSTs the email to the same Apps Script backend as the order form (`DJC_ENDPOINT`, deployed and confirmed working), logged on its own "Newsletter Signups" tab. Emily can just BCC from Gmail when she wants to send something out. Submitting now also triggers a floating toast pop-up ("🍪 You're on the list...") in addition to the small inline note, so the confirmation is hard to miss.

## Google Backend Setup (Apps Script + Sheets — order form + newsletter)
The code is written (`Code.gs`, in this folder) — it just needs to be deployed under a real Google account. John is doing this under his own account for now (not Emily's), so nothing changes on her end. Steps:

1. Go to [sheets.google.com](https://sheets.google.com) and create a new blank spreadsheet. Rename it "Double Joy Cookies — Orders".
2. In the sheet, go to **Extensions → Apps Script**.
3. Delete the placeholder `myFunction() {}` code and paste in the full contents of `Code.gs`.
4. Save the project (disk icon or Ctrl/Cmd+S) — name it "Double Joy Cookies Backend" if asked.
5. Click **Deploy → New deployment**.
6. Click the gear icon next to "Select type" and choose **Web app**.
7. Set **Execute as: Me**, **Who has access: Anyone**. Click **Deploy**.
8. Google will prompt an authorization step — click through **Authorize access → (your account) → Advanced → Go to Double Joy Cookies Backend (unsafe) → Allow**. This warning is normal for personal scripts that haven't gone through Google's app review; it's just you granting your own script permission to write to your own Sheet/Drive/Gmail.
9. Copy the Web app URL (ends in `/exec`) and send it back — I'll drop it into `DJC_ENDPOINT` across all 6 HTML files in one pass.
10. Two sheet tabs will appear automatically the first time each form type is used: "Orders" (full order details + links to uploaded photos, which get saved into a Drive folder called "Double Joy Cookies — Order Photos") and "Newsletter Signups" (just timestamp + email).
11. New orders also trigger an email to `doublejoycookies@gmail.com` — **this address is still an unconfirmed placeholder** (pulled from her Instagram bio, which was truncated). Worth confirming with Emily before relying on it, or point it at John's address until then.

Note: if the script is edited later, changes only go live after either editing the existing deployment (Deploy → Manage deployments → pencil icon → New version) or creating a fresh deployment — just saving the script alone doesn't update the live `/exec` URL's behavior.

## Portfolio Decision (live — built)
Her Instagram (@doublejoycookies) is what she already updates weekly — using a live embedded feed instead of a separate curated gallery, so there's nothing extra for her to maintain. Emily converted to a free Professional account; live feed is now embedded on the Home page via SociableKit (free plan — 1 widget, 1 source, 2,000 monthly views, small watermark, manual refresh). Upgrading to SociableKit's $10/mo plan would add automatic syncing so new posts appear without anyone clicking refresh in their dashboard — worth revisiting if the manual refresh becomes a hassle.

## Status
- `index.html` — Home page: hero, brand story teaser, feature cards, live Instagram feed (SociableKit), footer.
- `double_joy_about.html` — About page with Emily's story, brand pillars, and the new "My Approach" section (see below).
- `double_joy_cookie_menu.html` — "Dream Up Your Cookies," repositioned as inspiration (no price calculator — see Positioning Decision below).
- `double_joy_order_form.html` — custom order form from the real 7 DM questions, connected to the menu handoff, working photo upload (now sent to the backend, not just previewed), validation, mailto fallback. Submits to `DJC_ENDPOINT` once deployed — see Google Backend Setup above.
- `double_joy_contact.html` — Contact page with FAQ (lead time, shipping/pickup, allergies, storage, pricing — now links to About's "My Approach" section). Email address is a placeholder (`doublejoycookies@gmail.com`) pulled from her Instagram bio, which was truncated — confirm the exact address.
- `double_joy_complexity_guide.html` — **retired, no longer linked anywhere** (content now lives on the About page). File still exists in the folder in case it's needed again; let me know if you'd like it deleted.
- `double_joy_recipe_shop.html` — Recipes page (new). Three product cards: Classic Amaretto Cookie ($10), Signature Icing ($10), and The Full Set bundle ($15, "Coming Soon" until the bundle product exists in Payhip). Buy buttons use Payhip's embedded-checkout button (`data-theme="none"`, styled as the site's own `.cta`) so purchases open in an overlay on the page itself — customers never navigate to payhip.com. See Recipe Shop / Payhip Setup below for what's still pending.
- `Code.gs` — Apps Script backend, **deployed and live**. Order form + newsletter signups write to the Sheet, photos save to Drive, confirmed working end-to-end.
- `Double_Joy_Cookies_Website_Plan.docx` — updated platform recommendation, cost breakdown, sitemap, progress, and open to-dos.
- `images/` — real logo file, the square-cropped tier photos (Easy/Medium/Hard-square), and `bg-pattern.svg` (the site-wide background texture).
- All 6 live pages share one nav (Home / About / Dream Up Your Cookies / **Custom Order** / Recipes / Contact).
- Next up: get the site live on a real domain (Cloudflare Pages + Namecheap, per the original plan — nothing is public yet, it all still lives as local files), confirm Emily's real email address, connect PayPal/Stripe in Payhip so purchases can actually complete, and create the bundle product correctly (see below).

## Background Texture
Replaced the flat cream background with a subtle repeating line-art pattern (bow, floral sprig, mini cake stand, sparkles) in honey gold at low opacity — `images/bg-pattern.svg`, tiled via CSS on all 7 pages. Pure SVG/CSS, no extra image weight. Easy to adjust opacity, swap the color, or remove entirely if it reads as too much once live.

## Nav Bar
The top nav is a solid full-width bar in brand dusty blue (`--blue`), white nav links, and the light/white logo (`images/double-joy-logo-light.png`) — landed here after trying dusty rose (legible but "not cute enough") and dark chocolate (also "not cute enough"). Small nav logo + menu links stay consistent on every page. The big hero logo appears **only on the Home page**.

## Color Audit (site-wide rebalance)
Blue had spread far beyond the nav — it was the default for nearly every link, hover state, focus ring, icon, and divider (108 uses vs. 7 for sage), reading as much heavier than intended given Emily's actual palette rotates sage/blush/gold/blue evenly. Rebalanced so **blue is now used only for the nav bar background and the "Double"/"Joy" logo lockup text** — everywhere else was remapped:
- Solid CTA button hover state → sage (was blue)
- Footer newsletter button + input focus ring → gold-light (was blue)
- Text links (story link, feature-card links, contact-card links, complexity guide link, design recap link) → gold underline/text (was blue)
- Icons (feature-card icons, contact-card icons, recipe shop product icons) → sage (was blue)
- Home page divider line → gold (was blue)
- Cookie menu + order form interactive controls (active/hover states on pills, swatches, shape buttons, qty cards, radio cards, dropzone, focus borders) → sage (was blue)
- About page pillar badge #3 (Custom Designs) → chocolate/ink (was blue), keeping sage/blush/chocolate/gold-light as the 4-badge rotation
- Complexity Guide numbered circle badges + diagram callout lines → gold (was blue)

Outline/secondary buttons ("Email It To Me Instead" on the cookie menu, hero secondary CTA on Home) changed from a plain dark-ink outline to a blush border with ink text, filling solid blush on hover — a cuter, warmer treatment than either straight ink or a blue-to-pink transition (skipped the two-color-shift idea as busier than needed).

## About Page Pillars
Replaced the flat solid-sage blocks with generic icons (heart/flask/box/clock) with white cards + circular color-badge icons, each a custom-drawn icon relevant to the label: house+heart (Made Locally), mixing bowl+whisk (Premium Ingredients), piping/icing bag (Custom Designs), gift box+bow (Sweet Moments). Badge colors rotate through the brand accents (sage, blush, blue, gold) for variety.

## About Page Photos
Added a real photo of Emily's two daughters (the actual inspiration for the business) to the About page story section, with the caption "My girls — the whole reason this started." Converted to `images/daughters.jpg` (resized/compressed from the original PNG) for faster load.

## Recipe Shop / Payhip Setup
- No EIN needed — Emily can operate as a sole proprietor using her SSN. Payhip signup itself is free and only needs a name and email.
- Payhip doesn't accept Venmo as a payout method. To actually receive money, she needs to connect PayPal or Stripe in her Payhip account settings — **not done yet** ("PayPal not synced" as of this writing), so purchases will not complete until that's connected.
- Two products are live in Payhip: Classic Amaretto Cookie (`AQ3Ei`) and Signature Icing (`zCVsQ`), both $10, both wired into the Recipe Shop page with embedded checkout.
- The Full Set bundle ($15) still needs to be created in Payhip — **important**: create it as a normal digital product with both PDFs attached (or zipped together), not using Payhip's dedicated "Bundle" product type. Payhip's embed-button checkout (the thing that keeps customers on our page instead of sending them to payhip.com) does not currently support the Bundle product type — only plain digital/physical products. Once it exists as a regular product, send the embed code and I'll wire up the third button and remove the "Coming Soon" state.
- Heads up, not urgent: once real money starts moving through PayPal/Stripe/Venmo for goods and services, they report to the IRS after $20,000 and 200 transactions in a year (some states set a lower bar). Nowhere close to relevant at this scale, and it's automatic — nothing to set up.

## Nav Audit (naming + emphasis)
John flagged that the nav was funneling more people to "Dream Up Your Cookies" (the inspiration tool) than to the actual order form, and asked for a naming pass. Changes:
- **Complexity Guide removed from nav/footer** everywhere (see above — folded into About).
- **"Recipe Shop" → "Recipes"** in nav, footer, and the Recipe Shop page's own kicker/title — shorter, reads more natural as a menu item.
- **"Custom Order" is now a filled white pill button in the nav** (not just a plain text link) so it visually stands out against "Dream Up Your Cookies," which stays a plain link — the goal is that the real order path pulls more clicks without renaming it into something less accurate (kept "Custom Order" since it's the correct description; didn't switch to "Order Now," which would imply instant checkout).
- Current nav order: Home / About / Dream Up Your Cookies / **Custom Order (pill)** / Recipes / Contact.

## Positioning Decision (Cookie Menu)
Real price is $5/cookie flat today, with a goal of raising prices and building repeat customers — a specific dollar estimate next to a stylized, non-final preview risked anchoring low and creating mismatched expectations. Repositioned the builder as pure inspiration ("Dream Up Your Cookies," no live price), moved the actual quote to Emily's personal follow-up after the order form. Complexity tiers live on their own dedicated page (`double_joy_complexity_guide.html`) as qualitative info only — no $ figures, real photos with annotations.
