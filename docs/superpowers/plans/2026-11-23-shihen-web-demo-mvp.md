# Shihen Web Demo MVP Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Organize the GitHub repository and deliver a tested Phaser web demo for the three-card, time-as-resource Boss battle defined in the approved specification.

**Architecture:** Keep all rules in pure TypeScript modules and make Phaser a presentation adapter over a serializable `BattleState`. Store balance values in one card/Boss catalog, drive every state transition through explicit functions, and validate them with Vitest before wiring the scene. DeepSeek Harness performs implementation; Codex reviews each task, runs verification independently, and controls Git commits and push.

**Tech Stack:** Node.js, npm, TypeScript, Phaser 3, Vite, Vitest, GitHub Actions.

## Global Constraints

- Player starts at 50 HP; Boss starts at 64 HP.
- Each round has 3000 ms. There is no energy, mana, action point, Execute button, or End Turn button.
- Attack: 8 damage and 900 ms. Defend: 5 block and 600 ms. Time Scale: 300 ms and halves the next non-Time-Scale card duration once.
- Boss attacks for 10 when time reaches zero or the hand becomes empty.
- A played card resolves before an overrun causes the Boss attack.
- Expected fight length is 3–4 rounds and expected player loss is about 5 HP.
- Never read or write API keys, `.dsh` credentials, SSH keys, or browser data.
- DeepSeek may edit and test but must not push, force-reset, rebase, or rewrite history.
- Use the existing `codex/web-demo-mvp` worktree and preserve unrelated user changes.

---

### Task 1: Repository Sections and Project Documentation

**Files:**
- Create: `README.md`
- Create: `CONTRIBUTING.md`
- Create: `docs/game-design/game-outline.md`
- Create: `docs/game-design/combat-system.md`
- Create: `docs/game-design/ideas/README.md`
- Create: `docs/roadmap/README.md`
- Create: `docs/decisions/README.md`
- Create: `docs/playtests/README.md`
- Create: `assets/source/README.md`
- Create: `assets/ui/README.md`
- Create: `assets/audio/README.md`
- Move: `assets/concepts/shihen-core-set/time-reversal.png` → `assets/concepts/cards/time-reversal.png`
- Move: `assets/concepts/shihen-core-set/perfect-parry.png` → `assets/concepts/cards/perfect-parry.png`
- Move: `assets/concepts/shihen-core-set/delayed-burst.png` → `assets/concepts/cards/delayed-burst.png`
- Move: `assets/concepts/shihen-core-set/boss-destroyer.png` → `assets/concepts/bosses/boss-destroyer.png`

**Interfaces:**
- Consumes: approved spec and the source outline at `C:\Users\Lenovo\.codex\attachments\8647a781-277c-423c-aef6-3478fb032d45\pasted-text.txt`.
- Produces: stable repository paths used by the demo, contributors and later tasks.

- [ ] **Step 1: Create the documented directory structure and move concept art**

Use Git-aware moves for the four PNG files. Do not duplicate multi-megabyte images. Create short README files in otherwise empty asset directories so Git tracks their intended purpose.

- [ ] **Step 2: Copy the complete game outline without rewriting it**

The destination must begin with `# 《时痕》游戏设计大纲 V0.1` and preserve every section from the source attachment. Add only a one-line provenance note below the title: `> 本文件由项目原始设计大纲整理入库。`

- [ ] **Step 3: Write the combat rules document**

Include the exact table below:

```markdown
| 卡牌 | 初始牌库数量 | 耗时 | 立即效果 |
|---|---:|---:|---|
| 攻击 | 5 | 0.9 秒 | 对 Boss 造成 8 点伤害 |
| 防御 | 4 | 0.6 秒 | 获得 5 点格挡 |
| 时间缩放 | 1 | 0.3 秒 | 下一张非时间缩放牌耗时减半 |
```

State that time is the only play cost, clicking resolves immediately, and Boss damage auto-resolves at time zero or empty hand.

- [ ] **Step 4: Write contributor-facing root docs**

The root README must contain: project summary, current MVP scope, repository map, `cd demo && npm install && npm run dev`, test/build commands, and links to the outline and combat rules. CONTRIBUTING must require `codex/` or descriptive feature branches, Pull Requests, tests for rule changes, and no credentials or generated `dist/`/`node_modules/`.

- [ ] **Step 5: Verify structure**

Run:

```powershell
rg --files README.md CONTRIBUTING.md docs assets
```

