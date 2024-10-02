<template>
  <div class='page-container'>
    <!--suppress TypeScriptValidateTypes-->
    <el-breadcrumb :separator-icon='ArrowRight' class='breadcrumb'>
      <el-breadcrumb-item to='/basic-designer'>Start Matching</el-breadcrumb-item>
      <el-breadcrumb-item to='/basic-designer/matching-results'>Matching Results</el-breadcrumb-item>
      <el-breadcrumb-item :to='`/basic-designer/result-details/${fpId}`'>/{{ fpId }}</el-breadcrumb-item>
      <el-breadcrumb-item :to='`/basic-designer/directed-evolution-results/${fpId}`'>
        Directed Evolution Results
      </el-breadcrumb-item>
      <el-breadcrumb-item>/{{ vrId }}</el-breadcrumb-item>
    </el-breadcrumb>

    <div class='inner-layer'>
      <div class='title-section'>
        <div class='title'>
          <p class='primary'>Variant Details</p>
        </div>
        <div class='subtitle'>
          <span style='margin-right: 50px'>
            <strong>Variant ID: </strong>{{ currentVariantResult.variantId }}
          </span>
          <span style='margin-right: 50px'>
            <strong>Mutant: </strong>{{ currentVariantResult.predScore }}
          </span>
          <span>
            <strong>Evolution Score: </strong>{{ currentVariantResult.mutationSite }}
          </span>
        </div>
      </div>

      <div class='content-section'>
        <p style='margin-bottom: 4px'>Sequence Comparison</p>
        <div style='display: flex; flex-direction: row; gap: 21px'>
          <div>
            <p style='margin-bottom: 4px; font-weight: 400'>Primary Sequence</p>
            <TextArea :text='currentVariantResult.primarySeq' width='502px' height='181px'/>
          </div>
          <div>
            <p style='margin-bottom: 4px; font-weight: 400'>Variant Sequence</p>
            <TextArea :text='currentVariantResult.variantSeq' width='502px' height='181px'/>
          </div>
        </div>
        <p>Primary Protein Stability Score: {{ primaryStability }}</p>
        <p>Variant Protein Stability Score: {{ variantStability }}</p>
        <p>Functionality Score: {{ functionalityScore }}</p>
      </div>
    </div>
  </div>
</template>

<script setup lang='ts'>
import {ref, watch, onMounted} from 'vue'
import {useRoute, useRouter} from 'vue-router'
import {g_directedEvolutionResults, g_queryLogId} from '@/global'
import TextArea from '@/components/TextArea.vue'
import axiosInstance from '@/plugins/axios'
import {ArrowRight} from '@element-plus/icons-vue'

interface DirectedEvolutionResult {
  variantId: string
  predScore: string
  mutationSite: string
  primarySeq: string
  variantSeq: string
}

const route = useRoute()
const router = useRouter()
const fpId = ref(route.params.fpid)
const vrId = ref(route.params.vrid)
const currentVariantResult = ref<DirectedEvolutionResult>(findEntryByVrId(fpId.value))
const primaryStability = ref(-1)
const variantStability = ref(-1)
const functionalityScore = ref(-1)

function findEntryByVrId(vrId): DirectedEvolutionResult {
  return <DirectedEvolutionResult>g_directedEvolutionResults.value.find(entry => entry.variantId == vrId)
}

onMounted(() => {
  fetchData()
})

const fetchData = async () => {
  try {
    const primaryResponse = await axiosInstance.get(`/basic-prediction/get-primary-stability/${g_queryLogId.value}/pdb/${fpId.value}.pdb`)
    primaryStability.value = primaryResponse.data
    const variantResponse = await axiosInstance.post('/basic-prediction/get-variant-stability', {
      sequence: currentVariantResult.value.variantSeq,
      variantId: vrId.value,
      logId: g_queryLogId.value,
      fpId: fpId.value
    })
    variantStability.value = variantResponse.data
    const functionalityResponse = await axiosInstance.get(`/basic-prediction/get-functionality-score/${g_queryLogId.value}/${fpId.value}/${vrId.value}`)
    functionalityScore.value = functionalityResponse.data
  } catch (error) {
  }
}

watch(() => route.params.fpid, (newId) => {
  fpId.value = newId
  fetchData()
}, {immediate: true})

watch(() => route.params.vrid, (newId) => {
  vrId.value = newId
  currentVariantResult.value = findEntryByVrId(newId)
  fetchData()
}, {immediate: true})
</script>

<style scoped>
.page-container {
  height: 800px;
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
}

.inner-layer {
  margin-top: 100px;
  margin-bottom: 110px;
  width: 1148px;
}

p {
  font-size: 16px;
  line-height: 19px;
  text-align: left;
  color: #2F3235;
  font-weight: 600;
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
  flex-direction: column;
  height: 470px;
}

.breadcrumb {
  position: absolute;
  top: 0;
  left: 0;
}
</style>
