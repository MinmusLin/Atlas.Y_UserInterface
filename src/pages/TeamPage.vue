<template>
  <div class='page-container'>
    <div class='container'>
      <div class="title-section">
        <div class="title">
          <label class="main">Team</label><br>
          <label class="sub">Tongji-Software</label>
        </div>
        <div class="intro">
          <p>Our team is composed of passionate students and teachers from Tongji University, all dedicated to the field of synthetic biology. We bring together diverse academic backgrounds, personalities, and strengths, which is our greatest asset.  United by a common goal, we are developing the Atlas.Y toolbox. This challenging project has strengthened our collaboration, allowing us to effectively transform complex scientific concepts into practical applications.We take pride in the contributions of every team member and the forward-thinking project we have accomplished together.</p>
        </div>
      </div>
    </div>
    <div class="group-section">
      <div class="group-name">
        Algorithm Development
      </div>
      <div class="group">
        <MemberCard name='Shurui Ning'
                    position='Leader'
                    photo='/Members/exp.png'
                    description='wwwwwwwwwwwww'/>        
        <MemberCard name='Jinling Yuan'
                    position='Leader'
                    photo='/Members/exp.png'
                    description='wwwwwwwwwwwww'/>  
        <MemberCard name='Xichen Liao'
                    position='Member'
                    photo='/Members/exp.png'
                    description='wwwwwwwwwwwww'/>        
        <MemberCard name='Ying Xu'
                    position='Member'
                    photo='/Members/exp.png'
                    description='wwwwwwwwwwwww'/>  
                    <MemberCard name='Hengyu Wang'
                    position='Member'
                    photo='/Members/exp.png'
                    description='wwwwwwwwwwwww'/>        
      </div>
    </div>
    <div class="group-section">
      <div class="group-name">
        Software Development
      </div>
      <div class="group">
        <MemberCard name='Jishen Lin'
                    position='Leader'
                    photo='/Members/exp.png'
                    description='wwwwwwwwwwwww'/>        
        <MemberCard name='Jiaxin Fan'
                    position='Member'
                    photo='/Members/exp.png'
                    description='wwwwwwwwwwwww'/>  
        <MemberCard name='Wenjian Zhang'
                    position='Member'
                    photo='/Members/exp.png'
                    description='wwwwwwwwwwwww'/>        
        <MemberCard name='Wenxin Zeng'
                    position='Member'
                    photo='/Members/exp.png'
                    description='wwwwwwwwwwwww'/>  
                    <MemberCard name='Zhuobing Zhao'
                    position='Member'
                    photo='/Members/exp.png'
                    description='wwwwwwwwwwwww'/>        
      </div>
    </div>
    <div class="group-section">
      <div class="group-name">
        Design
      </div>
      <div class="group">
        <MemberCard name='Yiran Wan'
                    position='Leader'
                    photo='/Members/exp.png'
                    description='wwwwwwwwwwwww'/>        
        <MemberCard name='Xinyu Dang'
                    position='Member'
                    photo='/Members/exp.png'
                    description='wwwwwwwwwwwww'/>  
        <MemberCard name='Zhiye Wang'
                    position='Member'
                    photo='/Members/exp.png'
                    description='wwwwwwwwwwwww'/>        
      </div>
    </div>
    <div class="group-section">
      <div class="group-name">
        Humman Practice
      </div>
      <div class="group">
        <MemberCard name='Xi Cui'
                    position='Member'
                    photo='/Members/exp.png'
                    description='wwwwwwwwwwwww'/>        
        <MemberCard name='Ziwen Yao'
                    position='Member'
                    photo='/Members/exp.png'
                    description='wwwwwwwwwwwww'/>      
      </div>
    </div>
    <div class="group-section">
      <div class="group-name">
        PI
      </div>
      <div class="group">
        <MemberCard name='Jing Zhang'
                    position='Primary PI'
                    photo='/Members/exp.png'
                    description='wwwwwwwwwwwww'/>        
        <MemberCard name='Qi Liu'
                    position='Primary PI'
                    photo='/Members/exp.png'
                    description='wwwwwwwwwwwww'/>  
        <MemberCard name='Qi Liu'
                    position='Secondary PI'
                    photo='/Members/exp.png'
                    description='wwwwwwwwwwwww'/>        
      </div>
    </div>
    <div class="group-section">
      <div class="group-name">
        Instructor
      </div>
      <div class="group">
        <MemberCard name='Yunzhe Kang'
                    position='Instructor'
                    photo='/Members/exp.png'
                    description='wwwwwwwwwwwww'/>      
      </div>
    </div>
    
  </div>
</template>

<script setup lang='ts'>
import MemberCard from '@/components/MemberCard.vue';

</script>

<style scoped>
.page-container {
  width: 100%;
  height: 100%;
  overflow-y: scroll;
  overflow-x: hidden;
}

.page-container::-webkit-scrollbar {
  display: none;
}

.container {
  display: flex;
  justify-content: center;
  align-items: center;
}

.title-section {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 77px;
  width: 1207px;
  height: 188px;
  margin-bottom: 46px;
}

.title {
  width: 40%;
  height: 188px;
  margin-top: -20px;
}

.main {
  font-size: 40px;
  font-weight: 600;
  line-height: 48.41px;
  text-align: left;
  color: #5182F8;
}

.sub {
  font-size: 32px;
  font-weight: 600;
  line-height: 41.6px;
  text-align: left;
  color: #5182F8;
}

.intro {
  width: 719px;
  margin-bottom: -50px;
}

.intro p {
  font-size: 16px;
  font-weight: 500;
  line-height: 19.36px;
  text-align: left;  
}

.group-section {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-bottom: 65px;
}

.group-name {
  font-size: 24px;
  font-weight: 600;
  line-height: 29.05px;
  text-align: center;
  margin-bottom: 34px;
}

.group {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 48px;
}
</style>
