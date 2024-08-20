<template>
  <button class='start-button'>
    <slot/>
  </button>
</template>

<script setup lang='ts'>
import {defineProps} from 'vue'

interface ButtonProps {
  width: string;
  height: string;
}

defineProps<ButtonProps>();
</script>

<style scoped>
.start-button {
  height: v-bind(height);
  width: v-bind(width);
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #2F62D7;
  color: white;
  font-weight: bold;
  border-radius: 10px;
  cursor: pointer;
  transition: box-shadow 0.25s;
}

.start-button:hover {
  box-shadow: 2px 4px 8px rgba(0, 0, 0, 0.2)
}
</style>