Expected: every listed section exists; cards and Boss are separated; `assets/concepts/shihen-core-set/` no longer contains files.

### Task 2: Scaffold the Demo and Implement the Pure Game Model with TDD

**Files:**
- Create: `demo/package.json`
- Create: `demo/tsconfig.json`
- Create: `demo/vite.config.ts`
- Create: `demo/index.html`
- Create: `demo/src/cards/catalog.ts`
- Create: `demo/src/deck/deck.ts`
- Create: `demo/src/time/time.ts`
- Create: `demo/src/combat/types.ts`
- Create: `demo/src/combat/battle.ts`
- Create: `demo/tests/battle.test.ts`

**Interfaces:**
- Produces:
  - `type CardKind = 'attack' | 'defend' | 'timeScale'`
  - `interface CardDefinition { kind: CardKind; name: string; durationMs: number; damage?: number; block?: number }`
  - `interface BattleState { playerHp; playerBlock; bossHp; timeRemainingMs; drawPile; hand; discardPile; timeScaleArmed; phase; message; round }`
  - `createInitialBattle(random?: RandomSource): BattleState`
  - `playCard(state: BattleState, handIndex: number, random?: RandomSource): BattleState`
  - `restartBattle(random?: RandomSource): BattleState`

- [ ] **Step 1: Create npm and TypeScript configuration**

Use these scripts and dependency families:

```json
{
  "scripts": {
    "dev": "vite",
    "build": "tsc -b && vite build",
    "test": "vitest run",
    "test:watch": "vitest"
  },
  "dependencies": { "phaser": "^3.90.0" },
  "devDependencies": {
    "typescript": "^5.9.0",
    "vite": "^7.0.0",
    "vitest": "^4.0.0"
  }
}
```

Use strict TypeScript, ES2022, bundler module resolution and `types: ["vite/client", "vitest/globals"]`.

- [ ] **Step 2: Write failing tests for initialization and all three cards**

The tests must assert exact state, not snapshots:

```ts
expect(state.playerHp).toBe(50)
expect(state.bossHp).toBe(64)
expect(state.timeRemainingMs).toBe(3000)
expect(state.hand).toHaveLength(5)
```

For deterministic card tests, construct a state whose hand begins with the tested card. Verify Attack changes Boss HP `64 → 56` and time `3000 → 2100`; Defend changes block `0 → 5` and time `3000 → 2400`; Time Scale arms the flag and changes time `3000 → 2700`.

- [ ] **Step 3: Run tests and confirm failure**

Run `cd demo; npm install; npm test`.

Expected: failure because the game modules are not implemented.

- [ ] **Step 4: Implement card catalog, deck and time helpers**

`catalog.ts` must be the only source of card numbers. `deck.ts` must expose a Fisher–Yates `shuffle(cards, random)` and `drawCards(state, count, random)` that reshuffles discard when required. `time.ts` must expose:

```ts
export function cardDurationMs(baseMs: number, discounted: boolean): number {
  return discounted ? Math.round(baseMs / 2) : baseMs
}
```

- [ ] **Step 5: Implement immutable battle transitions**

`playCard` must reject invalid indexes or non-playing phases, resolve the selected effect immediately, remove the card from hand, add it to discard, apply duration, consume Time Scale only for a non-Time-Scale card, check Boss death, then auto-resolve the Boss attack if time is zero or the hand is empty.

Boss resolution must compute:

```ts
const damageTaken = Math.max(0, 10 - state.playerBlock)
```

Then clear block, restore 3000 ms, increment round and draw 5 unless the player died.

- [ ] **Step 6: Add boundary tests**

Cover: overrun card resolves before Boss attack; empty hand triggers attack; block absorbs damage and clears; Time Scale applies once; Boss death prevents counterattack; player death locks phase; discard reshuffles; restart restores initial values.

- [ ] **Step 7: Run tests**

Run `npm test` from `demo/`.

Expected: all tests pass with zero failures.

### Task 3: Implement the Phaser Battle Screen

**Files:**
- Create: `demo/src/main.ts`
- Create: `demo/src/scenes/BattleScene.ts`
- Create: `demo/src/ui/CardView.ts`
- Create: `demo/src/ui/StatusPanel.ts`
- Create: `demo/src/style.css`
- Create: `demo/src/vite-env.d.ts`
- Create: `demo/README.md`

**Interfaces:**
- Consumes: `BattleState`, `createInitialBattle`, `playCard` and `restartBattle` from Task 2.
- Produces: a browser UI that renders a state and dispatches card clicks by hand index.

