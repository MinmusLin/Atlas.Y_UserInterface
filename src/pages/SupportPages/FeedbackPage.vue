<template>
  <div class='page-container'>
    <p class='form-title'>Feedback</p>
    <el-form ref='feedbackRuleFormRef' :model='feedbackRuleForm' :rules='feedbackRules'>
      <div class='form-item-row-container'>
        <el-form-item prop='givenName'>
          <div class='form-item-container'>
            <p>Given Name</p>
            <el-input v-model='feedbackRuleForm.givenName'
                      style='width: 500px'
                      placeholder='Enter your given name'/>
          </div>
        </el-form-item>
        <el-form-item prop='surname'>
          <div class='form-item-container'>
            <p>Surname</p>
            <el-input v-model='feedbackRuleForm.surname'
                      style='width: 500px'
                      placeholder='Enter your surname'/>
          </div>
        </el-form-item>
      </div>
      <div class='form-item-row-container'>
        <el-form-item prop='email'>
          <div class='form-item-container'>
            <p>E-mail</p>
            <el-input v-model='feedbackRuleForm.email'
                      style='width: 500px'
                      placeholder='Enter your e-mail'/>
          </div>
        </el-form-item>
        <el-form-item prop='phoneNumber'>
          <div class='form-item-container'>
            <p>Phone Number</p>
            <el-input v-model='feedbackRuleForm.phoneNumber'
                      style='width: 500px'
                      placeholder='Enter your phone number'/>
          </div>
        </el-form-item>
      </div>
      <div class='form-item-row-container'>
        <el-form-item prop='researchField'>
          <div class='form-item-container'>
            <p>Research Field</p>
            <el-select v-model='feedbackRuleForm.researchField'
                       style='width: 500px'
                       placeholder='Select your research field'>
              <el-option v-for='(researchField, index) in researchFields'
                         :key='index'
                         :label='researchField'
                         :value='researchField'/>
            </el-select>
          </div>
        </el-form-item>
        <el-form-item prop='country'>
          <div class='form-item-container'>
            <p>Country</p>
            <el-select v-model='feedbackRuleForm.country'
                       style='width: 500px'
                       placeholder='Select your country'>
              <el-option v-for='(country, code) in countries'
                         :key='code'
                         :value='country.name'>
              <span>
                <span :class='`flag-icon flag-icon-${country.code.toLowerCase()}`' style='margin-right: 6px'/>
                {{ country.name }}
              </span>
              </el-option>
            </el-select>
          </div>
        </el-form-item>
      </div>
      <el-form-item prop='feedbackType'>
        <div class='form-item-container'>
          <p>Feedback Type</p>
          <el-select v-model='feedbackRuleForm.feedbackType'
                     style='width: 500px'
                     placeholder='Select your feedback type'>
            <el-option v-for='(feedbackType, index) in feedbackTypes'
                       :key='index'
                       :label='feedbackType'
                       :value='feedbackType'/>
          </el-select>
        </div>
      </el-form-item>
      <el-form-item prop='comments'>
        <div class='form-item-container'>
          <p>Comments</p>
          <el-input v-model='feedbackRuleForm.comments'
                    type='textarea'
                    style='width: 1062px'
                    :autosize='{ minRows: 5, maxRows: 5 }'
                    resize='none'
                    placeholder='Enter your comments'/>
        </div>
      </el-form-item>
      <el-button @click='submitFeedbackForm(feedbackRuleFormRef)' class='submit-button'>
        Submit
      </el-button>
    </el-form>
  </div>
</template>

<script setup lang='ts'>
import {ref, reactive} from 'vue'
import {FormInstance, FormRules} from 'element-plus'
import countries from 'country-list/data.json'

const feedbackRuleFormRef = ref<FormInstance>()
const researchFields = [
  'Scientific Research Service',
  'Clinical Detection',
  'Media Organization',
  'Others'
]
const feedbackTypes = [
  'Feature Request',
  'Bug Report',
  'Performance',
  'Software Compatibility',
  'Others'
]

interface FeedbackRuleForm {
  researchField: string
  country: string
  givenName: string
  surname: string
  email: string
  phoneNumber: string
  feedbackType: string
  comments: string
}

const feedbackRuleForm = reactive<FeedbackRuleForm>({
  researchField: '',
  country: '',
  givenName: '',
  surname: '',
  email: '',
  phoneNumber: '',
  feedbackType: '',
  comments: ''
})

const feedbackRules: FormRules = {
  researchField: [
    {required: true, message: 'Please select your research field', trigger: 'change'}
  ],
  country: [
    {required: true, message: 'Please select your country', trigger: 'change'}
  ],
  givenName: [
    {required: true, message: 'Given name cannot be empty', trigger: 'change'}
  ],
  surname: [
    {required: true, message: 'Surname cannot be empty', trigger: 'change'}
  ],
  email: [
    {required: true, message: 'E-mail cannot be empty', trigger: 'change'},
    {type: 'email', message: 'Please enter a valid e-mail', trigger: 'change'}
  ],
  phoneNumber: [
    {required: true, message: 'Phone number cannot be empty', trigger: 'change'},
    {pattern: /^[0-9]*$/, message: 'Please enter a valid phone number ', trigger: 'change'}
  ],
  feedbackType: [
    {required: true, message: 'Please select your feedback type', trigger: 'change'}
  ],
  comments: [
    {required: true, message: 'Comments cannot be empty', trigger: 'change'}
  ]
}

const submitFeedbackForm = async (formEl: FormInstance | undefined) => {
  if (!formEl) {
    return
  }
  await formEl.validate(async (valid) => {
    if (valid) {
      console.log('valid')
    } else {
      console.log('error in form validation')
    }
  })
}
</script>

<style scoped>
.page-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.form-title {
  color: #5182F8;
  font-size: 40px;
  font-weight: 600;
  align-self: flex-start;
  margin-left: 43px;
  margin-bottom: 28px;
}

.form-item-container {
  display: flex;
  flex-direction: column;
}

.form-item-container p {
  font-weight: 600;
  font-size: 16px;
  margin-top: -5px;
  color: #2F3235;
}

.form-item-row-container {
  display: flex;
  flex-direction: row;
  gap: 62px;
}

.submit-button {
  width: 100%;
  height: 60px;
  background-color: #5182F8;
  color: white;
  font-size: 24px;
  font-weight: 600;
  border: none;
  border-radius: 10px;
  margin-top: 30px;
  transition: box-shadow 0.25s;
}

.submit-button:hover {
  box-shadow: 2px 4px 8px rgba(0, 0, 0, 0.2)
}
</style>
