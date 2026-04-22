# OpenCode 插件机制深度解析

## 概述

OpenCode 是一个开源的 AI 编程助手，其插件系统采用**双模式架构**，支持服务器端插件（Server Plugins）和终端界面插件（TUI Plugins）。本文档深入分析其插件机制的实现细节。

---

## 1. 插件系统整体架构

### 1.1 双模式架构设计

OpenCode 的插件系统分为两个独立的运行环境：

```
┌─────────────────────────────────────────────────────────────┐
│                    OpenCode Plugin System                    │
├─────────────────────────────┬───────────────────────────────┤
│     Server Plugins          │       TUI Plugins             │
│     (服务器端插件)           │      (终端界面插件)            │
├─────────────────────────────┼───────────────────────────────┤
│ • 工具注册 (Tools)          │ • 命令注册 (Commands)         │
│ • 认证扩展 (Auth)           │ • 路由扩展 (Routes)           │
│ • 模型提供者 (Providers)    │ • 插槽系统 (Slots)            │
│ • 事件处理 (Events)         │ • 主题定制 (Themes)           │
│ • Hooks 拦截               │ • 对话框组件 (Dialogs)        │
│ • 工作空间适配器            │ • 快捷键绑定 (Keybinds)       │
└─────────────────────────────┴───────────────────────────────┘
```

### 1.2 核心类型定义

```typescript
// 服务器端插件类型
export type Plugin = (
  input: PluginInput,
  options?: PluginOptions,
) => Promise<Hooks>;

// TUI 插件类型
export type TuiPlugin = (
  api: TuiPluginApi,
  options: PluginOptions | undefined,
  meta: TuiPluginMeta,
) => Promise<void>;

// 插件模块结构（互斥设计）
export type PluginModule = {
  id?: string;
  server: Plugin;
  tui?: never; // 不能同时存在
};

export type TuiPluginModule = {
  id?: string;
  tui: TuiPlugin;
  server?: never; // 不能同时存在
};
```

### 1.3 包结构

```
@opencode-ai/plugin/
├── dist/
│   ├── index.d.ts      # 服务器端插件 API
│   ├── index.js        # 主入口
│   ├── tool.d.ts       # 工具定义系统
│   ├── tui.d.ts        # TUI 插件 API (423 行)
│   ├── shell.d.ts      # BunShell 类型
│   ├── example.d.ts    # 示例插件类型
│   ├── example.js      # 示例插件实现
│   └── example-workspace.js  # 工作空间示例
└── package.json
```

---

## 2. 插件加载与注册机制

### 2.1 配置格式

插件在 `opencode.json` 中配置：

```json
{
  "$schema": "https://opencode.ai/config.json",
  "plugin": [
    "superpowers@git+https://github.com/obra/superpowers.git",
    ["opencode-helicone-session", { "apiKey": "xxx" }],
    "@my-org/custom-plugin"
  ]
}
```

配置支持两种格式：

- **字符串格式**: `"plugin-name"` 或 `"plugin-name@version"`
- **元组格式**: `["plugin-name", { options }]` 用于传递配置参数

### 2.2 插件源类型

```typescript
export type PluginSource = 'file' | 'npm' | 'internal';
```

| 源类型   | 示例                     | 说明              |
| -------- | ------------------------ | ----------------- |
| npm      | `opencode-wakatime`      | 从 npm 注册表安装 |
| Git      | `plugin@git+https://...` | 从 Git 仓库安装   |
| file     | `./local-plugin`         | 本地文件系统      |
| internal | 内置                     | 系统内置插件      |

### 2.3 加载流程

```typescript
// PluginLoader 核心流程
export namespace PluginLoader {
  export type Plan = {
    spec: string; // 插件规格
    options: ConfigPlugin.Options | undefined;
    deprecated: boolean;
  };

  export type Resolved = Plan & {
    source: PluginSource;
    target: string; // 目标目录
    entry: string; // 入口文件
    pkg?: PluginPackage;
  };

  export type Loaded = Resolved & {
    mod: Record<string, unknown>; // 加载的模块
  };
}
```

