<script lang="ts" setup>
import { computed, reactive } from 'vue'
import areaData from './data.json'
const props = withDefaults(defineProps<{
  provice?: string | null
  city?: string | null
  district?: string | null
  level: number,
  zipcode:string|null
  areacode:string|null
}>(), {
  provice: '',
  city: '',
  district: '',
  level: 4,
  zipcode:'',
  areacode:''
})
const data = reactive({
  provice: props.provice || '',
  city: props.city || '',
  district: props.district || ''
})
const emit = defineEmits(['change', 'update:provice', 'update:city', 'update:district','update:zipcode','update:areacode'])

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
const hasDistrict = computed(() => {
  if(props.level == 3) {
    if(data.city == '中山市' || data.city == '东莞市') {
      return false
    }else{
      return true
    }
  }else if(props.level == 4) {
    return true
  }else{
    return false
  }

})
const priviceChangeHandle = () => {
  data.city = ''
  data.district = ''
  update()
  const provice = areaData.find(m => m.name == data.provice)
  emit('update:zipcode',provice?.zipcode)
  emit('update:areacode',provice?.areacode)
}
const cityChangeHandel = () => {
  data.district = ''
  update()
  const city = areaData.find(m => m.name == data.provice)?.children.find(m => m.name == data.city)
  emit('update:zipcode',city?.zipcode)
  emit('update:areacode',city?.areacode)
}
const districtChangeHandle = () => {
  update()
  const district = areaData.find(m => m.name == data.provice)?.children.find(m => m.name == data.city)?.children.find(m => m.name == data.district)
  emit('update:zipcode',district?.zipcode)
  emit('update:areacode',district?.areacode)
}
const update = () => {
  emit('update:provice', data.provice)
  emit('update:city', data.city)
  emit('update:district', data.district)
  emit('change', data.provice + data.city + data.district)
}
</script>
<template>
  <el-select v-if='level>=1' v-model='data.provice' class='mr-3' placeholder='请选择省份' @change='priviceChangeHandle'>
    <el-option v-for='m in proviceList' :key='m.code' :label='m.name' :value='m.name' />
  </el-select>
  <el-select v-if='level>=2' v-model='data.city' class='mr-3' placeholder='请选择城市' @change='cityChangeHandel'>
    <el-option v-for='m in cityList' :key='m.code' :label='m.name' :value='m.name' />
  </el-select>
  <el-select v-if='level>=3 && hasDistrict' v-model='data.district' placeholder='请选择区县' @change='districtChangeHandle'>
    <el-option v-for='m in districtList' :key='m.code' :label='m.name' :value='m.name' />
  </el-select>
</template>