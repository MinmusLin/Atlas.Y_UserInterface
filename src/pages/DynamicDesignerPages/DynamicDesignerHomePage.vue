<template>
  <div class='page-container'>
    <div style='display: flex; align-items: flex-end; margin-bottom: 35px; margin-top: 150px'>
      <img src='https://static.igem.wiki/teams/5503/software-materials/defaultlogo.webp'
           style='width: 486px'
           alt='DefaultLogo'>
      <img src='https://static.igem.wiki/teams/5503/software-materials/dynamicversionframe.webp'
           alt='DynamicVersionFrame'
           style='height: 42px; margin-left: 18px'>
    </div>

    <img src='https://static.igem.wiki/teams/5503/software-materials/titleprompt.webp'
         style='width: 815px; margin-bottom: 34px'
         alt='TitlePrompt'>

    <ShadowButton width='875px'
                  height='60px'
                  style='position: relative; margin-bottom: 10px'
                  @click='showContinueDialog=true'>
      <p style='font-size: 24px; margin-right: 10px'>START</p>
      <v-icon size='26px'>mdi-arrow-right</v-icon>
      <img class='icon' src='https://static.igem.wiki/teams/5503/software-materials/inclinedcrown.webp'
           alt='InclinedCrown'/>
    </ShadowButton>

    <el-table :data='tableData'
              height='133px'
              class='table-style'
              :cell-style='cellStyle'
              :header-cell-style='headerCellStyle'
              size='large'
              style='width: 874px'>
      <el-table-column width='50'>
        <el-icon style='transform: translateY(2px)'>
          <Clock/>
        </el-icon>
      </el-table-column>
      <el-table-column width='250' prop='time' label='TIME'/>
      <el-table-column width='190' prop='sequenceOrFasta' label='SEQUENCE / FASTA'/>
      <el-table-column width='190' prop='pdb' label='PDB'/>
      <el-table-column width='190' prop='subcellularPosition' label='SUBCELLULAR POSITION'/>
    </el-table>
  </div>

  <Dialog v-model='showContinueDialog' style='padding: 14px 40px 0 40px; width: 543px; height: 299px'>
    <div class='dialog-header'>
      <img src='https://static.igem.wiki/teams/5503/software-materials/defaultcrown.webp'
           class='crown-icon'
           alt='DefaultCrown'/>
      <p class='dialog-title'>Experience Membership Features</p>
    </div>
    <div class='dialog-description'>
      <p>
        This is our membership feature. For more sophisticated algorithms and superior solutions, please go to our store
        to explore!
      </p>
    </div>
    <div class='dialog-privileges'>
      <div class='title'>
        <hr style='border: 1px solid #C5C9CD; width: 177px'/>
        <p class='privileges-title'>Privileges</p>
        <hr style='border: 1px solid #C5C9CD; width: 177px'/>
      </div>
      <div class='privileges-icons'>
        <div class='privilege-item' style='width: 96px; height: 62px'>
          <img src='https://static.igem.wiki/teams/5503/software-materials/datasecurity.webp'
               alt='DataSecurity'/>
          <p>Data Security</p>
        </div>
        <div class='privilege-item' style='width: 93px; height: 62px'>
          <img src='https://static.igem.wiki/teams/5503/software-materials/teammanagement.webp'
               alt='TeamManagement'/>
          <p>Team Management</p>
        </div>
        <div class='privilege-item' style='width: 105px; height: 62px'>
          <img src='https://static.igem.wiki/teams/5503/software-materials/advancedalgorithms.webp'
               alt='AdvancedAlgorithms'/>
          <p>Advanced Algorithms</p>
        </div>
        <div class='privilege-item' style='width: 105px; height: 62px'>
          <img src='https://static.igem.wiki/teams/5503/software-materials/customdevelopment.webp'
               alt='CustomDevelopment'/>
          <p>Custom Development</p>
        </div>
      </div>
    </div>
    <DefaultButton width='100%' height='40px' text='Learn More' :active='true'
                   @click="router.push('/algorithm-store')"/>
  </Dialog>
</template>

