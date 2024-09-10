<template>
  <div class='page-container'>
    <h1 class ="title">Contact Us</h1>
    <div class = "content-box">
      <!-- Contact Information Section -->
      <div class="section contact-information">
        <h2 class="subtitle">Contact Information</h2>
        <p>
          <img src='/Icons/Phone.png' alt='LightLogo' class = "icon"/>
          Phone Number: +86-XXX-XXXXX-XXXX
        </p>
        <p>
          <img src='/Icons/Mail.png' alt='LightLogo' class = "icon"/>
          e-mail: tongji_china2019@163.com
        </p>
      </div>

      <!-- Social Media Section -->
      <div class="section social-media">
        <h2 class="subtitle">Social Media</h2>
        <p>
          <img src='/Icons/MobilePhone.png' alt='LightLogo' class = "icon"/>
          Official Account:
        </p>
        <p>
          <img src='/Icons/Tiktok.png' alt='LightLogo' class = "icon"/>
          TikTok: tongji_china2019@163.com
        </p>
        <p>
          <img src='/Icons/TV.png' alt='LightLogo' class = "icon"/>
          Bilibili: tongji_china2019@163.com
        </p>
      </div>

      <!-- Contact Form Section -->
      <div class="section contact-form">
        <h2 class="subtitle">Contact Form</h2>
        <p>If you have any questions or feedback, please fill out the contact form below and our team will get back to you as soon as possible:</p>
        <a href="https://www.bgi.com/about/connect">https://www.bgi.com/about/connect</a>
        <p>
          <img src='/Icons/PlaceHolder.png' alt='LightLogo' class = "icon"/>
          Office Address: Tongji University, No.1239, Yangpu District, Shanghai
        </p>
      </div>

    </div>
  </div>
</template>

<script setup lang='ts'>
import InfoTooltip from "@/components/InfoTooltip.vue";
import Dialog from "@/components/Dialog.vue";
</script>

<style scoped>

.page-container {
  display: flex;
  flex-direction: column;
  justify-content: left;
}

.title {
  margin-top:37px;
  font-size: 40px;
  color: #5182F8;
}
.subtitle {
  font-size: 16px;
  margin-bottom: 16px;
}
.content-box {
  margin-top: 57px;
  max-width: 787px;
  max-height: 160px;
  font-weight:bold;
}

.section {
  margin-bottom: 48px;
}

.contact-information p,
.social-media p {
  font-size: 16px;
  margin-bottom: 16px;
}

.contact-form p {
  font-size: 16px;
  font-weight: bold;
}

.contact-form p:first-of-type {
  margin-bottom: 12px;
}

a {
  color: #5182F8;
  margin-bottom: 12px;
  display: inline-block;
  font-weight: bold;
  text-decoration: underline;
}

a:hover {
  text-decoration: underline;
}
.contact-form p:last-of-type {
  margin-top: 12px;
  font-weight: bold;
}
.icon{
  width: 22px;
  height: 22px;
  vertical-align: middle;
}
</style>
