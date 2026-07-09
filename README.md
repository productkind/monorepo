# productkind monorepo

This is the monorepo for productkind, a collection of products, content and tools.

## Top level directories

### [`productkind/`](productkind/) - 💕

Everything company-level: brand assets (colors, fonts, styles), the website, the carousel
design system, all outbound marketing, AI research, and pitch decks

### [`seminars/`](seminars/) - 🧠

All the assets and content for the Seminars by productkind events

### [`kim-and-tim/`](kim-and-tim/) - 🦦

All the assets and content for the Kim and Tim comics

### [`thoughts/`](thoughts/) - ✍

All the assets and content for the Thoughts by productkind Substack

### [`little-parrot/`](little-parrot/) - 🦜

Online education platform

### [`dungarees/`](dungarees/) - 👖

Shared library for code used across the productkind monorepo

## Where does content go?

The top level holds products and publications only. Everything company-wide lives in
[`productkind/`](productkind/). The filing rules:

- **All outbound marketing** (posts, carousels, promos, for any product or article) goes in
  [`productkind/marketing/`](productkind/marketing/). See its README for the content
  taxonomy and piece conventions.
- **Communication to existing Little Parrot users** (for instance the monthly user emails)
  is the one exception: it lives in `little-parrot/comms/`.
- **How content gets written** (cross-channel tone, post structure, generation
  workflows) lives in `.claude/skills/`. **Everything specific to one channel** (bios,
  profile assets, community norms, platform research, channel-specific writing
  guidance) lives in `productkind/marketing/channels/`.
- **Pitches** to companies and incubators go in
  [`productkind/pitch-decks/`](productkind/pitch-decks/).
- **AI research** goes in `productkind/ai-research/`.

The repo is mid-migration to this structure: new content follows these rules immediately,
old content moves over in batches.

## Scripts

### `npm run init`

Initializes the monorepo by setting up the environment.

### `npm run build`

Builds all the projects in the monorepo.

## Getting started

To get started with the productkind monorepo, clone the repository and run the initialization script:

```bash
git clone https://github.com/productkind/monorepo.git
npm install
npm run init
```

## License

This repository is licensed under several licenses, depending on the directory. Please refer to the
individual directories for their respective licenses.
