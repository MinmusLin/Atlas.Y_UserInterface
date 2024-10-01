<template>
  <div class='page-container'>
    <div class='title-container'>
      <h1 class='title'>Directed Evolution Results</h1>
      <span class='results'>
        <span class='row-number'>{{ g_directedEvolutionResults.length }}</span> results
      </span>
    </div>

    <div class='subtitle-container'/>

    <div class='hint-container'>Click to select an entry</div>

    <el-table :data='currentPageData'
              style='width: 1093px; max-height: 470px; overflow-y: auto'
              class='table-style'
              :header-cell-style='headerCellStyle'
              :cell-style='cellStyle'
              @row-click='handleRowClick'
              height='470'>
      <el-table-column prop='variantId'
                       label='Variant ID'
                       width='290'/>
      <el-table-column prop='mutationSite'
                       label='Mutant'
                       width='470'/>
      <el-table-column prop='predScore'
                       label='Evolution Score'
                       width='333'/>
    </el-table>
    <div class='pagination-container'>
      <el-pagination v-model:currentPage='currentPage'
                     :page-size='pageSize'
                     :total='g_directedEvolutionResults.length'
                     background
                     pager-count='6'
                     layout='prev, pager, next'
                     hide-on-single-page
                     @current-change='handlePageChange'/>
    </div>
  </div>
</template>

<script setup lang='ts'>
import {ref, computed, onMounted, watch} from 'vue'
import {g_currentFusionProtein, g_directedEvolutionResults, g_queryLogId, g_targetProtein} from '@/global'
import {useRoute, useRouter} from 'vue-router'
import axiosInstance from '@/plugins/axios'

interface CellStyleParams {
  columnIndex: number
}

const pageSize = ref(100)
const currentPage = ref(1)
const route = useRoute()
const router = useRouter()
const fpId = ref(route.params.id)

const currentPageData = computed(() => {
  const start = (currentPage.value - 1) * pageSize.value
  const end = start + pageSize.value
  return g_directedEvolutionResults.value.slice(start, end)
})

const handlePageChange = (page: number) => {
  currentPage.value = page
}

onMounted(() => {
  fetchData()
})

const fetchData = async () => {
  g_directedEvolutionResults.value = []
  try {
    const response = await axiosInstance.post('/basic-prediction/sequence-optimization', {
      fastaSequence: g_currentFusionProtein.value,
      logId: g_queryLogId.value,
      fpId: fpId.value,
      modelName: true ? 'ProtLGN' : 'ProtLGN_Loc'
    })
    g_directedEvolutionResults.value = response.data
  } catch (error) {
  }
}

watch(() => route.params.id, (newId) => {
  fpId.value = newId
  fetchData()
}, {immediate: true})

function handleRowClick(row, column, event) {
  router.push(`/basic-designer/variant-details/${fpId.value}/${row.variantId}`);
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
</style>
