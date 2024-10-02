<template>
  <div class='page-container'>
    <!--suppress TypeScriptValidateTypes-->
    <el-breadcrumb :separator-icon='ArrowRight' class='breadcrumb'>
      <el-breadcrumb-item to='/basic-designer'>Start Matching</el-breadcrumb-item>
      <el-breadcrumb-item to='/basic-designer/matching-results'>Matching Results</el-breadcrumb-item>
      <el-breadcrumb-item :to='`/basic-designer/result-details/${fpId}`'>/{{ fpId }}</el-breadcrumb-item>
      <el-breadcrumb-item :to='`/basic-designer/global-cad-score/${fpId}`'>
        Function Evaluation (Global)
      </el-breadcrumb-item>
      <el-breadcrumb-item>Function Evaluation (Local)</el-breadcrumb-item>
    </el-breadcrumb>

    <div class='inner-layer'>
      <div class='title-section'>
        <div class='title'>
          <p class='primary'>Function Evaluation</p>
          <p class='secondary'>Local CAD Score</p>
        </div>
        <div class='subtitle'>
          <span style='margin-right: 50px'>
            <strong>Fusion Protein: </strong>{{ currentResult.fpId }}
          </span>
          <span style='margin-right: 50px'>
            <strong>Signal: </strong>{{ currentResult.signalId }}
          </span>
          <span>
            <strong>Linker: </strong>{{ currentResult.linkerId }}
          </span>
        </div>
      </div>

      <div class='content-section'>
        <div class='left-section'>
          <p>
            Interactive 3D Structure
            <InfoTooltip height='129px'
                         width='450px'
                         style='transform: translateY(1px); z-index: 1000; font-size: 14px; font-weight: 400'>
              <span>You can interact with the 3D protein model:</span>
              <ul style='margin-left: 20px'>
                <li><span style='font-weight: 600'>Rotate</span>: Hold down the left mouse button and drag.</li>
                <li><span style='font-weight: 600'>Pan</span>: Hold down the mouse wheel and drag.</li>
                <li><span style='font-weight: 600'>Zoom</span>: Hold down the right mouse button and drag.</li>
                <li><span style='font-weight: 600'>Select</span>: Click the left mouse button to select a residue site.</li>
              </ul>
            </InfoTooltip>
          </p>
          <div id='local-pdb-container' class='threeD-picture'/>
        </div>

        <div class='right-section' v-if='!isCalculated'>
          <div class='container'>
            <div class='input-section'>
              <div class='input-wrapper'>
                <label for='residue-sites'>Selected Residue Site</label>
                <input type='text' id='residue-sites'
                       :value="currentResidueIndex == 'null' ? '' : currentResidueIndex"
                       :placeholder="currentResidueIndex == 'null' ? 'Click on the 3D structure to select' : ''"
                       :style="{ color: currentResidueName == 'null' ? '#999999' : '#000000' }"
                       :class="{ 'disabled-input': !residueSiteError, 'error-border': residueSiteError }"
                       readonly/>
                <p v-if='residueSiteError' class='error-message'>Please select residue site</p>
              </div>

              <div class='input-wrapper'>
                <label for='residue-names'>Selected Residue Name</label>
                <input type='text' id='residue-names'
                       :value="currentResidueName == 'null' ? '' : currentResidueName"
                       :placeholder="currentResidueName == 'null' ? 'Autofill after filling in Selected Residue Site' : ''"
                       :style="{ color: currentResidueName == 'null' ? '#999999' : '#000000' }"
                       :class="{ 'disabled-input': !residueSiteError, 'error-border': residueNameError }"
                       readonly/>
                <p v-if='residueNameError' class='error-message'>Please select residue name</p>
              </div>

              <label for='radius-range'>Radius Range (Å)</label>
              <input type='number' id='radius-range'
                     v-model='radiusValue'
                     step='0.01'
                     min='0'
                     @input='validateRadius'
                     @blur='handleBlur'
                     placeholder='Enter radius in Å (e.g., 10.00)'/>
            </div>
          </div>

          <DefaultButton width='488px'
                         height='40px'
                         text='Calculate'
                         @click='handleCalculate'
                         :active='true'/>
        </div>

        <div class='right-section' v-else>
          <div class='residue-section'>
            <p class='residue-title'>Center Residue</p>
            <p class='residue'>{{ '(' + currentResidueName + ', ' + currentResidueIndex + ')' }}</p>
          </div>

          <div class='radius-section'>
            <p class='radius-title'>Radius (Å)</p>
            <p class='radius'>{{ radiusValue }}</p>
          </div>

          <div class='score-a-a-section'>
            <p>CAD A-A Score
              <InfoTooltip width='310px' height='90px'>
                <div>
                  <p class='info-title'>CAD A-A Score</p>
                  <p class='info-content'>
                    measures the difference in contact areas between all atoms of the central residue and surrounding
                    residues.
                  </p>
                </div>
              </InfoTooltip>
            </p>
            <p class='score'>
              {{ cad_AScore === -1 ? 'Calculating...' : cad_AScore }}
            </p>
          </div>

          <div class='score-a-s-section'>
            <p>CAD A-S Score
              <InfoTooltip width='324px' height='90px'>
                <div>
                  <p class='info-title'>CAD A-S Score</p>
                  <p class='info-content'>
                    assesses the difference in contact areas between the central residue's atoms and surrounding
                    side-chain atoms.
                  </p>
                </div>
              </InfoTooltip>
            </p>
            <p class='score'>
              {{ cad_SScore == -1 ? 'Calculating...' : cad_SScore }}
            </p>
          </div>

          <DefaultButton width='488px'
                         height='40px'
                         text='Calculate Another Site'
                         @click='handleCalculateAnotherSite'
                         :active='true'/>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang='ts'>
