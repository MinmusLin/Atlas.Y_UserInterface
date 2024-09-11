<template>
  <div class='page-container'>
    <div class='title-container'>
      <h1 class='title'>Stability Evaluation</h1>
    </div>

    <div class='subtitle-container'>
      <span class='subtitle' style='margin-right: 50px'>
        <span class='sub-content'>Fusion Protein: </span>{{ fusionProtein }}
      </span>
      <span class='subtitle' style='margin-right: 50px'>
        <span class='sub-content'>Signal: </span>{{ signal }}
      </span>
      <span class='subtitle'>
        <span class='sub-content'>Linker: </span>{{ linker }}
      </span>
    </div>

    <el-table :data='currentPageData'
              style='width: 1093px; max-height: 470px; overflow-y: auto'
              class="table-style"
              :header-cell-style='headerCellStyle'
              :cell-style='cellStyle'
              height='470'>
      <el-table-column prop='item'
                       label='Item'
                       width='290'/>
      <el-table-column prop='scoreValue'
                       label='Score Value'
                       width='270'/>
      <el-table-column prop='explanation'
                       label='Explanation'
                       width='533'/>
    </el-table>
  </div>
</template>

<script setup lang='ts'>
import {ref, computed} from 'vue'

interface TableData {
  item: string
  scoreValue: number
  explanation: string
}

interface CellStyleParams {
  rowIndex: number
  columnIndex: number
}

const fusionProtein = ref('FP_001')
const signal = ref('SG_001')
const linker = ref('LK_001')
const row = ref(25)
const pageSize = ref(100)
const currentPage = ref(1)
const tableData = ref<TableData[]>([])

for (let i = 0; i < row.value; i++) {
  tableData.value.push({
    item: 'fa_art',
    scoreValue: -2525.13,
    explanation: 'Favorable atomic attraction',
  })
}

tableData.value[0] = {
  item: 'Total Score',
  scoreValue: -254.71,
  explanation: 'Overall stability score',
}

const currentPageData = computed(() => {
  const start = (currentPage.value - 1) * pageSize.value
  const end = start + pageSize.value
  return tableData.value.slice(start, end)
})

const baseHeaderStyle = {
  backgroundColor: '#2F62D7',
  height: '42px',
  fontSize: '16px',
  color: 'white',
  textAlign: 'center',
  fontWeight: 600,
}

const baseCellStyle = {
  backgroundColor: 'white',
  height: '37px',
  fontSize: '16px',
  color: '#2F3235',
  textAlign: 'center',
  paddingTop: '7px',
  paddingBottom: '6px',
  fontWeight: 400,
  borderTop: '1px solid #ffffff',
  borderBottom: '1px solid #5182F8',
}

const headerCellStyle = ({columnIndex}: CellStyleParams) => {
  const style = {...baseHeaderStyle} as any
  if (columnIndex == 0) {
    style.borderTopLeftRadius = '10px'
    style.paddingRight = '160px'
  } else if (columnIndex == 2) {
    style.borderTopRightRadius = '10px'
    style.paddingLeft = '40px'
    style.textAlign = 'left'
  } else if (columnIndex == 1) {
    style.paddingRight = '120px'
  }
  return style
}

const cellStyle = ({rowIndex, columnIndex}: CellStyleParams) => {
  const style = {...baseCellStyle} as any
  if (rowIndex == 0) {
    style.backgroundColor = '#EEF3FE'
    style.fontWeight = 600
  }
  if (columnIndex == 0) {
    style.borderLeft = '2px solid #EEF3FE'
    style.paddingRight = '160px'
  }
  if (columnIndex == 2) {
    style.borderRight = '2px solid #EEF3FE'
    style.paddingLeft = '40px'
    style.textAlign = 'left'
    style.color = '#8F9396'
  }
  if (columnIndex == 1) {
    style.paddingRight = '120px'
  }
  return style
}
</script>

<style scoped>
.page-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 0;
  margin: 0;
}

.title-container {
  display: flex;
  align-items: end;
  width: 1093px;
  margin-bottom: 15px;
  color: #2F3235;
}

.title {
  height: 48px;
  font-size: 40px;
  font-weight: 600;
}

.subtitle-container {
  display: flex;
  width: 1093px;
  height: 28px;
  font-size: 16px;
  text-align: center;
  margin-bottom: 26px;
  border-bottom: 1px solid #C5C9CD;
}

.subtitle {
  color: #2F3235;
  font-weight: 400;
}

.sub-content {
  color: #16396E;
  font-weight: 600;
}

.table-style >>> tbody tr:hover > td {
  background-color: #EEF3FF !important;
  border: 2px solid #5182F8 !important;
  border-top: 1px solid #5182F8 !important;
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
