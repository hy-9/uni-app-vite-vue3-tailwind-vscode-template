# Repository Guidelines

## Project Structure & Module Organization

This template uses `uni-app + Vite + Vue 3 + Tailwind CSS` with `npm`. Application code lives in `src/`. Put route pages under `src/pages/`, shared UI in `src/components/`, and Pinia stores in `src/stores/`. Static files belong in `src/static/`. Global entry files are `src/main.ts`, `src/App.vue`, `src/pages.json`, and `src/manifest.json`. Tooling is defined at the root in `vite.config.ts`, `tailwind.config.ts`, `tailwind.prettier.config.ts`, `.prettierrc`, and `eslint.config.mjs`.

## Build, Test, and Development Commands

Use `npm install` to install dependencies; `postinstall` automatically runs `weapp-tw patch`.

- `npm run dev:mp-weixin`: start WeChat Mini Program development build.
- `npm run dev:h5`: run the H5 dev server.
- `npm run build:mp-weixin`: create a production Mini Program build in `dist/build/mp-weixin`.
- `npm run build:h5`: create an H5 production build.
- `npm run open:dev`: open the WeChat DevTools against `dist/dev/mp-weixin`.
- `npm run lint`: run ESLint across the repo.
- `npm run lint:fix`: auto-fix lint issues in `src/`.
- `npm run format`: format all files with Prettier.
- `npm run format:check`: check formatting without modifying files.

## Tailwind CSS Custom Colors

The project defines 5 custom color variables that map to CSS variables defined in `src/App.vue`. These colors use the modern RGB format required by Tailwind CSS.

### Available Colors

| Color Name | CSS Variable          | RGB Value    | Usage                   |
| ---------- | --------------------- | ------------ | ----------------------- |
| `primary`  | `--color-primary-tw`  | `3 171 146`  | Main brand color        |
| `reminder` | `--color-reminder-tw` | `25 137 250` | Info/notification color |
| `success`  | `--color-success-tw`  | `76 217 99`  | Success states          |
| `warning`  | `--color-warning-tw`  | `240 173 78` | Warning states          |
| `error`    | `--color-error-tw`    | `221 82 77`  | Error states            |

### Configuration Location

These colors are configured in two places:

1. **CSS Variables**: `src/App.vue` in the `.page` style block
2. **Tailwind Extension**: `tailwind.config.ts` under `theme.extend.colors`

### Usage in Templates

```vue
<!-- Text colors -->
<view class="text-primary">Primary text</view>

<view class="text-success">Success message</view>

<!-- Background colors -->
<view class="bg-warning">Warning background</view>

<view class="bg-error">Error background</view>

<!-- Border colors -->
<view class="border-reminder border-2">Info border</view>

<!-- Opacity modifiers work with these colors -->
<view class="bg-primary/50">Semi-transparent primary</view>
```

### RGB Format Explanation

The colors use RGB format without commas (e.g., `3 171 146` not `3, 171, 146`). This is the modern Tailwind v3 format that supports opacity modifiers. The `<alpha-value>` placeholder in `tailwind.config.ts` is replaced by Tailwind with opacity values when using modifiers like `/50` or `/bg-primary/[0.5]`.

## Prettier Configuration

The project uses Prettier with `prettier-plugin-tailwindcss` for consistent code formatting.

### Configuration File

`.prettierrc` contains the main configuration:

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

### Key Settings

- **4-space indentation** for consistency with `.editorconfig`
- **LF line endings** (Unix style)
- **Double quotes** by default
- **Trailing commas** on all arguments
- **Prettier Tailwind plugin** for sorting Tailwind class names

### Tailwind Prettier Config

`tailwind.prettier.config.ts` is a separate config used by the Prettier plugin to properly sort Tailwind classes. It includes the same content configuration and CSS macro variants as `tailwind.config.ts` but without the custom colors extension (colors are handled separately).

### Pre-commit Hooks

Husky is configured to run lint-staged on commit. Files are automatically formatted by Prettier before commit when using `git commit`. The configuration in `package.json` under `lint-staged` applies formatting to staged files.

### Format Verification

Before opening a PR, run:

```bash
npm run format:check
npm run lint
```

To auto-fix issues:

```bash
npm run lint:fix
npm run format
```

## Coding Style & Naming Conventions

Follow `.editorconfig`: 4-space indentation, LF line endings, UTF-8. Prefer Vue 3 SFCs with TypeScript. Use PascalCase for component filenames such as `HeroShowcase.vue`, camelCase for store and utility modules such as `counter.ts`, and keep page directories route-aligned, for example `src/pages/index/index.vue`. ESLint uses `@icebreakers/eslint-config` with Vue, Tailwind, and WeChat rules; run `npm run lint` before opening a PR.

## Testing Guidelines

No automated test runner is configured yet. For now, treat `npm run lint` and `npm run format:check` as the minimum quality gates and verify changes manually in the target platform, usually `npm run dev:mp-weixin` plus WeChat DevTools. If you add tests, keep them near the feature or under a future `tests/` directory and use `*.spec.ts` naming.

### HMR Verification Notes

When verifying `weapp-tailwindcss` HMR, run `npm run dev:mp-weixin` in a normal, non-sandboxed shell. Codex/tool sandboxes can prevent the uni-app mini-program watcher from receiving file events, which makes `dist/dev/mp-weixin` appear stale even though the project HMR path is healthy.

For a reliable check, edit a real source SFC such as `src/components/sections/CapabilityShowcase.vue` and verify both template classes and script-side Tailwind class strings. Expected mini-program evidence includes `Incremental Compiling...` in the dev log plus transformed class names in `dist/dev/mp-weixin/**/*.wxml`, `*.js`, and `app.wxss` (for example arbitrary values converted to `*_b_*` selectors). For H5, confirm the Vite `hmr update` log and, when possible, inspect the browser computed style.

## Commit & Pull Request Guidelines

Recent history uses short Conventional Commit style prefixes such as `chore:` and `chore(deps):`. Keep that pattern for new work, for example `feat: add profile page` or `fix: correct tailwind class merge`. PRs should include a concise description, linked issue when applicable, screenshots or DevTools captures for UI changes, and the commands you used to verify the change.

## Configuration Tips

Before shipping, replace the `appid` in `src/manifest.json` with your own. Keep generated output under `dist/` out of source edits, and prefer updating source files rather than editing built artifacts.

Project-level agent skills should stay minimal in this repository. Keep installed skills under `.agents/skills/` and commit `skills-lock.json` for reproducibility. Do not commit compatibility symlink directories such as `.claude/`, `.continue/`, or `skills/` unless this repository explicitly needs those tools.

## Additional VS Code Extensions

Recommended extensions for working with this project:

- Tailwind CSS IntelliSense
- ESLint
- Stylelint
- Prettier - Code formatter
- Vue - Official extension
