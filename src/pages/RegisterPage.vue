<template>
  <div class='page-container'>
    <v-container>
      <v-form>
        <v-text-field label='Your Name' variant='outlined'/>
        <v-text-field label='Email' variant='outlined'/>
        <v-text-field label='Password' type='password' variant='outlined'/>
        <v-btn large block color='blue'>
          Get Started
        </v-btn>

        <div>Or</div>

        <v-btn large block color='white' outlined>
          <v-icon left>mdi-google</v-icon>
        </v-btn>
        <v-btn large block color='white' outlined>
          <v-icon left>mdi-apple</v-icon>
        </v-btn>
        <v-btn large block color='white' outlined>
          <v-icon left>mdi-facebook</v-icon>
        </v-btn>

        <div>
          Already have an account? <a href='#'>Login here</a>
        </div>
      </v-form>
    </v-container>
  </div>
</template>

<script setup lang='ts'>
</script>

<style scoped>
.page-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
</style>
