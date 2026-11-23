# 贡献指南

感谢参与《时痕》。本项目由小团队协作维护，所有改动都应保持可审查、可测试、可回滚。

## 分支与提交

- 分支使用 `codex/` 前缀或清晰的描述性名称，例如 `codex/web-demo-mvp`、`feature/time-scale-tuning`。
- 一个分支聚焦一个目标；避免把格式化、素材和规则改动混在同一个 Pull Request 中。
- 提交信息说明“做了什么、为什么”，不要把生成产物、密钥或本地环境文件带入提交。

## Pull Request

- 通过 Pull Request 合并，不直接推送到 `main`。
- 描述变更内容、玩家可见影响和验证方式。
- UI 变更附截图或录屏；规则变更说明数值依据。
- 运行 `demo/` 下的 `npm test` 和 `npm run build`，并在 PR 中粘贴结果。
- 不要在 PR、Issue 或日志中粘贴 token、API key、SSH 私钥、`.dsh` 凭据或浏览器数据。

## 规则与代码约定

- 战斗规则必须放在纯 TypeScript 模块中，Phaser 只作为表现层。
- 平衡数值集中保存在卡牌/Boss 目录；不要在场景或 UI 组件里重复写伤害、耗时、生命值。
- 规则或行为变更必须先补测试，再改实现；测试必须断言具体状态，不只做快照。
- 状态转移保持纯函数和不可变：接收 `BattleState`，返回新的 `BattleState`。
- 新增资产放入 `assets/` 对应分区；大图和源文件不要重复提交多份。

## 禁止提交的内容

- API key、token、密码、SSH 私钥、`.dsh` 凭据或浏览器配置文件。
- `node_modules/`、`dist/`、coverage 输出和其他可再生成的构建产物。
- 本地环境文件，例如 `.env`、`.env.local` 和编辑器个人配置。
- 与当前改动无关的用户文件或素材。

## 验证命令

```powershell
cd demo
npm test
npm run build
cd ..
git diff --check
git status --short
```
