<script lang="ts" setup >
import { ref, computed } from 'vue'
import dayjs from 'dayjs'

const props = withDefaults(defineProps<{
  modelValue: string|Date|null
}>(), {
  modelValue: dayjs().format('YYYY-MM-DD')
})
const emit = defineEmits(['update:modelValue','change'])
const year = ref(NaN)
const month = ref(NaN)
const day = ref(NaN)
if(typeof props.modelValue == 'string') {
  year.value = parseInt(`${props.modelValue?.split('-')?.[0]}`)
  month.value = parseInt(`${props.modelValue?.split('-')?.[1]}`)
  day.value = parseInt(`${props.modelValue?.split('-')?.[2]}`)
}else if(props.modelValue instanceof Date) {
  year.value = props.modelValue.getFullYear()
  month.value = props.modelValue.getMonth() + 1
  day.value = props.modelValue.getDate()
}else if(props.modelValue == null) {
  year.value = new Date().getFullYear()
  month.value = new Date().getMonth() + 1
  day.value = new Date().getDate()
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
  if ([1,3,5, 7, 8, 10, 12].indexOf(month.value) > -1) {
    max = 31
  } else if (2 == month.value) {
    if (year.value % 4 == 0 && year.value % 100 != 0) {
      max = 29
    } else {
      max = 28
    }
  }
  console.info(year.value, month.value, max)
  return max
})
const changeHandle = () => {
  if(day.value > maxDay.value) {
    day.value = maxDay.value
  }
  const date = dayjs(`${year.value}-${month.value}-${day.value}`,'YYYY-M-D').format('YYYY-MM-DD')
  emit('update:modelValue',date)
  emit('change',date)
}

</script>
<template>
  <el-select-v2 v-model='year' :options='yearOptions' filterable @change='changeHandle' />年
  <el-select v-model='month' filterable @change='changeHandle'>
    <el-option v-for='i of 12' :key='i' :label='i' :value='i' />
  </el-select>月
  <el-select v-model='day' filterable @change='changeHandle'>
    <el-option v-for='i of maxDay' :key='i' :lable='i' :value='i' />
  </el-select>日
</template>
<style scoped>
</style>