<template>
  <div class="ligh-induction-container">
    <!-- 自定义下拉表单 -->
    <div class="custom-select-container" :class="{ 'is-open': isOpen }">
      <div class="custom-select" @click="toggleDropdown" :class="{ 'selected': selectedValue }">
        <span>{{ selectedValue || 'Select light induction' }}</span>
        <ArrowDownBold :class="{ 'open': isOpen }" class="arrow-icon" />
      </div>
      <div v-if="isOpen" class="custom-options">
        <div class="custom-option" @click="selectOption('blue')">
          <span class="color-circle blue"></span>
          Blue light (450nm)
        </div>
        <div class="custom-option" @click="selectOption('red')">
          <span class="color-circle red"></span>
          Red light (600nm)
        </div>
        <div class="custom-option" @click="selectOption('far-red')">
          <span class="color-circle far-red"></span>
          Far-Red light (760nm)
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { ArrowDownBold } from '@element-plus/icons-vue';

// 选中的值
const selectedValue = ref<string | null>(null);

// 下拉框是否展开
const isOpen = ref(false);

// 处理选择事件
const selectOption = (value: string) => {
  selectedValue.value = value;
  isOpen.value = false;
  console.log('Selected value:', value);
};

// 切换下拉框的显示状态
const toggleDropdown = () => {
  isOpen.value = !isOpen.value;
};
</script>

<style scoped>
.light-indunction-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 1rem;
}

/* 自定义下拉容器样式 */
.custom-select-container {
  position: relative;
  width: 323px;
  height: 40px;
  font-weight: 400;
}

/* 自定义下拉框样式 */
.custom-select {
  width: 100%;
  padding: 0.5em;
  font-size: 1em;
  border: 2px solid #5182F8;
  border-radius: 10px;
  background-color: white;
  color: #C5C9CD;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: relative;
}

/* 更改选中状态下字体颜色 */
.custom-select.selected {
  color: #5182F8;
}

/* 下拉菜单样式 */
.custom-options {
  position: absolute;
  top: 100%;
  left: 0;
  width: 100%;
  margin-top: 10px;
  border-radius: 10px;
  background-color: white;
  box-shadow: 0px 0px 8px 0px #00000026; /* 添加阴影效果 */
  z-index: 1;
  display: flex;
  flex-direction: column;
  max-height: 200px;
  overflow-y: auto;
}

/* 自定义选项样式 */
.custom-option {
  color: #5182F8;
  padding: 0.5em;
  display: flex;
  align-items: center;
  cursor: pointer;
  transition: background-color 0.2s ease;
}

.custom-option:hover {
  background-color: #EEF3FE;
}

/* 颜色圆圈样式 */
.color-circle {
  width: 15px;
  height: 15px;
  border-radius: 50%;
  display: inline-block;
  margin-right: 10px;
}

.color-circle.blue {
  background-color: #5182F8;
}

.color-circle.red {
  background-color: #DA2420;
}

.color-circle.far-red {
  background-color: #671C1C;
}

.arrow-icon {
  width: 16px;
  height: 16px;
  color: #5182F8;
  transition: transform 0.25s ease;
}

/* 图标旋转样式 */
.arrow-icon.open {
  transform: rotate(180deg);
}
</style>
