# Comparable Tools Research
## Fashion Design, Style Discovery & Sourcing — Reference for "The Game"

> Research purpose: understand what content dimensions, decision flows, and UX patterns comparable tools use — to inform what the game asks brand founders and in what order.

---

## 1. Style Quiz / Aesthetic Discovery Tools

### 1.1 Stitch Fix Style Quiz

**Overview:** Stitch Fix's quiz is one of the most studied in fashion tech — it feeds a human stylist + algorithmic selection system that has processed over 100 million "Fixes."

**Dimensions covered (90 data points at signup, 30–100 additional dimensions per item return):**

| Category | Specific Questions |
|---|---|
| Body & fit | Height, weight, body type (apple/pear/rectangle/hourglass), waist level (high/mid/low), comfort with baring arms/back/midriff |
| Occasion & lifestyle | Work environment (office/casual/creative), frequency of dressing up (daily/weekly/rarely), new mum / active lifestyle flags |
| Style preferences | Outfit ranking (rate example outfits visually), style word selection, risk tolerance ("are you a risk taker?") |
| Fit preferences | Tucked vs. untucked, skinny vs. relaxed, how much skin to show |
| Price sensitivity | Preferred spend per item, budget ceiling |
| Fabric & care | Comfort with dry-clean only, preference for stretch vs. structured |
| Style notes | Free-text note to stylist, optional social media / Pinterest link |

**Output — StyleFile:**
- Identifies up to 5 style types out of 10 possible (women) or 7 possible (men)
- Example women's types: Chic Minimalist, Boho Free Spirit, Classic Elegance, Urban Trendsetter, Modern Muse, Rustic Rebel, Boho Dreamer
- StyleFile is dynamic — updated by ongoing swipes in Style Shuffle feature
- Stylist assignment follows completion

**Algorithm — "Latent Style":**
- Processes 10 billion Style Shuffle swipes (thumbs up / down on individual items)
- Distills interactions into a Style Graph: 10 million coordinate positions compressed to 3 visible dimensions for internal use
- Combines latent style coordinates with 30–100 per-item clothing dimensions (colour, print, material, neckline, chest diameter, etc.)
- Also uses OpenAI embeddings to parse free-text fix request notes

**Key design insight:** Stitch Fix treats *fit* as multi-dimensional, not just a size label. They model shoulder width, bust fit, and preferred ease separately. The quiz collects the minimum viable data to bootstrap these dimensions, with feedback loops refining them over time.