**加载阶段**：

1. **Plan（规划）**: 解析配置，规范化插件声明
2. **Resolve（解析）**: 确定插件目标位置和入口点
3. **Install（安装）**: npm 插件自动安装到 `~/.cache/opencode/node_modules/`
4. **Compatibility（兼容性检查）**: 验证版本兼容性
5. **Load（加载）**: 动态导入模块

### 2.4 插件输入上下文

```typescript
export type PluginInput = {
  // SDK 客户端
  client: ReturnType<typeof createOpencodeClient>;

  // 项目信息
  project: Project;
  directory: string; // 工作目录
  worktree: string; // Git 工作区根目录

  // 实验性功能
  experimental_workspace: {
    register(type: string, adaptor: WorkspaceAdaptor): void;
  };

  // 服务器信息
  serverUrl: URL;

  // Bun Shell 实例
  $: BunShell;
};
```

### 2.5 内置插件

```typescript
// 系统内置插件列表
const INTERNAL_PLUGINS: PluginInstance[] = [
  CodexAuthPlugin, // OpenAI Codex 认证
  CopilotAuthPlugin, // GitHub Copilot 认证
  GitlabAuthPlugin, // GitLab 认证
  PoeAuthPlugin, // Poe 认证
  CloudflareWorkersAuthPlugin, // Cloudflare Workers
  CloudflareAIGatewayAuthPlugin, // Cloudflare AI Gateway
];
```

---

## 3. 插件生命周期管理

### 3.1 TUI 插件生命周期

```typescript
export type TuiLifecycle = {
  readonly signal: AbortSignal; // 取消信号
  onDispose: (fn: TuiDispose) => () => void; // 清理注册
};

export type TuiDispose = () => void | Promise<void>;
```

### 3.2 插件状态追踪

```typescript
export type TuiPluginState = 'first' | 'updated' | 'same';

export type TuiPluginEntry = {
  id: string;
  source: 'file' | 'npm' | 'internal';
  spec: string; // 包规格
  target: string; // 安装目标
  requested?: string; // 请求的规格
  version?: string; // 安装版本
  modified?: number; // 最后修改时间
  first_time: number; // 首次安装时间
  last_time: number; // 最后加载时间
  time_changed: number; // 状态变更时间
  load_count: number; // 加载次数
  fingerprint: string; // 完整性校验
};

export type TuiPluginMeta = TuiPluginEntry & {
  state: TuiPluginState; // 当前状态
};
```

### 3.3 插件状态管理

```typescript
export type TuiPluginStatus = {
  id: string;
  source: PluginSource;
  spec: string;
  target: string;
  enabled: boolean; // 用户启用状态
  active: boolean; // 当前运行状态
};

// 插件管理 API
export type TuiPluginApi = {
  plugins: {
    list: () => ReadonlyArray<TuiPluginStatus>;
    activate: (id: string) => Promise<boolean>;
    deactivate: (id: string) => Promise<boolean>;
    add: (spec: string) => Promise<boolean>;
    install: (
      spec: string,
      options?: TuiPluginInstallOptions,
    ) => Promise<TuiPluginInstallResult>;
  };
};
```

### 3.4 生命周期流程

```
插件生命周期:

[配置读取] → [解析规格] → [安装/验证] → [加载模块] → [初始化]
                                              ↓
[事件监听] ← [执行 Hooks] ← [注册功能] ← [调用 Plugin 函数]
                                              ↓
[运行中] → [停用] → [清理资源] → [onDispose 回调]
```

---

## 4. 插件间通信机制

### 4.1 事件总线系统

```typescript
export type TuiEventBus = {
  on: <Type extends Event['type']>(
    type: Type,
    handler: (event: Extract<Event, { type: Type }>) => void,
  ) => () => void; // 返回取消订阅函数
};
```

### 4.2 事件类型列表

