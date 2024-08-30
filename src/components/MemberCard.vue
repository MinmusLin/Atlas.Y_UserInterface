<template>
  <v-card
    class="card"
    max-width="4000"
    elevation="10"

  >
    <div class="avatar">
      <img :src="photo" alt="Profile Photo" />
    </div>
    <div class="content-wrapper">
      <div class="text-background">
        <h3 class="name">{{ name }}</h3>
        <p class="position">{{ position }}</p>
      </div>
    </div>
  </v-card>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'MemberCard',
  props: {
    name: {
      type: String,
      required: true,
    },
    position: {
      type: String,
      required: true,
    },
    photo: {
      type: String,
      required: true,
    },
  },
});
</script>

<style scoped>
.card {
  width: 158px;
  height: 224.64px;
  border-radius: 10px;
  border: 1px solid #5182F8; /* Primary color */
  box-shadow: 0px 4px 4px 0px rgba(0, 92, 231, 0.7) !important; /* Shadow color */
  background-color: #fff;
  transition: transform 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease, background-color 0.3s ease;
  position: relative;
  overflow: hidden; /* Ensure no white edges are visible */
}

.card:hover {
  transform: translateY(2px); /* Very subtle downward movement on hover */
  box-shadow: 0px 3px 3px 0px rgba(0, 92, 231, 0.5) !important; /* Darker shadow on hover */
  border-color: transparent;
  background-color: rgb(238, 243, 254); /* Background color on hover */
}

.avatar {
  width: 158px;
  height: 151px;
  position: absolute;
  top: 0;
  left: 0;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: opacity 0.3s ease;
}

.avatar img {
  width: 100%;
  height: 100%;
  object-fit: cover; /* Ensure image scales proportionally */
}

.card:hover .avatar {
  opacity: 0; /* Hide avatar on hover */
}

.content-wrapper {
  position: relative;
  width: 158px;
  height: 92.64px;
  top: 132px; /* Adjust the top position */
}

.text-background {
  width: 158px;
  height: 92.64px;
  border-radius: 10px;
  background: #5182F8; /* Background color */
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: absolute;
  bottom: 0;
  transition: opacity 0.5s ease, transform 0.5s ease; /* Longer duration for smoother effect */
}

.card:hover .text-background {
  opacity: 1;
  border-color: transparent;
  transform: translateY(-132px); /* Move text box to the top */
}

.name {
  font-family: Inter, sans-serif;
  font-size: 16px;
  font-weight: 600;
  line-height: 19.36px;
  text-align: center;
  color: #FFFFFF; /* Text color */
  background: #5182F8; /* Background color */
  margin: 0; /* Remove default margin */
}

.position {
  font-family: Inter, sans-serif;
  font-size: 10px;
  font-weight: 400;
  line-height: 12.1px;
  text-align: center;
  color: #EEF3FE; /* Text color */
  padding: 2px 0; /* Padding to adjust text box size */
  margin: 0; /* Remove default margin */
}
</style>
