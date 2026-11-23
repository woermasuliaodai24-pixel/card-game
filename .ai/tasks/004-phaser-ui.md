# Task 004: Implement the Phaser battle UI now

This is an approved implementation task. Do not brainstorm or rewrite the plan. Start editing the listed files immediately. Work only in this repository; do not commit or push.

The pure model is complete and `npm test` passes. Read its exported API in `demo/src/`, then create only:

- `demo/src/main.ts`
- `demo/src/scenes/BattleScene.ts`
- `demo/src/ui/CardView.ts`
- `demo/src/ui/StatusPanel.ts`
- `demo/src/style.css`
- `demo/src/vite-env.d.ts`
- `demo/README.md`

Build a 1280x720 Phaser 3 scene with FIT scaling. Render the Boss concept from `assets/concepts/bosses/boss-destroyer.png` through a repository-relative Vite URL, with a programmatic fallback silhouette if loading fails. Show Boss name `毁灭者`, HP 64, intent `10`, player HP 50/block, round, a 3.0-second time bar, draw/discard counts, event message, and five clickable cards.

Each card shows its Chinese name, immediate effect and current duration. When Time Scale is armed, non-Time-Scale cards display the halved duration before click. A click must call `playCard` immediately and render the returned state; prevent duplicate clicks during rendering. There must be no energy, mana, action points, Execute button or End Turn button. Boss damage is automatic through the model. Only victory/defeat shows `重新开始`, calling `restartBattle`.

Use a dark deep-blue responsive page and keep the canvas usable at 800px viewport width. Do not alter the game rules or tests.

Run `npm test` and `npm run build` from `demo/`. Write `.ai/reports/004-phaser-ui.md` with changed files and exact results, then stop. Do not touch docs outside `demo/`, GitHub files or Git history.
