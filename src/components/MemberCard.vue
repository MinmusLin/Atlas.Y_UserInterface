<template>
  <v-card class='card' elevation='10'>
    <div class='avatar'>
      <img :src='props.photo' alt='Photo' style='background-color: white'/>
    </div>
    <div class='content-wrapper'>
      <div class='text-background'>
        <h3 class='name'>
          <slot name='name'>{{ props.name }}</slot>
        </h3>
        <p class='position'>{{ props.role }}</p>
      </div>
    </div>
    <div class='description' :style="{ fontSize: props.fontSize + 'px' }">{{ props.bio }}</div>
  </v-card>
</template>

<script setup lang='ts'>
import {defineProps} from 'vue'

const props = defineProps<{
  name: string
  role: string
  photo: string
  bio: string
  fontSize?: number
}>()
</script>

<style scoped>
.card {
  width: 160px;
  height: 225px;
  border-radius: 10px;
  border: 1px solid #5182F8;
  box-shadow: 0 4px 4px 0 #5182F8 !important;
  transition: transform 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease, background-color 0.3s ease;
}

.card:hover {
  border: 1px solid #CADDFA;
  box-shadow: 0 4px 4px 0 #CADDFA !important;
  background-color: #EEF3FE;
}

.avatar {
  width: 160px;
  height: 160px;
  position: absolute;
  transition: opacity 0.5s ease;
}

.avatar img {
  width: 100%;
  height: 100%;
  mask-image: linear-gradient(to bottom, rgba(0, 0, 0, 1) 85%, rgba(0, 0, 0, 0) 100%);
}

.card:hover .avatar {
  opacity: 0;
}

.content-wrapper {
  position: relative;
  width: 160px;
  top: 134px;
}

.text-background {
  width: 160px;
  height: 90px;
  border-radius: 10px;
  background: #5182F8;
  display: flex;
  flex-direction: column;
  justify-content: center;
  transition: opacity 0.5s ease, transform 0.5s ease;
}

.card:hover .text-background {
  transform: translateY(-135px);
}

.name {
  font-size: 16px;
  font-weight: 600;
  text-align: center;
  color: #FFFFFF;
}

.position {
  font-size: 10px;
  font-weight: 400;
  text-align: center;
  color: #EEF3FE;
}

.description {
  font-size: 14px;
  padding: 10px;
}
</style>
