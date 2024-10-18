import {ref} from 'vue'

interface PredictionResult {
  fpId: string
  signalId: string
  linkerId: string
  fusionProtein: string
  stabilityScore: number
  linker: string
  signal: string
}

interface DirectedEvolutionResult {
  variantId: string
  predScore: string
  mutationSite: string
  primarySeq: string
  variantSeq: string
}

interface DynamicPredictionResult {
  dfpId: string
  linkerId: string
  fusionProtein: string
  stabilityScore: number
  linker: string
}

// export const apiBaseUrl = 'http://162.62.213.36:5101/api/'
export const apiBaseUrl = 'http://localhost:5101/api/'

// Basic Designer

export const g_queryLogId = ref('')
export const g_fastaFileName = ref('')
export const g_pdbFileName = ref('')
export const g_mechanicalProperties = ref('')
export const g_solubility = ref('')
export const g_positioningDemand = ref('')
export const g_targetProtein = ref('')
export const g_currentFusionProtein = ref('')
export const g_lastFpId = ref('')
export const g_matchingResults = ref<PredictionResult[]>([])
export const g_sequenceOptimization = ref(true)
export const g_directedEvolutionResults = ref<DirectedEvolutionResult[]>([])

// Dynamic Designer

export const g_lightInduction_dynamic = ref('')
export const g_queryLogId_dynamic = ref('2pwh0qnbrv0psj8ii1lvwf2om05j2h18')
export const g_fastaFileName_dynamic = ref('')
export const g_pdbFileName_dynamic = ref('')
export const g_mechanicalProperties_dynamic = ref('')
export const g_solubility_dynamic = ref('')
export const g_positioningDemand_dynamic = ref('')
export const g_targetProtein_dynamic = ref('')
export const g_report = ref([])
export const g_matchingResults_dynamic = ref<DynamicPredictionResult[]>([
  {
    dfpId: 'DFP0001',
    linkerId: 'LK0011',
    fusionProtein: 'MMFLPTDYCCRLSDQEYMELVFENGQILAKGQRSNVSLHNQRTKSIMDLYEAEYNEDFMKSIIHGGGGAITNLGDTQVVPQSHVAAAHETNMLESNKHVDAEAAAKEAAAKEAAAKMVQAVAVLKGDAGVSGVVKFEQASESEPTTVSYEIAGNSPNAERGFHIHEFGDATNGCVSAGPHFNPFKKTHGAPTDEVRHVGDMGNVKTDENGVAKGSFKDSLIKLIGPTSVVGRSVVIHAGQDDLGKGDTEESLKTGNAGPRPACGVIGLTNMVSVIKPEMKMRYYMDGSVNGHEFTIEGEGTGRPYEGHQEMTLRVTMAKGGPMPFAFDLVSHVFCYGHRPFTKYPEEIPDYFKQAFPEGLSWERSLEFEDGGSASVSAHISLRGNTFYHKSKFTGVNFPADGPIMQNQSVDWEPSTEKITASDGVLKGDVTMYLKLEGGGNHKCQFKTTYKAAKKILKMPGSHYISHRLVRKTEGNITELVEDAVAHS',
    stabilityScore: 7951.39,
    linker: 'LINKERLINKERLINKERLINKER'
  }
])
