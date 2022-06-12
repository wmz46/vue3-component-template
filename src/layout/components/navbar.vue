
<script lang='ts' setup>
import { reactive, watch } from 'vue'
import { useLayoutStore } from '@/store/layout'
import { useRoute, RouteLocationNormalizedLoaded } from 'vue-router'
import Screenfull from '@/layout/components/screenfull.vue'
import LayoutMenubar from '@/layout/components/menubar.vue'
import defaultAvatar from '@/assets/img/default-avatar.png'
import { Fold,Expand } from '@element-plus/icons-vue'

interface IBreadcrumbList {
  path: string
  title: string | symbol
}
// 面包屑导航
const breadcrumb = (route: RouteLocationNormalizedLoaded) => {
  const fn = () => {
    const breadcrumbList:Array<IBreadcrumbList> = []
    const notShowBreadcrumbList = ['Dashboard', 'RedirectPage'] // 不显示面包屑的导航
    if(route.matched[0] && (notShowBreadcrumbList.includes(route.matched[0].name as string))) return breadcrumbList
    route.matched.forEach(v => {
      const obj:IBreadcrumbList = {
        title: v.meta.title as string,
        path: v.path
      }
      breadcrumbList.push(obj)
    })
    return breadcrumbList
  }
  let data = reactive({
    breadcrumbList: fn()
  })
  watch(() => route.path, () => data.breadcrumbList = fn())
  return { data }
}
const { getMenubar, getUserInfo, changeCollapsed, logout, getSetting } = useLayoutStore()
const route = useRoute()
const title = ''
const { data } = breadcrumb(route)
</script>
<template>
  <div v-if='getSetting.mode === "vertical" || getMenubar.isPhone' class='flex items-center px-4 flex-wrap h-12 leading-12'>
    <el-icon class='cursor-pointer h-12 leading-12' :size='24' @click='changeCollapsed'>
      <Fold v-if='!getMenubar.status' />
      <Expand v-else />
    </el-icon>
    <!-- 面包屑导航 -->
    <div class='px-4'>
      <el-breadcrumb separator='/'>
        <transition-group name='breadcrumb'>
          <el-breadcrumb-item key='/' :to='{ path: "/" }'>主页</el-breadcrumb-item>
          <el-breadcrumb-item v-for='v in data.breadcrumbList' :key='v.path' :to='v.path'>{{ v.title }}</el-breadcrumb-item>
        </transition-group>
      </el-breadcrumb>
    </div>
  </div>
  <div v-else class='flex items-center px-4 flex-wrap h-12 flex-1'>
    <div class='layout-sidebar-logo flex relative shadow-lg w-40 leading-12 items-center'>
      <img class='w-6 h-8' :src='icon'>
      <span v-if='getMenubar.status === 0 || getMenubar.status === 2' class='pl-2'>{{ title }}</span>
    </div>
    <div class='layout-sidebar-menubar flex flex-1 overflow-hidden'>
      <layout-menubar />
    </div>
  </div>
  <div class='flex items-center flex-row-reverse px-4 min-width-32'>
    <!-- 用户下拉 -->
    <el-dropdown>
      <span class='el-dropdown-link flex flex-center px-2'>
        <el-avatar :size='30' :src='getUserInfo.avatar || defaultAvatar' />
        <span class='ml-2'>{{ getUserInfo.name }}</span>
        <i class='el-icon-arrow-down el-icon--right' />
      </span>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item>修改密码</el-dropdown-item>
          <el-dropdown-item divided @click='logout'>退出登录</el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
    <Screenfull />
  </div>
</template>


<style lang='postcss' scoped>
.breadcrumb-enter-active,
.breadcrumb-leave-active {
    transition: all 0.5s;
}

.breadcrumb-enter-from,
.breadcrumb-leave-active {
    opacity: 0;
    transform: translateX(20px);
}

.breadcrumb-move {
    transition: all 0.5s;
}

.breadcrumb-leave-active {
    position: absolute;
}
</style>