| 类别     | 事件                     | 说明           |
| -------- | ------------------------ | -------------- |
| **消息** | `message.updated`        | 消息更新       |
|          | `message.removed`        | 消息删除       |
|          | `message.part.updated`   | 消息部分更新   |
|          | `message.part.removed`   | 消息部分删除   |
| **会话** | `session.created`        | 会话创建       |
|          | `session.updated`        | 会话更新       |
|          | `session.deleted`        | 会话删除       |
|          | `session.compacted`      | 会话压缩       |
| **权限** | `permission.asked`       | 请求权限       |
|          | `permission.replied`     | 权限响应       |
| **文件** | `file.edited`            | 文件编辑       |
|          | `file.watcher.updated`   | 文件监视器更新 |
| **LSP**  | `lsp.updated`            | LSP 状态更新   |
|          | `lsp.client.diagnostics` | 诊断信息       |
| **TUI**  | `tui.prompt.append`      | 提示追加       |
|          | `tui.command.execute`    | 命令执行       |
|          | `tui.toast.show`         | 显示通知       |
| **Git**  | `vcs.branch.updated`     | 分支更新       |

### 4.3 Server Plugin Hooks 系统

```typescript
export interface Hooks {
  // 全局事件处理
  event?: (input: { event: Event }) => Promise<void>;

  // 配置处理
  config?: (input: Config) => Promise<void>;

  // 工具注册
  tool?: { [key: string]: ToolDefinition };

  // 认证扩展
  auth?: AuthHook;

  // 模型提供者扩展
  provider?: ProviderHook;

  // 消息拦截
  "chat.message"?: (
    input: { sessionID: string; agent?: string; /* ... */ },
    output: { message: UserMessage; parts: Part[] }
  ) => Promise<void>;

  // LLM 参数修改
  "chat.params"?: (
    input: { sessionID: string; agent: string; model: Model; /* ... */ },
    output: { temperature: number; topP: number; topK: number; /* ... */ }
  ) => Promise<void>;

  // 请求头修改
  "chat.headers"?: (
    input: { sessionID: string; agent: string; /* ... */ },
    output: { headers: Record<string, string> }
  ) => Promise<void>;

  // 权限拦截
  "permission.ask"?: (
    input: Permission,
    output: { status: "ask" | "deny" | "allow" }
  ) => Promise<void>;

  // 命令执行拦截
  "command.execute.before"?: (
    input: { command: string; sessionID: string; arguments: string },
    output: { parts: Part[] }
  ) => Promise<void>;

  // 工具执行拦截
  "tool.execute.before"?: (
    input: { tool: string; sessionID: string; callID: string },
    output: { args: any }
  ) => Promise<void>;

  "tool.execute.after"?: (
    input: { tool: string; sessionID: string; callID: string; args: any },
    output: { title: string; output: string; metadata: any }
  ) => Promise<void>;

  // Shell 环境注入
  "shell.env"?: (
    input: { cwd: string; sessionID?: string; callID?: string },
    output: { env: Record<string, string> }
  ) => Promise<void>;

  // 实验性功能
  "experimental.chat.messages.transform"?: /* ... */;
  "experimental.chat.system.transform"?: /* ... */;
  "experimental.session.compacting"?: /* ... */;
  "experimental.compaction.autocontinue"?: /* ... */;
  "experimental.text.complete"?: /* ... */;

  // 工具定义修改
  "tool.definition"?: (
    input: { toolID: string },
    output: { description: string; parameters: any }
  ) => Promise<void>;
}
```

### 4.4 Hook 触发机制

```typescript
// Trigger 类型定义
type TriggerName = {
  [K in keyof Hooks]-?: NonNullable<Hooks[K]> extends
    (input: any, output: any) => Promise<void> ? K : never
}[keyof Hooks];

// 触发函数签名
readonly trigger: <
  Name extends TriggerName,
  Input = Parameters<Required<Hooks>[Name]>[0],
  Output = Parameters<Required<Hooks>[Name]>[1],
>(
  name: Name,
  input: Input,
  output: Output,
) => Effect.Effect<Output>;
```

---

## 5. 插件配置与元数据管理

### 5.1 配置类型定义

```typescript
export type Config = Omit<SDKConfig, 'plugin'> & {
  plugin?: Array<string | [string, PluginOptions]>;
};

export type PluginOptions = Record<string, unknown>;
```

