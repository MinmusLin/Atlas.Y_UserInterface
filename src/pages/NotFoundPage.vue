<template>
  <div class='page-container'>
    <img src='https://static.igem.wiki/teams/5503/software-materials/404.webp' alt='404' width='543px'/>
    <img src='https://static.igem.wiki/teams/5503/software-materials/notfoundprompt.webp' alt='NotFoundPrompt'
         width='392px'
         style='margin-top: 66px'/>
    <p>The page is missing or you assembled the link incorrectly.</p>
    <ShadowButton width='433px' height='50px' style='margin-top: 29px'>
      <div style='font-size: 18px' @click="router.push('/')">Back to Home</div>
    </ShadowButton>
  </div>
</template>

<script setup lang='ts'>
import ShadowButton from '@/components/ShadowButton.vue'
import {useRouter} from 'vue-router'

const router = useRouter()
</script>

<style scoped>
.page-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

p {
  color: #C5C9CD;
  font-size: 18px;
  margin-top: 5px;
}
</style>
