# npm2yarn — repo card

> A map, not a manual. Keep it ~1 screen; point to detail, don't inline it.

## What it is
A frozen OSS CLI tool that converts a project from npm/npm-shrinkwrap to Yarn. It was built during Mixmax's "Yarnification" sweep of 75+ repos and published to npm for others to use; no active development is expected.

## serves
role: one-shot migration CLI — checks out a `yarnify` branch, removes shrinkwrap artefacts, installs via Yarn, runs `yarn check` and `yarn test`, then stages the result and prints remaining manual steps
referenced-by: [historical internal migration tooling; any external npm user who installs `npm2yarn` globally]

## Code map
- CLI entry  -> `bin/npm2yarn.js`
- Core logic -> `src/index.js`

## Conventions
- CommonJS (`require`/`module.exports`), Node 6+ compatible
- No build step — source runs directly; no transpilation or bundling
- No test suite defined in `package.json`; `yarn test` is delegated to the target project being converted

## Gotchas
- **Frozen repo** — no active maintenance; do not add features or dependencies without strong justification
- The tool hard-codes `master` as the base branch (line 13 of `src/index.js`); repos with a different default branch will need a manual workaround
- `del` v2 and `chalk` v1 are old pinned versions; upgrade cautiously if ever needed

## Run / test
```sh
# Install globally
npm install -g npm2yarn   # or: yarn global add npm2yarn

# Run inside a target npm project directory (must be a git repo)
npm2yarn
```
No automated test suite exists in this repo.

## Load the matching domain card
This repo is cross-cutting tooling — it owns no product domain, so there is no domain card to load. When working here, load the card of the consuming service/domain if the change is driven by its needs.
