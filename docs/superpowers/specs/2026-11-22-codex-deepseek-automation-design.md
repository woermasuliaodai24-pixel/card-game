# Codex 指挥、DeepSeek 执行的自动化工作流设计

日期：2026-11-22
状态：待用户复核

## 1. 目标

为 `card-game` 建立一套本地自动化协作流程：用户只需要向 Codex 描述需求，Codex 负责规划、派单和验收，DeepSeek 负责主要的代码理解、修改、测试与修复，从而优先消耗中科大提供的 DeepSeek token。

这套流程同时满足：

- DeepSeek Harness 中存在一个名为 `card` 的本地工作区；
- Codex 与 DeepSeek 操作同一份 Git 工作树，不创建容易分叉的第二份项目副本；
- 项目继续连接 `https://github.com/woermasuliaodai24-pixel/card-game.git`；
- 密钥不进入仓库、日志、提示词或 Git 历史；
- DeepSeek 的权限限制在当前仓库内；
- 提交、推送和 Pull Request 仍由 Codex 验收后执行。

## 2. 已确认的本机状态

- 当前 Git 仓库位于 `C:\Users\Lenovo\Documents\卡牌`，分支为 `main`，工作树干净。
- `origin` 已指向 `woermasuliaodai24-pixel/card-game`。
- DeepSeek Harness 已安装本地工作区插件，能够通过“添加工作区”选择本机目录。
- Harness 当前默认模型为 `deepseek-flash`。
- 中科大接口配置为 `https://api.llm.ustc.edu.cn/`，协议为 OpenAI Completions 兼容格式。
- DSH 凭据库已经存在，但当前普通终端没有 `USTC_API_KEY`。

## 3. 方案选择

采用“仓库内本地 Agent 桥接器”，不依赖 DeepSeek Harness 的未公开内部接口，也不把 Codex 主模型直接替换为 DeepSeek。

DeepSeek Harness 用于：

- 将现有目录添加为 `card` 工作区；
- 查看文件、Git 差异和任务结果；
- 必要时人工接管 DeepSeek 会话。

仓库内桥接器用于：

- 接收 Codex 生成的结构化任务；
- 调用中科大 `deepseek-flash`；
- 向模型提供受限的文件和命令工具；
- 记录不含密钥的执行报告；
- 以稳定的退出码向 Codex 返回成功、失败或需要澄清的状态。

## 4. 总体流程

```text
用户提出需求
    ↓
Codex 读取仓库并制定验收标准
    ↓
Codex 创建 codex/* 功能分支与任务文件
    ↓
Codex 调用本地 DeepSeek Agent 桥接器
    ↓
DeepSeek 使用中科大 token 读取、修改和测试
    ↓
桥接器生成结构化报告和 Git diff 摘要
    ↓
Codex 检查差异、测试与安全边界
    ├─ 不通过：自动生成修正任务，再交给 DeepSeek
    └─ 通过：向用户汇报，按授权提交并推送
```

默认最多进行有限次数的“执行—验收—修正”循环，避免无限消耗 token。达到上限后停止并向用户报告，而不是静默切换模型或继续重试。

## 5. 仓库结构

计划增加：

```text
AGENTS.md
.ai/
  config.json
  tasks/
    .gitkeep
  reports/
    .gitkeep
tools/
  deepseek-agent/
    README.md
    package.json
    src/
    scripts/
docs/
  workflow/
    codex-deepseek.md
```

其中：

- `AGENTS.md`：约定 Codex 优先把大规模代码生成、代码搜索和测试修复派给 DeepSeek；Codex保留规划与验收职责。
- `.ai/config.json`：只保存非敏感配置，如模型名、API 基址、迭代上限、命令策略和报告位置。
- `.ai/tasks/`：保存可审计的任务单；可在任务完成后保留或按约定归档。
- `.ai/reports/`：保存执行摘要、测试结果和 token 用量，不保存完整密钥或敏感请求头。
- `tools/deepseek-agent/`：本地桥接器及其测试。

运行期临时对话和大体积响应放在 Git 忽略目录中，避免污染仓库历史。

## 6. 任务单协议

Codex 生成 Markdown 任务单，至少包含：

- 任务编号与标题；
- 背景和目标；
- 允许修改的路径；
- 明确禁止修改的路径；
- 验收标准；
- 应运行的测试；
- 已知约束；
- 失败时需要返回的信息。

桥接器将任务单、必要的仓库摘要和工具说明发送给 DeepSeek。默认不把整个仓库或完整历史一次性塞入上下文，而是让 DeepSeek按需搜索和读取，以减少 token 消耗。

## 7. DeepSeek 工具权限

第一版提供以下受限工具：

- `list_files`：列出仓库内文件；
- `search_text`：在仓库内搜索文本；
- `read_file`：读取仓库内允许的文件；
- `apply_patch`：以补丁形式修改允许的文件；
- `git_diff`、`git_status`：只读查看 Git 状态；
- `run_command`：运行经过策略检查的构建、格式化和测试命令。

所有路径在执行前都必须解析为绝对路径，并确认仍位于仓库根目录内。符号链接和 `..` 不能绕过该检查。

`run_command` 默认拒绝：

- `git push`、`git reset --hard`、rebase、删除分支和改写历史；
- 递归删除、磁盘格式化、注册表修改和系统级安装；
- 读取 `.env`、凭据目录、SSH 密钥和浏览器数据；
- 向未允许的网络地址上传文件；
- 在 `main` 分支直接修改文件。

需要新增依赖时，DeepSeek 可以提出请求；是否安装由 Codex 根据任务范围决定。

## 8. API 与模型策略

默认配置：

