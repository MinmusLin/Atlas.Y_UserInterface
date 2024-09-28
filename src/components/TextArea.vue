<script setup lang="ts">
import { defineProps } from 'vue';

// 定义传入的属性 height, width, text
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
});
</script>

<template>
  <div :style="{ height: props.height+10, width: props.width+10 }" class="outer-box">
    <div :style="{ height: props.height, width: props.width }" class="inner-box">
      <p class="scroll-text">
        {{ props.text }}
      </p>
    </div>
  </div>
</template>

<style scoped>
/* 外部有色框 */
.outer-box {
  border-radius: 10px;
  border:2px solid #C5C9CD;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px;
  box-sizing: border-box;
}

/* 内部无色框 */
.inner-box {
  overflow-y: auto;
  overflow-x: hidden;
  background-color: transparent;
  padding-right: 10px;
  box-sizing: content-box;
}

/* 自定义滚动条样式 */
.inner-box::-webkit-scrollbar {
  width: 6px;
}

.inner-box::-webkit-scrollbar-thumb {
  background: #C5C9CD;
  border-radius: 6px;
  opacity: 0.2;
}


/* 文本样式 */
.scroll-text {
  font-family: 'Inter', sans-serif; /* 字体 */
  font-size: 16px; /* 字体大小 */
  font-weight: 400; /* 字体粗细 */
  line-height: 21px; /* 行高 */
  word-wrap: break-word; /* 自动换行 */
  margin: 0; /* 确保段落没有外边距 */
}
</style>
