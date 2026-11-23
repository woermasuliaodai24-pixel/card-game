# 《时痕》 Shihen

《时痕》是一款以“时间”代替能量的卡牌战斗游戏。玩家在一个不断流逝的时间条内出牌，每次行动都会消耗时间；Boss 会在时间耗尽或手牌打空时自动攻击。当前仓库同时承载游戏设计资料、概念美术和可运行的网页战斗 Demo。

## 当前 MVP

- 单个 Boss「毁灭者」战：玩家 50 生命，Boss 64 生命。
- 每轮 3000 毫秒；没有能量、法力、行动点，也没有“执行”或“结束回合”按钮。
- 三张基础牌：攻击（8 伤害 / 900 毫秒）、防御（5 格挡 / 600 毫秒）、时间缩放（300 毫秒，使下一张非时间缩放牌耗时减半）。
- 时间耗尽或手牌打空后，Boss 自动造成 10 点伤害；格挡优先抵消伤害。
- 支持抽牌、弃牌、重洗、胜利、失败和重新开始。

完整设计见 [游戏设计大纲](docs/game-design/game-outline.md)，规则见 [战斗系统](docs/game-design/combat-system.md)。

## 目录

```text
.
├─ demo/                 # Phaser + TypeScript + Vite 网页 Demo
│  ├─ src/cards/         # 卡牌类型与数值目录
│  ├─ src/combat/        # 纯 TypeScript 战斗状态与转移
│  ├─ src/deck/          # 抽牌、弃牌与洗牌
│  ├─ src/time/          # 时间与耗时计算
│  ├─ src/scenes/        # Phaser 战斗场景
│  ├─ src/ui/            # 场景内 UI 组件
│  └─ tests/             # Vitest 纯逻辑测试
├─ docs/                 # 设计、路线图、决策与试玩记录
├─ assets/               # 概念图、源文件、UI 与音频资产
├─ .github/              # Issue / PR 模板与 CI
├─ .ai/                  # Codex ↔ DeepSeek 任务与报告
└─ AGENTS.md             # 代理协作规则
```

## 本地运行

需要 Node.js 22 或更高版本。

```powershell
cd demo
npm install
npm run dev
```

打开 Vite 输出的本地地址即可开始战斗。生产构建与测试：

```powershell
npm test
npm run build
```

## 协作

请阅读 [CONTRIBUTING.md](CONTRIBUTING.md)。功能开发使用 `codex/` 或描述性分支，通过 Pull Request 合并；规则变更必须附带测试，且不得提交凭据、`dist/` 或 `node_modules/`。

## 当前状态

网页 Demo MVP 已可运行；数值为第一版平衡基线，后续会通过试玩记录迭代。
