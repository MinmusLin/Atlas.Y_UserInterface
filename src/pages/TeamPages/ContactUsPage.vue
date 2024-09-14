<template>
  <div class='page-container'>
    <h1>Contact Us</h1>

    <h2>Contact Information</h2>

    <div class='contact-content-group'>
      <img src='/DesignMaterials/Email.png' alt='Email'>
      <p>E-mail:&nbsp;</p>
      <a href='mailto:tongji_china2019@163.com'>tongji_china2019@163.com</a>
    </div>

    <h2>Social Media</h2>

    <div class='contact-content-group'>
      <img src='/DesignMaterials/SmartPhone.png' alt='SmartPhone'>
      <p>Official Account:</p>
    </div>

    <div class='contact-content-group'>
      <img src='/DesignMaterials/TikTok.png' alt='TikTok'>
      <p>TikTok:&nbsp;</p>
      <a href='https://www.tiktok.com/@Atlas_Y_Project' target='_blank'>https://www.tiktok.com/@Atlas_Y_Project</a>
    </div>

    <div class='contact-content-group'>
      <img src='/DesignMaterials/Bilibili.png' alt='Bilibili'>
      <p>Bilibili:&nbsp;</p>
      <a href='https://space.bilibili.com/123456' target='_blank'>https://space.bilibili.com/123456</a>
    </div>

    <h2>Contact Form</h2>

    <p style='margin-top: 21px; margin-bottom: 6px'>
      If you have any questions or feedback, please fill out the
      <a @click="router.push('/contact-us/form')">contact form</a>
      and our team will get back to you as soon as possible.
    </p>

    <div class='contact-content-group'>
      <img src='/DesignMaterials/MapMarker.png' alt='MapMarker'>
      <p>Office Address: Tongji University, No.1239, Yangpu District, Shanghai</p>
    </div>
  </div>
</template>

<script setup lang='ts'>
import {useRouter} from 'vue-router'

const router = useRouter()
</script>

<style scoped>
.page-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  text-align: left;
  padding-left: 20px;
}

.contact-content-group {
  display: flex;
  margin-top: 15px;
}

.contact-content-group img {
  height: 24px;
  width: 24px;
  margin-right: 8px;
}

a {
  color: #5182F8;
  font-weight: 600;
  text-decoration: none;
  cursor: pointer;
}

p {
  font-weight: 600;
  color: #2F3235;
}

h2 {
  font-weight: 700;
  font-size: 16px;
  margin-top: 45px;
  color: #2F3235;
  margin-bottom: -2px;
}

h1 {
  color: #5182F8;
  font-size: 40px;
  font-weight: 600;
  margin-bottom: 2px;
}
</style>
