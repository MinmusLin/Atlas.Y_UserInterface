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

export const apiBaseUrl = 'http://162.62.213.36:5101/api/'

export const g_queryLogId = ref('')
export const g_fastaFileName = ref('')
export const g_pdbFileName = ref('')
export const g_mechanicalProperties = ref('')
export const g_solubility = ref('')
export const g_positioningDemand = ref('')
export const g_targetProtein = ref('')
export const g_currentFusionProtein = ref('')
// export const g_queryLogId = ref('tx3pnrnecobyo9tlqaojr4cj9tt90so3')
// export const g_fastaFileName = ref('protein.fasta')
// export const g_pdbFileName = ref('protein.pdb')
// export const g_mechanicalProperties = ref('rigid')
// export const g_solubility = ref('hydrophilic')
// export const g_positioningDemand = ref('NLS')
// export const g_targetProtein = ref('MGKKLRPPGTMTISNLLKQRVRYAPYLKKVKEAHELIPLFKNGQYLGWSGFTGVGTPKAVPEALIDHVEKNNLQGKLRFNLFVGASAGPEENRWAEHDMIIKRAPHQVGKPIAKAINQGRIEFFDKHLSMFPQDLTYGFYTRERKDNKILDYTIIEATAIKEDGSIVPGPSVGGSPEFITVSDKVIIEVNTATPSFEGIHDIDMPVNPPFRKPYPYLKVDDKCGVDSIPVDPEKVVAIVESTMRDQVPPNTPSDDMSRAIAGHLVEFFRNEVKHGRLPENLLPLQSGIGNIANAVIEGLAGAQFKHLTVWTEVLQDSFLDLFENGSLDYATATSVRLTEKGFDRAFANWENFKHRLCLRSQVVSNNPEMIRRLGVIAMNTPVEVDIYAHANSTNVNGSRMLNGLGGSADFLRNAKLSIMHAPSARPTKVDPTGISTIVPMASHVDQTEHDLDILVTDQGLADLRGLSPKERAREIINKCAHPDYQALLTDYLDRAEHYAKKHNCLHEPHMLKNAFKFHTNLAEKGTMKVDSWEPVD')

export const g_matchingResults = ref<PredictionResult[]>([
  {
    fpId: 'FP0001',
    signalId: 'SP0088',
    linkerId: 'LK0015',
    fusionProtein: 'KKRKKDAEAAAKEAAAKMGKKLRPPGTMTISNLLKQRVRYAPYLKKVKEAHELIPLFKNGQYLGWSGFTGVGTPKAVPEALIDHVEKNNLQGKLRFNLFVGASAGPEENRWAEHDMIIKRAPHQVGKPIAKAINQGRIEFFDKHLSMFPQDLTYGFYTRERKDNKILDYTIIEATAIKEDGSIVPGPSVGGSPEFITVSDKVIIEVNTATPSFEGIHDIDMPVNPPFRKPYPYLKVDDKCGVDSIPVDPEKVVAIVESTMRDQVPPNTPSDDMSRAIAGHLVEFFRNEVKHGRLPENLLPLQSGIGNIANAVIEGLAGAQFKHLTVWTEVLQDSFLDLFENGSLDYATATSVRLTEKGFDRAFANWENFKHRLCLRSQVVSNNPEMIRRLGVIAMNTPVEVDIYAHANSTNVNGSRMLNGLGGSADFLRNAKLSIMHAPSARPTKVDPTGISTIVPMASHVDQTEHDLDILVTDQGLADLRGLSPKERAREIINKCAHPDYQALLTDYLDRAEHYAKKHNCLHEPHMLKNAFKFHTNLAEKGTMKVDSWEPVD',
    stabilityScore: 2784.17,
    linker: 'AEAAAKEAAAK',
    signal: 'KKRKKD'
  }
])

export const g_directedEvolutionResults = ref<DirectedEvolutionResult[]>([])
