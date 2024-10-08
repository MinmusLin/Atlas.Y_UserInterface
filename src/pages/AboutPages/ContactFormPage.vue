<template>
  <div class='page-container'>
    <div style='display: flex; justify-content: flex-start; align-items: center; width: 1080px; margin: 28px'>
      <v-icon style='color: #5182F8; font-size: 50px; cursor: pointer'
              @click="router.push('/contact-us')">
        mdi-arrow-left
      </v-icon>
      <p class='form-title'>Contact Form</p>
    </div>
    <el-form ref='contactRuleFormRef' :model='contactRuleForm' :rules='contactRules'>
      <div class='form-item-row-container'>
        <el-form-item prop='researchField'>
          <div class='form-item-container'>
            <p>Research Field</p>
            <el-select v-model='contactRuleForm.researchField'
                       style='width: 500px'
                       placeholder='Select your research field'>
              <el-option v-for='(researchField, index) in researchFields'
                         :key='index'
                         :label='researchField'
                         :value='researchField'/>
            </el-select>
          </div>
        </el-form-item>
        <el-form-item prop='post'>
          <div class='form-item-container'>
            <p>Post</p>
            <el-select v-model='contactRuleForm.post'
                       style='width: 500px'
                       placeholder='Select your post'>
              <el-option v-for='(post, index) in posts'
                         :key='index'
                         :label='post'
                         :value='post'/>
            </el-select>
          </div>
        </el-form-item>
      </div>
      <el-form-item prop='country'>
        <div class='form-item-container'>
          <p>Country</p>
          <el-select v-model='contactRuleForm.country'
                     style='width: 500px'
                     placeholder='Select your country'>
            <el-option v-for='(country, code) in countries'
                       :key='code'
                       :value='country.name'>
              <span>
                <span :class='`fi fi-${country.code.toLowerCase()}`' style='margin-right: 6px'/>
                {{ country.name }}
              </span>
            </el-option>
          </el-select>
        </div>
      </el-form-item>
      <div class='form-item-row-container'>
        <el-form-item prop='givenName'>
          <div class='form-item-container'>
            <p>Given Name</p>
            <el-input v-model='contactRuleForm.givenName'
                      style='width: 500px'
                      placeholder='Enter your given name'/>
          </div>
        </el-form-item>
        <el-form-item prop='surname'>
          <div class='form-item-container'>
            <p>Surname</p>
            <el-input v-model='contactRuleForm.surname'
                      style='width: 500px'
                      placeholder='Enter your surname'/>
          </div>
        </el-form-item>
      </div>
      <div class='form-item-row-container'>
        <el-form-item prop='email'>
          <div class='form-item-container'>
            <p>E-mail</p>
            <el-input v-model='contactRuleForm.email'
                      style='width: 500px'
                      placeholder='Enter your e-mail'/>
          </div>
        </el-form-item>
        <el-form-item prop='phoneNumber'>
          <div class='form-item-container'>
            <p>Phone Number</p>
            <el-input v-model='contactRuleForm.phoneNumber'
                      style='width: 500px'
                      placeholder='Enter your phone number'/>
          </div>
        </el-form-item>
      </div>
      <el-form-item prop='companyOrInstitution'>
        <div class='form-item-container'>
          <p>Company / Institution</p>
          <el-input v-model='contactRuleForm.companyOrInstitution'
                    style='width: 500px'
                    placeholder='Enter your company or institution'/>
        </div>
      </el-form-item>
      <el-form-item prop='note'>
        <div class='form-item-container'>
          <p>Note</p>
          <el-input v-model='contactRuleForm.note'
                    type='textarea'
                    style='width: 1062px'
                    :autosize='{ minRows: 5, maxRows: 5 }'
                    resize='none'
                    placeholder='Tell us about your needs'/>
        </div>
      </el-form-item>
      <el-button @click='submitContactForm(contactRuleFormRef)' class='submit-button'>
        Submit
      </el-button>
    </el-form>
  </div>
</template>

<script setup lang='ts'>
import {ref, reactive} from 'vue'
import {ElNotification, FormInstance, FormRules} from 'element-plus'
import {useRouter} from 'vue-router'
import countries from '@/countriesList.json'

const router = useRouter()
const contactRuleFormRef = ref<FormInstance>()
const researchFields = [
  'Scientific Research Service',
  'Clinical Detection',
  'Media Organization',
  'Others'
]
const posts = [
  'Company Manager',
  'Company Director',
  'Company Buyer',
  'Laboratory Manager',
  'Professor',
  'Researcher',
  'Student',
  'Others'
]

interface ContactRuleForm {
  researchField: string
  post: string
  country: string
  givenName: string
  surname: string
  email: string
  phoneNumber: string
  companyOrInstitution: string
  note: string
}

const contactRuleForm = reactive<ContactRuleForm>({
  researchField: '',
  post: '',
  country: '',
  givenName: '',
  surname: '',
  email: '',
  phoneNumber: '',
  companyOrInstitution: '',
  note: ''
})

const contactRules: FormRules = {
  researchField: [
    {required: true, message: 'Please select your research field', trigger: 'change'}
  ],
  post: [
    {required: true, message: 'Please select your post', trigger: 'change'}
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
  companyOrInstitution: [
    {required: true, message: 'Company or institution cannot be empty', trigger: 'change'}
  ],
  note: [
    {required: true, message: 'Note cannot be empty', trigger: 'change'}
  ]
}

const submitContactForm = async (formEl: FormInstance | undefined) => {
  if (!formEl) {
    return
  }
  await formEl.validate(async (valid) => {
    if (valid) {
      formEl.resetFields()
      ElNotification({
        title: 'Submitted Successfully',
        message: 'Thank you for reaching out. We have received your message and will get back to you as soon as possible.',
        type: 'success'
      })
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
  margin-left: 20px;
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
