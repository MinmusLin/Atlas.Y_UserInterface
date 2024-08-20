<template>
  <div class='page-container'>
    <img src='@/assets/Logos/DefaultLogo.png' style='width: 486px; margin-bottom: 35px'
         alt='DefaultLogo'>
    <img src='@/assets/Logos/Title.png' style='width: 815px; margin-bottom: 34px' alt='Title'>

    <ShadowButton width='875px' height='60px' style='margin-bottom: 50px'
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
        <el-icon>
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
const cellStyle = () => ({textAlign: 'center', fontSize: '16px', padding: '16px'})

const tableData = ref([
  {
    time: 'December, 20 2024 22:00',
    sequenceOrFasta: 'ABC.fasta',
    pdb: '3txf.p',
    subcellularPosition: 'cell nucleus111'
  },
  {
    time: 'July, 20 2024 22:00',
    sequenceOrFasta: 'ABC.fastaa',
    pdb: '3tx.pd',
    subcellularPosition: 'cell nucleus11'
  },
  {
    time: 'October, 20 2024 22:00',
    sequenceOrFasta: 'ABC.fastaaa',
    pdb: '3txf.pdb',
    subcellularPosition: 'cell nucleus1'
  },
  {
    time: 'June, 20 2024 22:00',
    sequenceOrFasta: 'ABC.fastaaaa',
    pdb: '3txf.pdbb',
    subcellularPosition: 'cell nucleus'
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
