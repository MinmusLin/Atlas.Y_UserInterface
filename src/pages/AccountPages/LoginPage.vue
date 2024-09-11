<template>
  <div class='page-container'>
    <v-container class="custom-container">
      <div class="login-title">Log in to your Account</div>
      <v-form>
        <v-text-field class="login-input" label='Email' variant='outlined'/>  
        

        <v-text-field
        class="login-input"
        label='Password'
        :append-inner-icon="visible ? 'mdi-eye-off' : 'mdi-eye'"
        :type="visible ? 'text' : 'password'"
        placeholder="Enter your password"
        variant="outlined"
        @click:append-inner="visible = !visible"
      ></v-text-field>

        <div class="additional-options">
          <label class="custom-checkbox-container">
            <input type="checkbox" class="custom-checkbox-input">
            <span class="custom-checkbox"></span>
            <div class="remember-me">Remember me</div>
          </label>
        </div>

        <v-btn class="start-button">
          Get Started
        </v-btn>

        <div class="or-container">
          <hr class="line" style="margin-left: 0;" />
          <span class="or-text">Or</span>
          <hr class="line" style="margin-right: 0;"/>
        </div>

        <div class="social-buttons">
          <v-btn class="social-button" block color="red" outlined>
            <v-icon left>mdi-google</v-icon>
          </v-btn>
          <v-btn class="social-button" block color="white" outlined>
            <v-icon left>mdi-apple</v-icon>
          </v-btn>
          <v-btn class="social-button" block color="blue" outlined>
            <v-icon left>mdi-facebook</v-icon>
          </v-btn>
        </div>

        <div class="login-prompt">
          New User? <a href='#' style="font-weight: 700; color: #212121;">SIGN UP HERE</a>
        </div>
      </v-form>
    </v-container>
  </div>
</template>

<script>
export default {
  data: () => ({  
      visible: false,
    }),
  methods: {
    togglePasswordVisibility() {
      this.showPassword = !this.showPassword;
    }
  }
}
</script>

<style scoped>
.page-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.custom-container {
  padding: 45px 103px 67px;
  border: 1px solid #5182F8;
  border-radius: 10px;
  width: 600px;
  height: 608px;
}

.login-title {
  font-size: 24px;
  font-weight: 600;
  text-align: center;
  margin-top: 0px;
  margin-bottom: 40px; 
}

.additional-options {
  display: flex;
  align-items: center;
  height: 23px;
  margin-bottom: 50px;
  justify-content: flex-start;
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
  content: "";  
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
  font-size: 12px !important;
  font-weight: 400;
  color: #000000;
}

.or-container {
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 20px 0;
}

.line {
  border: none;
  border-top: 1px solid #AACAF9;
  width: 180px;
  margin: 0 10px;
}

.or-text {
  font-size: 12px;
  font-weight: 400;
  color: #212121;
}

.social-buttons {
  display: flex;
  justify-content: center; 
  width: 40px;
  margin-left: 176px;
  margin-top: 20px;
}

.social-button {
  width: 40px !important;
  margin: 0 15px;
}

.start-button {
  color: white;
  width: 392px;
  height: 56px !important;
  background-color: #5182F8;
  font-size: 16px;
  font-weight: 600;
  border-radius: 10px;  
}

.login-input {
  border: 1px #5182F8 !important;
  border-radius: 10px !important;
}

.login-prompt {
  font-size: 13px;
  font-weight: 400;
  color: #212121;
  text-align: center;
  margin-top: 30px;
}
</style>
