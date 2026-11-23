# Task 001: Implement the Shihen Web Demo MVP

## Working directory

Work only inside the current repository workspace on branch `codex/web-demo-mvp`.

## Read first

1. `docs/superpowers/specs/2026-11-23-shihen-web-demo-mvp-design.md`
2. `docs/superpowers/plans/2026-11-23-shihen-web-demo-mvp.md`
3. Existing repository files and Git status

The approved specification is authoritative. If this task packet and the approved specification differ, follow the approved specification and report the mismatch.

## Objective

Implement Tasks 1 through 4 of the approved plan:

1. Organize repository documentation and asset sections.
2. Build the pure TypeScript battle model using tests first.
3. Build the Phaser browser battle screen.
4. Add GitHub collaboration templates, CI, agent guidance and ignores.

Do not perform Task 5 delivery actions. Codex will independently review, test, commit and push.

## Non-negotiable game rules

- Player starts at 50 HP; Boss starts at 64 HP.
- Every round starts with 3000 ms.
- Time is the only resource. Do not add energy, mana or action points.
- There is no Execute button and no End Turn button.
- Playing a card resolves its effect immediately and subtracts its duration.
- Attack: 5 copies, 8 damage, 900 ms.
- Defend: 4 copies, 5 block, 600 ms.
- Time Scale: 1 copy, 300 ms, halves the duration of the next non-Time-Scale card once.
- Boss attacks for 10 when time reaches zero or the hand becomes empty.
- The played card resolves before an overrun triggers the Boss attack.
- Block reduces the next Boss attack, then clears.
- Draw 5 each new round; reshuffle the discard pile when required.
- Implement victory, defeat and restart states.

## Engineering constraints

- Follow the plan task-by-task and use TDD for the pure battle model.
- Keep all balance numbers in the card/Boss catalog, not duplicated in UI code.
- Keep battle transitions pure and immutable; Phaser is only a presentation adapter.
- Preserve unrelated user files and changes.
- Do not read or write credentials, API keys, `.dsh` credentials, SSH keys or browser data.
- Do not commit, push, rebase, reset, force-update or rewrite Git history.
- Do not add generated `dist/`, `node_modules/`, coverage output or local environment files to Git.
- Use `apply_patch` or normal editor operations for source changes; do not destructively replace unrelated files.

## Required verification

Before reporting completion, run from `demo/`:

```powershell
npm test
npm run build
```

Then run from the repository root:

```powershell
git diff --check
git status --short
```

Inspect the UI source and confirm that it contains no energy resource, Execute button or End Turn button.

## Completion report

Write `.ai/reports/001-shihen-web-demo-mvp.md` containing:

- Summary of implemented work
- Exact files added, moved or modified
- Test and build commands with their results
- Any deviations from the approved plan and why
- Remaining risks or manual checks for Codex

Then stop and wait for Codex review. Do not commit or push.
