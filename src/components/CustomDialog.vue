<template>
  <Dialog v-if="modelValue" class="dialog-container">
    <div class="dialog-content">
      <!-- 标题 -->
      <div class="title-container">
        <h2 class="dialog-title" style="font-size:16px">{{ title }}</h2>

        <!-- 描述文本 -->
        <p class="dialog-description">{{ description }}</p>
      </div>

      <!-- 价格选项 -->
      <div class="price-options">
        <div
          v-for="(price, index) in prices"
          :key="index"
          class="price-card"
          :class="{ 'selected': selectedPrice === index }"
          @click="selectPrice(index)"
        >
          <span class="price-amount">{{ price.amount }}</span>
          <span class="price-duration">{{ price.duration }}</span>
        </div>
      </div>

      <!-- 订阅按钮 -->
      <button class="subscribe-button" @click="onSubscribe">Subscribe</button>
    </div>
  </Dialog>
</template>

<script setup lang="ts">
import { ref } from 'vue';

// Props
const props = defineProps({
  title: String,
  description: String,
  prices: Array,
  modelValue: Boolean
});

// Emits
const emit = defineEmits(['update:modelValue', 'subscribe']);
const selectedPrice = ref<number | null>(null);

// Watch for changes in visibility
const closeDialog = () => {
  emit('update:modelValue', false);  // 关闭弹窗
};

// Price selection
const selectPrice = (index: number) => {
  selectedPrice.value = index;
};

// Subscribe handler
const onSubscribe = () => {
  emit('subscribe', selectedPrice.value);
  closeDialog();  // 关闭弹窗
};
</script>


<style scoped>
.dialog-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.dialog-content {
  text-align: center;
  padding: 16px;
}

.dialog-title {
  font-size: 16px;
  font-weight: bold;
  color: #333;
  margin-bottom: 12px;
}

.dialog-description {
  font-size: 16px;
  color: #6A737D;
  margin-bottom: 12px;
}

/* 价格选项容器 */
.price-options {
  display: flex;
  justify-content: space-between;
  margin-bottom: 24px;
}

/* 每个价格选项卡 */
.price-card {
  border: 2px solid #5182F8;
  border-radius: 8px;
  padding: 16px 24px;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 209px;
  height: 108px;
  cursor: pointer;
  transition: border-color 0.3s ease;
}
.price-card:hover {
  border: 1px solid #5182F8;
}
.price-card.selected {
  border: 3px solid #5182F8;
}
/* 价格金额 */
.price-amount {
  font-size: 36px;
  font-weight: bold;
  color: #FFCA31;
  margin-bottom: 4px;
}

/* 价格持续时间 */
.price-duration {
  font-size: 16px;
  color: #6A737D;
  font-weight: 600;
}

/* 订阅按钮 */
.subscribe-button {
  background-color: #5182F8;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  cursor: pointer;
  width: 100%;
  text-align: center;
}

.subscribe-button:hover {
  background-color: #4168C8;
}

.title-container {
  display: flex;
  text-align: left;
  flex-direction: column;
}
</style>
