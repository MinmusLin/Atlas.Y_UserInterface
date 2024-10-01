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
        <MemberCard photo='https://static.igem.wiki/teams/5503/team-members/shuruining.webp'
                    name='Shurui Ning'
                    role='Team Leader'
                    :font-size='10'
                    bio='Analysis, Conceptualization, Background Research, Investigation, Data Curation, Project Administration, Notebook/record keeping, Writing, Public Engagement'/>
        <MemberCard photo='https://static.igem.wiki/teams/5503/team-members/jinlingyuan.webp'
                    name='Jinling Yuan'
                    role='Team Leader'
                    :font-size='10'
                    bio='Analysis, Conceptualization, Background Research, Investigation, Data Curation, Notebook/record keeping, Project Administration, Public Engagement, Writing'/>
        <MemberCard photo='https://static.igem.wiki/teams/5503/team-members/xichenliao.webp'
                    name='Xichen Liao'
                    role='Student'
                    bio='Conceptualization, Background Research, Investigation, Data Curation, Writing'/>
        <MemberCard photo='https://static.igem.wiki/teams/5503/team-members/yingxu.webp'
                    name='Ying Xu'
                    role='Student'
                    bio='Conceptualization, Background Research, Investigation, Data Curation, Writing'/>
        <MemberCard photo='https://static.igem.wiki/teams/5503/team-members/hengyuwang.webp'
                    name='Hengyu Wang'
                    role='Student'
                    bio='Background Research, Investigation, Writing'/>
      </div>
    </div>
    <div class='group-section'>
      <div class='group-name'>Software Development and Wiki Coding</div>
      <div class='group'>
        <MemberCard photo='https://static.igem.wiki/teams/5503/team-members/jishenlin.webp'
                    name='Jishen Lin'
                    role='Team Leader'
                    bio='Analysis, Notebook/record keeping, Project Administration, Wiki Coding, Software'/>
        <MemberCard photo='https://static.igem.wiki/teams/5503/team-members/shuyiliu.webp'
                    name='Shuyi Liu'
                    role='Student'
                    bio='Software, Wiki Coding'/>
        <MemberCard photo='https://static.igem.wiki/teams/5503/team-members/wenjianzhang.webp'
                    name='Wenjian Zhang'
                    role='Student'
                    bio='Software'/>
        <MemberCard photo='https://static.igem.wiki/teams/5503/team-members/zhuobingzhao.webp'
                    name='Zhuobing Zhao'
                    role='Student'
                    bio='Software'/>
        <MemberCard photo='https://static.igem.wiki/teams/5503/team-members/jiaxinfan.webp'
                    name='Jiaxin Fan'
                    role='Student'
                    bio='Software'/>
      </div>
    </div>
    <div class='group-section'>
      <div class='group-name'>Art Design</div>
      <div class='group'>
        <MemberCard photo='https://static.igem.wiki/teams/5503/team-members/yiranwan.webp'
                    name='Yiran Wan'
                    role='Student'
                    bio='Notebook/record keeping, Project Administration, Writing, Visualization'/>
        <MemberCard photo='https://static.igem.wiki/teams/5503/team-members/xinyudang.webp'
                    name='Xinyu Dang'
                    role='Student'
                    bio='Visualization, Writing'/>
        <MemberCard photo='https://static.igem.wiki/teams/5503/team-members/zhiyewang.webp'
                    name='Zhiye Wang'
                    role='Student'
                    bio='Writing, Visualization'/>
      </div>
    </div>
    <div class='group-section'>
      <div class='group-name'>Human Practices</div>
      <div class='group'>
        <MemberCard photo='https://static.igem.wiki/teams/5503/team-members/ziwenyao.webp'
                    name='Ziwen Yao'
                    role='Student'
                    bio='Notebook/record keeping, Project Administration, Public Engagement, Entrepreneurship'/>
        <MemberCard photo='https://static.igem.wiki/teams/5503/team-members/xicui.webp'
                    name='Xi Cui'
                    role='Student'
                    bio='Project Administration, Public Engagement, Entrepreneurship'/>
        </div>
    </div>
    <div class='group-section'>
      <div class='group-name'>Wet Lab</div>
      <div class='group'>
        <MemberCard photo='https://static.igem.wiki/teams/5503/team-members/zhenhuabai.webp'
                    name='Zhenhua Bai'
                    role='Student'
                    bio='Investigation, Notebook/record keeping, Safety'/>
      </div>
    </div>
    <div class='group-section'>
      <div class='group-name'>PI</div>
      <div class='group'>
        <MemberCard photo='https://static.igem.wiki/teams/5503/team-members/jingzhang.webp'
                    name='Prof. Jing Zhang'
                    role='Primary PI'
                    bio='Fundraising'>
          <template v-slot:name>
            <span>Prof.</span><br/>
            <span>Jing Zhang</span>
          </template>
        </MemberCard>
        <MemberCard photo='https://static.igem.wiki/teams/5503/team-members/guohuichuai.webp'
                    name='Asst.Prof. Guohui Chuai'
                    role='Secondary PI'
                    bio='Safety, Conceptualization'>
          <template v-slot:name>
            <span>Asst.Prof.</span><br/>
            <span>Guohui Chuai</span>
          </template>
        </MemberCard>
      </div>
    </div>
    <div class='group-section'>
      <div class='group-name'>Instructor</div>
      <div class='group'>
        <MemberCard photo='https://static.igem.wiki/teams/5503/team-members/yunzhekang.webp'
                    name='Yunzhe Kang'
                    role='Instructor'
                    bio='Safety, Conceptualization'/>
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
  color: #2F3235;
}

.intro p {
  font-size: 16px;
  font-weight: 600;
  line-height: 20px;
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
  color: #2F3235;
}

.group {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 50px;
}
</style>
