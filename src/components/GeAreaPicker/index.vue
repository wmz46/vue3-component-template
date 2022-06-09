<script lang="ts" setup>
import { ref, computed } from 'vue'
import areaData from './data.json'
const props = withDefaults(defineProps<{
  provice?: string
  city?: string
  district?: string
}>(), {
  provice: '',
  city: '',
  district: ''
})
const emit = defineEmits(['change', 'update:provice', 'update:city', 'update:district'])
const proviceName = ref(props.provice)
const cityName = ref(props.city)
const districtName = ref(props.district)
const proviceList = computed(() => {
  return areaData.map(m => {
    return {
      code: m.code,
      name: m.name
    }
  })
})
const cityList = computed(() => {
  return areaData.find(m => m.name == proviceName.value)?.children.map(m => {
    return {
      code: m.code,
      name: m.name
    }
  })
})

const districtList = computed(() => {
  return areaData.find(m => m.name == proviceName.value)?.children.find(m => m.name == cityName.value)?.children.map(m => {
    return {
      code: m.code,
      name: m.name
    }
  })
})
const priviceChangeHandle = () => {
  cityName.value = ''
  districtName.value = ''
  update()
}
const cityChangeHandel = () => {
  districtName.value = ''
  update()
}
const districtChangeHandle = () => {
  update()
}
const update = () => {
  emit('update:provice', proviceName.value)
  emit('update:city', cityName.value)
  emit('update:district', districtName.value)
  emit('change',proviceName.value + cityName.value + districtName.value)

}
</script>
<template>
  <el-select v-model='proviceName' @change='priviceChangeHandle'>
    <el-option v-for='m in proviceList' :key='m.code' :label='m.name' :value='m.name' />
  </el-select>
  <el-select v-model='cityName' @change='cityChangeHandel'>
    <el-option v-for='m in cityList' :key='m.code' :label='m.name' :value='m.name' />
  </el-select>
  <el-select v-model='districtName' @change='districtChangeHandle'>
    <el-option v-for='m in districtList' :key='m.code' :label='m.name' :value='m.name' />
  </el-select>
</template>