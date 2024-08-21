<template>
  <button :style='{ width: props.width, height: props.height }' :class='{ active: props.active }'>
    {{ props.text }}
  </button>
</template>

<script setup lang='ts'>
import {defineProps} from 'vue'

const props = withDefaults(defineProps<{
  width: string
  height: string
  text: string
  active: boolean
}>(), {active: false})
</script>

<style scoped>
button {
  font-size: 16px;
  font-weight: 500;
  color: #5182F8;
  border: 2px solid #5182F8;
  border-radius: 10px;
  transition: background-color 0.2s;
  cursor: pointer;
}

button:hover {
  background-color: #EEF3FE;
}

button.active {
  color: white;
  background-color: #5182F8;
}
</style>
