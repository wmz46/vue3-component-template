# Vue 3 + TypeScript + Vite

This template should help get you started developing with Vue 3 and TypeScript in Vite. The template uses Vue 3 `<script setup>` SFCs, check out the [script setup docs](https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup) to learn more.

## Recommended IDE Setup

- [VS Code](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) + [language-postcss](https://marketplace.visualstudio.com/items?itemName=cpylua.language-postcss) + [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint) + [Tailwind CSS IntelliSense](https://marketplace.visualstudio.com/items?itemName=bradlc.vscode-tailwindcss)

## Type Support For `.vue` Imports in TS

Since TypeScript cannot handle type information for `.vue` imports, they are shimmed to be a generic Vue component type by default. In most cases this is fine if you don't really care about component prop types outside of templates. However, if you wish to get actual prop types in `.vue` imports (for example to get props validation when using manual `h(...)` calls), you can enable Volar's Take Over mode by following these steps:

1. Run `Extensions: Show Built-in Extensions` from VS Code's command palette, look for `TypeScript and JavaScript Language Features`, then right click and select `Disable (Workspace)`. By default, Take Over mode will enable itself if the default TypeScript extension is disabled.
2. Reload the VS Code window by running `Developer: Reload Window` from the command palette.

You can learn more about Take Over mode [here](https://github.com/johnsoncodehk/volar/discussions/471)


# 开发背景
作为vue3组件开发的模板项目。虽然通过vite脚手架已经很简单，但是我还是希望可以直接拿来就用的配置了tailwindcss和eslint的模板项目，能通过vite进行调试，并且提供多种打包方式。
支持打包成以下三种模式：
- 无UI组件：主要是一些工具类封装，一般不需要vue
- 带UI组件：使用vue进行封装的UI组件。不使用编译工具调用可参考demo.html
- 网页：打包成一个网站网页。
# 使用
假设我的组件名为`MyComponent`
```
# 克隆项目
git clone https://github.com/wmz46/vue3-components-template.git MyComponent
# 切换进项目目录
cd MyComponent
# 安装依赖
yarn install
# 启动调试
yarn run dev
# 打包网页项目
yarn run build
# 打包无UI项目
yarn run build:core
# 打包含UI项目
yarn run build:lib
# 发布到中央仓库或私服，发布前请执行打包
npm publish
```
默认组件名为`MyComponent`，请在`.env`中修改