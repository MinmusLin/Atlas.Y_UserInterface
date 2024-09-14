<template>
  <div class='page-container'>
    <v-container class='custom-container'>
      <div class='login-title'>Log in to your Account</div>
      <v-form>
        <v-text-field label='E-mail' variant='outlined' placeholder='Enter your e-mail'/>
        <v-text-field label='Password'
                      :append-inner-icon="visible ? 'mdi-eye' : 'mdi-eye-off'"
                      :type="visible ? 'text' : 'password'"
                      placeholder='Enter your password'
                      variant='outlined'
                      @click:append-inner='visible=!visible'/>
        <div>
          <label class='custom-checkbox-container'>
            <input type='checkbox' class='custom-checkbox-input'>
            <span class='custom-checkbox'></span>
            <span class='remember-me'>Remember me</span>
          </label>
        </div>
        <v-btn class='start-button'>
          Get Started
        </v-btn>
        <div class='or-container'>
          <hr class='line' style='margin-left: 0'/>
          <span class='or-text'>Or</span>
          <hr class='line' style='margin-right: 0'/>
        </div>
        <div class='login-group'>
          <img src='/DesignMaterials/Google.png' alt='Google'>
          <img src='/DesignMaterials/Apple.png' alt='Apple'>
          <img src='/DesignMaterials/Facebook.png' alt='Facebook'>
        </div>
        <div class='login-prompt'>
          New User? <a href='#' @click="router.push('/register')">SIGN UP HERE</a>
        </div>
      </v-form>
    </v-container>
  </div>
</template>

<script setup lang='ts'>
import {ref} from 'vue'
import {useRouter} from 'vue-router'

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
}

.login-title {
  font-size: 24px;
  font-weight: 700;
  text-align: center;
  color: #2F3235;
  margin-bottom: 35px;
}

.custom-checkbox-container {
  display: flex;
  align-items: center;
  cursor: pointer;
}

.custom-checkbox-input {
  position: absolute;
  opacity: 0;
  cursor: pointer;
}

.custom-checkbox {
  width: 22px;
  height: 22px;
  background-color: white;
  border: 1px solid #EEF3FE;
  border-radius: 3px;
  margin-right: 8px;
  display: inline-block;
  position: relative;
}

.custom-checkbox-input:checked + .custom-checkbox {
  background-color: #EEF3FE;
}

.custom-checkbox-input:checked + .custom-checkbox:after {
  content: '';
  position: absolute;
  left: 6px;
  top: 2px;
  width: 8px;
  height: 12px;
  border: solid #9E9E9E;
  border-width: 0 2px 2px 0;
  transform: rotate(45deg);
}

.remember-me {
  font-size: 13px;
  font-weight: 400;
  color: #2F3235;
}

.start-button {
  color: white;
  width: 396px;
  height: 56px !important;
  background-color: #5182F8;
  font-size: 16px;
  font-weight: 500;
  border-radius: 10px;
  margin-top: 56px;
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
