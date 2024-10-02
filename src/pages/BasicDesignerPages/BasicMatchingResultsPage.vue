<template>
  <div class='page-container'>
    <!--suppress TypeScriptValidateTypes-->
    <el-breadcrumb :separator-icon='ArrowRight' class='breadcrumb'>
      <el-breadcrumb-item to='/basic-designer'>Start Matching</el-breadcrumb-item>
      <el-breadcrumb-item>Matching Results</el-breadcrumb-item>
    </el-breadcrumb>

    <div class='title-container'>
      <h1 class='title'>Matching Results</h1>
      <span class='results'>
        <span class='row-number'>{{ g_matchingResults.length }}</span> results
      </span>
    </div>

    <div class='subtitle-container'>
      <span class='subtitle' style='margin-right: 50px'>
        <span class='sub-content'>SEQUNCE / FASTA: </span>{{ g_fastaFileName }}
      </span>
      <span class='subtitle' style='margin-right: 50px'>
        <span class='sub-content'>PDB: </span>{{ g_pdbFileName }}
      </span>
      <span class='subtitle'>
        <span class='sub-content'>SUBCELLULAR POSITION: </span>{{ g_positioningDemand }}
      </span>
    </div>

    <div class='hint-container'>Click to select an entry</div>

    <el-table :data='currentPageData'
              style='width: 1093px; max-height: 470px; overflow-y: auto'
              class='table-style'
              :header-cell-style='headerCellStyle'
              :cell-style='cellStyle'
              @row-click='handleRowClick'
              height='470'>
      <el-table-column prop='fpId'
                       label='Fusion Protein'
                       width='200'/>
      <el-table-column prop='signalId'
                       label='Signal'
                       width='387'/>
      <el-table-column prop='linkerId'
                       label='Linker'
                       width='306'/>
      <el-table-column prop='stabilityScore'
                       label='Stability'
                       width='200'/>
    </el-table>

    <div class='pagination-container'>
      <el-pagination v-model:currentPage='currentPage'
                     :page-size='pageSize'
                     :total='g_matchingResults.length'
                     background
                     pager-count='6'
                     layout='prev, pager, next'
                     @current-change='handlePageChange'/>
    </div>
  </div>
</template>

<script setup lang='ts'>
import {ref, computed} from 'vue'
import {g_matchingResults, g_fastaFileName, g_pdbFileName, g_positioningDemand} from '@/global'
import {useRouter} from 'vue-router'
import {ArrowRight} from '@element-plus/icons-vue'

interface CellStyleParams {
  rowIndex: number
  columnIndex: number
}

const router = useRouter()
const pageSize = ref(100)
const currentPage = ref(1)

const currentPageData = computed(() => {
  const start = (currentPage.value - 1) * pageSize.value
  const end = start + pageSize.value
  return g_matchingResults.value.slice(start, end)
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
  fontWeight: 600
}

const baseCellStyle = {
  backgroundColor: 'white',
  height: '38px',
  fontSize: '16px',
  color: '#2F3235',
  textAlign: 'center',
  paddingTop: '7px',
  paddingBottom: '7px',
  fontWeight: 400,
  borderTop: '1px solid #FFFFFF',
  borderBottom: '1px solid #5182F8'
}

const headerCellStyle = ({columnIndex}: CellStyleParams) => {
  const style = {...baseHeaderStyle} as any
  if (columnIndex == 0) {
    style.borderTopLeftRadius = '10px'
  } else if (columnIndex == 3) {
    style.borderTopRightRadius = '10px'
  } else if (columnIndex == 1) {
    style.paddingLeft = '40px'
    style.paddingRight = '0px'
  } else if (columnIndex == 2) {
    style.paddingLeft = '0px'
    style.paddingRight = '90px'
  }
  return style
}

const cellStyle = ({columnIndex}: CellStyleParams) => {
  const style = {...baseCellStyle} as any
  if (columnIndex == 0) {
    style.borderLeft = '2px solid #EEF3FE'
  }
  if (columnIndex == 3) {
    style.borderRight = '2px solid #EEF3FE'
  }
  if (columnIndex == 1) {
    style.paddingLeft = '40px'
    style.paddingRight = '0px'
  } else if (columnIndex == 2) {
    style.paddingLeft = '0px'
    style.paddingRight = '90px'
  }
  return style
}

function handleRowClick(row, column, event) {
  router.push(`/basic-designer/result-details/${row.fpId}`);
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
  position: relative;
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
  padding-bottom: 6px !important;
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

.breadcrumb {
  position: absolute;
  top: 50px;
  left: 51px;
}
</style>