**Sources:**
- [Stitch Fix Algorithms Tour](https://algorithms-tour.stitchfix.com/)
- [10 Billion Interactions on Style Shuffle](https://newsroom.stitchfix.com/blog/10-billion-interactions-and-counting-on-style-shuffle-the-data-powering-your-personalized-shopping-experience/)
- [Data-Driven Fashion Design](https://multithreaded.stitchfix.com/blog/2016/07/14/data-driven-fashion-design/)

---

### 1.2 Pinterest Style Profiles & Interest Graph

**Overview:** Pinterest does not offer an explicit "style quiz" but organises user taste through an Interest Graph — a hierarchical knowledge taxonomy used for personalisation and ad targeting.

**Interest Graph structure:**
- Hierarchical parent-child tree; top-level nodes define broad verticals (e.g. "Women's Fashion")
- Children nodes go up to 11 levels deep for granular topics
- Used in interest-based ad targeting, feed personalisation, and search

**Fashion categories (top-level and common mid-tier):**
- Women's Fashion (jewellery, bags, shoes, seasonal looks, business casual, girlie style)
- Men's Fashion
- Beauty & Grooming
- Home & Interior
- DIY & Crafts

**Aesthetic discovery mechanism:**
Pinterest doesn't categorise users into named style types. Instead, it tracks *pin behaviour* (saves, clicks, view duration) and uses visual similarity models to infer taste clusters. Users are implicitly profiled through what they save, not what they answer.

**Trend taxonomy (Pinterest Predicts — published annually):**
- 27 trends across 12 categories in the 2023 report (fashion, beauty, wellbeing, food, travel, etc.)
- 2024 highlights: sculptural jewellery (+75%), bows (+190%), vintage jazz aesthetic (+180%), grandpa core
- Pinterest claims 88% accuracy in predicting trends 1–2 years out

**Key design insight for the game:** Pinterest shows that *image-driven implicit preference capture* (pinning) can build a richer taste profile than explicit quiz answers. The game could include a "pin / skip" style-image layer on top of explicit questions.

**Sources:**
- [Pinterest Interest Taxonomy](https://medium.com/pinterest-engineering/interest-taxonomy-a-knowledge-graph-management-system-for-content-understanding-at-pinterest-a6ae75c203fd)
- [Pinterest Predicts 2024](https://business.pinterest.com/el/pinterest-predicts/)
- [Adobe Express — Pinterest Aesthetics guide](https://www.adobe.com/express/learn/blog/pinterest-aesthetics)

---

### 1.3 Thread (UK)

**Overview:** Thread (now evolved/rebranded) was a UK menswear personal styling platform that paired a style questionnaire with human stylists. Tagline: "style, not fashion" — for men who want to look good but don't want to chase trends.

**Profiling approach:**
- Initial questionnaire covering: existing wardrobe, body measurements, style preferences
- Assigned to one of 10 in-house stylists or 50 freelancers (backgrounds from GQ, Burberry, End, Browns)
- Stylist-led philosophy: teach simple rules (which colours work together, when to invest) rather than overwhelming with choice
- At peak: 200,000+ users

**Style philosophy documented:**
- Simple formulas to reduce intimidation — e.g. "navy + grey + white always works"
- Capsule wardrobe focus rather than trend-chasing
- The questionnaire treated style as learnable, not innate

**Key design insight:** Thread positioned the quiz as a *starting point for a conversation*, not a final classification. The game could use a similar framing — "help us understand your starting point so we can guide you."

**Sources:**
- [Introducing Thread — Menswear Style](https://www.menswearstyle.co.uk/2015/09/01/introducing-thread/3897)

---

### 1.4 ZARA, Mango, H&M Style Finders

**Verdict:** None of these brands have published dedicated standalone style quiz or personalisation finder tools. Their digital personalisation has instead focused on:

- **ZARA:** AR virtual try-on in app; AI-driven avatar with 3D body scanning; smart mirrors in select stores showing holographic outfit pairings. Size-related returns reduced double-digits post-launch.
- **H&M:** AI-generated digital avatars via NeXR partnership; 3D body scanning in-store. 24% increase in click-through rates; 45% reduction in production costs. No style quiz.
- **Mango:** No notable style quiz or finder identified.

**Key design insight:** Fast-fashion incumbents are investing in *fit* personalisation (virtual try-on, body scanning) rather than *taste* personalisation. The gap is in aesthetic / style-brief discovery — which is where the game operates.

**Sources:**
- [Virtual Fitting Rooms — Silkke](https://www.silkke.com/blog/virtual-fitting-to-boost-sustainability)

---

### 1.5 AI-Powered Wardrobe / Style Apps

#### Whering
- Free; batch upload up to 15 items; auto background removal and assisted tagging
- "Dress Me" shuffle tool for randomised outfit suggestions
- AI-generated outfit recommendations
- June 2024: launched social feature — view and virtually try on wardrobes of friends and influencers
- Focus: *existing wardrobe optimisation*, not brand discovery

#### Stylebook
- Legacy leader in digital closet management
- Tracks cost-per-wear, travel packing, seasonal capsules
- Strength is *structured planning*, not automated taste discovery
- No prominent AI style quiz

#### Save Your Wardrobe
- Auto-tagging + cost-per-wear analytics
- Sustainability angle: connects users to local repair/alteration services (UK-strong)
- Weakness: does not actively help users *find* or *develop* their style

**Key design insight for the game:** All three apps focus on *what you already own*, not *what you want to build*. The game occupies a different space — it's about *defining a brand vision from scratch*, which none of these tools address.

**Sources:**
- [Whering — Best Wardrobe Apps 2025](https://whering.co.uk/best-wardrobe-apps-2025)
- [Indyx — Save Your Wardrobe vs Whering](https://www.myindyx.com/versus/save-your-wardrobe-vs-whering)

---

## 2. Brand-Building / Mood Board Tools

### 2.1 Milanote

**Overview:** Visual canvas tool popular with fashion designers, stylists, and creative directors. Free tier; collaborative; drag-and-drop.

**Content types supported:**
| Type | Details |
|---|---|
| Images | Upload or search 3M+ free photos (Pexels); Web Clipper to save from any site |
| Video & audio | Embed from YouTube, Vimeo, SoundCloud |
| Colour swatches | Drag-and-drop colour cards; double-click to edit hex |
| Text & notes | Brand values, positioning statements, adjective lists, taglines |
| Typography | Upload examples; link to Typewolf/Typekit galleries |
| Files & docs | PDFs, mood board exports (PNG/JPG) |
| Nested boards | Boards within boards — master brand board containing sub-boards |

**Fashion-specific template: Fashion Moodboard**
- Placeholders for: inspirational images, colour palettes, textures
- Can cover: seasonal collection, personal style, runway concepts
- Explicit categories: logo, reference imagery, colour palette, typography, quotes

**Collaboration:**
- Invite team/clients to edit, comment, or view
- Real-time co-editing

**Key design insight for the game:** Milanote's fashion mood board template defines the canonical content types a brand brief should contain — images + colours + typography + adjective words + reference quotes. The game's brief output should cover at minimum these same dimensions.

**Sources:**
- [Milanote Fashion Moodboard Template](https://milanote.com/templates/moodboards/fashion-moodboard)
- [Milanote How to Create Better Moodboards](https://milanote.com/guide/create-better-moodboards)
- [Milanote Brand Board Template](https://milanote.com/templates/moodboards/brand-board)

---

### 2.2 Canva Brand Kit

**Overview:** Canva Pro feature for managing brand assets across a team. Supports up to 100 separate brands. Widely used by small fashion brands for social, marketing, and lookbook creation.

**Content dimensions of a Canva Brand Kit:**
- **Logo:** Upload multiple variants (primary, secondary, icon, dark/light)
- **Colour palettes:** Multiple named palettes; designate one as Primary; Colour Themes define how colours map to background / elements / text simultaneously
- **Typography:** Heading font + Body font roles; upload custom fonts (Pro); access to Adobe Fonts (via integration)
- **Brand guidelines templates:** Pre-built templates covering logo usage, typography scale, colour system, imagery style, social media examples

**Fashion-specific template example — "Gunma":**
- 8 sections: logo, typography, imagery, brand application, social media, and more
- Covers brand identity across print + digital touchpoints

**Key design insight:** Canva's Brand Kit shows the minimum viable brand system: logo + 2 colour palettes + 2 font roles. The game's output brief should produce at least these three artefacts — they are the things founders need *before* they can approach a manufacturer or brief a graphic designer.

**Sources:**
- [Canva Brand Kit](https://www.canva.com/pro/brand-kit/)
- [How to Build a Brand Kit — Canva](https://www.canva.com/learn/how-to-build-a-brand-kit/)

---

### 2.3 Adobe Express Brand Kit

**Overview:** Adobe's direct competitor to Canva; integrated with Adobe Creative Cloud ecosystem and Adobe Firefly generative AI.

**Key features:**
- **Logo + colour palette + typography** in one place — same three-pillar structure as Canva
- **Primary palette designation** — colours auto-applied as Heading/Body/Background roles
- **Extract brand from image** — upload a reference image, AI extracts a colour palette and suggested fonts
- **Apply Brand button** — one-click application of brand colours/fonts across any design
- **Adobe Firefly integration** — generate campaign imagery in brand style; commercially licensed
- **Team sharing** — distribute locked brand kits across departments; lock logos/colours from modification

**Key design insight:** The "extract brand from image" feature is notable — it suggests that a single strong reference image can bootstrap a brand kit. The game could offer a similar mechanic: upload a reference photo or select images, and the system derives colour palette suggestions.

**Sources:**
- [Adobe Express Brand Kit](https://www.adobe.com/express/create/brand-kit)
- [Best Practices — Adobe Express Brand](https://helpx.adobe.com/express/web/brands-libraries-projects/create-manage-brands/best-practices-apply-brand.html)

---

## 3. Fashion Tech / Sourcing Tools

### 3.1 CALA

**Overview:** Claims to be the "world's first fashion operating system." Founded 2016. Unifies design, development, production, logistics, and e-commerce fulfilment into one platform.

**How it works — end-to-end flow:**

1. **Ideation / brief input:**
   - Natural language prompt (integrated DALL-E): describe what you want in words
   - Or upload reference images to create a mood board / inspiration collection
   - System generates 6 design variants per prompt
   - "Regenerate" button cycles through alternatives

2. **Design refinement:**
   - Collaborative editing inside CALA — team can comment in real-time
   - Virtual prototyping — visualise in digital space before physical sample

3. **Material sourcing:**
   - AI algorithms match design requirements to materials from supplier network
   - Saves designer from manually searching fabric suppliers

4. **Manufacturer matching:**
   - 60+ factories across 13 countries; 16 fulfilment centres in 4 regions
   - System matches design to factory based on product type and quantity needs

5. **Production management:**
   - Replaces email chains with structured platform workflow
   - In-app notifications, task management, real-time commenting with manufacturers

6. **Fulfilment:**
   - Inventory management through to shipping

**Information CALA collects from a brand:**
- Design intent (text prompt or reference images)
- Product type (apparel / accessories / shoes / lifestyle)
- Quantity estimates
- Material preferences (derived from design)
- Timeline and budget (implicitly through factory matching)

**Key design insight for the game:** CALA's input layer (text prompt + image upload → AI-generated variants → selection) is a proven UX pattern for translating a vague creative idea into a manufacturable brief. The game could adopt a similar pattern for the final "brief generation" step.

**Sources:**
- [CALA's AI tech takes clothes from concept to garment — Fast Company](https://www.fastcompany.com/90903514/calla-ai-fashion-design-manufacture-clothes)
- [DALL-E integration announcement — PR Newswire](https://www.prnewswire.com/news-releases/powered-by-dall-es-ai-system-cala-makes-it-possible-to-generate-apparel-accessory-shoe-and-lifestyle-product-designs-from-natural-language-descriptions-and-reference-images-301654308.html)

---

### 3.2 Sewport (Direct-to-Factory)

**Overview:** Online marketplace connecting fashion brands directly with clothing manufacturers and factories. Accepts startups; minimum quantities from 50 pieces per style.

**How it works:**
- Brand creates a project brief on the platform (objectives, timelines, budget, product specs)
- Multiple verified manufacturers bid on the project
- Brand reviews quotes, selects manufacturer
- All communication, invoicing, and milestone tracking managed in one dashboard
- Secure Escrow payments in USD/GBP/EUR

**Information Sewport collects:**
- Product type and category
- Quantity required
- Budget range
- Timeline / deadline
- Fabric and material preferences (optional at brief stage)
- Design files (tech pack if available — otherwise described in text)

**Key design insight:** Sewport shows that a manufacturer marketplace brief does NOT require a full tech pack upfront — you can start with a text description and refine through dialogue. This is important: the game's brief output doesn't need to be a complete tech pack to be useful for initial supplier matching.

---

### 3.3 Sourcify

**Overview:** B2B manufacturing platform with 6 global offices. Specialises in China / Asia sourcing. Vets all factories before listing.

**How the brief / tech pack works at Sourcify:**

A tech pack ("Technical Packet") is their core brief format:
1. **Flat sketch:** Two-dimensional technical drawing showing silhouette, design details, and intended aesthetic
2. **Sizes and measurements:** At minimum one size (usually "medium") with precise measurements for pattern making
3. **Order quantity:** Quantity per colour / per artwork per style
4. **Material callouts:** Fabric type, weight, trims (zippers, buttons, labels)

**Publisher quote:** "Never put the factory in a position where they have to guess what to do."

**Sourcing flow:**
- Brand publishes project → factories bid → first bids arrive in under a week
- Factory visits available via Sourcify's on-the-ground team in Asia
- Post-production: logistics, distribution, COGS optimisation advice

**Key design insight for the game:** Sourcify's information architecture around a tech pack reveals the *minimum necessary* information for a Chinese manufacturer to quote: silhouette + measurements + quantity + fabric. The game's brief should produce at minimum these four outputs.

**Sources:**
- [Sourcify Apparel Sourcing](https://www.sourcify.com/apparel-sourcing/)
- [How Apparel Manufacturing Works: Tech Pack to Production](https://sourcify.com/how-apparel-manufacturing-works/)
- [The Insider's Guide to Creating a Perfect Tech Pack](https://sourcify.com/tech-packs/)

---

### 3.4 Maker's Row

**Overview:** US-focused marketplace connecting brands with American manufacturers. 200k+ brands and factories; trusted by L'Oréal, Target, IKEA. Founded 2012, Brooklyn.

**Three-step model: Learn → Connect → Produce**

**Information architecture for a project brief:**
- Objectives (what you're making, why)
- Timeline and budget
- Factory filtering: location, ratings, popularity, capabilities
- Factory profiles: portfolio, reviews, specialisations
- Advanced Search: sort by location, MOQ, product category

**Key differences from Sourcify:**
- US-manufacturing focus vs. Sourcify's global (Asia-heavy) network
- More educational resources for first-time founders
- Less structured brief format — more conversational project setup

**Sources:**
- [Maker's Row — Wikipedia](https://en.wikipedia.org/wiki/Maker's_Row)
- [Maker's Row — Fashionabc.org](https://www.fashionabc.org/wiki/makers-row/)

---

### 3.5 How These Tools Translate a Brief to Supplier Matching

Synthesised pattern across CALA, Sourcify, Sewport, Maker's Row:

| Brief dimension | Used for matching |
|---|---|
| Product category (apparel / accessories / footwear) | Filters factory specialisations |
| Silhouette / garment type | Identifies required machinery (e.g. knitwear vs. wovens) |
| Fabric weight and type | Matches factories with relevant material capabilities |
| Order quantity (MOQ) | Filters factories by minimum order size |
| Timeline | Filters by lead time and current capacity |
| Quality tier / price sensitivity | Correlates to factory tier (FOB price range) |
| Geography preference | Country / region filtering |
| Sustainability certifications | Optional filter (GOTS, OEKO-TEX, etc.) |

---

## 4. Style Selectors / Configurators in E-Commerce

### 4.1 Nike By You — The Benchmark Configurator

**Overview:** Nike's consumer-facing custom shoe builder. Available for ~50 shoe models at any time. Orders take 4–6 weeks.

**UX step-by-step decision flow:**

1. **Choose silhouette** — browse ~50 models; filter by sport/lifestyle
2. **Select component to customise** — presented as a list of named zones (e.g. for Air Force 1: Base/Upper, Heel, Mudguard, Swooshes, Lining, Laces, Eyelets, Midsole, Outsole)
3. **Choose colour** — ~10 colour options per component; full spectrum, not curated
4. **Choose material** — leather / mesh / suede / pebbled leather options depending on zone
5. **Add personalisation** — custom text or logo (moderated by Nike's rules)
6. **3D preview** — real-time 3D rendering updates as choices are made
7. **Add to cart** — size selection, then checkout

**Design philosophy on decision fatigue:**
Nike deliberately limits colour options per component (~10) despite the mathematical result still being "tens of thousands of combinations." The constraint is intentional — it prevents paralysis. The 3D preview is essential: users can see consequences of each choice immediately.

**Data collected:** Every customisation choice feeds back into Nike's product development and trend analytics.

**Key design insight for the game:** The zone-by-zone component approach (choose zone → choose material → choose colour) is a proven UX pattern for complex configuration. The game could mirror this for brand elements: choose garment category → choose silhouette family → choose fabric feel → choose colour palette.

**Sources:**
- [Nike By You — Captain Creps guide](https://captaincreps.com/nike-by-you-the-ultimate-guide-to-customising-your-sneakers/)
- [Nike By You and customisation in modern retail — Psyduct/Medium](https://psyduct.com/nike-by-you-customization-and-its-impact-on-modern-retail-468593176305?gi=83f06812c3c7)

---

### 4.2 DTC Brand Configurators — General Patterns

**Common decision order in "build your own" DTC tools:**
1. Category / product type first (broadest filter)
2. Silhouette or base model (defines the canvas)
3. Material or fabric (sets quality tier and feel)
4. Colour (most visible, most emotional)
5. Details / trims (zips, buttons, collars — functional refinements)
6. Personalisation (text, logo, monogram — last, most personal)

**Observed pattern:** Decisions move from *structural* (can't be changed later) to *aesthetic* (easier to change) to *personal* (purely expressive). This order minimises rework.

---

## 5. Content Formats That Work Well for Style Decision UIs

### 5.1 Image Grids vs. Sliders vs. Cards vs. Questionnaires

| Format | Strengths | Weaknesses | Best for |
|---|---|---|---|
| Image grid (2×2, 3×3) | High visual density; fast scanning; works well on mobile | Requires strong image curation; can feel overwhelming at scale | Aesthetic category selection; "pick your vibe" moments |
| Cards (single or pair) | Focused attention; swipeable on mobile; works with binary logic | Slower to navigate large sets | "This or that" comparisons; outfit ranking |
| Sliders | Good for scalar / spectrum choices (e.g. casual ↔ formal) | Abstract; hard to visualise the output | Expressing degree of a dimension (boldness, minimalism) |
| Text questionnaire | Precise; good for quantitative data (budget, quantity, timeline) | Low engagement; high drop-off vs. visual | Budget, MOQ, timeline — practical questions |
| Hybrid (visual + text) | Balances emotional resonance with practical precision | Complexity of building; longer quiz | Full style briefs; brand profiling |

**Research finding:** Visual questions outperform text-only questions by **340%** in fashion contexts. Personality-based visual results increase sharing by **190%**.

---

### 5.2 "This or That" Binary Choice Mechanics

**Proven UX pattern:** Present two images side-by-side; user picks one; next pair appears immediately. Used in:
- Stitch Fix "Style Shuffle" (single item thumbs up/down)
- Tinder (swipe mechanics applied to products)
- "Can't Unsee" UI design quiz (two versions, pick the better one)
- Numerous Pinterest-style aesthetic quizzes

**Why it works:**
- Eliminates decision fatigue — binary choice is cognitively cheap
- Builds preference model quickly — each choice is a data point on a dimension
- Inherently gamified — "just one more" pull
- Generates implicit data (what users choose) rather than explicit (what users claim to like)

**Design considerations:**
- Pairs should be meaningfully different along one dimension, not multiple (avoids confounds)
- Image quality must be consistently high — a lower-quality image will lose on aesthetics alone
- Progress indicator helps completion (Zeigarnik Effect — unfinished tasks are remembered)
- Should feel fast — transition between pairs under 300ms

---

### 5.3 Progressive Disclosure

**Principle (Jakob Nielsen, 1995):** Show only what the user needs at their current stage; reveal more complexity as they progress.

**Application to style quizzes:**
- Start with the broadest, most engaging question (e.g. "pick a mood" from 4 images)
- Only reveal granular questions (budget, quantity, fabric weight) after the user is invested
- Nike's onboarding: one question per screen, never multiple at once
- Duolingo model: jump-in-and-do, not read-and-decide

**Best practices:**
1. One question per screen
2. Limit options per question to 3–6 (cognitive load research shows 7± 2 as the ceiling)
3. Show a progress bar (even estimated) — reduces abandonment
4. Use checklists for multi-part sections (each check opens next screen)
5. Provide immediate feedback / visual reward after completing a section
6. Collect structural data first (category, silhouette) before aesthetic data (colour, mood)
7. Leave practical data (budget, MOQ, timeline) for last — collect these after emotional investment is established

**Sources:**
- [Nielsen Norman Group — Progressive Disclosure](https://www.nngroup.com/articles/progressive-disclosure/)
- [LogRocket — Progressive Disclosure in UX](https://blog.logrocket.com/ux-design/progressive-disclosure-ux-types-use-cases/)

---

### 5.4 Visual vs. Text-Heavy Approaches

**Key findings from UX research:**

- Visually appealing designs are perceived as *easier to use* regardless of actual usability — this is the "aesthetic-usability effect"
- Aesthetic designs are accepted more readily, used more frequently, and promote creative thinking (Universal Principles of Design)
- Photo-based quizzes dramatically reduce abandonment vs. text-only
- Mood board results (visual) are more shareable on social media than text results

**Recommended approach for the game:** Visual-first with progressive text revelation.
- Phases 1–3 of the quiz: image-only choices
- Phase 4 onwards: image + label/descriptor
- Final outputs: visual brief (mood board format) with text annotations

---

## 6. Data Taxonomy Examples

### 6.1 Stitch Fix Published Dimensions

Not fully published, but reconstructed from engineering blog posts:

**Clothing item dimensions (30–100 per item):**
- Colour (primary, secondary, tertiary)
- Print / pattern (solid, stripe, floral, geometric, abstract, animal print, etc.)
- Material / fabrication (cotton, linen, silk, knit, denim, leather, etc.)
- Weight / drape (lightweight, medium, heavy)
- Silhouette (A-line, bodycon, wrap, straight, flared, etc.)
- Neckline type (crew, V-neck, scoop, off-shoulder, collar, etc.)
- Sleeve length and style
- Occasion appropriateness (casual, work, formal, activewear)
- Fit type (slim, relaxed, oversized)
- Price tier

**Client profile dimensions (~90 at signup):**
- Body measurements (height, weight, body type, waist level)
- Exposed body area comfort (arms, back, midriff, legs)
- Lifestyle context (work type, social frequency, activity level)
- Style risk tolerance
- Fit preferences (tucked/untucked, tight/loose)
- Price range
- Free text (stylist notes)

**Latent style dimensions (derived, not collected):**
- Style coordinates in 3D latent space (derived from 10B+ Style Shuffle interactions)
- Per-item "match scores" to client latent position

---

### 6.2 Pinterest Interest Graph (Published)

**Structure:** Hierarchical tree; parent-child; up to 11 levels deep

**Top-level fashion nodes:**
- Women's Fashion
- Men's Fashion
- Kids' Fashion
- Beauty (adjacent vertical)

**Mid-tier fashion nodes (examples from published taxonomy):**
- Women's Fashion → Jewellery
- Women's Fashion → Bags & Handbags
- Women's Fashion → Shoes
- Women's Fashion → Seasonal Style
- Women's Fashion → Business Casual
- Women's Fashion → Streetwear

**Granular nodes (inferred from Predicts reports):**
- Boho, Vintage, Minimalist, Preppy, Streetwear, Dark Academia, Cottagecore, Old Money, Coquette, Soft Girl, E-Girl, Granola, Fairycore

**Sources:**
- [Pinterest Interest Taxonomy — Engineering Blog](https://medium.com/pinterest-engineering/interest-taxonomy-a-knowledge-graph-management-system-for-content-understanding-at-pinterest-a6ae75c203fd)

---

### 6.3 Fashion Aesthetic Taxonomy (Aggregated from Major Quiz Platforms)

Synthesised from A Style Set, Minimize My Mess, Litlookz Studio, and Quizly:

**Nature / Free-Spirited cluster:**
- Boho / Bohemian
- Cottagecore / Soft Romantic
- Fairycore
- Granola / Outdoorsy

**Academia cluster:**
- Dark Academia
- Light Academia

**Urban / Street cluster:**
- Streetwear
- Acubi / Y3K / Cyber Grunge
- E-Girl

**Clean / Refined cluster:**
- Minimalist
- Old Money
- Quiet Luxury

**Classic / Preppy cluster:**
- Preppy / Ivy League
- Classic / Timeless
- Business Casual

**Feminine / Playful cluster:**
- Coquette
- Soft Girl
- Balletcore / Ballerina Core

**Edgy / Alternative cluster:**
- Indie / Elevated Indie
- Grunge
- Punk
- Goth
- Biker

**Vintage / Decade-inspired cluster:**
- Vintage (decade unspecified)
- 70s / Retro
- 90s Nostalgia
- Jazz Aesthetic

**Bold / Maximalist cluster:**
- Eclectic / Chaos-Core
- Maximalist
- Statement / Bold

**Key design insight for the game:** Most platforms recognise ~30–60 named aesthetics but surface 8–15 in quizzes to avoid decision paralysis. The game should likely present 8–12 named aesthetic clusters at most, with images rather than labels doing the heavy lifting.

---

### 6.4 Fashion Brief — Canonical Data Dimensions for Supplier Matching

Synthesised from Sourcify, CALA, Sewport, Maker's Row, and Canton Fair practice:

| Dimension | Why it matters to a manufacturer |
|---|---|
| Product category | Determines machine type, factory specialisation |
| Garment type / silhouette | Pattern complexity, sewing operations required |
| Fabric / material type | Supplier chain for materials; cutting/sewing method |
| Fabric weight | Machine settings; seasonal appropriateness |
| Colour palette | Dyeing requirements; print complexity |
| Print / pattern | Screen printing / digital print capabilities needed |
| Trim specifications | Zip, button, label, elastic sourcing |
| Target retail price | Implies quality tier and allowable FOB cost |
| Order quantity (MOQ) | Filters factories by scale capability |
| Timeline (weeks to delivery) | Filters by current capacity and air vs. sea shipping |
| Target market geography | Sizing standards (US/EU/Asian sizing) |
| Certification requirements | GOTS, OEKO-TEX, Fair Trade (optional filter) |

**The minimum viable brief** for a Canton Fair manufacturer conversation:
1. Garment type and silhouette (with a reference image)
2. Fabric type and approximate weight
3. Colour palette (Pantone or image reference)
4. Order quantity
5. Target FOB price or retail price

---

## 7. Key Design Implications for the Game

1. **Lead with images, not words.** Visual questions outperform text by 340% in fashion contexts. Every question in the game should be image-first.

2. **Binary choices build the model fast.** "This or that" with two images per screen is cognitively cheap and generates clean preference data. Use this for aesthetic and silhouette decisions.

3. **Progressive disclosure is mandatory.** Broad → specific. Structural → aesthetic → practical. Never ask about budget before you've established the vision.

4. **The canonical brief dimensions** are: brand name + aesthetic cluster(s) + colour palette + typography feeling + garment category + silhouette family + fabric feel + price tier + quantity range. These map directly to what Canton Fair manufacturers need.

5. **The output should be visual, not just textual.** A mood board format (like Milanote's output) will be more useful to both the founder and the manufacturer than a form. It should be shareable and printable.

6. **Avoid naming the aesthetic too early.** Pinterest's implicit model (behaviour-based) outperforms explicit labelling. Let users choose images first; infer the aesthetic type afterward; then confirm or refine by showing them the label.

7. **The decision order that works:** Category → Silhouette → Fabric feel → Colour palette → Aesthetic mood → Brand positioning (customer, price, occasion) → Practical (quantity, timeline, budget).

8. **Stitch Fix's insight on aspirational vs. realistic answers** is directly applicable. The game should anchor answers to reality: "How often would customers wear this?" rather than "How exciting does this look?"

---

*Research compiled April 2026. All tool features subject to change. Sources linked inline.*
