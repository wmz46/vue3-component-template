<script lang="ts">
export default {
  name: 'Redirect'
}
</script>
<script lang="ts" setup>
import { useRoute, useRouter } from 'vue-router'
const route = useRoute()
const router = useRouter()
const { pathMatch } = route.params
router.replace({ path: typeof pathMatch === 'string' ? `/${pathMatch}` : `/${pathMatch.join('/')}` })
</script>
<template>
  <div />
</template>