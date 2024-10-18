<template>
  <div class='page-container'>
    <!--suppress TypeScriptValidateTypes-->
    <el-breadcrumb :separator-icon='ArrowRight' class='breadcrumb'>
      <el-breadcrumb-item to='/basic-designer/configuration'>Start Matching</el-breadcrumb-item>
      <el-breadcrumb-item to='/basic-designer/matching-results'>Matching Results</el-breadcrumb-item>
      <el-breadcrumb-item>/{{ fpId }}</el-breadcrumb-item>
    </el-breadcrumb>

    <img src='https://static.igem.wiki/teams/5503/software-materials/inclinedcrown.webp'
         alt='InclinedCrown'
         style='position: absolute; height: 35px; bottom: 130px; right: 90px'/>

    <div style='display: flex; flex-direction: row'>
      <div style='width: 543px; margin-right: 22px'>
        <p>Fusion Protein</p>
        <TextArea :text='currentResult.fusionProtein' width='509px' height='106px'/>
        <p>
          Interactive 3D Structure
          <InfoTooltip height='117px'
                       width='395px'
                       style='transform: translateY(1px); z-index: 1000; font-size: 14px; font-weight: 400'>
            <span>You can interact with the 3D protein model:</span>
            <ul style='margin-left: 20px'>
              <li><span style='font-weight: 600'>Rotate</span>: Hold down the left mouse button and drag.</li>
              <li><span style='font-weight: 600'>Pan</span>: Hold down the mouse wheel and drag.</li>
              <li><span style='font-weight: 600'>Zoom</span>: Hold down the right mouse button and drag.</li>
            </ul>
          </InfoTooltip>
        </p>
        <div id='current-pdb-container' class='threeD-picture'/>
      </div>
      <div style='width: 418px'>
        <p>Signal</p>
        <TextArea :text='currentResult.signal' width='384px' height='61px'/>
        <p style='margin-top: 10px'>Linker</p>
        <TextArea :text='currentResult.linker' width='384px' height='61px'/>
        <p style='margin-top: 10px'>Target Protein</p>
        <TextArea :text='g_targetProtein' width='384px' height='168px'/>
      </div>
    </div>
    <div style='margin-top: 29px'>
      <DefaultButton width='488px'
                     text='Function Evaluation'
                     height='40px'
                     :active='true'
                     @click="router.push(`/basic-designer/global-cad-score/${fpId}`)"
                     style='margin-right: 7px'/>
      <DefaultButton width='488px'
                     text='Stability Evaluation'
                     height='40px'
                     @click="router.push(`/basic-designer/stability-evaluation/${fpId}`)"
                     :active='true'/>
    </div>
    <div style='display: flex; flex-direction: row; margin-top: 23px'>
      <ToggleButton v-model='g_sequenceOptimization'
                    left-label='Stability'
                    right-label='Locating Stability'
                    style='margin-right: 7px'
                    width='400px'
                    height='50px'/>
      <ShadowButton width='576px'
                    height='50px'
                    @click="router.push(`/basic-designer/directed-evolution-results/${fpId}`); g_currentFusionProtein=currentResult.fusionProtein">
        Sequence Optimization
      </ShadowButton>
    </div>
  </div>
</template>

<script setup lang='ts'>
import {onMounted, ref, watch} from 'vue'
import {useRoute, useRouter} from 'vue-router'
import {
  g_currentFusionProtein,
  g_matchingResults,
  g_queryLogId,
  g_targetProtein,
  g_sequenceOptimization
} from '@/global'
import TextArea from '@/components/TextArea.vue'
import {Stage} from 'ngl'
import axiosInstance from '@/plugins/axios'
import DefaultButton from '@/components/DefaultButton.vue'
import ToggleButton from '@/components/ToggleButton.vue'
import ShadowButton from '@/components/ShadowButton.vue'
import {ArrowRight} from '@element-plus/icons-vue'
import InfoTooltip from '@/components/InfoTooltip.vue'

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
const fpId = ref(<string>route.params.id)
const currentResult = ref<PredictionResult>(findEntryByFpId(fpId.value))
const pdbFile = ref('')
let stage

function findEntryByFpId(fpId): PredictionResult {
  return <PredictionResult>g_matchingResults.value.find(entry => entry.fpId == fpId)
}

onMounted(() => {
  stage = new Stage('current-pdb-container', {
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
        component.addRepresentation('cartoon', {
          colorScheme: 'atomindex'
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

watch(() => route.params.id, (newId) => {
  fpId.value = <string>newId
  currentResult.value = findEntryByFpId(newId)
  fetchPdb()
}, {immediate: true})
</script>

<style scoped>
.page-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
}

.threeD-picture {
  height: 276px;
  width: 543px;
}

p {
  font-weight: 600;
  color: #2F3235;
}

.breadcrumb {
  position: absolute;
  top: 50px;
  left: 104px;
}
</style>
