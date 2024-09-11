<template>
  <div class='page-container'>
    <p class='form-title'>Contact Form</p>
    <el-form ref='contactRuleFormRef' :model='contactRuleForm' :rules='contactRules'>
      <el-form-item prop='researchField'>
        <p>Research Field</p>
        <el-select v-model='contactRuleForm.researchField'
                   style='width: 492px'
                   placeholder='Select your research field'>
          <el-option v-for='(researchField, index) in researchFields'
                     :key='index'
                     :label='researchField'
                     :value='researchField'/>
        </el-select>
      </el-form-item>
      <el-form-item prop='post'>
        <p>Post</p>
        <el-select v-model='contactRuleForm.post'
                   style='width: 492px'
                   placeholder='Select your post'>
          <el-option v-for='(post, index) in posts'
                     :key='index'
                     :label='post'
                     :value='post'/>
        </el-select>
      </el-form-item>
      <el-form-item prop='country'>
        <p>Country</p>
        <el-select v-model='contactRuleForm.country'
                   style='width: 492px'
                   placeholder='Select your country'>
          <el-option v-for='(country, code) in countries'
                     :key='code'
                     :label='country.name'
                     :value='country.name'>
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item prop='givenName'>
        <p>Given Name</p>
        <el-input v-model='contactRuleForm.givenName'
                  style='width: 492px'
                  placeholder='Enter your given name'/>
      </el-form-item>
      <el-form-item prop='surname'>
        <p>Surname</p>
        <el-input v-model='contactRuleForm.surname'
                  style='width: 492px'
                  placeholder='Enter your surname'/>
      </el-form-item>
      <el-form-item prop='email'>
        <p>E-mail</p>
        <el-input v-model='contactRuleForm.email'
                  style='width: 492px'
                  placeholder='Enter your E-mail'/>
      </el-form-item>
      <el-form-item prop='phoneNumber'>
        <p>Phone Number</p>
        <el-input v-model='contactRuleForm.phoneNumber'
                  style='width: 492px'
                  placeholder='Enter your phone number'/>
      </el-form-item>
      <el-form-item prop='companyOrInstitution'>
        <p>Company / Institution</p>
        <el-input v-model='contactRuleForm.companyOrInstitution'
                  style='width: 492px'
                  placeholder='Enter your company or institution'/>
      </el-form-item>
      <el-form-item prop='note'>
        <p>Note</p>
        <el-input v-model='contactRuleForm.note'
                  style='width: 492px'
                  type='textarea'
                  placeholder='Tell us about your needs'/>
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup lang='ts'>
import {ref, reactive} from 'vue'
import {FormInstance, FormRules} from 'element-plus'
import countries from 'country-list/data.json'

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
      console.log('valid')
    }
  })
}
</script>

<style scoped>
.page-container {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding-top: 30px;
}

.form-title {
  color: #5182F8;
  font-size: 40px;
  font-weight: 600;
  line-height: 49px;
  margin-bottom: 20px;
  margin-left: 0;
}
</style>
