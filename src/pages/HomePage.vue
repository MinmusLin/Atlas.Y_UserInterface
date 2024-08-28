<template>
  <div class='page-container'>
    <img src='@/assets/Logos/DefaultLogo.png' style='width: 486px; margin-bottom: 35px; margin-top: 150px'
         alt='DefaultLogo'>
    <img src='@/assets/Logos/Title.png' style='width: 815px; margin-bottom: 34px' alt='Title'>

    <ShadowButton width='875px' height='60px' style='margin-bottom: 10px'
                  @click="router.push('/basic-designer')">
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
      <el-table-column width='250' prop='time' label='TIME'/>
      <el-table-column width='190' prop='sequenceOrFasta' label='SEQUENCE / FASTA'/>
      <el-table-column width='190' prop='pdb' label='PDB'/>
      <el-table-column width='190' prop='subcellularPosition' label='SUBCELLULAR POSITION'/>
    </el-table>

    <v-dialog v-model='showDialog' width='85%' min-width='1270px' persistent transition='dialog-bottom-transition'>
      <v-card
        style='border-radius: 10px; padding-top: 38px; padding-bottom: 30px; transform: translateY(calc(50vh - 130px))'>
        <v-card-text class='d-flex align-center'>
          <span class='cookie-icon'>
            <v-icon size='40px' color='#AACAF9'>mdi-cookie</v-icon>
          </span>
          <span style='font-size: 18px'>
            Our website uses cookies. By continuing to navigate, we assume your permission to deploy cookies as detailed in our Privacy Policy.
          </span>
          <v-btn class='accept-btn' @click='showDialog=false'>
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
import {ref} from 'vue'
import {Clock} from '@element-plus/icons-vue'
import ShadowButton from '@/components/ShadowButton.vue'
import {useRouter} from 'vue-router'

const router = useRouter()
const showDialog = ref(true)
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
</style>
