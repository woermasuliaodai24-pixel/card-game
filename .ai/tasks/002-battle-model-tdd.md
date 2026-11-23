# Task 002: Build the pure battle model with TDD

Work only in this repository and do not commit or push.

Read:

- `docs/superpowers/specs/2026-11-23-shihen-web-demo-mvp-design.md`
- Task 2 in `docs/superpowers/plans/2026-11-23-shihen-web-demo-mvp.md`

Implement only plan Task 2. Create the `demo/` npm/Vite/TypeScript/Vitest scaffold and the pure immutable battle model. Do not build the Phaser UI yet.

Rules: player 50 HP, Boss 64 HP, round 3000 ms; no energy; Attack 8 damage/900 ms (5 copies); Defend 5 block/600 ms (4 copies); Time Scale 300 ms (1 copy) and halves the next non-Time-Scale duration once. A card resolves immediately. Boss attacks for 10 when time reaches zero or hand becomes empty. The played card resolves before overrun. Block clears after the Boss attack. Draw 5 next round and reshuffle discard. Include victory, defeat and restart.

Use tests first. Cover initialization, all three cards, one-use Time Scale, overrun ordering, empty-hand trigger, block, victory preventing counterattack, defeat locking play, reshuffle and restart. Keep balance constants in one catalog and keep transitions pure.

Required commands:

```powershell
Set-Location demo
npm install
npm test
npm run build
```

Write `.ai/reports/002-battle-model-tdd.md` with files changed and exact results. Stop afterward. Do not implement UI, GitHub templates, commit or push.
