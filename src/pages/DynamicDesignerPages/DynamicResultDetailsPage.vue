<template>
  <div class='page-container'>
    <div style='display: flex; flex-direction: row; gap: 7px'>
      <div style='width: 488px'>
        <p>Navigator Protein</p>
        <p style='color: #5182F8; font-weight: 600; font-size: 24px'>{{ g_report[2] }}</p>
      </div>
      <div style='width: 488px'>
        <p>Sensor Protein</p>
        <p style='color: #5182F8; font-weight: 600; font-size: 24px'>{{ g_report[3] }}</p>
      </div>
    </div>

    <div style='display: flex; flex-direction: row; gap: 7px; margin-top: 23px'>
      <div style='width: 488px'>
        <p style='font-weight: 400; margin-bottom: 4px'>Structure Sketch</p>
        <div class='image-container'>
          <img :src='`/Sketches/${g_lightInduction_dynamic}-left.png`' alt='left'>
        </div>
      </div>
      <div style='width: 488px'>
        <p style='font-weight: 400; margin-bottom: 4px'>Structure Sketch</p>
        <div class='image-container'>
          <img :src='`/Sketches/${g_lightInduction_dynamic}-right.png`' alt='right'>
        </div>
      </div>
    </div>

    <div style='display: flex; flex-direction: row; gap: 7px; margin-top: 23px'>
      <div style='width: 488px'>
        <p style='margin-bottom: 4px'>Navigator Protein Sequence</p>
        <TextArea :text='currentResult.dfpId' width='509px' height='176px'/>
      </div>
      <div style='width: 488px'>
        <p style='margin-bottom: 4px'>Sensor Protein Sequence</p>
        <TextArea :text='currentResult.fusionProtein' width='509px' height='176px'/>
      </div>
    </div>

    <div style='margin-top: 23px'>
      <DefaultButton width='488px'
                     text='Function Evaluation'
                     height='40px'
                     :active='true'
                     @click="router.push(`/dynamic-designer/global-cad-score/${fpId}`)"
                     style='margin-right: 7px'/>
      <DefaultButton width='488px'
                     text='Stability Evaluation'
                     height='40px'
                     @click="router.push(`/dynamic-designer/stability-evaluation/${fpId}`)"
                     :active='true'/>
    </div>

    <div style='display: flex; flex-direction: row; margin-top: 23px'>
      <ShadowButton width='983px'
                    height='50px'
                    @click="router.push(`/dynamic-designer/report/${fpId}`)">
        Detailed Report
      </ShadowButton>
    </div>
  </div>
</template>

<script setup lang='ts'>
import {ref, watch} from 'vue'
import {useRoute, useRouter} from 'vue-router'
import {g_lightInduction_dynamic, g_matchingResults_dynamic, g_report} from '@/global'
import TextArea from '@/components/TextArea.vue'
import DefaultButton from '@/components/DefaultButton.vue'
import ShadowButton from '@/components/ShadowButton.vue'

interface DynamicPredictionResult {
  dfpId: string
  linkerId: string
  fusionProtein: string
  stabilityScore: number
  linker: string
}

const route = useRoute()
const router = useRouter()
const fpId = ref(<string>route.params.id)
const currentResult = ref<DynamicPredictionResult>(findEntryByFpId(fpId.value))

function findEntryByFpId(fpId): DynamicPredictionResult {
  return <DynamicPredictionResult>g_matchingResults_dynamic.value.find(entry => entry.dfpId == fpId)
}

watch(() => route.params.id, (newId) => {
  fpId.value = <string>newId
  currentResult.value = findEntryByFpId(newId)
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

p {
  font-weight: 600;
  color: #2F3235;
}

.image-container {
  border-radius: 10px;
  box-shadow: 0 0 4px 2px rgba(0, 0, 0, 0.1);
  width: 100%;
  height: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.image-container img {
  height: 38px;
}
</style>
