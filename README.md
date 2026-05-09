# uni-app-vite-vue3-tailwind-vscode-template

`uni-app + Vite + Vue 3 + Tailwind CSS` 的 VS Code 模板。
本项目为 [uni-app-vite-vue3-tailwind-vscode-template](https://github.com/sonofmagic/uni-app-vite-vue3-tailwind-vscode-template) 分支。
添加了Prettier配置、通用api接口封装、自定义Tailwind颜色变量等。

## 适用场景

- 使用 `uni-app` 的 `Vite` 方案开发多端项目
- 主目标是微信小程序，同时希望保留 H5 / App 等端能力
- 需要 `Vue 3`、`Pinia`、自动导入和 `weapp-tailwindcss` 集成

## 技术栈

- `uni-app`
- `Vite`
- `Vue 3`
- `Tailwind CSS v3`
- `weapp-tailwindcss`
- `npm`

## 使用前提

- Node.js `22+`
- `npm`
- 微信开发者工具

## 快速开始

```bash
npm install
npm run dev:mp-weixin
```

如果需要直接打开微信开发者工具：

```bash
npm run open:dev
```

## 常用命令

```bash
npm run dev:mp-weixin
npm run build:mp-weixin
npm run dev:h5
npm run build:h5
npm run open:dev
npm run open:build
```

## Tailwind CSS 自定义颜色

项目已配置以下自定义颜色变量，可在 Tailwind 类名中直接使用：

| 颜色名称   | RGB 值       | 说明        |
| ---------- | ------------ | ----------- |
| `primary`  | `3 171 146`  | 主色调      |
| `reminder` | `25 137 250` | 提醒/信息色 |
| `success`  | `76 217 99`  | 成功色      |
| `warning`  | `240 173 78` | 警告色      |
| `error`    | `221 82 77`  | 错误色      |

使用示例：

```vue
<template>
	<view class="text-primary">主色调文字</view>
	<view class="bg-success">成功背景</view>
	<view class="border-warning border-2">警告边框</view>
</template>
```

这些颜色定义在 `src/App.vue` 的 CSS 变量中，并在 `tailwind.config.ts` 中配置为 Tailwind 颜色扩展。

## Prettier 配置

项目已集成 Prettier 和 `prettier-plugin-tailwindcss`，提供统一的代码格式化。

### 配置详情

Prettier 配置位于 `.prettierrc`：

```json
{
	"printWidth": 80,
	"tabWidth": 4,
	"useTabs": true,
	"semi": true,
	"singleQuote": false,
	"trailingComma": "all",
	"bracketSpacing": true,
	"arrowParens": "always",
	"endOfLine": "lf",
	"vueIndentScriptAndStyle": false,
	"tailwindConfig": "./tailwind.prettier.config.ts",
	"plugins": ["prettier-plugin-tailwindcss"]
}
```

### 使用命令

```bash
npm run format        # 格式化所有文件
npm run format:check  # 检查文件格式（不修改）
```

### 格式化时机

- 提交前通过 Husky + lint-staged 自动格式化
- 开发时配合 VS Code Prettier 插件实时格式化

### VS Code 配置建议

在 `.vscode/settings.json` 中添加：

```json
{
	"editor.defaultFormatter": "esbenp.prettier-vscode",
	"editor.formatOnSave": true,
	"editor.codeActionsOnSave": {
		"source.fixAll.eslint": "explicit"
	}
}
```

## 模板说明

- 安装依赖后会自动执行 `weapp-tw patch`
- 请先把 `src/manifest.json` 中的 `appid` 改成你自己的
- 模板内保留了 `up:pkg` 和 `up:uniapp`，用于分别升级通用依赖和 `uni-app` 依赖
- 推荐在 VS Code 中安装 `Tailwind CSS IntelliSense`、`ESLint`、`Stylelint`、`Prettier`

## 项目级技能

仓库已内置项目级 `uni-app` skill，供 Codex 等 agent 在当前项目内直接复用：

- 技能目录：`.agents/skills/uni-app`
- 锁文件：`skills-lock.json`
- 技能入口：`.agents/skills/uni-app/SKILL.md`

这个仓库只保留最小集合，不提交 `.claude/`、`.continue/`、`skills/` 这类兼容性符号链接目录。

## 相关文档

- `weapp-tailwindcss`：<https://tw.icebreaker.top/>
- `uni-app`：<https://uniapp.dcloud.net.cn/>
- `Prettier`：<https://prettier.io/>
- `prettier-plugin-tailwindcss`：<https://github.com/tailwindlabs/prettier-plugin-tailwindcss>
