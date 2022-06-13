<script lang="ts" setup>
import { computed,reactive } from 'vue'
import areaData from './data.json'
const props = withDefaults(defineProps<{
  provice?: string | null
  city?: string | null
  district?: string | null
}>(), {
  provice: '',
  city: '',
  district: ''
})
const data = reactive({
  provice:props.provice || '',
  city:props.city || '',
  district:props.district || ''
})
const emit = defineEmits(['change', 'update:provice', 'update:city', 'update:district'])

const proviceList = computed(() => {
  return areaData.map(m => {
    return {
      code: m.code,
      name: m.name
    }
  })
})
const cityList = computed(() => {
  return areaData.find(m => m.name == data.provice)?.children.map(m => {
    return {
      code: m.code,
      name: m.name
    }
  })
})

const districtList = computed(() => {
  return areaData.find(m => m.name == data.provice)?.children.find(m => m.name == data.city)?.children.map(m => {
    return {
      code: m.code,
      name: m.name
    }
  })
})
const priviceChangeHandle = () => {
  data.city = ''
  data.district = ''
  update()
}
const cityChangeHandel = () => {
  data.district = ''
  update()
}
const districtChangeHandle = () => {
  update()
}
const update = () => {
  emit('update:provice', data.provice)
  emit('update:city', data.city)
  emit('update:district', data.district)
  emit('change', data.provice + data.city + data.district)

}
</script>
<template>
  <el-select v-model='data.provice' class='mr-3' @change='priviceChangeHandle'>
    <el-option v-for='m in proviceList' :key='m.code' :label='m.name' :value='m.name' />
  </el-select>
  <el-select v-model='data.city' class='mr-3' @change='cityChangeHandel'>
    <el-option v-for='m in cityList' :key='m.code' :label='m.name' :value='m.name' />
  </el-select>
  <el-select v-model='data.district' @change='districtChangeHandle'>
    <el-option v-for='m in districtList' :key='m.code' :label='m.name' :value='m.name' />
  </el-select>
</template>