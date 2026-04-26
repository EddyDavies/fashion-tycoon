# Image Sources & Visual Reference Research

Research for the inspiration/visual reference layer — a feature where users browse images to define their brand's style. Covers API access, licensing, fashion-specific content quality, and practical recommendations for an MVP.

---

## 1. Free / Open Image APIs and Sources

### Unsplash

**What it is:** Community-driven stock photo platform with a curated, editorial-quality library. One of the strongest free sources for fashion and lifestyle imagery.

**API access:**
- REST API at `https://api.unsplash.com`
- Requires registration at unsplash.com/developers
- Two tiers: Demo (default, immediate) and Production (requires application review)

**Rate limits:**
- Demo: 50 requests/hour
- Production (approved): 5,000 requests/hour
- Image file requests (to `images.unsplash.com`) do NOT count against the rate limit — only JSON API calls do

**License:**
- Unsplash License — free for commercial and non-commercial use
- Attribution is required by API terms (not the license itself): each image display must link back to the photographer's Unsplash profile with UTM parameters
- Images cannot be sold as stock or used to imply endorsement
- Hotlinking is required — you must use the URLs returned by the API directly, not re-host
- Download tracking required: when a user "saves" or "uses" an image, you must fire a request to `photo.links.download_location`

**Fashion content quality:**
Unsplash has a dedicated Fashion & Beauty category with 10,000+ curated photos. Quality is consistently high because Unsplash curates submissions. Best search terms:

| Search Term | What You Get |
|---|---|
| `fashion editorial` | High-concept editorial shoots |
| `editorial fashion photography` | Magazine-quality compositions |
| `fashion photography` | Professional model/clothing photos |
| `street style` | Candid real-world fashion |
| `luxury fashion` | High-end, aspirational imagery |
| `minimalist fashion` | Clean, pared-back style references |
| `vintage fashion` | Retro and heritage aesthetic |
| `runway fashion` | Catwalk-adjacent editorial content |

**Key caveats:**
- Images can be removed at any time — do not assume permanent availability
- Must implement proper attribution UI in your app
- Production approval requires demonstrating a real product

**Official docs:** https://unsplash.com/documentation

---

### Pexels

**What it is:** Free stock photo and video platform, with a substantial and well-tagged library. Slightly broader and less editorially curated than Unsplash, but very large.

**API access:**
- REST API — API key provided instantly on signup
- Authorization header: `Authorization: YOUR_API_KEY`

**Rate limits:**
- Default: 200 requests/hour, 20,000 requests/month
- Limits can be lifted for free — email api@pexels.com with a description of your platform. Must provide attribution

