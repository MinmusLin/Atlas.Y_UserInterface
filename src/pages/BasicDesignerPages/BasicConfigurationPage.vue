<template>
  <div class='page-container'>
    <div class='inner-layer'>
      <div class='upload-button'>
        <div>
          <p>Protein Sequence Demand</p>
          <DefaultButton @click='selectFastaFile'
                         width='488px'
                         height='40px'
                         :active="fastaBase64!=''"
                         :text='fastaName'/>
          <input type='file' ref='fastaInput' style='display: none' @change='handleFastaFileChange' accept='.fasta'/>
        </div>
        <div>
          <p>PDB Demand</p>
          <DefaultButton @click='selectPdbFile'
                         width='488px'
                         height='40px'
                         :active="pdbBase64!=''"
                         :text='pdbName'/>
          <input type='file' ref='pdbInput' style='display: none' @change='handlePdbFileChange' accept='.pdb'/>
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
              <td>LD</td>
              <td>Lipid Droplets</td>
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
  </div>
</template>

<script setup lang='ts'>
import {ref} from 'vue'
import {useRouter} from 'vue-router'
import axiosInstance from '@/plugins/axios'
import DefaultButton from '@/components/DefaultButton.vue'
import ToggleButton from '@/components/ToggleButton.vue'
import ShadowButton from '@/components/ShadowButton.vue'
import InfoTooltip from '@/components/InfoTooltip.vue'
import NLS_Basic from '/PositioningDemand/NLS_Basic.mp4'
import NES_Basic from '/PositioningDemand/NES_Basic.mp4'
import SP_Basic from '/PositioningDemand/SP_Basic.mp4'
import SP_TM_Basic from '/PositioningDemand/SP_TM_Basic.mp4'
import SP_GPI_Basic from '/PositioningDemand/SP_GPI_Basic.mp4'
import GPI_Basic from '/PositioningDemand/GPI_Basic.mp4'
import TM_Basic from '/PositioningDemand/TM_Basic.mp4'
import LD_Basic from '/PositioningDemand/LD_Basic.mp4'
import MT_Basic from '/PositioningDemand/MT_Basic.mp4'
import PTS_Basic from '/PositioningDemand/PTS_Basic.mp4'
import NLS_Initial from '/PositioningDemand/NLS_Initial.mp4'
import NES_Initial from '/PositioningDemand/NES_Initial.mp4'
import SP_Initial from '/PositioningDemand/SP_Initial.mp4'
import SP_TM_Initial from '/PositioningDemand/SP_TM_Initial.mp4'
import SP_GPI_Initial from '/PositioningDemand/SP_GPI_Initial.mp4'
import GPI_Initial from '/PositioningDemand/GPI_Initial.mp4'
import TM_Initial from '/PositioningDemand/TM_Initial.mp4'
import LD_Initial from '/PositioningDemand/LD_Initial.mp4'
import MT_Initial from '/PositioningDemand/MT_Initial.mp4'
import PTS_Initial from '/PositioningDemand/PTS_Initial.mp4'

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

const items = ref([
  {name: 'NLS', basic: NLS_Basic, initial: NLS_Initial},
  {name: 'NES', basic: NES_Basic, initial: NES_Initial},
  {name: 'SP', basic: SP_Basic, initial: SP_Initial},
  {name: 'SP_TM', basic: SP_TM_Basic, initial: SP_TM_Initial},
  {name: 'SP_GPI', basic: SP_GPI_Basic, initial: SP_GPI_Initial},
  {name: 'GPI', basic: GPI_Basic, initial: GPI_Initial},
  {name: 'TM', basic: TM_Basic, initial: TM_Initial},
  {name: 'PTS', basic: PTS_Basic, initial: PTS_Initial},
  {name: 'MT', basic: MT_Basic, initial: MT_Initial},
  {name: 'LD', basic: LD_Basic, initial: LD_Initial}
])

const changeVideo = (initial, basic, index) => {
  if (index == selectedIndex.value) {
    return
  }
  selectedIndex.value = index
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

const fileToBase64 = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => resolve(reader.result as string)
    reader.onerror = error => reject(error)
  })
}

const handleFastaFileChange = async (event) => {
  const file = event.target.files[0]
  if (!file) {
    return
  }
  try {
    const base64String = await fileToBase64(file)
    fastaBase64.value = base64String as string
    fastaName.value = file.name
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

async function submitQueryLog() {
  try {
    const body = {
      logId: generateRandomHash(),
      queryTime: new Date(),
      targetProSeq: fastaBase64.value,
      targetProPdb: pdbBase64.value,
      targetPosition: items.value[selectedIndex.value].name,
      linkerMech: mechanicalProperties.value ? 'rigid' : 'flexible',
      linkerSolu: solubility.value ? 'hydrophilic' : 'hydrophobic'
    }
    await router.push('/basic-designer/matching-results')
    // await axiosInstance.post('query-log', body)
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
  background: url('/PositioningDemand/Default.png');
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
</style>
