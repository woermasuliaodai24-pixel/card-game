# Agent Working Rules

1. 开始前阅读 `docs/superpowers/specs/2026-11-23-shihen-web-demo-mvp-design.md` 和相关任务文件。
2. 大范围实现优先交给 DeepSeek Harness；Codex 负责规格、测试、审查、提交与推送。
3. 游戏规则保持在纯 TypeScript 模块中，Phaser 只做状态展示和输入适配。
4. 任何规则变化都必须先增加会失败的测试，再修改实现并跑完整测试。
5. 不得读取、写入或提交 API key、`.dsh` 凭据、SSH key、浏览器数据或本地环境文件。
6. 除非用户明确授权，不得 commit、push、reset、rebase、force push 或改写历史。
7. 完成任务时报告修改文件、执行命令、测试结果、偏离计划之处与剩余风险。