import {ref, onMounted, watchEffect, watch} from 'vue'
import DefaultButton from '@/components/DefaultButton.vue'
import InfoTooltip from '@/components/InfoTooltip.vue'
import {Stage} from 'ngl'
import {useRoute, useRouter} from 'vue-router'
import {g_matchingResults, g_queryLogId} from '@/global'
import axiosInstance from '@/plugins/axios'
import {ArrowRight} from '@element-plus/icons-vue'

const cad_AScore = ref(-1)
const cad_SScore = ref(-1)
const currentResidueIndex = ref('null')
const currentResidueName = ref('null')
const radiusValue = ref(10.00)
const isCalculated = ref(false)
const residueSiteError = ref(false)
const residueNameError = ref(false)
const chainName = ref('')
const route = useRoute()
const router = useRouter()
const fpId = ref(<string>route.params.id)
const currentResult = ref<PredictionResult>(findEntryByFpId(fpId.value))
const pdbFile = ref('')
let stage

interface PredictionResult {
  fpId: string
  signalId: string
  linkerId: string
  fusionProtein: string
  stabilityScore: number
  linker: string
  signal: string
}

function findEntryByFpId(fpId): PredictionResult {
  return <PredictionResult>g_matchingResults.value.find(entry => entry.fpId == fpId)
}

const fetchScore = async () => {
  try {
    const response = await axiosInstance.get(`/basic-prediction/get-local-cad-score/${g_queryLogId.value}/${currentResult.value.fpId}/${chainName.value}/${currentResidueIndex.value + 1}/${radiusValue.value}`)
    cad_AScore.value = response.data[0]
    cad_SScore.value = response.data[1]
  } catch (error) {
  }
}

watch(() => route.params.id, (newId) => {
  fpId.value = <string>newId
  currentResult.value = findEntryByFpId(newId)
  fetchScore()
}, {immediate: true})

const handleCalculate = () => {
  residueSiteError.value = currentResidueIndex.value == 'null'
  residueNameError.value = currentResidueName.value == 'null'
  if (residueSiteError.value || residueNameError.value) {
    return
  }
  isCalculated.value = !isCalculated.value
  fetchScore()
}

const handleCalculateAnotherSite = () => {
  currentResidueIndex.value = 'null'
  currentResidueName.value = 'null'
  isCalculated.value = !isCalculated.value
  radiusValue.value = 10.00
  cad_AScore.value = -1
  cad_SScore.value = -1
}

watchEffect(() => {
  if (currentResidueIndex.value != 'null') {
    residueSiteError.value = false
  }
  if (currentResidueName.value != 'null') {
    residueNameError.value = false
  }
})

const validateRadius = (event: Event) => {
  const target = event.target as HTMLInputElement
  radiusValue.value = parseFloat(target.value) || 0
}

const handleBlur = (event: Event) => {
  const target = event.target as HTMLInputElement
  if (radiusValue.value < 0.01) {
    radiusValue.value = 0.01
  }
  radiusValue.value = parseFloat(radiusValue.value.toFixed(2))
  target.value = radiusValue.value.toString()
}

onMounted(() => {
  stage = new Stage('local-pdb-container', {
    impostor: false,
    quality: 'high',
    mousePreset: 'pymol'
  })
  fetchPdb()
})

