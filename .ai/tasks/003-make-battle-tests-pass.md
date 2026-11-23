# Task 003: Make the existing battle tests pass

Work only in this repository. Do not commit or push. Do not change the existing test expectations unless you find a genuine contradiction; report any such contradiction instead.

The project scaffold and failing tests already exist in `demo/`. Read `demo/tests/battle.test.ts`, then create only these pure TypeScript modules:

- `demo/src/cards/catalog.ts`
- `demo/src/deck/deck.ts`
- `demo/src/time/time.ts`
- `demo/src/combat/types.ts`
- `demo/src/combat/battle.ts`

Implement the API imported by the tests. Keep all card and Boss/player/round balance constants in `catalog.ts`. Use immutable state transitions. `shuffle` must use injectable Fisher-Yates randomness. `drawCards` must reshuffle discard when needed. Time Scale consumes itself only when a later non-Time-Scale card is played. Resolve a played card before checking Boss death and before any automatic Boss attack. On Boss attack, damage is `max(0, 10 - block)`, then block clears; if alive, start the next round at 3000 ms and draw 5.

Run:

```powershell
Set-Location demo
npm test
npm run build
```

The current `npm test` failure is the intentional RED checkpoint caused by missing modules. Make it GREEN. If the build fails only because the Phaser entry UI is intentionally not implemented yet, report that clearly; do not create UI files in this task.

Write `.ai/reports/003-make-battle-tests-pass.md` with changed files and exact test/build results, then stop. Do not edit documentation, UI, GitHub files or Git history.
