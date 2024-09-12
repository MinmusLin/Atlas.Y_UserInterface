<template>
  <div class='page-container'>
    <div class='container'>
      <div class='title-section'>
        <div class='title'>
          <label class='main'>Team</label><br>
          <label class='sub'>Tongji-Software</label>
        </div>
        <div class='intro'>
          <p>Our team is composed of passionate students and teachers from Tongji University, all dedicated to the field
            of synthetic biology. We bring together diverse academic backgrounds, personalities, and strengths, which is
            our greatest asset. United by a common goal, we are developing the Atlas.Y toolbox. This challenging project
            has strengthened our collaboration, allowing us to effectively transform complex scientific concepts into
            practical applications.We take pride in the contributions of every team member and the forward-thinking
            project we have accomplished together.</p>
        </div>
      </div>
    </div>
    <div class='group-section'>
      <div class='group-name'>Algorithm Development</div>
      <div class='group'>
        <MemberCard name='Shurui Ning'
                    position='Leader'
                    photo='/Members/Example.png'
                    description='Description.'/>
        <MemberCard name='Jinling Yuan'
                    position='Leader'
                    photo='/Members/Example.png'
                    description='Description.'/>
        <MemberCard name='Xichen Liao'
                    position='Member'
                    photo='/Members/Example.png'
                    description='Description.'/>
        <MemberCard name='Ying Xu'
                    position='Member'
                    photo='/Members/Example.png'
                    description='Description.'/>
        <MemberCard name='Hengyu Wang'
                    position='Member'
                    photo='/Members/Example.png'
                    description='Description.'/>
      </div>
    </div>
    <div class='group-section'>
      <div class='group-name'>Software Development</div>
      <div class='group'>
        <MemberCard name='Jishen Lin'
                    position='Leader'
                    photo='/Members/Example.png'
                    description='Description.'/>
        <MemberCard name='Shuyi Liu'
                    position='Member'
                    photo='/Members/Example.png'
                    description='Description.'/>
        <MemberCard name='Wenjian Zhang'
                    position='Member'
                    photo='/Members/Example.png'
                    description='Description.'/>
        <MemberCard name='Zhuobing Zhao'
                    position='Member'
                    photo='/Members/Example.png'
                    description='Description.'/>
        <MemberCard name='Wenxin Zeng'
                    position='Member'
                    photo='/Members/Example.png'
                    description='Description.'/>
      </div>
    </div>
    <div class='group-section'>
      <div class='group-name'>Design</div>
      <div class='group'>
        <MemberCard name='Yiran Wan'
                    position='Leader'
                    photo='/Members/Example.png'
                    description='Description.'/>
        <MemberCard name='Xinyu Dang'
                    position='Member'
                    photo='/Members/Example.png'
                    description='Description.'/>
        <MemberCard name='Zhiye Wang'
                    position='Member'
                    photo='/Members/Example.png'
                    description='Description.'/>
      </div>
    </div>
    <div class='group-section'>
      <div class='group-name'>Human Practice</div>
      <div class='group'>
        <MemberCard name='Xi Cui'
                    position='Member'
                    photo='/Members/Example.png'
                    description='Description.'/>
        <MemberCard name='Ziwen Yao'
                    position='Member'
                    photo='/Members/Example.png'
                    description='Description.'/>
      </div>
    </div>
    <div class='group-section'>
      <div class='group-name'>PI</div>
      <div class='group'>
        <MemberCard name='Jing Zhang'
                    position='Primary PI'
                    photo='/Members/Example.png'
                    description='Description.'/>
        <MemberCard name='Guohui Chuai'
                    position='Secondary PI'
                    photo='/Members/Example.png'
                    description='Description.'/>
      </div>
    </div>
    <div class='group-section'>
      <div class='group-name'>Instructor</div>
      <div class='group'>
        <MemberCard name='Yunzhe Kang'
                    position='Instructor'
                    photo='/Members/Example.png'
                    description='Description.'/>
      </div>
    </div>
  </div>
</template>

<script setup lang='ts'>
import MemberCard from '@/components/MemberCard.vue'
</script>

<style scoped>
.page-container {
  width: 100%;
  height: 100vh;
  overflow-y: scroll;
}

.container {
  display: flex;
  justify-content: center;
  align-items: center;
}

.title-section {
  display: flex;
  justify-content: space-between;
  width: 1100px;
}

.title {
  margin-top: 58px;
}

.main {
  font-size: 40px;
  font-weight: 600;
  line-height: 48px;
  color: #5182F8;
}

.sub {
  font-size: 32px;
  font-weight: 600;
  line-height: 42px;
  color: #5182F8;
}

.intro {
  width: 670px;
  margin-top: 110px;
  margin-bottom: 45px;
}

.intro p {
  font-size: 16px;
  font-weight: 600;
  line-height: 20px;
  text-align: justify;
}

.group-section {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-bottom: 62px;
}

.group-name {
  font-size: 24px;
  font-weight: 600;
  margin-bottom: 30px;
}

.group {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 50px;
}
</style>
