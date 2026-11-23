# 《时痕》网页战斗 Demo

这是一个可继续扩展的 Phaser 3 战斗样本。规则层是纯 TypeScript，界面只负责把 `BattleState` 渲染为 Boss、时间条与手牌。

## 本地运行

```powershell
cd demo
npm install
npm run dev
```

终端会显示本地地址，通常为 `http://localhost:5173`。

## 验证

```powershell
npm test
npm run build
```

当前样本只有攻击、防御、时间缩放三种牌。没有能量、法力或“执行/结束回合”按钮；点击牌立即生效，时间耗尽或手牌打空后 Boss 自动攻击。