**License:**
- Pexels License — free for personal and commercial use, no attribution required
- Cannot replicate core Pexels functionality (i.e., don't build a Pexels clone)
- Supports Collections: you can group specific photos into curated galleries accessible via API

**Fashion content quality:**
Searching "fashion editorial" on Pexels returns 800,000+ results. Very broad. Quality is more variable than Unsplash. Best to combine keyword search with the `orientation=portrait` and `size=large` filters for editorial-quality results.

Useful search terms:
- `fashion editorial`, `editorial fashion`
- `luxury fashion`, `high fashion`
- `model fashion`, `street style`
- `fashion week`, `runway`

**Caching guidance:** Pexels encourages caching API responses for ~24 hours to reduce quota usage.

**Official docs:** https://www.pexels.com/api/documentation/

---

### Pixabay

**What it is:** Large royalty-free image library with community-contributed content. More diverse than Unsplash/Pexels but includes more amateur content. Also includes illustrations and vectors.

**API access:**
- REST API at `https://pixabay.com/api/`
- Free API key on signup
- Full-resolution image URLs require account approval for API access

**Rate limits:**
- Generous defaults, with HTTP 429 returned if exceeded
- Exact per-hour limits not publicly specified but generally higher than Unsplash Demo

**License:**
- Pixabay License — irrevocable, worldwide, royalty-free right to use, modify, distribute
- No attribution required
- **Cannot** sell images on a standalone basis (as stock, prints, wallpapers, or NFTs)
- Content depicting recognisable people in commercial contexts may need model releases — check with the photographer
- Images of identifiable brands/logos may have trademark implications

**Important API rule:** Permanent hotlinking is NOT allowed. You must download images to your own server for production use (unlike Unsplash, which requires hotlinking). Display search results via the returned URLs temporarily, then download for persistent use.

**Fashion content:** Decent breadth but lower editorial quality on average than Unsplash. Better for abstract fashion categories (accessories, fabric textures, colours) than high-concept editorials.

**Official docs:** https://pixabay.com/api/docs/

---

### Wikimedia Commons

**What it is:** Repository of 100+ million freely usable media files, mostly used in Wikipedia. Contains historical fashion photography, museum archive images, vintage advertising, and some contemporary fashion imagery.

**API access:**
- MediaWiki Action API at `https://commons.wikimedia.org/w/api.php`
- Wikimedia REST API for direct file access
- No key required for read access, but rate limiting applies to unauthenticated requests
- Batch image queries: use `generator=allimages` parameter, up to 40 images per request
- Since early 2026, image servers apply strict rate limiting to thumbnail sizes outside predefined widths

**License:**
- All content is CC-licensed (various flavours: CC-BY, CC-BY-SA, CC0) or public domain
- Attribution is required for CC-BY and CC-BY-SA content — include author, license name, link to license text, and link to the file's Commons page
- Not all content is CC0 — check each file's license individually

**Fashion content:**
Most useful for:
- Historical fashion: `Category:Fashion by decade`, `Category:19th-century fashion`, `Category:Vintage clothing`
- Museum artefacts: garment photography from major institutions
- Runway documentation: some fashion week coverage posted by press photographers

Not useful for: contemporary editorial photography, trend-forward imagery, or commercial-style product shots.

**Search approach:** Use category-based queries rather than keyword search for best results. Key categories:
- `Category:Fashion photography`
- `Category:Clothing`
- `Category:Fashion by country`

**Enterprise API:** Wikimedia Enterprise (enterprise.wikimedia.com) offers structured data and image APIs at scale for commercial use.

---

### Openverse (WordPress)

**What it is:** Successor to CC Search, indexing 800+ million openly licensed images and audio across Flickr, Wikimedia, and other open repositories. Powerful filtering by license type.

**API access:**
- Public API at `https://api.openverse.org/v1/`
- No key required for basic use; rate-limited but generous
- Filter by license: CC0, CC-BY, CC-BY-SA, etc.
- Filter by commercial use eligibility

**License:**
- All content is CC-licensed or public domain
- Openverse does NOT verify individual file licenses — always independently confirm before publishing
- Attribution requirements vary by license

**Fashion content:** Variable quality; depends on what's on Flickr and Wikimedia. Best for finding vintage fashion photography, historical references, and niche aesthetics.

**Docs:** https://docs.openverse.org

---

## 2. Pinterest

### What the Pinterest API (v5) actually gives you

Pinterest API v5 (the current version; v3 and v4/ads are deprecated) is an OAuth 2.0-authenticated REST API. Base URL: `https://api.pinterest.com/v5`.

**What you CAN access:**
- Pins and boards belonging to the authenticated user
- Pin images at multiple resolutions (150x150, 400x300, originals up to 1200x800)
- Board creation, management, and organisation
- Analytics on pins and boards (impressions, clicks, saves)
- Product catalogues (for shopping integrations)
- Ad account management

**What you CANNOT access:**
- Other users' private boards (obviously)
- Broad public search of third-party pins without context
- The full Pinterest discovery feed / "For You" recommendations
- Webhooks (not supported natively)

### Access tiers

| Tier | What it does |
|---|---|
| Trial | Pins created via API are only visible to you — not publicly on Pinterest |
| Standard | Pins are publicly visible; requires submitting a demo video for approval |

Getting Standard access is notoriously slow. Community reports suggest the approval process can take weeks and requests are sometimes rejected without explanation.

### Rate limits

- Universal cap: 100 calls/second per user per app across all endpoints
- Trial access: daily rate limits (lower)
- Standard access: per-minute limits (higher, varies by endpoint category)
- Ads Analytics: 300 calls/minute per user per app
- Limits are subject to change without notice and are not fully published

### Authentication

OAuth 2.0 with user-delegated authority. There is no pure server-to-server (confidential client) flow — users must authenticate interactively and delegate access to your app. This means you cannot access arbitrary public Pinterest boards without those users authenticating your app.

### What's NOT accessible (key limitations)

- **You cannot pull pins from boards that belong to other users** unless those users explicitly authenticate with your app. This is the critical limitation: Pinterest cannot function as a "browse any board" image source without per-user OAuth consent.
- There is no endpoint to search Pinterest's global public image library.
- Trial access pins are sandboxed — production requires approval.
- No native real-time notifications.

### Scraping Pinterest: considerations

Pinterest's Terms of Service explicitly prohibit scraping. Pinterest has actively litigated against scrapers. Technically, headless browser scraping is possible but:
- Violates ToS (risk of account/IP ban)
- Legal grey area — likely violation of the Computer Fraud and Abuse Act in the US
- Pinterest actively employs anti-bot measures

**Legal alternatives to Pinterest scraping:**
- Use Pinterest's own API with user OAuth consent for their own boards
- Use Savee.it, Are.na, or Cosmos.so as alternatives with better API-friendliness
- Curate your own board using Unsplash/Pexels and a custom tagging system

**Official docs:** https://developers.pinterest.com/docs/api/v5/

---

## 3. Instagram / Meta

### The Instagram Basic Display API — now deprecated

The Instagram Basic Display API was shut down on **December 4, 2024**. It is no longer available. Any app relying on it must migrate.

### Instagram Graph API (current, for Business/Creator accounts)

The Graph API remains active. It allows business and creator accounts to:
- Publish posts (photos, videos, carousels, Reels, Stories)
- Read media from their own account
- Moderate comments on their own content
- Access hashtag search (limited)
- Read mentions of their account in public posts
- Access basic insights and analytics

**What it does NOT allow:**
- Accessing posts from arbitrary public accounts without those users authenticating your app
- Broad scraping of hashtag results (hashtag search is limited and requires a connected Facebook Page)
- Accessing Stories, emojis in posts, or PII-tagged content
- Pulling public fashion content at scale

### Instagram API with Instagram Login (new replacement for Basic Display)

Meta launched this as the replacement for Basic Display API. It allows:
- Professional (Business or Creator) accounts to connect without needing a linked Facebook Page
- Reading and displaying media from the authenticated user's account
- Similar functionality to Basic Display but requires Professional account status

### The practical reality of using Instagram for fashion inspiration

**Short answer: you cannot legally use Instagram as a source of third-party fashion content.**

Meta's APIs are designed for account owners managing their own content. They do not provide programmatic access to public posts from arbitrary accounts. The Graph API's hashtag search endpoint exists but has strict rate limits (only 30 unique hashtags per 7 days per account) and returns very limited data.

Instagram also actively pursues legal action against scrapers. The HiQ v. LinkedIn case suggested public data scraping might be legal under CFAA, but Instagram's ToS prohibitions remain a significant legal risk, and Meta has sued multiple scraping services.

**For a fashion inspiration tool:** Instagram content is not legally usable as a source unless users authenticate your app and explicitly share their own content. Building around Instagram is a dead end at the API level.

**Practical workaround:** Let users manually save/pin images they find on Instagram into your app's UI (user-driven curation, not automated scraping).

**Official docs:** https://developers.facebook.com/docs/instagram-platform/

---

## 4. Google Images / Custom Search API

### Current status: effectively end-of-life for new users

Google Custom Search JSON API is **closed to new customers as of 2025**. Existing customers have until **January 1, 2027** to migrate. Google is directing users to Vertex AI Search as the replacement.

### How it worked (for context)

The API powered Programmable Search Engines — custom search instances scoped to one or more domains, or the broader web. It supported image search via the `searchType=image` parameter.

**Pricing:**
- Free: 100 queries/day
- Paid: $5 per 1,000 queries
- Hard cap: 10,000 queries/day (even with billing)
- Max 10 results per request, max 100 results per query (pagination to `start=91`)

### Image rights when displaying results

This is a critical point often overlooked: **Google Custom Search results are links to images hosted elsewhere.** Displaying them in your app doesn't give you any rights to those images. Each image is subject to the licensing of its source. Displaying search results is generally considered acceptable (like a search engine), but:
- Embedding images inline from third-party sources may infringe copyright
- You'd need to check `imageRights` metadata and filter to CC/open-licensed images
- Not suitable as a primary image source for a curated inspiration tool

### Alternatives

- **Serp API / SerpAPI** — third-party Google Search scraping API, ~$50/month for 5,000 searches. Same rights issues apply.
- **Bing Image Search API** (Microsoft Azure) — still active, $7 per 1,000 calls, supports filtering by image license type including CC licenses. More viable than Google CSE.
- **Vertex AI Search** — Google's enterprise replacement, requires GCP setup and enterprise pricing

---

## 5. Fashion-Specific Image Databases

### Vogue Runway (Condé Nast)

**What it is:** The industry-standard runway archive. 1 million+ runway images dating back to 1988, from every major fashion week. AI-powered image search. Coverage of 20,000+ shows.

**API/embed access:** None. There is no public API or embed program. Condé Nast does not license individual image access programmatically.

**Commercial access options:**
- Brand inclusion costs ~$20,000 per season (brands pay to have their show on Vogue Runway)
- Editorial image licensing through Getty Images (Condé Nast has a Getty partnership)
- Academic/research partnerships negotiated directly

**Open dataset:** A Vogue Runway image dataset exists on the Internet Archive (~853 GB, 129 shards of 10,000 images each in WebDataset format). This was scraped/compiled and is available for download — **use for research only; commercial use would infringe Condé Nast copyright.**

**URL:** https://archive.org/details/VogueRunway_dataset

**Practical conclusion:** Not accessible for an MVP. Use Getty or Shutterstock for licensed runway imagery, or Unsplash/Pexels for editorial stand-ins.

---

### WGSN

**What it is:** The dominant fashion trend forecasting platform. The WGSN Catwalk Library holds 5+ million images with 25+ years of history, hand-tagged across 27 garment/accessory categories with extensive attribute metadata (silhouettes, embellishments, fabrics, prints, necklines, etc.).

**API access:** None publicly available. No developer API exists.

**Access model:**
- Enterprise subscription (trusted by 6,500+ brands globally) — pricing undisclosed, typically tens of thousands of dollars annually
- Academic access through institutional library subscriptions (active for ~90 days at universities like Cornell, New School, FIT)

**Copyright:** WGSN content cannot be used in commercial or promotional materials without explicit permission. Non-redistributable.

**Practical conclusion:** WGSN is a competitor/reference point, not a data source you can build on. If you have budget, use it for internal research. Not buildable into an app.

---

### Tagwalk

**What it is:** Fashion search engine and SaaS trend intelligence platform. Founded by former Numéro magazine editor Alexandra Van Houtte. Indexes womenswear, menswear, couture, accessories, and models from every season since 2016 across all four major fashion weeks. Named a **TIME Best Invention of 2025** for its Trends Dashboard.

**API access:** No public API. Access is through:
- A freemium web and mobile search interface (free text-based search)
- SaaS subscription for full trend data, analytics, and reports
- Direct brand partnerships for custom data insights

**Content:** Best-in-class for runway search by keyword, designer, model, or trend attribute. Highly curated.

**Practical conclusion:** Use it as a manual research tool during the curation phase. Not programmable. Good UX reference for your own feature.

**URL:** https://www.tag-walk.com

---

### Trendalytics

**What it is:** Visual analytics and merchandise intelligence platform for brands and retailers. Analyzes social signals, online search behaviour, and image popularity by product attribute. **Acquired by Verishop in March 2024.**

**API access:** No public API. SaaS platform accessed through Verishop/Trendalytics directly.

**What it does:** Predicts trend trajectories by combining TikTok search data, runway imagery, social mentions, and retail analytics. Useful for merchandising and buying decisions.

**Practical conclusion:** Not directly usable as an image source. Context tool for trend forecasting research.

---

### Open Fashion Image Datasets (for ML / Training)

These are research datasets, not live APIs. Useful for training your own image classifiers or style-tagging models.

| Dataset | Size | Content | License | Access |
|---|---|---|---|---|
| **DeepFashion** (CUHK, 2016) | 800K images | 50 categories, 1,000 attributes, landmarks, bounding boxes | Non-commercial research only | Fill out release agreement with MMLAB |
| **DeepFashion2** | 491K images | 13 categories, commercial + consumer photos | Non-commercial research | GitHub |
| **iMaterialist Fashion** | 1M+ images | 228 fine-grained attributes across 8 groups | Research / Kaggle competition | Kaggle / Google Drive |
| **Polyvore** | 21K outfits | Human-curated outfit compatibility | N/A (site shut down 2018) | Unofficial Kaggle mirror |
| **Fashionpedia** | Fine-grained | Segmentation + categorisation | Open source | fashionpedia.github.io |

**Fashionpedia:** https://fashionpedia.github.io/home/
**DeepFashion:** http://mmlab.ie.cuhk.edu.hk/projects/DeepFashion.html

---

## 6. Stock Fashion Imagery — Commercial Sources

### Getty Images

**What it is:** Premium licensed imagery — the industry standard for editorial and commercial photography. Post-merger with Shutterstock (announced 2025), will become an even larger combined entity.

**API access:**
- Developer API at developers.gettyimages.com
- Supports search, download, licensing, reverse image search, and Generative AI endpoints
- OAuth 2.0 authentication
- Negotiated access — contact Getty directly for API credentials

**Licensing models:**
- **Royalty-free (RF):** One-time fee, unlimited use within license terms. Now the standard for creative images.
- **Rights-managed/Rights-ready:** License scoped to specific use case, medium, territory, and duration. For editorial images.
- **Embed (free):** 70 million+ images embeddable on non-commercial websites via Getty's embed code. Uses an iframe — no API needed. **Cannot be used for commercial purposes** (selling, fundraising, advertising).
- **Generative AI by Getty:** New product with Gen AI license required; credit-based.

**For app use:** You would need a commercial RF license for each image displayed/used. Getty has reseller and platform partnership models — contact their API team.

**Cost:** Getty images range from ~$175 for RF single downloads to custom enterprise licensing. Not viable for a free-tier MVP image library.

**Embed option (non-commercial):** The iframe embed is free and simple — just display Getty's embed code. Only works for editorial, non-commercial use.

**Docs:** https://developers.gettyimages.com/

---

### Shutterstock

**What it is:** Second-largest stock library (merging with Getty in 2025). 375+ million images, 4M+ videos, 106K music tracks.

**API access:**
- Public developer API at shutterstock.com/developers
- Supports search, licensing, download, embed widget
- Platform License model: end users of your app can license images directly within your UI

**Licensing models:**
- **Standard License:** Single use for one project/campaign
- **Enhanced License:** Extended use rights
- **Platform/API License:** Your app resells or enables licensing of Shutterstock assets to end users. Revenue-share model. No per-download caps or overage fees.
- **Pay Per Use:** From 3 million (Starter) to 375 million+ (Full Collection) assets

**Embed widget:** Shutterstock UI widget (`ui-reference.shutterstock.com`) lets you embed search and licensing directly in your product. Users search, preview, and license without leaving your app.

**For app use:** The Platform License is the right model if you want users to license individual images through your tool. Requires a commercial agreement with Shutterstock.

**Docs:** https://www.shutterstock.com/developers

---

### Adobe Stock

**What it is:** Stock library integrated with Adobe Creative Cloud. 200M+ assets. Particularly strong for illustrations, vectors, and high-end photography.

**API access:**
- Stock API at developer.adobe.com/stock
- Search, preview, license, and license-history endpoints
- OAuth 2.0 for user-level licensing; server-to-server available for Enterprise only
- API calls are free; charges apply when licensing images

**Licensing models:**
- **Standard License:** Photos, illustrations, vectors for most digital uses
- **Extended License:** Allows use in merchandise, resale, or high-volume distributions
- **Enterprise Server-to-Server:** Bulk licensing for large organisations without per-user auth

**For app use:** Adobe Stock is designed for individual creative workflows and CC users — not ideal as an independent platform image source. Enterprise API access requires a business relationship with Adobe.

**Important:** CC Pro/CC Pro Plus plans are not designed for API use outside of Adobe's ecosystem without explicit business approval.

**Docs:** https://developer.adobe.com/stock/docs/

---

### Summary Comparison: Stock Sources

| Provider | Free tier | API embed | Platform license | Fashion quality |
|---|---|---|---|---|
| Getty Images | Embed (non-commercial iframe only) | Yes (negotiated) | Yes (reseller model) | Excellent |
| Shutterstock | No | Yes (UI widget) | Yes (Platform License) | Very good |
| Adobe Stock | No | Yes (enterprise) | Enterprise only | Good |

---

## 7. Practical Recommendations for an MVP

### Recommended combination for an MVP

**Primary source: Unsplash API**
- Excellent fashion content quality
- Free, instantly available in Demo tier (50 req/hr)
- Apply for Production for 5,000 req/hr once you have a working product
- Implement hotlinking (as required) + photographer attribution in the UI
- Pre-seed your library with 200–500 carefully selected images via the API

**Secondary source: Pexels API**
- Supplement Unsplash with Pexels for volume and variety
- Broader keyword coverage for niche aesthetics
- No attribution required — simpler UX
- Default 200 req/hr, waivable for free

**Optional supplement: Openverse / Wikimedia Commons**
- For historical references, vintage aesthetics, archival looks
- CC-licensed content with proper attribution

**Do NOT use (for MVP):**
- Instagram/Meta: inaccessible for third-party content
- Pinterest: sandboxed API, can't access public boards
- Google CSE: deprecated, rights issues
- WGSN/Vogue Runway/Tagwalk: no API

---

### Building a curated local image library for demo/offline use

For demo purposes, you want a hand-curated set of ~300–500 images across aesthetic categories. Approach:

1. **Define your taxonomy first** — decide on 8–15 aesthetic buckets that matter to your users (e.g. "minimal", "maximalist", "heritage/prep", "streetwear", "Parisian chic", "coastal", "dark romance", "corporate", "avant-garde"). These should match how brands actually think.

2. **Pull via Unsplash API** — use the Search endpoint with 2–3 search terms per aesthetic bucket, collect 20–30 candidates per bucket, manually select the best 15–20. Script this:
   ```
   GET /search/photos?query=minimalist+fashion+editorial&per_page=30
   ```

3. **Download and store locally** — for demo mode, download full-res images to your own storage (S3, Cloudflare R2, etc.). Store the Unsplash photo ID, photographer attribution, and your taxonomy tags in a database.

4. **Manual QC pass** — review every image. Remove anything that doesn't clearly communicate the aesthetic. Fashion references need to be unambiguous.

5. **Track download endpoint** — for each Unsplash image you download/save, fire the required tracking request to `photo.links.download_location`.

**Storage estimate:** 400 images × ~2MB = ~800MB. Cheap to host on R2 or S3.

---

### Curation workflow: manual tagging vs. automated

**For an MVP: manual tagging with structured taxonomy**

The taxonomy is the product. Auto-tagging has high error rates on subjective style attributes ("is this 'quiet luxury' or 'old money'?"). A human editor making intentional choices is more valuable at this stage than ML inference.

Recommended workflow:
1. Pull candidates via API
2. Curator reviews in a simple admin UI (grid view, approve/reject, assign tags)
3. Approved images stored with: aesthetic tags, colour palette (extracted via ColorThief or similar), garment types, mood/feeling keywords
4. Store in a JSON/database structure for fast client-side filtering

**For scale (post-MVP): hybrid approach**
- Use FashionCLIP or Marqo-FashionCLIP to auto-suggest tags
- Use Google Vision API to extract colours, dominant labels
- Human curator reviews and corrects ML suggestions
- Build a feedback loop: user interactions (saves, skips) improve ranking

---

## 8. Image Tagging and Classification

### FashionCLIP

**What it is:** CLIP (Contrastive Language-Image Pretraining) fine-tuned on 800K fashion product images from the Farfetch dataset. Produces visual embeddings that understand fashion-specific semantics.

**Architecture:** ViT-B/32 image encoder + masked self-attention text encoder, trained via contrastive loss.

**Capabilities:**
- Zero-shot classification (no training examples needed for new categories)
- Multi-modal retrieval: "find images similar to this text description"
- Image-to-image similarity search
- Attribute tagging: category, style, colour, material

**FashionCLIP 2.0:** Uses `laion/CLIP-ViT-B-32-laion2B-s34B-b79K` as base — better zero-shot performance due to 5x more pre-training data.

**Marqo-FashionCLIP (2024, state of the art):**
- Fine-tuned from ViT-B-16 (laion2b_s34b_b88k)
- Uses Generalised Contrastive Learning (GCL) — trained on categories, styles, colours, materials, keywords, AND text descriptions
- Outperforms FashionCLIP 2.0 by +57% on evaluation benchmarks (text-to-image, category-to-product, sub-category-to-product)
- Available on Hugging Face: `Marqo/marqo-fashionCLIP`

**Limitations:**
- Biased toward standard product images (white background, centred item) — less accurate on editorial/lifestyle photography
- Better at longer text queries than short ones
- Works in English

**OpenFashionCLIP:** A variant trained exclusively on open-source fashion data — useful if you want to avoid Farfetch data dependencies.

**Access:**
- GitHub: https://github.com/patrickjohncyh/fashion-clip
- Hugging Face: https://huggingface.co/patrickjohncyh/fashion-clip
- Marqo variant: https://github.com/marqo-ai/marqo-FashionCLIP

**License:** MIT (FashionCLIP model weights); check Marqo variant for exact terms.

---

### How to auto-tag fashion images

A practical pipeline for the MVP:

```
Image → Marqo-FashionCLIP embedding → cosine similarity to category label embeddings → top-k tags
                              ↓
                    Google Vision API → dominant colours, general labels
                              ↓
                    Manual review pass → human corrects and enriches tags
```

**Step 1: Category classification**
Run each image through Marqo-FashionCLIP. Compare the image embedding to text embeddings of your taxonomy labels. The highest cosine similarity scores give you predicted categories.

Example categories to embed: "minimalist fashion", "maximalist fashion", "streetwear", "luxury fashion", "vintage fashion", "dark aesthetic", "coastal style", "corporate fashion", "avant-garde fashion".

**Step 2: Garment type detection**
Use a DeepFashion2-trained detector (or Google Vision's label detection) to identify specific garment types: dress, coat, trousers, knitwear, outerwear, accessories, footwear.

**Step 3: Colour extraction**
Use a fast CPU tool like ColorThief (JavaScript) or colorthief (Python) to extract the dominant 3–5 colours from each image. Store as HEX + CSS colour name.

**Step 4: Human review**
Surface ML predictions in an admin panel. Curator approves or corrects. Build a Streamlit or simple React admin for this.

---

### Google Vision API for fashion tagging

**What it offers:**
- **Label Detection:** Identifies clothing types (pants, dress, jeans), objects, colours, and styles with confidence scores
- **Object Localization:** Detects and provides bounding boxes for identified clothing items
- **Style Detection:** Evaluates nuances of fashion style using deep learning (launched as a specific fashion feature)
- **Product Search:** Match query images against an indexed product catalogue — useful if you build a "find similar" feature
- **Tag Recognizer (Vertex AI):** Structured tag parsing for retail product tags

**Limitations for fashion:**
- General-purpose model — may return irrelevant labels (e.g., "neck", "arm") alongside clothing labels
- Not as accurate as FashionCLIP on style/aesthetic classification
- No zero-shot understanding of fashion-specific concepts like "quiet luxury" or "avant-garde"

**Best used for:** Colour extraction, basic garment type detection, supplementing FashionCLIP classification, and detecting scene context (indoor/outdoor, studio/lifestyle).

**Pricing:** $1.50 per 1,000 images for label detection. Very affordable at MVP scale.

**Docs:** https://cloud.google.com/vision/docs/labels

---

### Alternative: OpenCLIP (general-purpose)

If you want to avoid fine-tuning, standard OpenCLIP (ViT-L/14 trained on LAION-5B) performs reasonably on fashion classification at zero-shot. Less accurate than FashionCLIP but broader in scope. Available on Hugging Face.

---

## Source References

- [Unsplash API Documentation](https://unsplash.com/documentation)
- [Unsplash API Terms](https://unsplash.com/api-terms)
- [Pexels API Documentation](https://www.pexels.com/api/documentation/)
- [Pexels License](https://help.pexels.com/hc/en-us/articles/360042295174-What-is-the-license-of-the-photos-and-videos-on-Pexels)
- [Pixabay API Docs](https://pixabay.com/api/docs/)
- [Pixabay License Summary](https://pixabay.com/service/license-summary/)
- [Wikimedia Commons API](https://commons.wikimedia.org/wiki/Commons:API)
- [Openverse API](https://docs.openverse.org)
- [Pinterest API v5 Docs](https://developers.pinterest.com/docs/api/v5/)
- [Pinterest Rate Limits](https://developers.pinterest.com/docs/reference/rate-limits/)
- [Pinterest Access Tiers](https://developers.pinterest.com/docs/getting-started/access-tiers/)
- [Instagram Platform (Meta)](https://developers.facebook.com/docs/instagram-platform/)
- [Instagram Basic Display API Deprecation (Meta Blog)](https://developers.facebook.com/blog/post/2024/09/04/update-on-instagram-basic-display-api/)
- [Instagram Graph API Changes 2025 (Elfsight)](https://elfsight.com/blog/instagram-graph-api-changes/)
- [Google Custom Search JSON API Overview](https://developers.google.com/custom-search/v1/overview)
- [Google Custom Search Closed to New Customers (Expertrec)](https://blog.expertrec.com/google-custom-search-json-api-simplified/)
- [Getty Images Developer API](https://developers.gettyimages.com/)
- [Getty Images Embed](https://www.gettyimages.com/faq/basics)
- [Shutterstock Developer API](https://www.shutterstock.com/developers)
- [Adobe Stock API](https://developer.adobe.com/stock/docs/)
- [Vogue Runway Dataset (Internet Archive)](https://archive.org/details/VogueRunway_dataset)
- [WGSN AI and Image Tagging](https://www.wgsn.com/en/blog/how-wgsn-uses-ai-and-image-tagging-decode-fashion-week-trends)
- [Tagwalk TIME Best Inventions 2025](https://time.com/collections/best-inventions-2025/7318326/tagwalk-trends-dashboard/)
- [Trendalytics (CB Insights)](https://www.cbinsights.com/company/trendalytics)
- [DeepFashion Dataset (MMLAB)](http://mmlab.ie.cuhk.edu.hk/projects/DeepFashion.html)
- [DeepFashion2 (GitHub)](https://github.com/switchablenorms/DeepFashion2)
- [iMaterialist Fashion Attribute Dataset](https://arxiv.org/abs/1906.05750)
- [Fashionpedia](https://fashionpedia.github.io/home/)
- [FashionCLIP (GitHub)](https://github.com/patrickjohncyh/fashion-clip)
- [FashionCLIP (Hugging Face)](https://huggingface.co/patrickjohncyh/fashion-clip)
- [Marqo-FashionCLIP (GitHub)](https://github.com/marqo-ai/marqo-FashionCLIP)
- [Marqo-FashionCLIP (Hugging Face)](https://huggingface.co/Marqo/marqo-fashionCLIP)
- [Google Vision API Label Detection](https://cloud.google.com/vision/docs/labels)
- [Google Vision Product Search](https://cloud.google.com/vision/product-search/docs)