```json
{
  "provider": "ustc",
  "baseUrl": "https://api.llm.ustc.edu.cn/",
  "model": "deepseek-flash",
  "fallback": "disabled"
}
```

规则：

1. 优先且默认只使用中科大接口。
2. 如果接口不可用、额度不足或模型不支持所需能力，桥接器明确失败并报告原因。
3. 未经用户确认，不自动切换到 DeepSeek 官方、OpenAI 或其他计费接口。
4. 启动时执行轻量能力探测；原生工具调用不可用时，可使用严格的 JSON action 协议，但仍沿用同一权限检查层。
5. 设置单次输出、总轮数和上下文预算，报告中记录可获得的 token 使用量。

## 9. 凭据设计

凭据解析顺序：

1. 当前进程的 `USTC_API_KEY`；
2. 当前 Windows 用户范围内、由 DPAPI 加密的桥接器凭据文件；
3. 缺失时停止并运行一次性初始化流程。

初始化流程通过无回显输入接收密钥，使用 Windows 当前用户的 DPAPI 加密，保存到仓库外的用户配置目录。它不会读取或解析 DSH 私有凭据库，也不会把密钥写入 `.env`。

桥接器必须对以下内容做日志脱敏：

- `Authorization` 请求头；
- API key 及其片段；
- 可能包含凭据的环境变量；
- 模型返回中意外复述的敏感内容。

## 10. Git 与协作规则

- 每个功能使用 `codex/<task-name>` 分支。
- 桥接器默认拒绝在 `main` 上修改。
- DeepSeek 不执行提交和推送，只修改工作树并运行验证。
- Codex验收通过后才暂存和提交。
- 推送后由项目成员通过 Pull Request 审查和合并。
- 不自动覆盖用户或朋友已有的未提交修改；检测到不干净工作树时默认停止。

DeepSeek Harness 的 `card` 工作区与 Codex 使用同一目录，所以双方看到相同分支、修改和测试结果。

## 11. Codex 的调度策略

适合派给 DeepSeek：

- 大范围代码搜索和初步理解；
- 功能实现和配套测试；
- 重复性重构；
- 测试失败后的定位与修复；
- 文档草稿和变更摘要。

Codex保留：

- 需求澄清、架构和风险决策；
- 权限扩大、依赖选择和破坏性操作判断；
- 最终 diff 审查；
- 独立运行关键验证；
- commit、push 和 Pull Request 决策。

小于调度开销的简单改动可由 Codex直接完成；其余实现工作默认先交给 DeepSeek，以达到节省 Codex token 的目标。

## 12. 报告与退出状态

每次运行生成机器可读 JSON 和简短 Markdown 报告，包含：

- 任务编号；
- 修改文件列表；
- 已执行命令及退出码；
- 测试结果；
- 未解决问题；
- API/模型名称；
- 可获得的 token 统计；
- 最终状态：`success`、`needs_review`、`needs_input` 或 `failed`。

完整模型响应默认不提交到 Git，以免泄露无关上下文并造成仓库膨胀。

## 13. 失败恢复

- API 暂时失败：指数退避并进行少量重试；超过上限后停止。
- 工具调用格式错误：向同一模型返回校验错误，允许有限次修正。
- 测试失败：把精简后的错误输出交给 DeepSeek 修复；重复失败后交回 Codex。
- 越权工具请求：拒绝执行并记录；不通过提示词授权绕过。
- 工作树出现任务范围外修改：立即停止，保留现场供 Codex检查。
- 进程中断：任务和报告具有运行编号，可从最后一个安全检查点重新发起，但不盲目重放写操作。

## 14. 验证策略

桥接器自身至少覆盖：

- 路径穿越和符号链接逃逸测试；
- 命令允许/拒绝策略测试；
- 日志脱敏测试；
- 任务单解析测试；
- API 响应和工具调用的模拟测试；
- 超时、限流和重复失败测试；
- 在临时 Git 仓库中的端到端修改测试。

真实中科大接口只用于一次最小化烟雾测试，避免在普通单元测试中消耗 token。

## 15. 分阶段交付

### 第一阶段：可靠的最小闭环

- 添加 `card` Harness 工作区；
- 建立任务单和报告协议；
- 实现安全凭据初始化；
- 实现受限工具循环；
- 完成 DeepSeek 修改临时文件并运行测试的烟雾验证；
- 写入 Codex/DeepSeek 使用说明。

### 第二阶段：效率优化

- 自动压缩仓库上下文和失败日志；
- 增加 token/耗时统计；
- 支持 Codex 自动生成修正任务；
- 增加可恢复运行和任务归档。

### 第三阶段：可选的 Harness 深度集成

仅在 DeepSeek Harness 提供稳定公开接口后，再考虑把运行状态直接显示为 Harness 任务；第一版不依赖内部接口。

## 16. 非目标

- 不让 DeepSeek 自动合并或强制推送代码；
- 不让桥接器读取 DSH 私有凭据格式；
- 不在第一版开发通用多模型平台；
- 不复制一份新的本地 Git 仓库；
- 不保证所有任务都完全不消耗 Codex token，Codex仍承担必要的规划和验收。

## 17. 验收标准

设计实现完成后，应能证明：

1. DeepSeek Harness 中可以从 `card` 工作区查看同一 Git 仓库。
2. Codex 能通过一个本地命令把结构化任务交给 `deepseek-flash`。
3. DeepSeek 能在功能分支内完成受限文件修改并运行测试。
4. Codex 能读取结构化报告并独立验收。
5. 中科大 token 不出现在仓库、日志或 Git 历史中。
6. 路径逃逸、危险命令、主分支写入和未授权模型回退均被拒绝。
7. 用户和朋友仍可通过标准 branch/commit/push/PR 流程协作。