### 5.2 配置加载顺序

插件按以下顺序加载（后加载的覆盖先加载的）：

1. 全局配置 (`~/.config/opencode/opencode.json`)
2. 项目配置 (`opencode.json`)
3. 全局插件目录 (`~/.config/opencode/plugins/`)
4. 项目插件目录 (`.opencode/plugins/`)

### 5.3 插件元数据结构

```typescript
// 安装结果
export type TuiPluginInstallResult =
  | { ok: true; dir: string; tui: boolean }
  | { ok: false; message: string; missing?: boolean };

// 安装选项
export type TuiPluginInstallOptions = {
  global?: boolean; // 全局安装 vs 项目本地
};
```

### 5.4 依赖管理

本地插件可以通过 `package.json` 管理依赖：

```json
// .opencode/package.json
{
  "dependencies": {
    "shescape": "^2.1.0"
  }
}
```

OpenCode 在启动时自动运行 `bun install` 安装依赖。

---

## 6. 核心插件 API 与扩展点

### 6.1 工具定义 API

```typescript
import { z } from 'zod';

export type ToolContext = {
  sessionID: string;
  messageID: string;
  agent: string;
  directory: string; // 当前项目目录
  worktree: string; // Git 工作区根目录
  abort: AbortSignal; // 取消信号
  metadata(input: { title?: string; metadata?: { [key: string]: any } }): void;
  ask(input: AskInput): Effect.Effect<void>; // 权限请求
};

export function tool<Args extends z.ZodRawShape>(input: {
  description: string;
  args: Args;
  execute(
    args: z.infer<z.ZodObject<Args>>,
    context: ToolContext,
  ): Promise<ToolResult>;
}): ToolDefinition;

// 工具结果类型
export type ToolResult =
  | string
  | {
      output: string;
      metadata?: { [key: string]: any };
    };

tool.schema = z; // 暴露 Zod 用于类型定义
```

### 6.2 工作空间适配器 API

```typescript
export type WorkspaceInfo = {
  id: string;
  type: string;
  name: string;
  branch: string | null;
  directory: string | null;
  extra: unknown | null;
  projectID: string;
};

export type WorkspaceTarget =
  | { type: 'local'; directory: string }
  | { type: 'remote'; url: string | URL; headers?: HeadersInit };

export type WorkspaceAdaptor = {
  name: string;
  description: string;
  configure(config: WorkspaceInfo): WorkspaceInfo | Promise<WorkspaceInfo>;
  create(
    config: WorkspaceInfo,
    env: Record<string, string | undefined>,
    from?: WorkspaceInfo,
  ): Promise<void>;
  remove(config: WorkspaceInfo): Promise<void>;
  target(config: WorkspaceInfo): WorkspaceTarget | Promise<WorkspaceTarget>;
};
```

### 6.3 认证扩展 API

```typescript
export type AuthHook = {
  provider: string;
  loader?: (
    auth: () => Promise<Auth>,
    provider: Provider,
  ) => Promise<Record<string, any>>;
  methods: Array<
    | {
        type: 'oauth';
        label: string;
        prompts?: Prompt[];
        authorize(): Promise<AuthOAuthResult>;
      }
    | {
        type: 'api';
        label: string;
        prompts?: Prompt[];
        authorize?(): Promise<AuthResult>;
      }
  >;
};

export type AuthOAuthResult = {
  url: string;
  instructions: string;
} & (
  | { method: 'auto'; callback(): Promise<AuthCallbackResult> }
  | { method: 'code'; callback(code: string): Promise<AuthCallbackResult> }
);
```

### 6.4 TUI 扩展 API

#### 6.4.1 命令注册

```typescript
export type TuiCommand = {
  title: string;
  value: string;
  description?: string;
  category?: string;
  keybind?: string;
  suggested?: boolean;
  hidden?: boolean;
  enabled?: boolean;
  slash?: { name: string; aliases?: string[] };
  onSelect?: () => void;
};

// API 使用
api.command.register(() => [
  { title: 'My Command', value: 'my-cmd', onSelect: () => {} },
]);
api.command.trigger('my-cmd');
api.command.show();
```

