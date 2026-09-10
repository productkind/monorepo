# SEO content

This directory is the editorial home for evergreen search content. Campaign
folders may create or promote an article, but the article itself lives here so
it can be maintained after the campaign ends.

## Structure

```text
seo/
├── README.md
├── content-ledger.md
└── [audience]/
    └── [topic-cluster]/
        ├── cluster.md
        └── [article-slug]/
            ├── article.md
            └── assets/
```

- **Audience** groups content by the reader it is intended to attract.
- **Topic cluster** contains the search strategy, article roadmap and internal
  links for one connected subject.
- **Article slug** is the stable URL slug without `/guides/` or another route
  prefix.
- **article.md** is the editorial source for the article.
- **assets/** contains diagrams, image exports and downloadable resources used
  only by that article.

Do not number article directories. Priorities and publishing order can change;
the URL slug should remain stable.

## Article frontmatter

Each article should record:

- status;
- brand and author;
- originating campaign, when applicable;
- primary and secondary queries;
- search intent and page promise;
- slug, canonical URL and metadata;
- conversion destination;
- published and updated dates when they exist;
- the deployed application file when the website stores a second copy.

Use these status values consistently: `idea`, `drafted`, `approved`,
`published`, `refreshing` and `retired`.

## Source of truth

`article.md` is the editorial source. If the published website stores the body
in TypeScript or another format, add its path to the article frontmatter as
`published_file` and compare the two copies whenever the article changes.

The cluster plan owns keyword evidence, publishing order and internal-link
design. The shared [content ledger](./content-ledger.md) owns measurement dates
and results. Campaign folders retain promotion plans, captions, videos and
experiment results, then link back to the relevant cluster.