- [ ] **Step 1: Configure the Phaser game**

Use a 1280×720 canvas, `Phaser.Scale.FIT`, centered auto-scaling and one `BattleScene`. Import the Boss image using the repository-relative asset path so Vite fingerprints it during build.

- [ ] **Step 2: Build the state-driven scene**

The scene must render: Boss art/title/HP and 10-damage intent; player 50 HP and block; 3.0-second time bar; draw/discard counts; event message; five clickable cards. It must not render energy, Execute or End Turn controls.

- [ ] **Step 3: Build reusable card views**

Each card shows name, immediate effect and current duration. When Time Scale is armed, non-Time-Scale cards display the halved duration before click. On click, disable input until the returned state is fully rendered to prevent duplicate resolution.

- [ ] **Step 4: Add victory, defeat and restart**

Only terminal states show a `重新开始` button. Restart calls `restartBattle` and restores normal interaction.

- [ ] **Step 5: Add responsive CSS and fallback art**

Center the canvas on a deep-blue page, preserve usability down to 800 px viewport width, and render a programmatic Boss silhouette if the concept image fails to load.

- [ ] **Step 6: Run browser build**

Run `npm run build` from `demo/`.

Expected: TypeScript compilation and Vite production build exit 0; `demo/dist/` is created but ignored by Git.

### Task 4: GitHub Collaboration and DeepSeek Task Protocol

**Files:**
- Create: `.github/ISSUE_TEMPLATE/bug.yml`
- Create: `.github/ISSUE_TEMPLATE/feature.yml`
- Create: `.github/ISSUE_TEMPLATE/design-idea.yml`
- Create: `.github/pull_request_template.md`
- Create: `.github/workflows/demo.yml`
- Create: `.ai/tasks/README.md`
- Create: `.ai/reports/README.md`
- Create: `AGENTS.md`
- Modify: `.gitignore`

**Interfaces:**
- Consumes: demo commands from Tasks 2–3.
- Produces: contributor templates, CI and repeatable Codex→DeepSeek task handoff rules.

- [ ] **Step 1: Add GitHub templates**

Bug issues request reproduction, expected/actual behavior and environment. Feature issues request player value and acceptance criteria. Design ideas request mechanic, intended decision and interaction with time. Pull Requests request summary, test commands, screenshots for UI changes and a checklist for secrets/build artifacts.

- [ ] **Step 2: Add CI**

On pushes and Pull Requests affecting `demo/**` or the workflow itself, use Node 22, `npm ci`, `npm test`, and `npm run build` with `working-directory: demo`.

- [ ] **Step 3: Add agent rules**

`AGENTS.md` must state: read the approved spec; prefer DeepSeek for broad implementation; keep game logic pure; tests accompany rule changes; no credentials; no commit/push/reset/rebase unless explicitly authorized; report modified files and verification results.

- [ ] **Step 4: Update ignores**

Ignore `demo/node_modules/`, `demo/dist/`, coverage output, local environment files and runtime `.ai` transcripts, while retaining `.ai/tasks/README.md` and `.ai/reports/README.md`.

### Task 5: Final Verification and GitHub Delivery

**Files:**
- Verify all files created or modified by Tasks 1–4.

**Interfaces:**
- Consumes: complete repository and demo.
- Produces: a reviewable branch suitable for GitHub push and Pull Request.

- [ ] **Step 1: Run the full automated verification**

```powershell
Set-Location demo
npm test
npm run build
```

Expected: both commands exit 0 with zero failed tests.

- [ ] **Step 2: Run repository checks**

```powershell
Set-Location ..
git diff --check
git status --short
rg -n "能量|执行按钮|结束回合" demo/src
```

Expected: no whitespace errors; only intended files changed; no forbidden controls or energy resource in UI code.

- [ ] **Step 3: Manually smoke-test the browser demo**

Verify Attack, Defend and Time Scale; automatic Boss attack; new round; victory; defeat; restart; no duplicate clicks; no missing Boss art.

- [ ] **Step 4: Commit reviewed work**

```powershell
git add README.md CONTRIBUTING.md AGENTS.md .github .ai assets docs demo .gitignore
git commit -m "feat: add Shihen web battle demo"
```

- [ ] **Step 5: Push the feature branch**

After Codex verification succeeds, push `codex/web-demo-mvp` to `origin` and create a Pull Request targeting `main` if GitHub authentication permits.
