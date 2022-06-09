<script lang="ts" setup>
import { onMounted, ref,watch } from 'vue'
const props = defineProps<{
  src: string
}>()
const iframeRef = ref(null)
const errMsg = '无法加载本地pdf，请使用本地文件方式打开页面'
watch(() => props.src,() => {
  if(window.location.protocol.startsWith('http') && props.src.startsWith('file:')) {
    debugger
    (iframeRef.value as any).contentDocument.body.innerHTML = errMsg
  }else if(props.src.indexOf('#') > -1) {
    (iframeRef.value as any).src = props.src
  }else{
    (iframeRef.value as any).src = `${props.src}#toolbar=0&view=FitH,top`
  }
})
onMounted(() => {
  if(window.location.protocol.startsWith('http') && props.src.startsWith('file:')) {
    (iframeRef.value as any).contentDocument.body.innerHTML = errMsg
  }else if(props.src.indexOf('#') > -1) {
    (iframeRef.value as any).src = props.src
  }else{
    (iframeRef.value as any).src = `${props.src}#toolbar=0&view=FitH,top`
  }
})
</script>
<template>
  <iframe ref='iframeRef' style='width:100%;height:500px;' />
</template>