<script setup lang='ts'>
import {ref} from 'vue'
import {Clock} from '@element-plus/icons-vue'
import {useRouter} from 'vue-router'
import ShadowButton from '@/components/ShadowButton.vue'
import Dialog from '@/components/Dialog.vue'
import DefaultButton from '@/components/DefaultButton.vue'

const router = useRouter()
const showContinueDialog = ref(false)
const headerCellStyle = () => ({color: '#2F62D7', textAlign: 'center', fontSize: '12px', paddingBottom: '2px'})
const cellStyle = () => ({color: '#2F3235', textAlign: 'center', fontSize: '16px'})

const tableData = ref([
  {
    time: 'January, 1 2024 22:01',
    sequenceOrFasta: 'ABC.DEF',
    pdb: 'pdb1.pdb',
    subcellularPosition: 'cell nucleus 1'
  },
  {
    time: 'February, 2 2024 22:02',
    sequenceOrFasta: 'GHI.JKL',
    pdb: 'pdb2.pdb',
    subcellularPosition: 'cell nucleus 2'
  },
  {
    time: 'Wednesday, 30 2024 22:03',
    sequenceOrFasta: 'MNO.PQR',
    pdb: 'pdb3.pdb',
    subcellularPosition: 'cell nucleus 3'
  },
  {
    time: 'April, 4 2024 22:04',
    sequenceOrFasta: 'STU.VWX',
    pdb: 'pdb4.pdb',
    subcellularPosition: 'cell nucleus 4'
  }
])
</script>

<style scoped>
.page-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.table-style >>> tbody tr > td {
  border: 2px white !important;
  transition: border-color 0.3s ease-in-out !important;
  padding: 7px 0 !important;
}

.table-style >>> tbody tr > td:first-child {
  border-right: none !important;
  padding-left: 2px !important;
}

.table-style >>> tbody tr > td:not(:first-child):not(:last-child) {
  border-left: none !important;
  border-right: none !important;
}

.table-style >>> tbody tr > td:last-child {
  border-left: none !important;
  padding-right: 2px !important;
}

.table-style >>> tbody tr:hover > td {
  background-color: #EEF3FF !important;
  border: 2px solid #5182F8 !important;
  padding: 5px 0 !important;
}

.table-style >>> tbody tr:hover > td:first-child {
  border-left-width: 2px !important;
  border-top-left-radius: 5px !important;
  border-bottom-left-radius: 5px !important;
  border-right: none !important;
}

.table-style >>> tbody tr:hover > td:not(:first-child):not(:last-child) {
  border-left: none !important;
  border-right: none !important;
}

.table-style >>> tbody tr:hover > td:last-child {
  border-right-width: 2px !important;
  border-top-right-radius: 5px !important;
  border-bottom-right-radius: 5px !important;
  border-left: none !important;
}

.icon {
  position: absolute;
  top: -15px;
  right: -15px;
  width: 50px;
  height: 50px;
}

.dialog-header {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 8px;
}

.crown-icon {
  width: 15px;
  height: 15px;
  margin-right: 8px;
}

.dialog-title {
  font-size: 16px;
  font-weight: 600;
  line-height: 20px;
  text-align: left;
  color: #2F3235;
}

.dialog-description {
  font-size: 14px;
  font-weight: 400;
  line-height: 20px;
  text-align: center;
  color: #2F3235;
  margin-bottom: 14px;
}

.dialog-privileges {
  text-align: center;
  margin-bottom: 24px;
}

.title {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 10px;
}

.privileges-title {
  font-size: 12px;
  font-weight: 600;
  line-height: 14px;
  text-align: left;
  color: #2F3235;
  padding-left: 12px;
  padding-right: 12px;
}

.privileges-icons {
  display: flex;
  justify-content: space-between;
  margin-bottom: 14px;
}

.privilege-item {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-size: 10px;
  font-weight: 600;
  line-height: 12px;
  text-align: left;
  color: #5182F8;
}

.privilege-item img {
  width: 48px;
  height: 48px;
  margin-bottom: 8px;
}
</style>
