# productkind monorepo

This is the monorepo for productkind, a collection of products, content and tools.

## Top level directories

### [`productkind/`](productkind/) - 🌏

Everything company-level: brand assets (colors, fonts, styles), the website, the carousel design system, all outbound marketing, AI research, and pitch decks

### [`seminars/`](seminars/) - 🧠

All the assets and content for the Seminars by productkind events

### [`kim-and-tim/`](kim-and-tim/) - 🦔

All the assets and content for the Kim and Tim comics

### [`thoughts/`](thoughts/) - 🦦

All the assets and content for the Thoughts by productkind Substack

### [`little-parrot/`](little-parrot/) - 🦜

Online education platform

### [`dungarees/`](dungarees/) - 👖

Shared library for code used across the productkind monorepo

## Where does content go?

The top level holds products and publications only. Everything company-wide lives in [`productkind/`](productkind/). The filing rules:

- **All outbound marketing** (posts, carousels, promos, for any product or article) goes in [`productkind/marketing/`](productkind/marketing/). See its README for the content taxonomy and piece conventions.
- **Communication to existing Little Parrot users** (for instance the monthly user emails) is the one exception: it lives in `little-parrot/comms/`.
- **How content gets written** (cross-channel tone, post structure, generation workflows) lives in `.claude/skills/`. **Everything specific to one channel** (bios, profile assets, community norms, platform research, channel-specific writing guidance) lives in `productkind/marketing/channels/`.
- **Pitches** to companies and incubators go in [`productkind/pitch-decks/`](productkind/pitch-decks/).
- **Research findings** go in [`productkind/ai-research/`](productkind/ai-research/): audience, market and niche research, plus AI and content-performance research. The evidence lives here; the decisions made from it live in `productkind/marketing/`, and the methods and scripts that produced it live in `productkind/marketing/channels/niche-research-tools/`.

The repo is mid-migration to this structure: new content follows these rules immediately, old content moves over in batches.

## Scripts

### `npm run init`

Initializes the monorepo by setting up the environment.

### `npm run build`

Builds all the projects in the monorepo.

### `npm run bootstrap:lib -- dungarees/src/<lib> dungarees/dist/<lib>`

Run this once when you add a new `@dungarees/*` package, before you push it.

CI publishes over trusted publishing (OIDC), which carries no token and therefore cannot create a package: npm only accepts an OIDC publish for a name that already exists and already names `publish-dungarees.yaml` as a trusted publisher. Setting that up needs an interactive 2FA challenge, which no unattended job can answer.

This is `dungarees bootstrap-lib` with this repository's coordinates filled in. It reserves the name with a throwaway `0.0.0` under the `bootstrap` dist-tag, deprecates it, and registers the trusted publisher. The real release still comes from CI, with provenance. Run `npm login` first, and use npm 11.15 or newer — the command refuses to start on anything older, because `npm trust` arrived in 11.15.

The `pre-push` hook blocks a push that adds a package the registry has never seen, so you will be told if you forget. `SKIP_BOOTSTRAP_CHECK=1 git push` overrides it; the publish job then fails on main instead, and re-running it after bootstrapping is enough — no follow-up commit needed.

### `npm run trust:dungarees`

The one-off migration (`dungarees trust-libs`): registers `publish-dungarees.yaml` as the trusted publisher for every public package, one at a time in name order so a 2FA prompt is answerable and an interrupted run is resumable by eye. Add `--dry-run` to see what it would configure without touching the registry. npm rejects a package that is already set up rather than duplicating it, so re-running a half-finished migration is safe — the already-done ones are reported as failures.

## Getting started

To get started with the productkind monorepo, clone the repository and run the initialization script:

```bash
git clone https://github.com/productkind/monorepo.git
npm install
npm run init
```

## License

This repository is licensed under several licenses, depending on the directory. Please refer to the individual directories for their respective licenses.
