<template>
  <div :style='{ height: props.height + 10, width: props.width + 10 }' class='outer-box'>
    <div :style='{ height: props.height, width: props.width }' class='inner-box'>
      <p class='scroll-text'>
        {{ props.text }}
      </p>
    </div>
  </div>
</template>

<script setup lang='ts'>
import {defineProps} from 'vue'

const props = defineProps({
  height: {
    type: String,
    required: true
  },
  width: {
    type: String,
    required: true
  },
  text: {
    type: String,
    required: true
  }
})
</script>

<style scoped>
.outer-box {
  border-radius: 10px;
  border: 2px solid #C5C9CD;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px;
  box-sizing: border-box;
}

.inner-box {
  overflow-y: auto;
  overflow-x: hidden;
  background-color: transparent;
  padding-right: 10px;
  box-sizing: content-box;
}

.inner-box::-webkit-scrollbar {
  width: 6px;
}

.inner-box::-webkit-scrollbar-thumb {
  background: #DFDFE0;
  border-radius: 6px;
  opacity: 0.2;
}

.scroll-text {
  font-size: 16px;
  font-weight: 400;
  line-height: 21px;
  word-wrap: break-word;
  margin: 0;
}
</style>
