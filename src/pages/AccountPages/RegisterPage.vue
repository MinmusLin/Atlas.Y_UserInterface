<template>
  <div class='page-container'>
    <v-container class='custom-container'>
      <InfoTooltip height='95px'
                   width='320px'
                   style='position: absolute; top: 52px; left: 422px'>
        <p style='font-size: 14px'>
          This registration page is for demonstration purposes only. You can close this page and freely browse Atlas.Y.
        </p>
      </InfoTooltip>
      <div class='login-title'>Create an Account</div>
      <v-form>
        <v-text-field label='Your Name' variant='outlined' placeholder='Enter your name'/>
        <v-text-field label='E-mail' variant='outlined' placeholder='Enter your e-mail'/>
        <v-text-field label='Password'
                      :append-inner-icon="visible ? 'mdi-eye' : 'mdi-eye-off'"
                      :type="visible ? 'text' : 'password'"
                      placeholder='Enter your password'
                      variant='outlined'
                      @click:append-inner='visible=!visible'/>
        <v-btn class='start-button'>
          Get Started
        </v-btn>
        <div class='or-container'>
          <hr class='line' style='margin-left: 0'/>
          <span class='or-text'>Or</span>
          <hr class='line' style='margin-right: 0'/>
        </div>
        <div class='login-group'>
          <img src='https://static.igem.wiki/teams/5503/software-materials/google.webp' alt='Google'>
          <img src='https://static.igem.wiki/teams/5503/software-materials/apple.webp' alt='Apple'>
          <img src='https://static.igem.wiki/teams/5503/software-materials/facebook.webp' alt='Facebook'>
        </div>
        <div class='login-prompt'>
          Already have an account? <a href='#' @click="router.push('/login')">LOGIN HERE</a>
        </div>
      </v-form>
    </v-container>
  </div>
</template>

<script setup lang='ts'>
import {ref} from 'vue'
import {useRouter} from 'vue-router'
import InfoTooltip from '@/components/InfoTooltip.vue'

const visible = ref(false)
const router = useRouter()
</script>

<style scoped>
.page-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.custom-container {
  padding: 44px 101px;
  border: 1px solid #5182F8;
  border-radius: 10px;
  width: 600px;
  height: 608px;
  position: relative;
}

.login-title {
  font-size: 24px;
  font-weight: 700;
  text-align: center;
  color: #2F3235;
  margin-bottom: 35px;
}

.start-button {
  color: white;
  width: 396px;
  height: 56px !important;
  background-color: #5182F8;
  font-size: 16px;
  font-weight: 500;
  border-radius: 10px;
  margin-bottom: 16px;
}

.or-container {
  display: flex;
  align-items: center;
  justify-content: center;
}

.line {
  border: none;
  border-top: 1px solid #AACAF9;
  width: 180px;
  margin: 0 15px;
}

.or-text {
  font-size: 12px;
  font-weight: 400;
  color: #2F3235;
}

.login-prompt {
  font-size: 14px;
  font-weight: 400;
  color: #2F3235;
  text-align: center;
}

.login-prompt a {
  font-weight: 700;
  color: #2F3235;
}

.login-group {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 24px;
  margin-top: 15px;
  margin-bottom: 32px;
}

.login-group img {
  border-radius: 4px;
}

.login-group img:hover {
  cursor: pointer;
}
</style>