#### 6.4.2 路由注册

```typescript
export type TuiRouteDefinition = {
  name: string;
  render: (input: { params?: Record<string, unknown> }) => JSX.Element;
};

// API 使用
api.route.register([
  { name: "custom-page", render: ({ params }) => <MyPage {...params} /> }
]);
api.route.navigate("custom-page", { id: 123 });
```

#### 6.4.3 插槽系统 (Slot System)

```typescript
// 预定义插槽映射
export type TuiHostSlotMap = {
  app: {};
  home_logo: {};
  home_prompt: { workspace_id?: string; ref?: (ref: TuiPromptRef) => void; };
  home_prompt_right: { workspace_id?: string; };
  session_prompt: { session_id: string; visible?: boolean; /* ... */ };
  session_prompt_right: { session_id: string; };
  home_bottom: {};
  home_footer: {};
  sidebar_title: { session_id: string; title: string; share_url?: string; };
  sidebar_content: { session_id: string; };
  sidebar_footer: { session_id: string; };
};

// 插槽属性
export type TuiSlotProps<Name extends string> = {
  name: Name;
  mode?: SlotMode;
  children?: JSX.Element;
} & TuiSlotShape<Name, Slots>;

// API 使用
api.slots.register({
  id: "my-slot-plugin",
  slots: {
    home_footer: () => <MyFooter />,
    sidebar_content: ({ session_id }) => <MySidebar sessionId={session_id} />
  }
});
```

#### 6.4.4 对话框组件

```typescript
export type TuiPluginApi = {
  ui: {
    Dialog: (props: TuiDialogProps) => JSX.Element;
    DialogAlert: (props: TuiDialogAlertProps) => JSX.Element;
    DialogConfirm: (props: TuiDialogConfirmProps) => JSX.Element;
    DialogPrompt: (props: TuiDialogPromptProps) => JSX.Element;
    DialogSelect: <Value>(props: TuiDialogSelectProps<Value>) => JSX.Element;
    toast: (input: TuiToast) => void;
    dialog: TuiDialogStack;
  };
};

// 使用示例
api.ui.toast({
  variant: 'success',
  title: 'Success',
  message: 'Operation completed!',
});
```

#### 6.4.5 主题系统

```typescript
export type TuiTheme = {
  readonly current: TuiThemeCurrent; // 54+ 颜色定义
  readonly selected: string;
  has: (name: string) => boolean;
  set: (name: string) => boolean;
  install: (jsonPath: string) => Promise<void>;
  mode: () => 'dark' | 'light';
  readonly ready: boolean;
};

// 主题颜色包括
// - primary, secondary, accent, error, warning, success, info
// - text, textMuted, background, border
// - diffAdded, diffRemoved, diffContext (Git diff 颜色)
// - markdownText, markdownHeading, markdownLink (Markdown 颜色)
// - syntaxComment, syntaxKeyword, syntaxFunction (语法高亮)
```

#### 6.4.6 状态与存储

```typescript
export type TuiPluginApi = {
  // 键值存储
  kv: {
    get: <Value = unknown>(key: string, fallback?: Value) => Value;
    set: (key: string, value: unknown) => void;
    readonly ready: boolean;
  };

  // 应用状态
  state: TuiState;

  // 主题
  theme: TuiTheme;

  // SDK 客户端
  client: OpencodeClient;

  // 渲染器
  renderer: CliRenderer;
};

export type TuiState = {
  readonly ready: boolean;
  readonly config: SdkConfig;
  readonly provider: ReadonlyArray<Provider>;
  readonly path: {
    state: string;
    config: string;
    worktree: string;
    directory: string;
  };
  readonly vcs: { branch?: string } | undefined;
  session: {
    count: () => number;
    diff: (sessionID: string) => ReadonlyArray<TuiSidebarFileItem>;
    todo: (sessionID: string) => ReadonlyArray<TuiSidebarTodoItem>;
    messages: (sessionID: string) => ReadonlyArray<Message>;
    status: (sessionID: string) => SessionStatus | undefined;
    permission: (sessionID: string) => ReadonlyArray<PermissionRequest>;
    question: (sessionID: string) => ReadonlyArray<QuestionRequest>;
  };
};
```

