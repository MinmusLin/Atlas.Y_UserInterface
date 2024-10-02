<template>
  <div class='page-container'>
    <el-carousel :interval='3000' type='card'>
      <el-carousel-item v-for='(item, index) in images' :key='index' class='carousel-item'>
        <div class='image-container'>
          <img :src='item.src' :alt='item.alt' class='carousel-image'/>
        </div>
      </el-carousel-item>
    </el-carousel>
    <div style='display: flex; flex-direction: column; align-items: center; margin-top: 27px'>
      <p style='color: #2F3235; font-size: 40px; font-weight: 600'>Our WIKI provides a comprehensive overview of</p>
      <p style='color: #7AA8F3; font-size: 40px; font-weight: 600'>Atlas.Y toolkit's development</p>
      <div style='display: flex; flex-direction: row; margin-top: 8px'>
        <p>Our WIKI covers every link from&nbsp;</p>
        <p style='color: #AACAF9'>the concept of topic selection, design principle,</p>
      </div>
      <p style='color: #AACAF9'>algorithm implementation to the actual construction.</p>
      <div style='display: flex; flex-direction: row'>
        <p>Besides,&nbsp;</p>
        <p style='color: #AACAF9'>the advocacy strategy and human practices</p>
        <p>&nbsp;are also documented in detail.</p>
      </div>
      <p style='margin-top: 10px'>By visiting the WIKI, you can gain insight into the entire development process,</p>
      <p>explore our technical details and the thinking behind our decisions,</p>
      <p>and access a wealth of background information and resource support.</p>
      <div style='display: flex; flex-direction: row; margin-top: 35px'>
        <a href='https://2024.igem.wiki/tongji-software'
           style='color: #5182F8; font-size: 40px; font-weight: 600; text-decoration: none; position: relative'>
          CLICK HERE
          <span style='position: absolute; bottom: 5px; left: 0; width: 100%; height: 3px; background-color: #5182F8'/>
        </a>
        <p style='color: #2F3235; font-size: 40px; font-weight: 600; transform: translateY(6px)'>
          &nbsp;to visit our WIKI
        </p>
      </div>
    </div>
  </div>
</template>

<script setup lang='ts'>
import {ElCarousel} from 'element-plus'

const images = [
  {src: 'https://static.igem.wiki/teams/5503/wiki-presentations/presentation1.webp', alt: 'Presentation1'},
  {src: 'https://static.igem.wiki/teams/5503/wiki-presentations/presentation3.webp', alt: 'Presentation3'},
  {src: 'https://static.igem.wiki/teams/5503/wiki-presentations/presentation5.webp', alt: 'Presentation5'},
  {src: 'https://static.igem.wiki/teams/5503/wiki-presentations/presentation2.webp', alt: 'Presentation2'},
  {src: 'https://static.igem.wiki/teams/5503/wiki-presentations/presentation4.webp', alt: 'Presentation4'},
  {src: 'https://static.igem.wiki/teams/5503/wiki-presentations/presentation6.webp', alt: 'Presentation6'}
]
</script>

<style scoped>
.page-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
}

p {
  color: #8F9396;
  font-weight: 500;
  line-height: 1.2;
}

.carousel-item {
  height: 290px;
}

.carousel-image {
  width: 100%;
  height: auto;
}

/* noinspection CssUnusedSymbol */
.el-carousel {
  width: 1190px;
}
</style>
