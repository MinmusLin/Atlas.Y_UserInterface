<template>
  <div class="algorithm-item" @click="openDialog">
    <div class="item-container">
      <h3 class="algorithm-title">{{ title }}</h3>
      <p class="algorithm-description" :style="{'-webkit-line-clamp': lineClamp}">{{ description }}</p>
    </div>

    <div class="algorithm-footer">
      <span class="times-left">
        <span class="time">{{ timesLeft }}</span>
        times left</span>
      <div class="footer-right">
        <span class="price">{{ price }}$</span>
        <button class="buy-button" @click="openDialog">BUY</button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  title: String,
  description: String,
  timesLeft: Number,
  price: Number,
  lineClamp: {
    type: Number,
    default: 3
  }
})
const emit = defineEmits(['open-dialog'])
const openDialog = () => {
  emit('open-dialog',{
    title:props.title,
    description:props.description,
    timesLeft:props.timesLeft,
    price:props.price,
  }) // 通知父组件打开对话框
}

</script>

<style scoped>
.item-container{
  margin-top: 6px;
  margin-left:6px;
}
.algorithm-item {
  border: 2px solid #7AA8F3;
  padding: 16px;
  border-radius: 8px;
  max-width: 489px;
  max-height: 216px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin-bottom: 24px;
}

.algorithm-title {
  font-weight: 600;
  font-size: 24px;
  line-height: 29px;
  margin-right:6px;
}

.algorithm-description {
  margin-top:4px;
  font-size: 16px;
  font-weight: 400;
  line-height: 21px;
  max-height: 84px;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  color:#8F9396;
  margin-right:6px;
}

.algorithm-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top:6px;
  margin-bottom: 2px;
  margin-left:6px;

}

.times-left {
  font-size: 16px;
  font-weight: 600;
  color: #8F9396;
}
.time{
  color:#5182F8;
}
.price {
  font-size: 16px;
  margin-right:16px ;
  color: #FFCA31;
  font-weight: 600;
}

.buy-button {
  padding: 8px 20px 8px 20px;
  background-color: #5182F8;
  color: white;
  border: none;
  border-radius: 10px;
  cursor: pointer;
}

.buy-button:hover {
  background-color: #4168C8;
}


</style>
