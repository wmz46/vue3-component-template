该文件夹下放路由页面
### 1.按以下规则命名的组件会自动注入
```
/src/views/{路由名称}.vue
/src/views/{路由名称}/index.vue
```
### 2.根目录注入的页面应命名为以下规则
```
/src/views/Index.vue
/src/views/Index/index.vue
```
### 3.如在`/src/router/index.ts`先定义了同名路由，则以先定义的为准。
### 4.即使组件定义了name，也会舍弃，使用文件夹或文件名生成路由