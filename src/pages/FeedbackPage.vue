<template>
  <div class='page-container'>
    <p class="form-title">Feedback</p>
    <div class="feedback-tips">Use the form below to send us your comments. We read all feedback carefully, 
      but we are unable to respond to each submission individually. 
      If you provide your email address, 
      you agree that we may contact you to better understand the comments you submitted.</div>
    <el-form
      label-position="top"
      label-width="100px"
      ref="formRef"
      :rules="rules"
      :model="formData"
    >
      <!-- 输入表单 -->
      <el-row class="custom-row" :gutter="0">
        <el-col :span="12">
          <el-form-item label="Given Name" class="custom-label" prop="givenName">
            <el-input v-model="formData.givenName" class="custom-input" placeholder="Enter your given name"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="Surname" class="custom-label" prop="surname">
            <el-input v-model="formData.surname" class="custom-input" placeholder="Enter your surname"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row class="custom-row" :gutter="0">
        <el-col :span="12">
          <el-form-item label="E-mail" class="custom-label" prop="email">
            <el-input v-model="formData.email" class="custom-input" placeholder="Enter your email"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="Phone Number" class="custom-label" prop="phone">
            <el-input v-model="formData.phone" class="custom-input" placeholder="Enter your phone number"></el-input>
          </el-form-item>
        </el-col>
      </el-row>



      <!-- 下拉表单 -->
      <el-row class="custom-row" :gutter="0">
        <el-col :span="12">
          <el-form-item label="Research Field" class="custom-label" prop="researchField">
            <el-select v-model="formData.researchField" class="custom-select" placeholder="Select your research field">
              <el-option
                v-for="option in researchFields"
                :key="option.value"
                :label="option.label"
                :value="option.value">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="Post" class="custom-label" prop="post">
            <el-select v-model="formData.post" class="custom-select" placeholder="Select your post">
              <el-option
                v-for="option in posts"
                :key="option.value"
                :label="option.label"
                :value="option.value">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row class="custom-row" :gutter="0">
        <el-col :span="12">
          <el-form-item label="Country" class="custom-label" prop="country">
            <el-select v-model="formData.country" class="custom-select" placeholder="Select your country">
              <el-option
                v-for="country in countries"
                :key="country.code"
                :label="country.name"
                :value="country.code">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      
      <el-row class="custom-row" :gutter="0">
        <el-col :span="24">
          <el-form-item label="Comments" class="custom-label" prop="comment">
            <el-input type="textarea" resize="none" v-model="formData.comment" class="custom-textarea" placeholder="Enter a comment" rows="6"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      
      <!-- 提交按钮 -->
      <el-row class="custom-row" :gutter="0">
        <el-col :span="24">
          <el-button type="primary" class="submit-button" @click="submitContactForm(formRef)">Submit</el-button>
        </el-col>
      </el-row>
    </el-form>
  </div>  
</template>

<script setup lang='ts'>
import { ref, reactive } from 'vue';
import { FormInstance, FormRules} from 'element-plus'
import countries from '../../node_modules/country-list/data.json';

const formRef = ref<FormInstance>()
const researchFields = [
  { label: "Scientific Research Service", value: "scientific-research" },
  { label: "Clinical Detection", value: "clinical-detection" },
  { label: "Media Organization", value: "media-organization" },
  { label: "Others", value: "others" }
];

const posts = [
  { label: "Company Manager", value: "company-manager" },
  { label: "Company Director", value: "company-director" },
  { label: "Company Buyer", value: "company-buyer" },
  { label: "Laboratory Manager", value: "laboratory-manager" },
  { label: "Professor", value: "professor" },
  { label: "Researcher", value: "researcher" },
  { label: "Student", value: "student" },
  { label: "Others", value: "others-post" }
];

interface ContactRuleForm {
  researchField: string
  post: string
  country: string
  givenName: string
  surname: string
  email: string
  phone: string
  comment: string
}

// 定义表单数据
const formData = reactive<ContactRuleForm>({
  researchField: '',
  post: '',
  country: '',
  givenName: '',
  surname: '',
  email: '',
  phone: '',
  comment: ''
});

// 定义表单验证规则
const rules: FormRules = {
  researchField: [{ required: true, message: 'Please select your research field', trigger: 'change' }],
  post: [{ required: true, message: 'Please select your post', trigger: 'change' }],
  country: [{ required: true, message: 'Please select your country', trigger: 'change' }],
  givenName: [{ required: true, message: 'Given name cannot be empty', trigger: 'blur' }],
  surname: [{ required: true, message: 'Surname cannot be empty', trigger: 'blur' }],
  email: [
    { required: true, message: 'E-mail cannot be empty', trigger: 'blur' },
    { type: 'email', message: 'Please enter a valid e-mail', trigger: ['blur', 'change'] }
  ],
  phone: [
    { required: true, message: 'Phone number cannot be empty', trigger: 'blur' },
    { pattern: /^[0-9]*$/, message: 'Phone number must be numeric', trigger: 'blur' }
  ],
  comment: [{ required: true, message: 'comment cannot be empty', trigger: 'blur' }]
};

const submitContactForm = async (formEl: FormInstance | undefined) => {
  if (!formEl) {
    return
  }
  await formEl.validate(async (valid) => {
    if (valid) {
      console.log('有效')
    }
  })
}
</script>

<style scoped>
.page-container {
  display: flex;
  flex-direction: column;
  align-items: flex-start; /* 改为左对齐 */
  padding-top: 30px;
}

.form-title {
  color: #5182F8;
  font-size: 40px; /* 字体大小 */
  font-weight: 600; /* 字体粗细 */
  line-height: 49px; /* 行高 */
  margin-bottom: 20px; /* 和表单的间距 */
  margin-left: 0; /* 与 Research Field 左对齐 */
}

.feedback-tips{
  width: 701px;
  height: 110px;
  font-size: 16px;
  font-weight: 400;
}

.el-form {
  width: 100%; /* 表单的宽度为100%，表单项根据需要调整宽度 */
}

.custom-row {
  width: 1094px;
}

.custom-select {
  width: 492px; /* 每个下拉选择的宽度 */
  height: 35px; /* 每个下拉选择的高度 */
  padding-left: 0px;
}

.custom-input {
  width: 492px; /* 每个输入框的宽度 */
  height: 35px; /* 每个输入框的高度 */
  border-radius: 10px; /* 设置圆角为10px */
}

.custom-textarea {
  width: 1038px; /* 新增的文本区域宽度 */
  height: 150px; /* 新增的文本区域高度 */
}

.submit-button {
  background-color: #5182F8;
  font-size: 24px;
  font-weight: 700;
  width: 1038px; /* 提交按钮宽度 */
  height: 60px; /* 提交按钮高度 */
  border-radius: 10px;
}

/* 表单标签 */
.custom-label >>> .el-form-item__label {
  font-size: 16px; /* 字体大小 */
  font-weight: 600; /* 字体粗细 */
  line-height: 19px; /* 行高 */
}

</style>