const fetchPdb = async () => {
  try {
    const response = await axiosInstance.get(`/basic-prediction/get-file/${g_queryLogId.value}/pdb/${currentResult.value.fpId}.pdb`)
    pdbFile.value = response.data
    const blob = b64toBlob(pdbFile.value)
    const url = URL.createObjectURL(blob)
    stage.loadFile(url, {ext: 'pdb'}).then(function (component) {
      if (component) {
        component.addRepresentation('ball+stick', {
          sele: '.CA',
          radius: 0.5,
          aspectRatio: 1.5,
          colorScheme: 'uniform',
          colorValue: '#ADD8E6'
        })
        component.addRepresentation('line', {
          disablePicking: true,
          multipleBond: 'offset'
        })
        stage.signals.clicked.add((pickingProxy) => {
          if (pickingProxy && pickingProxy.atom && pickingProxy.atom.atomname == 'CA') {
            const atom = pickingProxy.atom
            currentResidueIndex.value = atom.residueIndex
            currentResidueName.value = atom.resname
            chainName.value = atom.chainname
          }
        })
        component.autoView()
      }
    })
  } catch (error) {
  }
}

function b64toBlob(b64Data, contentType = 'application/octet-stream', sliceSize = 512) {
  const byteCharacters = atob(b64Data)
  const byteArrays = []
  for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
    const slice = byteCharacters.slice(offset, offset + sliceSize)
    const byteNumbers = new Array(slice.length)
    for (let i = 0; i < slice.length; i++) {
      byteNumbers[i] = slice.charCodeAt(i)
    }
    const byteArray = new Uint8Array(byteNumbers)
    byteArrays.push(byteArray)
  }
  return new Blob(byteArrays, {type: contentType})
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

.inner-layer {
  margin-top: 100px;
  margin-bottom: 110px;
  width: 1148px;
}

p {
  font-size: 16px;
  font-weight: 600;
  line-height: 19px;
  text-align: left;
  color: #2F3235;
}

.title-section {
  width: 1093px;
  border-bottom: solid 1px #C5C9CD;
  margin-bottom: 35px;
}

.title {
  display: flex;
  gap: 24px;
  height: 48px;
  margin-bottom: 12px;
}

.primary {
  font-size: 40px;
  line-height: 48px;
}

.secondary {
  font-size: 24px;
  color: #16396E;
  line-height: 29px;
  align-self: flex-end;
  margin-bottom: 4px;
}

.subtitle {
  display: flex;
  height: 21px;
  margin-bottom: 5px;
  font-weight: 400;
  line-height: 21px;
}

.subtitle strong {
  font-weight: 600;
  color: #16396E;
}

.content-section {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  height: 470px;
}

.left-section {
  width: 638px;
}

.threeD-picture {
  margin-top: 4px;
  height: 447px;
  width: 638px;
}

.right-section {
  width: 488px;
}

.residue-section {
  margin-bottom: 40px;
}

.residue-title {
  font-weight: 700;
}

.residue {
  line-height: 26px;
  font-weight: 420;
}

.radius-section {
  margin-bottom: 40px;
}

.radius-title {
  font-weight: 700;
}

.radius {
  line-height: 26px;
  font-weight: 420;
}

.score-a-a-section {
  margin-bottom: 40px;
}

.score-a-s-section {
  margin-bottom: 74px;
}

.info-title {
  display: inline;
  font-weight: 600;
  font-size: 14px;
  color: #95999B;
}

.info-content {
  display: inline;
  font-weight: 400;
  font-size: 14px;
  color: #95999B;
}

.score {
  font-size: 40px;
  line-height: 48px;
  color: #5182F8;
  margin-top: 4px;
  margin-bottom: 9px;
}

.container {
  display: flex;
  flex-direction: column;
  gap: 16px;
  max-width: 675px;
  margin-bottom: 150px;
}

.input-section {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.input-wrapper {
  position: relative;
  margin-bottom: 40px;
}

label {
  font-size: 15px;
  font-weight: bold;
  color: #333;
  margin-bottom: -7px;
}

input {
  width: 100%;
  padding: 10px;
  height: 35px;
  font-size: 14px;
  border: 2px solid #C5C9CD;
  border-radius: 8px;
  box-sizing: border-box;
  transition: border-color 0.3s ease;
}

input:focus {
  outline: none;
  border-color: #5486FA;
}

input:read-only {
  background-color: #FFFFFF;
  color: #999;
}

.disabled-input {
  background-color: #f5f5f5;
  border: 2px solid #C5C9CD;
  color: #999;
  pointer-events: none;
  cursor: not-allowed;
}

input.error-border {
  border: 2px solid #DA2420;
  cursor: default;
}

input.error-border:focus {
  border-color: #DA2420;
}

.error-message {
  position: absolute;
  top: 100%;
  left: 0;
  color: #DA2420;
  font-size: 12px;
  margin-top: 5px;
  visibility: hidden;
}

.error-border + .error-message {
  visibility: visible;
}

.breadcrumb {
  position: absolute;
  top: 50px;
  left: 23px;
}
</style>