---

## 7. 插件安装、卸载与更新机制

### 7.1 安装流程

```
[解析规格] → [检查缓存] → [下载/安装] → [读取清单] → [验证兼容性] → [加载模块]
    ↓
[解析失败]  [缓存命中]   [npm/bun]    [manifest.json]  [版本检查]   [动态导入]
```

### 7.2 安装 API

```typescript
// 安装选项
export type TuiPluginInstallOptions = {
  global?: boolean; // 全局安装 vs 项目本地
};

// 安装结果
export type TuiPluginInstallResult =
  | { ok: true; dir: string; tui: boolean }
  | { ok: false; message: string; missing?: boolean };

// 使用
const result = await api.plugins.install('opencode-wakatime', {
  global: false,
});
```

### 7.3 包解析规则

```typescript
// 支持的规格格式
'package-name'; // npm 最新版
'package-name@1.2.3'; // npm 指定版本
'package@git+https://...'; // Git 仓库
'./local-plugin'; // 本地相对路径
'/absolute/path'; // 本地绝对路径
'file:///path/to/plugin'; // file 协议
```

### 7.4 配置补丁机制

```typescript
export async function patchPluginConfig(input: {
  spec: string;
  targets: Target[];
  force?: boolean;
  global?: boolean;
  vcs?: string;
  worktree: string;
  directory: string;
  config?: string;
}): Promise<PatchResult>;
```

配置补丁自动修改 `opencode.json` 或 `tui.json`，支持：

- 添加新插件
- 替换现有插件（`force: true`）
- 保持配置格式（JSONC 支持）

### 7.5 版本兼容性检查

```typescript
// npm 插件声明支持的 opencode 版本
{
  "peerDependencies": {
    "opencode": ">=1.0.0"
  }
}

// 文件插件跳过兼容性检查（视为开发代码）
if (base.source === "npm") {
  await checkPluginCompatibility(base.target, InstallationVersion, base.pkg);
}
```

### 7.6 更新机制

```typescript
// 插件状态检测
export type TuiPluginState = 'first' | 'updated' | 'same';

// 元数据包含时间戳
export type TuiPluginEntry = {
  // ...
  modified?: number; // 文件修改时间
  first_time: number; // 首次安装
  last_time: number; // 最后加载
  time_changed: number; // 状态变更
  load_count: number; // 加载计数
  fingerprint: string; // 内容指纹
};
```

---

## 8. 示例插件实现

### 8.1 简单工具插件

```typescript
import { type Plugin, tool } from '@opencode-ai/plugin';

export const CustomToolsPlugin: Plugin = async (ctx) => {
  return {
    tool: {
      // 注册自定义工具
      mytool: tool({
        description: 'This is a custom tool',
        args: {
          foo: tool.schema.string().describe('Input parameter'),
        },
        async execute(args, context) {
          const { directory, worktree } = context;
          return `Hello ${args.foo} from ${directory} (worktree: ${worktree})`;
        },
      }),
    },
  };
};
```

### 8.2 事件监听插件

```typescript
export const NotificationPlugin = async ({ project, client, $ }) => {
  return {
    event: async ({ event }) => {
      // 会话完成时发送通知
      if (event.type === 'session.idle') {
        await $`osascript -e 'display notification "Session completed!" with title "opencode"'`;
      }
    },
  };
};
```

### 8.3 环境变量注入插件

```typescript
export const InjectEnvPlugin = async () => {
  return {
    'shell.env': async (input, output) => {
      output.env.MY_API_KEY = process.env.MY_API_KEY;
      output.env.PROJECT_ROOT = input.cwd;
    },
  };
};
```

### 8.4 工作空间适配器插件

