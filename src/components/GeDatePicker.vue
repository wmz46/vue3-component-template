<script lang="ts" setup >
import { computed,reactive,watch } from 'vue'
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
const init = () => {
  if(typeof props.modelValue == 'string') {
    data.year = parseInt(`${props.modelValue?.split('-')?.[0]}`)
    data.month = parseInt(`${props.modelValue?.split('-')?.[1]}`)
    data.day = parseInt(`${props.modelValue?.split('-')?.[2]}`)
  }else if(props.modelValue instanceof Date) {
    data.year = props.modelValue.getFullYear()
    data.month = props.modelValue.getMonth() + 1
    data.day = props.modelValue.getDate()
  }
}
init()
const yearOptions: any[] = []
for (let y = new Date().getFullYear() + 10; y >= 1700; y--) {
  yearOptions.push({
    value: y,
    label: `${y}年`
  })
}
watch(() => props.modelValue,() => {
  init()
})
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
  <div v-bind='$attrs'>
    <el-select v-model='data.year' :filterable='filterable' allow-create class='w-40 mr-3' @change='changeHandle'>
      <el-option v-for='item in yearOptions' :key='item.value' :label='item.label' :value='item.value' />
    </el-select>
    <el-select v-model='data.month' class='w-40 mr-3' @change='changeHandle'>
      <el-option v-for='i of 12' :key='i' :label='i+"月"' :value='i' />
    </el-select>
    <el-select v-model='data.day' class='w-40' @change='changeHandle'>
      <el-option v-for='i of maxDay' :key='i' :label='i+"日"' :value='i' />
    </el-select>

  </div>
</template>
<style scoped>
</style>