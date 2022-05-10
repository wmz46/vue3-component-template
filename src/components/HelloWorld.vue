<script lang="ts">
export default{
  name:'HelloWorld'
}
</script>
<script setup lang="ts">
import { ref } from 'vue'

defineProps<{ msg: string }>()

const count = ref(0)
const name = import.meta.env.VITE_COMPONENT_NAME
</script>

<template>
  <h1>{{ msg }}</h1>
  <h2>{{ name }}</h2>
  <p>
    Recommended IDE setup:
    <a href='https://code.visualstudio.com/' target='_blank'>VS Code</a>
    +
    <a href='https://github.com/johnsoncodehk/volar' target='_blank'>Volar</a>
  </p>

  <p>See <code>README.md</code> for more information.</p>

  <p>
    <a href='https://vitejs.dev/guide/features.html' target='_blank'>
      Vite Docs
    </a>
    |
    <a href='https://v3.vuejs.org/' target='_blank'>Vue 3 Docs</a>
  </p>

  <button type='button' @click='count++'>count is: {{ count }}</button>
  <p>
    Edit
    <code>components/HelloWorld.vue</code> to test hot module replacement.
  </p>
  <div class='a'>
    aaaaaaaa
    <div class='b'>
      bbbbbbbbb
      <div class='c'>
        cccccccccc
      </div>
    </div>
  </div>
</template>

<style scoped lang="postcss">
a {
  color: #42b983;
}

label {
  margin: 0 0.5em;
  font-weight: bold;
}

code {
  background-color: #eee;
  padding: 2px 4px;
  border-radius: 4px;
  color: #304455;
}

.a {
  .b {

    .c {
      background-color: green;
    }

    background-color: yellow;
  }

  background-color: red;
}
</style>
