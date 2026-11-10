# <Service title>

slug: <slug>
category: <exact Category from types/service.ts> (<nav group>)
source: <old-site URL> | Syd, <date>, <email / WhatsApp>
status: coming-soon | live (unapproved, listed in _review.md) | live (approved <date>)
hero-image: category default | public/images/services/<file>.jpg (1920x1080+, dark, no text, subject in right third)

Raw source: verbatim, mistakes included, reference only. Correct it when writing the data (see `data-and-content.md`). Edit the data, not this brief.

## Before writing data

- [ ] Source copy is in this brief
- [ ] Section list below is in order, with a variant for each
- [ ] Syd approved? If not, `live` only if `_review.md` lists it as approved by default
- [ ] `heroImage` override, if any
- [ ] Video id is the bare 11 characters, and the poster file exists
- [ ] Two or more services need product images? Raise an image-block ticket first

## One-liner

shortDescription: <one sentence, Syd's facts only>

## Sections (in order)

### 1. prose: <heading>

<paragraphs>

### 2. feature (grid | alternating | list): <heading>

- <title>: <one sentence> (title-only items cannot be used; `Feature` needs a description)

### 3. steps: <heading>

1. <title>: <one sentence>

### 4. specband: <heading>

- <label>: <value> (facts only, no prices)

### 5. video: <player title>

youtube-id: <id>
poster: public/images/videos/<slug>.jpg (16:9, 1280x720+, no baked-in play button). Supplied: yes / no
caption: <optional>

## FAQ source

Syd's own Q&As | none: placeholder drafted from this page's facts, listed in `_review.md`

## Not mapped (reference only)

- <logos, images, carousel files>

## Excluded

- Prices (no-pricing policy), third-party contact details, shell content already in `constants.ts`

## Rewording to confirm with Syd

- <before> -> <after>
