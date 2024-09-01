<template>
  <div class='page-container'>
    <div class='title-container'>
      <h1 class='title'>Directed Evolution Results</h1>
      <span class='results'>
        <span class='row-number'>{{ row }}</span> results
      </span>
    </div>

    <div class='subtitle-container'>
      <span class='subtitle' style='margin-right: 50px'>
        <span class='sub-content'>Fusion Protein: </span>{{ fusionProtein }}
      </span>
      <span class='subtitle' style='margin-right: 50px'>
        <span class='sub-content'>Signal: </span>{{ signal }}
      </span>
      <span class='subtitle' style='margin-right: 50px'>
        <span class='sub-content'>Linker: </span>{{ linker }}
      </span>
      <span class='subtitle'>
        <span class='sub-content'>Function: </span>{{ algoFuntion }}
      </span>
    </div>

    <div class='hint-container'>Click to select an entry</div>

    <el-table :data='currentPageData'
              style='width: 1093px; max-height: 470px; overflow-y: auto'
              class="table-style"
              :header-cell-style='headerCellStyle'
              :cell-style='cellStyle'
              height='470'>
      <el-table-column prop='variantID'
                       label='variant ID'
                       width='290'/>
      <el-table-column prop='evolutionScore'
                       label='Evolution Score'
                       width='470'/>
      <el-table-column prop='evolutionRate'
                       label='Evolution Rate'
                       width='333'/>
    </el-table>
    <div class='pagination-container'>
      <el-pagination v-model:currentPage='currentPage'
                     :page-size='pageSize'
                     :total='row'
                     background
                     pager-count='6'
                     layout='prev, pager, next'
                     hide-on-single-page
                     @current-change='handlePageChange'/>
    </div>
  </div>
</template>

<script setup lang='ts'>
import {ref, computed} from 'vue'

interface TableData {
  variantID: string
  evolutionScore: number
  evolutionRate: string
}

interface CellStyleParams {
  columnIndex: number
}

const fusionProtein = ref('FP_001')
const signal = ref('SG_001')
const linker = ref('LK_001')
const algoFuntion = ref('Solubility')
const row = ref(1050)
const pageSize = ref(100)
const currentPage = ref(1)
const tableData = ref<TableData[]>([])

for (let i = 0; i < row.value; i++) {
  tableData.value.push({
    variantID: `VR_0001`,
    evolutionScore: 76.5,
    evolutionRate: `20%`,
  })
}

const currentPageData = computed(() => {
  const start = (currentPage.value - 1) * pageSize.value
  const end = start + pageSize.value
  return tableData.value.slice(start, end)
})

const handlePageChange = (page: number) => {
  currentPage.value = page
}

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
    style.paddingRight = '60px'
  } else if (columnIndex == 2) {
    style.borderTopRightRadius = '10px'
    style.paddingLeft = '70px'
  } else if (columnIndex == 1) {
    style.paddingLeft = '50px'
  }
  return style
}

const cellStyle = ({columnIndex}: CellStyleParams) => {
  const style = {...baseCellStyle} as any
  if (columnIndex == 0) {
    style.borderLeft = '2px solid #EEF3FE'
    style.paddingRight = '60px'

  }
  if (columnIndex == 2) {
    style.borderRight = '2px solid #EEF3FE'
    style.paddingLeft = '70px'
  }
  if (columnIndex == 1) {
    style.paddingLeft = '50px'
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

.results {
  margin-left: 23px;
  font-size: 24px;
  font-weight: 600;
  color: #2F3235;
  line-height: 24px;
}

.row-number {
  color: #16396E;
}

.subtitle-container {
  display: flex;
  width: 1093px;
  height: 28px;
  font-size: 16px;
  text-align: center;
  margin-bottom: 24px;
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

.hint-container {
  display: flex;
  width: 1093px;
  height: 17px;
  font-size: 14px;
  font-weight: 500;
  color: #C5C9CD;
  margin-bottom: 9px;
}

.pagination-container {
  display: flex;
  justify-content: flex-end;
  width: 1093px;
  margin-top: 16px;
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
