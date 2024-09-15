<template>
  <div class='page-container'>

    <div class="title">FAQs</div>
    <div class="subtitle" @click="">
    General guidance<v-icon style="font-size: 16px;">mdi-arrow-right</v-icon>
    </div>

    <div class="content">
      <div v-for="(text, index) in texts" :key="index" class="text-block">
        <p class="question" v-html="text.question"></p>
        <p class="answer" v-html="text.answer"></p>
      </div>
    </div>
  </div>
</template>

<script setup lang='ts'>
import { ref } from 'vue';
import '@mdi/font/css/materialdesignicons.css';

// 动态生成文本
const texts = ref([
  {
    question: 'Q: How do I reset the Atlas.Y Identity and user password that I lost or forgot?',
    answer: 'You can reset your password in the account sign-in page. When you reset your password, instructions are sent to the email address associated with your Atlas.Y Web Services account. You can  follow the instructions in the email to reset your password.'
  },
  {
    question: 'Q: How do I update the contact information associated with my Atlas.Y Web Services account, including my address and telephone number?',
    answer: `<p>To update the contact information associated with your Atlas.Y Web Services account, do the following:</p>
            <ol  style="padding-left: 20px; ">
              <li>Sign in to the Atlas.Y Management Console, and then open the Billing and Cost Management console.</li>
              <li>On the navigation bar, choose your account name, and then choose My Account.</li>
              <li>Under Contact Information, choose Edit.</li>
              <li>Enter your updated information, and then choose Update. Note: To update your telephone number, use the format xxx-xxxxxxxx (for example, 188-88888888).You can see the mailing address associated with your account on the PDF version of your invoice.</li>
            </ol>`
  }
]);
</script>

<style scoped>
.page-container {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-top: 48px;
  margin-left: 40px;
}

.title-section {
  display: flex;
  flex-direction: column;
  align-items: flex-start; /* 文本靠左对齐 */
}

.title {
  color: #5182F8;
  font-size: 40px;
  font-weight: 600;
  line-height: 48.41px;
  text-align: left;
  height: 48px;
  margin: 12px;
  margin-left: 0px;
}

.subtitle {
  font-size: 16px;
  line-height: 19.36px;
  font-weight: 600;
  text-align: left;
  color: #5182F8;
  text-decoration: none;
  border-bottom: 2px solid #5182F8; 
  height: 20px;
  margin-bottom: 59px;
}

.subtitle:hover {
  color: #76a0c2;
  border-color: #76a0c2;
}

.question {
  font-size: 16px;
  font-weight: 600;
  line-height: 19.36px;
  text-align: left;
  margin-bottom: 20px;
}

.answer {
  font-size: 16px;
  font-weight: 400;
  line-height: 19.36px;
  text-align: left;
}

.text-block {
  width: 1038px;
  margin-bottom: 35px;
}

</style>
