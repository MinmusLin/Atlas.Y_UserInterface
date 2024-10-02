<template>
  <div class='page-container'>
    <div style='display: flex; align-items: flex-end; margin-bottom: 35px; margin-top: 150px'>
      <img src='https://static.igem.wiki/teams/5503/software-materials/defaultlogo.webp'
           style='width: 486px'
           alt='DefaultLogo'>
      <img src='https://static.igem.wiki/teams/5503/software-materials/basicversionframe.webp'
           alt='BasicVersionFrame'
           style='height: 42px; margin-left: 18px'>
    </div>

    <img src='https://static.igem.wiki/teams/5503/software-materials/titleprompt.webp'
         style='width: 815px; margin-bottom: 34px'
         alt='TitlePrompt'>

    <ShadowButton width='875px' height='60px' style='margin-bottom: 10px'
                  @click="router.push('/basic-designer/configuration')">
      <p style='font-size: 24px; margin-right: 10px'>START</p>
      <v-icon size='26px'>mdi-arrow-right</v-icon>
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
      <el-table-column width='206' prop='time' label='TIME'/>
      <el-table-column width='206' prop='sequenceOrFasta' label='SEQUENCE / FASTA'/>
      <el-table-column width='206' prop='pdb' label='PDB'/>
      <el-table-column width='206' prop='subcellularPosition' label='SUBCELLULAR POSITION'/>
    </el-table>

    <v-dialog v-model='showDialog' width='85%' min-width='1270px' persistent transition='dialog-bottom-transition'>
      <v-card class='cookies-dialog'>
        <v-card-text class='d-flex align-center'>
          <span class='cookie-icon'>
            <v-icon size='40px' color='#AACAF9'>mdi-cookie</v-icon>
          </span>
          <span style='font-size: 18px'>
            Our website uses cookies. By continuing to navigate, we assume your permission to deploy cookies as detailed in our Privacy Policy.
          </span>
          <v-btn class='accept-btn' @click='acceptCookies'>
            <v-icon size='22px' style='margin-right: 4px'>mdi-cookie</v-icon>
            Accept cookies
          </v-btn>
          <v-btn class='decline-btn' @click='showDialog=false'>
            Decline
          </v-btn>
          <v-btn class='close-btn' icon='mdi-close' @click='showDialog=false'/>
        </v-card-text>
      </v-card>
    </v-dialog>
  </div>
</template>

<script setup lang='ts'>
import {ref, onMounted} from 'vue'
import {Clock} from '@element-plus/icons-vue'
import ShadowButton from '@/components/ShadowButton.vue'
import {useRouter} from 'vue-router'

const router = useRouter()
const showDialog = ref(true)
const headerCellStyle = () => ({color: '#2F62D7', textAlign: 'center', fontSize: '12px', paddingBottom: '2px'})
const cellStyle = () => ({color: '#2F3235', textAlign: 'center', fontSize: '16px'})

const tableData = ref([
  {
    time: '1 Oct. 2024 09:50',
    sequenceOrFasta: 'KQC45421_1.fasta',
    pdb: 'KQC45421_1.pdb',
    subcellularPosition: 'MT'
  },
  {
    time: '1 Oct. 2024 10:32',
    sequenceOrFasta: 'NP_011802.fasta',
    pdb: 'NP_011802.pdb',
    subcellularPosition: 'SP'
  },
  {
    time: '1 Oct. 2024 10:54',
    sequenceOrFasta: 'BAA01255_1.fasta',
    pdb: 'BAA01255_1.pdb',
    subcellularPosition: 'GPI'
  }
])

onMounted(() => {
  const storedValue = localStorage.getItem('showDialog')
  showDialog.value = storedValue != 'false'
})

function acceptCookies() {
  showDialog.value = false
  localStorage.setItem('showDialog', 'false')
}
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

.d-flex {
  display: flex;
  align-items: center;
}

.cookie-icon {
  display: inline-flex;
  justify-content: center;
  align-items: center;
  background-color: #F6FBFF;
  border-radius: 50%;
  padding: 10px;
  margin-left: 36px;
  margin-right: 26px
}

.accept-btn {
  background-color: #5182F8;
  color: white;
  border-radius: 10px;
  width: 212px;
  height: 52px !important;
  box-shadow: none;
  margin-left: 30px;
  text-transform: none;
  letter-spacing: 0;
  font-size: 16px;
}

.accept-btn:hover {
  box-shadow: 1px 2px 4px rgba(0, 0, 0, 0.15)
}

.decline-btn {
  border: 2px solid #5182F8;
  color: #2F3235;
  border-radius: 10px;
  width: 110px;
  height: 52px !important;
  box-shadow: none;
  margin-right: 28px;
  margin-left: 28px;
  text-transform: none;
  letter-spacing: 0;
  font-size: 16px;
}

.decline-btn:hover {
  box-shadow: 1px 2px 4px rgba(0, 0, 0, 0.15)
}

.close-btn {
  color: #170F49;
  border: none;
  box-shadow: none;
}

.close-btn:hover {
  box-shadow: none;
}

.cookies-dialog {
  border-radius: 10px;
  padding-top: 38px;
  padding-bottom: 30px;
  transform: translateY(calc(50vh - 130px)) translateX(42px);
  max-width: 1700px;
}
</style>
