<template>
  <div class='page-container'>
    <div class='inner-layer'>
      <div class='title-section'>
        <div class='title'>
          <p class='primary'>Function Evaluation</p>
          <p class='secondary'>Global CAD Score</p>
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
          <p>Interactive 3D Structure</p>
          <div id='global-pdb-container' class='threeD-picture'/>
        </div>

        <div class='right-section'>
          <div class='score-section'>
            <p>Global CAD Score</p>
            <p class='score'>{{ cadScore }}</p>
            <div class='score-info'>
              <div class='info-title'>
                <v-icon :size='14' color='#8F9396'>mdi-information-variant-circle</v-icon>
                <p>Scoring Instructions</p>
              </div>
              <p>
                CAD-score values range from 0 to 1, where values close to 1 indicate that the fusion protein is highly
                similar to the original protein and retains its function intact,while values close to 0 indicate that
                the structure is more different and the function is significantly changed.
              </p>
            </div>
          </div>

          <div class='evaluation-section'>
            <p>Evaluation</p>
            <p :style='{ color: evaluationColor }' class='evaluation-comment'>{{ evaluation }}</p>
            <p class='evaluation-description'>{{ evaluationDescription }}</p>
          </div>

          <DefaultButton width='488px'
                         height='40px'
                         text='Focus on Specific Sites'
                         @click="router.push(`/basic-designer/local-cad-score/${fpId}`)"
                         :active='true'/>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang='ts'>
import {ref, computed, onMounted, watch} from 'vue'
import DefaultButton from '@/components/DefaultButton.vue'
import {Stage} from 'ngl'
import {g_matchingResults, g_queryLogId} from '@/global'
import axiosInstance from '@/plugins/axios'
import {useRoute, useRouter} from "vue-router";

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
const cadScore = ref(0.0)

function findEntryByFpId(fpId): PredictionResult {
  return <PredictionResult>g_matchingResults.value.find(entry => entry.fpId == fpId)
}

const evaluation = computed(() => {
  if (cadScore.value > 0.8) {
    return 'High CAD Score'
  } else if (cadScore.value >= 0.4) {
    return 'Medium CAD Score'
  } else {
    return 'Low CAD Score'
  }
})

const evaluationColor = computed(() => {
  if (cadScore.value >= 0.8) {
    return '#13986B'
  } else if (cadScore.value >= 0.4) {
    return '#FFC931'
  } else {
    return '#DA2420'
  }
})

const evaluationDescription = computed(() => {
  if (cadScore.value >= 0.8) {
    return 'The structural integrity of your protein suggests that its original function is well maintained.'
  } else if (cadScore.value >= 0.4) {
    return 'The structural integrity of your protein shows moderate differences, indicating potential variations in function.'
  } else {
    return 'Significant structural differences suggest that the protein\'s original function may be compromised.'
  }
})

onMounted(() => {
  const stage = new Stage('global-pdb-container')
  stage.loadFile('/PDB/6uzq.pdb').then(function (component) {
    if (component) {
      component.addRepresentation('cartoon', {})
      component.autoView()
    }
  })
})

onMounted(() => {
  fetchStability()
})

const fetchStability = async () => {
  try {
    const response = await axiosInstance.get(`/basic-prediction/get-global-cad-score/${g_queryLogId.value}/${currentResult.value.fpId}`)
    cadScore.value = response.data
  } catch (error) {
  }
}

watch(() => route.params.id, (newId) => {
  fpId.value = newId
  currentResult.value = findEntryByFpId(newId)
  fetchStability()
}, {immediate: true})
</script>

<style scoped>
.page-container {
  height: 800px;
  display: flex;
  justify-content: center;
  align-items: center;
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
  margin-bottom: 11px;
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
  align-items: center;
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

.score-section {
  margin-bottom: 54px;
}

.score {
  font-size: 40px;
  line-height: 48px;
  color: #5182F8;
  margin-top: 4px;
  margin-bottom: 9px;
}

.score-info {
  height: 107px;
  border: solid 2px #C5C9CD;
  border-radius: 10px;
  color: #8F9396;
  padding-left: 13px;
  padding-right: 13px;
}

.score-info p {
  font-size: 12px;
  font-weight: 400;
  line-height: 16px;
  color: #8F9396;
}

.info-title {
  height: 18px;
  display: flex;
  align-items: center;
  gap: 4px;
  margin-top: 8px;
  margin-bottom: 4px;
}

.info-title p {
  font-size: 14px;
  font-weight: 600;
  line-height: 18px;
}

.evaluation-section {
  margin-bottom: 88px;
}

.evaluation-comment {
  font-size: 32px;
  line-height: 39px;
  margin-top: 4px;
  margin-bottom: 4px;
}

.evaluation-description {
  font-size: 14px;
  font-weight: 400;
  line-height: 18px;
  color: #2F3235;
}
</style>
