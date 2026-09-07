# Video desk

The sourcing screen for the narrated videos: pick a video, read its sections, search both gif
providers for a beat, and apply a choice to the definition.

```
npm install
npm run desk        # api on 5274, front end on 5273
```

`npm run desk` starts both. The API needs the giphy and klipy keys the sourcing scripts use, from
`.env` at the repo root.

## How it fits together

- **The front end decides nothing about gifs.** Filtering, measuring, the fit rule and the search
  itself all come from the sourcing skill's engine — the same code the CLI scripts and the sourcing
  agent run, so the desk cannot drift from them.
- **The API is stdlib python**, wrapping that engine. No framework, because the engine has no
  dependencies either and this is a local single-user tool.
- **Writing a definition is delegated** to `apply-visual` in `video-generator`, where the
  definitions live and where the tests for editing them are.

## Known rough edges

- The engine is imported from `.claude/skills/video-gifs/scripts` by path. It belongs in a package
  of its own once the desk has to run outside this repo.
- Picking does not delete the gif it replaced, so asset folders collect orphans.
- The filename for a pick is taken from the last two words of the search term, which reads oddly
  as often as not. It wants to be editable before the download.
- Sections whose visual is a `clip()` (video 17) are listed but cannot be sourced; searching would
  offer gifs for a beat that wants footage.
