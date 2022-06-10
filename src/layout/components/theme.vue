
<script lang='ts' setup>
import{ ref } from 'vue'
import { useLayoutStore } from '@/store/layout'
import changeThemeColor from '@/utils/changeThemeColor'

const { getSetting } = useLayoutStore()
const defaultTheme = ref(getSetting.color.primary)
</script>
<template>
  <div>
    <el-color-picker
      v-model='defaultTheme'
      :predefine='["#409EFF", "#1890ff", "#304156", "#212121", "#11a983", "#13c2c2", "#6959CD", "#f5222d"]'
      size='mini'
      @change='changeThemeColor'
    />
  </div>
</template>