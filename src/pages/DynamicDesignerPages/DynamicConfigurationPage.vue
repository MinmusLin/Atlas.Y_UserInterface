<template>
  <div class='page-container'>
    <!--suppress TypeScriptValidateTypes-->
    <el-breadcrumb :separator-icon='ArrowRight' class='breadcrumb'>
      <el-breadcrumb-item to='/dynamic-designer'>Dynamic Designer</el-breadcrumb-item>
      <el-breadcrumb-item>Start Matching</el-breadcrumb-item>
    </el-breadcrumb>

    <div class='inner-layer'>
      <div class='upload-button'>
        <div>
          <p>Protein Sequence Demand</p>
          <DefaultButton @click='selectFastaFile'
                         width='323px'
                         height='40px'
                         :active="fastaBase64!=''"
                         :warning='fastaWarning'
                         :text='fastaName'/>
          <input type='file' ref='fastaInput' style='display: none' @change='handleFastaFileChange' accept='.fasta'/>
        </div>
        <div>
          <p>PDB Demand</p>
          <DefaultButton @click='selectPdbFile'
                         width='323px'
                         height='40px'
                         :active="pdbBase64!=''"
                         :warning='pdbWarning'
                         :text='pdbName'/>
          <input type='file' ref='pdbInput' style='display: none' @change='handlePdbFileChange' accept='.pdb'/>
        </div>
        <div>
          <p>Light Induction Demand</p>
          <LightInduction v-model='g_lightInduction_dynamic' :warning='lightWarning'/>
        </div>
      </div>

      <p>
        Select Positioning Demand
        <InfoTooltip width='444px' height='244px' style='font-size: 14px'>
          <table class='positioning-demand-table'>
            <tbody>
            <tr>
              <td>NLS</td>
              <td>Cytoplasm -> Nucleus</td>
            </tr>
            <tr>
              <td>NES</td>
              <td>Nucleus -> Cytoplasm</td>
            </tr>
            <tr>
              <td>SP</td>
              <td>Cytoplasm -> Endoplasmic Reticulum Lumen</td>
            </tr>
            <tr>
              <td>SP_TM</td>
              <td>Anchored on the Endoplasmic Reticulum Membrane</td>
            </tr>
            <tr>
              <td>SP_GPI</td>
              <td>Cytoplasm -> Endoplasmic Reticulum Lumen -> Cytoplasm -> Cell Surface</td>
            </tr>
            <tr>
              <td>GPI</td>
              <td>Cell Surface</td>
            </tr>
            <tr>
              <td>TM</td>
              <td>Embedded in Cell Membrane</td>
            </tr>
            <tr>
              <td>PTS</td>
              <td>Peroxisome</td>
            </tr>
            <tr>
              <td>MT</td>
              <td>Mitochondria</td>
            </tr>
            <tr>
              <td>LYS</td>
              <td>Lysosome</td>
            </tr>
            </tbody>
          </table>
        </InfoTooltip>
      </p>
      <div class='positioning-info'>
        <div class='videos'>
          <video ref='initialVideoElement'
                 v-show='showInitialVideo'
                 autoplay muted playsinline
                 @ended='showInitialVideo=false'/>
          <video ref='basicVideoElement'
                 v-show='!showInitialVideo'
                 autoplay muted playsinline loop/>
        </div>
        <div class='button-scroller'>
          <div class='item-buttons'>
            <DefaultButton v-for='(item, index) in items'
                           :key='index'
                           height='40px'
                           width='304px'
                           :text='item.name'
                           :warning='item.warning'
                           @click='changeVideo(item.initial, item.basic, index)'
                           :active='selectedIndex==index'/>
          </div>
        </div>
      </div>

      <p>Choose Linker Properties</p>
      <div class='linker-info'>
        <div>
          <p>Mechanical Properties</p>
          <ToggleButton v-model='mechanicalProperties'
                        leftLabel='rigid'
                        rightLabel='flexible'
                        width='488px'/>
        </div>
        <div>
          <p>Solubility</p>
          <ToggleButton v-model='solubility'
                        leftLabel='hydrophilic'
                        rightLabel='hydrophobic'
                        width='488px'/>
        </div>
      </div>

      <ShadowButton width='100%'
                    height='50px'
                    style='margin-top: 23px; font-size: 18px'
                    @click='submitQueryLog'>
        Start Matching
      </ShadowButton>
    </div>

    <div class='mask' v-if='showMask'>
      <el-icon v-loading='true'/>
      <p style='margin-top: 40px'>The matching process will take some time. Thank you for your patience.</p>
    </div>
  </div>
</template>

