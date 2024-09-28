<template>
  <div class="subscription-card">
    <h2 class="subscription-title">{{ title }}</h2>
    <ul class="subscription-features">
      <slot></slot>
    </ul>
    <!-- 按钮部分 -->
    <button
      :class="!isSubscribed ? 'current-subscription-button':'subscribe-button'"
      @click="openDialog">
      {{!isSubscribed?'Your current Subscription':'Subscribe'}}
    </button>
  </div>
</template>

<script setup lang="ts">
import {defineProps} from 'vue'

const props = defineProps({
  title: {
    type: String,
    required: true
  },
  isSubscribed:{
    type:Boolean,
    required: true
  }
});

const emit = defineEmits(['open-dialog']);

const openDialog = () => {
  emit('open-dialog', {
    title: props.title
  });
}; // 通知父组件打开对话框
</script>

<style scoped>
.subscription-card {
  border: 2px solid #7AA8F3;
  border-radius: 8px;
  padding: 24px;
  width: 318px;
  height: 400px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background-color: #FFFFFF;
  margin-right: 12px;
}

/* 标题样式 */
.subscription-title {
  font-size: 24px;
  font-weight: bold;
  color: #333;
  text-align: left;
}

/* 功能列表样式 */
.subscription-features {
  font-size: 16px;
  color: #8F9396;
  margin-top: 12px;
  list-style-type: none;
  padding-left: 0;
  flex-grow: 1; /* 内容区域会扩展填充剩余空间 */
}

/* 嵌套列表的样式 */
.subscription-features ul {
  list-style-type: disc;
  padding-left: 20px;
}

/* 按钮样式 */
.subscribe-button {
  background-color: #5182F8;
  color: white;
  border:2px solid #5182F8;
  padding: 10px 20px;
  border-radius: 8px;
  font-size: 16px;
  cursor: pointer;
  width: 100%;
  text-align: center;
  margin-top: auto; /* 确保按钮位于底部 */
}

.subscribe-button:hover {
  background-color: #4168C8;
}

.current-subscription-button{
  background-color: #FFFFFF;
  padding: 10px 20px;
  border:2px solid #C5C9CD;
  border-radius: 8px;
  font-size: 16px;
  font-weight: bold;
  color :#C5C9CD;
  cursor: pointer;
  width: 100%;
  text-align: center;
  margin-top: auto; /* 确保按钮位于底部 */
}
</style>
