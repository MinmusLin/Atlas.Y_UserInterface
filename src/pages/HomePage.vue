<template>
  <div class='page-container'>
    <img src='@/assets/Logos/DefaultLogo.png' style='width: 486px; margin-bottom: 35px'
         alt='DefaultLogo'>
    <img src='@/assets/Logos/Title.png' style='width: 815px; margin-bottom: 34px' alt='Title'>

    <ShadowButton width='875px' height='60px' style='margin-bottom: 10px'
                  @click="router.push('/basic-designer')">
      <p style='font-size: 24px; margin-right: 14px'>START</p>
      <img src='@/assets/Icons/ArrowRight.png' alt='ArrowRight' style='filter: invert(100%); width: 16px'>
    </ShadowButton>

    <el-table :data='tableData'
              height='160px'
              style='width: 874px'
              class='table-style'
              :cell-style='cellStyle'
              :header-cell-style='headerCellStyle'
              size='large'
              table-layout='auto'>
      <el-table-column width="20px">
        <el-icon style='transform: translateY(2px)'>
          <Clock/>
        </el-icon>
      </el-table-column>
      <el-table-column prop='time' label='TIME'/>
      <el-table-column prop='sequenceOrFasta' label='SEQUENCE / FASTA'/>
      <el-table-column prop='pdb' label='PDB'/>
      <el-table-column prop='subcellularPosition' label='SUBCELLULAR POSITION'/>
    </el-table>
  </div>
</template>

<script setup lang='ts'>
import {ref} from 'vue'
import {Clock} from '@element-plus/icons-vue'
import ShadowButton from '@/components/ShadowButton.vue'
import {useRouter} from 'vue-router'

const router = useRouter()
const headerCellStyle = () => ({color: '#2F62D7', textAlign: 'center', fontSize: '12px'})
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
    time: 'Wednesday, 3 2024 22:03',
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
</style>