<script setup lang='ts'>
import {ref, watch} from 'vue'
import {useRouter} from 'vue-router'
import axiosInstance from '@/plugins/axios'
import DefaultButton from '@/components/DefaultButton.vue'
import ToggleButton from '@/components/ToggleButton.vue'
import ShadowButton from '@/components/ShadowButton.vue'
import InfoTooltip from '@/components/InfoTooltip.vue'
import LightInduction from '@/components/LightInduction.vue'
import {
  g_matchingResults_dynamic,
  g_fastaFileName_dynamic,
  g_pdbFileName_dynamic,
  g_mechanicalProperties_dynamic,
  g_solubility_dynamic,
  g_positioningDemand_dynamic,
  g_targetProtein_dynamic,
  g_queryLogId_dynamic,
  g_lightInduction_dynamic
} from '@/global'
import {ArrowRight} from '@element-plus/icons-vue'
import NLS_Basic from '/PositioningDemand/NLS_Basic.mp4'
import NES_Basic from '/PositioningDemand/NES_Basic.mp4'
import SP_Basic from '/PositioningDemand/SP_Basic.mp4'
import SP_TM_Basic from '/PositioningDemand/SP_TM_Basic.mp4'
import SP_GPI_Basic from '/PositioningDemand/SP_GPI_Basic.mp4'
import GPI_Basic from '/PositioningDemand/GPI_Basic.mp4'
import TM_Basic from '/PositioningDemand/TM_Basic.mp4'
import LYS_Basic from '/PositioningDemand/LYS_Basic.mp4'
import MT_Basic from '/PositioningDemand/MT_Basic.mp4'
import PTS_Basic from '/PositioningDemand/PTS_Basic.mp4'
import NLS_Initial from '/PositioningDemand/NLS_Initial.mp4'
import NES_Initial from '/PositioningDemand/NES_Initial.mp4'
import SP_Initial from '/PositioningDemand/SP_Initial.mp4'
import SP_TM_Initial from '/PositioningDemand/SP_TM_Initial.mp4'
import SP_GPI_Initial from '/PositioningDemand/SP_GPI_Initial.mp4'
import GPI_Initial from '/PositioningDemand/GPI_Initial.mp4'
import TM_Initial from '/PositioningDemand/TM_Initial.mp4'
import LYS_Initial from '/PositioningDemand/LYS_Initial.mp4'
import MT_Initial from '/PositioningDemand/MT_Initial.mp4'
import PTS_Initial from '/PositioningDemand/PTS_Initial.mp4'

const showMask = ref(false)
const mechanicalProperties = ref(true)
const solubility = ref(true)
const selectedIndex = ref<number | null>(null)
const showInitialVideo = ref(true)
const initialVideoElement = ref<HTMLVideoElement | null>(null)
const basicVideoElement = ref<HTMLVideoElement | null>(null)
const router = useRouter()
const fastaBase64 = ref('')
const fastaInput = ref(null)
const pdbBase64 = ref('')
const pdbInput = ref(null)
const fastaName = ref('Upload Fasta File')
const pdbName = ref('Upload PDB File')
const fastaWarning = ref(false)
const pdbWarning = ref(false)
const lightWarning = ref(false)

const items = ref([
  {name: 'NLS', basic: NLS_Basic, initial: NLS_Initial, warning: false},
  {name: 'NES', basic: NES_Basic, initial: NES_Initial, warning: false},
  {name: 'SP', basic: SP_Basic, initial: SP_Initial, warning: false},
  {name: 'SP_TM', basic: SP_TM_Basic, initial: SP_TM_Initial, warning: false},
  {name: 'SP_GPI', basic: SP_GPI_Basic, initial: SP_GPI_Initial, warning: false},
  {name: 'GPI', basic: GPI_Basic, initial: GPI_Initial, warning: false},
  {name: 'TM', basic: TM_Basic, initial: TM_Initial, warning: false},
  {name: 'PTS', basic: PTS_Basic, initial: PTS_Initial, warning: false},
  {name: 'MT', basic: MT_Basic, initial: MT_Initial, warning: false},
  {name: 'LYS', basic: LYS_Basic, initial: LYS_Initial, warning: false}
])

const changeVideo = (initial, basic, index) => {
  if (index == selectedIndex.value) {
    return
  }
  selectedIndex.value = index
  items.value.forEach(item => {
    item.warning = false
  })
  // noinspection TypeScriptUnresolvedReference
  initialVideoElement.value!.src = initial
  // noinspection TypeScriptUnresolvedReference
  basicVideoElement.value!.src = basic
  showInitialVideo.value = true
}

const selectFastaFile = () => {
  fastaInput.value.click()
}

const selectPdbFile = () => {
  pdbInput.value.click()
}

const fileToBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => {
      const result = reader.result
      if (typeof result == 'string') {
        const base64Data = result.split(',')[1]
        resolve(base64Data);
      }
    }
    reader.onerror = error => reject(error)
  })
}