```typescript
export const FolderWorkspacePlugin = async ({ experimental_workspace }) => {
  experimental_workspace.register('folder', {
    name: 'Folder',
    description: 'Create a blank folder workspace',

    configure(config) {
      const rand = '' + Math.random();
      return { ...config, directory: `/tmp/folder/folder-${rand}` };
    },

    async create(config, env, from) {
      if (!config.directory) return;
      await mkdir(config.directory, { recursive: true });
    },

    async remove(config) {
      await rm(config.directory, { recursive: true, force: true });
    },

    target(config) {
      return { type: 'local', directory: config.directory };
    },
  });

  return {};
};
```

### 8.5 TUI 插件示例

```typescript
import type { TuiPlugin } from "@opencode-ai/plugin/tui";

const MyTuiPlugin: TuiPlugin = async (api, options, meta) => {
  // 注册命令
  const unregisterCmd = api.command.register(() => [
    {
      title: "My Custom Command",
      value: "my-cmd",
      category: "Custom",
      onSelect: () => {
        api.ui.toast({ variant: "info", message: "Command executed!" });
      },
    },
  ]);

  // 注册插槽
  const unregisterSlot = api.slots.register({
    slots: {
      home_footer: () => <MyFooterComponent />,
    },
  });

  // 订阅事件
  const unsubscribe = api.event.on("session.created", (event) => {
    console.log("New session:", event.payload.sessionID);
  });

  // 注册清理函数
  api.lifecycle.onDispose(async () => {
    unregisterCmd();
    unregisterSlot();
    unsubscribe();
  });
};

export default MyTuiPlugin;
```

---

## 9. 最佳实践

### 9.1 插件开发建议

1. **使用 TypeScript**: 利用 `@opencode-ai/plugin` 提供的类型定义
2. **错误处理**: 使用 `Effect` 类型进行函数式错误处理
3. **资源清理**: 始终在 `onDispose` 中注册清理函数
4. **版本兼容**: 声明 `peerDependencies` 中的 opencode 版本
5. **文档**: 为工具提供清晰的 `description` 和参数说明

### 9.2 工具开发模式

```typescript
import { tool } from '@opencode-ai/plugin';

export const myTool = tool({
  description: 'Clear, concise description of what this tool does',
  args: {
    path: tool.schema.string().describe('Absolute path to the file'),
    recursive: tool.schema
      .boolean()
      .optional()
      .describe('Whether to process recursively'),
  },
  async execute(args, ctx) {
    // 1. 验证输入
    // 2. 检查权限（使用 ctx.ask）
    // 3. 执行操作
    // 4. 返回结果

    ctx.metadata({
      title: 'Tool execution',
      metadata: { path: args.path },
    });

    return 'Success result';
  },
});
```

### 9.3 配置管理

```typescript
// 支持配置的插件
export const ConfigurablePlugin: Plugin = async (ctx, options) => {
  const apiKey = options?.apiKey || process.env.API_KEY;
  const timeout = options?.timeout || 5000;

  if (!apiKey) {
    throw new Error('API key is required');
  }

  return {
    // ... hooks
  };
};
```

---

## 10. 相关资源

- **官方文档**: https://opencode.ai/docs/plugins
- **GitHub 仓库**: https://github.com/anomalyco/opencode
- **插件包**: `@opencode-ai/plugin` (v1.4.6)
- **SDK 包**: `@opencode-ai/sdk` (v1.4.6)
- **Effect 库**: https://effect.website (用于函数式编程)
- **Zod 库**: https://zod.dev (用于模式验证)

---

## 总结

OpenCode 的插件系统设计精良，提供了：

1. **清晰的双模式架构**: 服务器端和 TUI 插件各司其职
2. **丰富的扩展点**: Hooks、工具、命令、路由、插槽等多种扩展方式
3. **完善的类型系统**: TypeScript 支持确保开发体验
4. **灵活的配置机制**: 支持 npm、Git、本地文件等多种来源
5. **强大的通信能力**: 事件总线和 Hooks 系统支持复杂的插件间协作

这种设计使得 OpenCode 既保持了核心功能的精简，又提供了几乎无限的扩展可能性。
