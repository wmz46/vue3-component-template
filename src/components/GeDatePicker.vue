<script lang="ts" setup >
import { computed,reactive } from 'vue'
import dayjs from 'dayjs'

const props = withDefaults(defineProps<{
  modelValue: string|Date|null,
  filterable?:boolean
}>(), {
  modelValue: '',
  filterable:false
})
const emit = defineEmits(['update:modelValue','change'])
const data = reactive({
  year:NaN,
  month:NaN,
  day:NaN
})
if(typeof props.modelValue == 'string') {
  data.year = parseInt(`${props.modelValue?.split('-')?.[0]}`)
  data.month = parseInt(`${props.modelValue?.split('-')?.[1]}`)
  data.day = parseInt(`${props.modelValue?.split('-')?.[2]}`)
}else if(props.modelValue instanceof Date) {
  data.year = props.modelValue.getFullYear()
  data.month = props.modelValue.getMonth() + 1
  data.day = props.modelValue.getDate()
}
const yearOptions: any[] = []
for (let y = new Date().getFullYear() + 10; y >= 1700; y--) {
  yearOptions.push({
    value: y,
    label: `${y}`
  })
}
const maxDay = computed(() => {
  let max = 30
  if ([1,3,5, 7, 8, 10, 12].indexOf(data.month) > -1) {
    max = 31
  } else if (2 == data.month) {
    if (data.year % 4 == 0 && data.year % 100 != 0) {
      max = 29
    } else {
      max = 28
    }
  }
  console.info(data.year, data.month, max)
  return max
})
const changeHandle = () => {
  if(data.day > maxDay.value) {
    data.day = maxDay.value
  }
  const date = dayjs(`${data.year}-${data.month}-${data.day}`,'YYYY-M-D').format('YYYY-MM-DD')
  emit('update:modelValue',date)
  emit('change',date)
}

</script>
<template>
  <el-select-v2 v-model='data.year' :options='yearOptions' :filterable='filterable' allow-create @change='changeHandle' /> 年
  <el-select v-model='data.month' @change='changeHandle'>
    <el-option v-for='i of 12' :key='i' :label='i' :value='i' />
  </el-select> 月
  <el-select v-model='data.day' @change='changeHandle'>
    <el-option v-for='i of maxDay' :key='i' :lable='i' :value='i' />
  </el-select> 日
</template>
<style scoped>
</style>