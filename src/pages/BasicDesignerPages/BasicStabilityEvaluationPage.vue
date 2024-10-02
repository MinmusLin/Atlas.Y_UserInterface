<template>
  <div class='page-container'>
    <!--suppress TypeScriptValidateTypes-->
    <el-breadcrumb :separator-icon='ArrowRight' class='breadcrumb'>
      <el-breadcrumb-item to='/basic-designer'>Start Matching</el-breadcrumb-item>
      <el-breadcrumb-item to='/basic-designer/matching-results'>Matching Results</el-breadcrumb-item>
      <el-breadcrumb-item :to='`/basic-designer/result-details/${fpId}`'>/{{ fpId }}</el-breadcrumb-item>
      <el-breadcrumb-item>Stability Evaluation</el-breadcrumb-item>
    </el-breadcrumb>

    <div class='title-container'>
      <h1 class='title'>Stability Evaluation</h1>
    </div>

    <div class='subtitle-container'>
      <span class='subtitle' style='margin-right: 50px'>
        <span class='sub-content'>Fusion Protein: </span>{{ currentResult.fpId }}
      </span>
      <span class='subtitle' style='margin-right: 50px'>
        <span class='sub-content'>Signal: </span>{{ currentResult.signalId }}
      </span>
      <span class='subtitle'>
        <span class='sub-content'>Linker: </span>{{ currentResult.linkerId }}
      </span>
    </div>

    <el-table :data='tableData'
              style='width: 1093px; max-height: 470px; overflow-y: auto'
              class='table-style'
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
    <div class='loading-overlay' v-show='allScoresAreZero'>
      <el-icon v-loading='true'/>
    </div>
  </div>
</template>

<script setup lang='ts'>
import {onMounted, ref, watch, computed} from 'vue'
import {useRoute, useRouter} from 'vue-router'
import {g_matchingResults, g_queryLogId} from '@/global'
import axiosInstance from '@/plugins/axios'
import {ArrowRight} from '@element-plus/icons-vue'

const allScoresAreZero = computed(() => {
  return tableData.value.every(data => data.scoreValue == 0)
})

interface TableData {
  item: string
  scoreValue: number
  explanation: string
}

interface CellStyleParams {
  rowIndex: number
  columnIndex: number
}

interface PredictionResult {
  fpId: string
  signalId: string
  linkerId: string
  fusionProtein: string
  stabilityScore: number
  linker: string
  signal: string
}

const route = useRoute()
const router = useRouter()
const fpId = ref(route.params.id)
const currentResult = ref<PredictionResult>(findEntryByFpId(fpId.value))
const tableData = ref<TableData[]>([
  {
    item: 'Total Score',
    scoreValue: 0,
    explanation: 'Overall stability score'
  },
  {
    item: 'fa_atr',
    scoreValue: 0,
    explanation: 'Favorable atomic attraction'
  },
  {
    item: 'fa_rep',
    scoreValue: 0,
    explanation: 'Unfavorable atomic repulsion'
  },
  {
    item: 'fa_sol',
    scoreValue: 0,
    explanation: 'Solvation energy'
  },
  {
    item: 'fa_intra_rep',
    scoreValue: 0,
    explanation: 'Intra-residue repulsion'
  },
  {
    item: 'fa_intra_sol_xover4',
    scoreValue: 0,
    explanation: 'Intra-residue solvation energy'
  },
  {
    item: 'lk_ball_wtd',
    scoreValue: 0,
    explanation: 'Weighted Lennard-Jones potential'
  },
  {
    item: 'fa_elec',
    scoreValue: 0,
    explanation: 'Electrostatic interactions'
  },
  {
    item: 'pro_close',
    scoreValue: 0,
    explanation: 'Proline closure energy'
  },
  {
    item: 'hbond_sr_bb',
    scoreValue: 0,
    explanation: 'Short-range backbone-backbone hydrogen bonding'
  },
  {
    item: 'hbond_lr_bb',
    scoreValue: 0,
    explanation: 'Long-range backbone-backbone hydrogen bonding'
  },
  {
    item: 'hbond_bb_sc',
    scoreValue: 0,
    explanation: 'Backbone-sidechain hydrogen bonding'
  },
  {
    item: 'hbond_sc',
    scoreValue: 0,
    explanation: 'Sidechain-sidechain hydrogen bonding'
  },
  {
    item: 'dslf_fa13',
    scoreValue: 0,
    explanation: 'Disulfide bonds energy'
  },
  {
    item: 'omega',
    scoreValue: 0,
    explanation: 'Omega dihedral angle energy'
  },
  {
    item: 'fa_dun',
    scoreValue: 0,
    explanation: 'Dunbrack rotamer library energy'
  },
  {
    item: 'p_aa_pp',
    scoreValue: 0,
    explanation: 'Probability of amino acid pairs in phi/psi angles'
  },
  {
    item: 'yhh_planarity',
    scoreValue: 0,
    explanation: 'Explanation": "Aromatic ring planarity energy'
  },
  {
    item: 'ref',
    scoreValue: 0,
    explanation: 'Reference energy'
  },
  {
    item: 'rama_prepro',
    scoreValue: 0,
    explanation: 'Ramachandran plot energy for pre-proline residues'
  }
])

function findEntryByFpId(fpId): PredictionResult {
  return <PredictionResult>g_matchingResults.value.find(entry => entry.fpId == fpId)
}

onMounted(() => {
  fetchStability()
})

const fetchStability = async () => {
  try {
    const response = await axiosInstance.get(`/basic-prediction/get-stability/${g_queryLogId.value}/pdb/${currentResult.value.fpId}.pdb`)
    for (let i = 0; i < 20; i++) {
      tableData.value[i].scoreValue = response.data[i]
    }
  } catch (error) {
  }
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
  height: '38px',
  fontSize: '16px',
  color: '#2F3235',
  textAlign: 'center',
  paddingTop: '7px',
  paddingBottom: '7px',
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

watch(() => route.params.id, (newId) => {
  fpId.value = newId
  currentResult.value = findEntryByFpId(newId)
  fetchStability()
}, {immediate: true})
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

.loading-overlay {
  position: absolute;
  top: 265px;
  left: 48px;
  width: 1093px;
  height: 429px;
  background-color: white;
  opacity: 0.75;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 10;
}

.breadcrumb {
  position: absolute;
  top: 0;
  left: 0;
}
</style>
