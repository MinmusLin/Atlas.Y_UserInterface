<template>
  <div class='page-container'>
    <div class='title-container'>
      <h1 class='title'>Matching Results</h1>
      <span class='results'>
        <span class='row-number'>{{ row }}</span> results
      </span>
    </div>

    <div class='subtitle-container'>
      <span class='subtitle' style='margin-right: 50px'>
        <span class='sub-content'>SEQUNCE / FASTA: </span>ABC.fasta
      </span>
      <span class='subtitle' style='margin-right: 50px'>
        <span class='sub-content'>PDB: </span>jhbcc.pdb
      </span>
      <span class='subtitle'>
        <span class='sub-content'>SUBCELLULAR POSITION: </span>NLS
      </span>
    </div>

    <div class='hint-container'>Click to select an entry</div>

    <el-table :data='currentPageData'
              style='width: 1093px; max-height: 470px; overflow-y: auto'
              :header-cell-style='headerCellStyle'
              :cell-style='cellStyle'
              height='470'>
      <el-table-column prop='fusionProtein'
                       label='Fusion Protein'
                       width='200'/>
      <el-table-column prop='signal'
                       label='Signal'
                       width='387'/>
      <el-table-column prop='linker'
                       label='Linker'
                       width='306'/>
      <el-table-column prop='stability'
                       label='Stability'
                       width='200'/>
    </el-table>

    <div class='pagination-container'>
      <el-pagination v-model:currentPage='currentPage'
                     :page-size='pageSize'
                     :total='row'
                     background
                     layout='prev, pager, next'
                     @current-change='handlePageChange'/>
    </div>
  </div>
</template>

<script setup lang='ts'>
import {ref, computed} from 'vue'

interface TableData {
  fusionProtein: string
  signal: string
  linker: string
  stability: string
}

interface CellStyleParams {
  columnIndex: number
}

const row = ref(1050)
const pageSize = ref(100)
const currentPage = ref(1)
const tableData = ref<TableData[]>([])

for (let i = 0; i < row.value; i++) {
  tableData.value.push({
    fusionProtein: `FP_000${i + 1}`,
    signal: `SG_000${i + 1}`,
    linker: `LK_000${i + 1}`,
    stability: `87.0`
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
  boxShadow: 'inset 0px -0.25px 0px 0px #5182F8',
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
  margin-top: 10px;
}
</style>
