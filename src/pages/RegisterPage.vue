<template>
  <div class='page-container'>
    <v-container class="custom-container">
      <div class="login-title">Create an Account</div>
      <v-form>
        <v-text-field class="login-input" label='Your Name' variant='outlined'/>
        <v-text-field class="login-input" label='Email' variant='outlined'/>
        <v-text-field class="login-input" label='Password' type='password' variant='outlined'/>
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
          Already have an account? <a href='#' style="font-weight: 700; color: #212121;">LOGIN HERE</a>
        </div>
      </v-form>
    </v-container>
  </div>
</template>

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

.or-container {
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 20px 0; /* Optional: Adjust margin as needed */
}

.line {
  border: none;
  border-top: 1px solid #AACAF9;
  width: 180px;
  margin: 0 10px; /* Space between line and text */
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
  margin-top: 20px; /* Optional: Adjust margin as needed */
}

.social-button {
  width: 40px !important;
  margin: 0 15px; /* Add margin for spacing between buttons */
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
  text-align: center; /* Center align the text */
  margin-top: 40px; /* Optional: Adjust margin as needed */
}
</style>
