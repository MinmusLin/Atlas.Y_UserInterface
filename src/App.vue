<template>
  <v-app>
    <v-main class='main-container'>
      <Navbar/>
      <div class='content-container'>
        <router-view class='router-view-container'/>
      </div>
    </v-main>
  </v-app>
</template>

<script setup>
import Navbar from '@/components/Navbar.vue'
</script>

<style scoped>
.main-container {
  display: flex;
}

.content-container {
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;
}

.router-view-container {
  width: 1190px;
  height: 800px;
  padding: 20px;
  box-sizing: border-box;
  margin: auto 0;
}
</style>