const handleFastaFileChange = async (event) => {
  const file = event.target.files[0]
  if (!file) {
    return
  }
  try {
    const fileContent = await file.text()
    const lines = fileContent.split('\n')
    let sequence = ''
    let isSequencePart = false
    const validChars = new Set('ARNDCEQGHILKMFPSTWYV')
    for (let line of lines) {
      line = line.trim()
      if (line.startsWith('>')) {
        if (isSequencePart) {
          break
        }
        isSequencePart = true
        continue
      }
      if (isSequencePart) {
        sequence += [...line].filter(char => validChars.has(char)).join('')
      }
    }
    fastaBase64.value = sequence
    fastaName.value = file.name
    g_fastaFileName_dynamic.value = file.name
    fastaWarning.value = false
  } catch (error) {
  }
}

const handlePdbFileChange = async (event) => {
  const file = event.target.files[0]
  if (!file) {
    return
  }
  try {
    const base64String = await fileToBase64(file)
    pdbBase64.value = base64String as string
    pdbName.value = file.name
    g_pdbFileName_dynamic.value = file.name
    pdbWarning.value = false
  } catch (error) {
  }
}

function generateRandomHash() {
  const characters = 'abcdefghijklmnopqrstuvwxyz0123456789'
  let result = ''
  const charactersLength = characters.length
  for (let i = 0; i < 32; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength))
  }
  return result
}

watch(g_lightInduction_dynamic, (newValue) => {
  if (newValue != '') {
    lightWarning.value = false
  }
})

async function submitQueryLog() {
  fastaWarning.value = fastaBase64.value == ''
  pdbWarning.value = pdbBase64.value == ''
  const isItemSelected = selectedIndex.value != null
  if (!isItemSelected) {
    items.value.forEach(item => {
      item.warning = true
    })
  } else {
    items.value.forEach(item => {
      item.warning = false
    })
  }
  if (g_lightInduction_dynamic.value == '') {
    lightWarning.value = true
    return
  }
  if (fastaWarning.value || pdbWarning.value || !isItemSelected) {
    return
  }
  try {
    // const body = {
    //   logId: generateRandomHash().toString(),
    //   queryTime: new Date(),
    //   targetProSeq: fastaBase64.value,
    //   targetProPdb: pdbBase64.value,
    //   targetPosition: items.value[selectedIndex.value].name,
    //   linkerMech: mechanicalProperties.value ? 'rigid' : 'flexible',
    //   linkerSolu: solubility.value ? 'hydrophilic' : 'hydrophobic'
    // }
    // g_queryLogId_dynamic.value = body.logId
    // g_mechanicalProperties_dynamic.value = body.linkerMech
    // g_solubility_dynamic.value = body.linkerSolu
    // g_positioningDemand_dynamic.value = body.targetPosition
    // g_targetProtein_dynamic.value = body.targetProSeq
    showMask.value = true
    // const response = await axiosInstance.post('basic-prediction', body)
    // g_matchingResults_dynamic.value = response.data
    await router.push('/dynamic-designer/matching-results')
  } catch (error) {
  }
}
</script>

<style scoped>
.page-container {
  height: 800px;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
}

.mask {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: white;
  opacity: 0.75;
  z-index: 1000;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.inner-layer {
  width: 986px;
}

.upload-button {
  display: flex;
  justify-content: space-between;
}

p {
  margin: 20px 0 5px 0;
  font-weight: 600;
  line-height: 20px;
  color: #2F3235;
}

.positioning-info {
  display: flex;
  justify-content: space-between;
}

.videos {
  width: 640px;
  height: 320px;
  background: url('https://static.igem.wiki/teams/5503/software-materials/default.webp');
  background-size: cover;
}

.videos video {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.button-scroller {
  height: 320px;
  width: 320px;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
}

.button-scroller::-webkit-scrollbar {
  width: 6px;
}

.button-scroller::-webkit-scrollbar-thumb {
  background-color: #DFDFE0;
  border-radius: 3px;
}

.button-scroller::-webkit-scrollbar-button {
  display: none;
}

.item-buttons {
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.item-buttons button {
  margin: 4px 0;
}

.item-buttons button:first-child {
  margin-top: 0;
}

.item-buttons button:last-child {
  margin-bottom: 0;
}

.linker-info {
  display: flex;
  justify-content: space-between;
}

.linker-info p {
  margin-top: 0;
  font-weight: 400;
}

.positioning-demand-table {
  width: 100%;
  border-collapse: collapse;
  margin-top: -4px;
}

.positioning-demand-table td {
  vertical-align: top;
}

.positioning-demand-table td:first-child {
  font-weight: 600;
  width: 65px;
}

.positioning-demand-table td:last-child {
  font-weight: 400;
}

.breadcrumb {
  position: absolute;
  top: 50px;
  left: 102px;
}
</style>
