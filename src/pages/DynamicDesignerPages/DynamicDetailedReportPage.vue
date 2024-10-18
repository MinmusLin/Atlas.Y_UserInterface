<template>
  <div class='page-container'>
    <div class='detailed-container'>
      <!--suppress TypeScriptValidateTypes-->
      <el-breadcrumb :separator-icon='ArrowRight' class='breadcrumb'>
        <el-breadcrumb-item to='/dynamic-designer/configuration'>Start Matching</el-breadcrumb-item>
        <el-breadcrumb-item to='/dynamic-designer/matching-results'>Matching Results</el-breadcrumb-item>
        <el-breadcrumb-item :to='`/dynamic-designer/result-details/${fpId}`'>/{{ fpId }}</el-breadcrumb-item>
        <el-breadcrumb-item>Detailed Report</el-breadcrumb-item>
      </el-breadcrumb>

      <div class='title-container'>
        <h1 class='title'>Detailed Report</h1>
      </div>

      <div class='subtitle-container'>
        <span class='subtitle' style='margin-right: 30px'>
          <span class='sub-content'>Sequence / Fasta: </span>{{ g_fastaFileName_dynamic }}
        </span>
        <span class='subtitle' style='margin-right: 30px'>
          <span class='sub-content'>Pdb: </span>{{ g_pdbFileName_dynamic }}
        </span>
        <span class='subtitle'>
          <span class='sub-content'>Photoinducible Dimer: </span>{{ g_report_dynamic[0] }}-{{ g_report_dynamic[1] }}
        </span>
      </div>

      <div style='display: flex; flex-direction: row; gap: 24px'>
        <div style='width: 483px'>
          <p>Navigator Protein</p>
          <p style='color: #5182F8; font-weight: 600; font-size: 24px'>{{ g_report_dynamic[2] }}</p>
        </div>
        <div style='width: 483px'>
          <p>Sensor Protein</p>
          <p style='color: #5182F8; font-weight: 600; font-size: 24px'>{{ g_report_dynamic[3] }}</p>
        </div>
      </div>

      <div style='display: flex; flex-direction: row; gap: 24px; margin-top: 23px'>
        <div style='width: 483px'>
          <p style='margin-bottom: 4px'>Navigator Protein Sequence</p>
          <!--suppress TypeScriptValidateTypes-->
          <TextArea width='509px'
                    height='200px'
                    :text='g_csvRecord.find(r => r.position == g_positioningDemand_dynamic && r.light == g_lightInduction_dynamic)?.navigator_seq'/>
        </div>
        <div style='width: 483px'>
          <p style='margin-bottom: 4px'>Sensor Protein Sequence</p>
          <TextArea :text='currentResult.fusionProtein' width='509px' height='200px'/>
        </div>
      </div>

      <div style='display: flex; flex-direction: row; gap: 24px; margin-top: 23px'>
        <div style='width: 483px'>
          <p style='margin-bottom: 4px'>Signal Peptide Sequence</p>
          <!--suppress TypeScriptValidateTypes-->
          <TextArea width='509px'
                    height='50px'
                    :text='g_csvRecord.find(r => r.position == g_positioningDemand_dynamic && r.light == g_lightInduction_dynamic)?.signal_seq'/>
        </div>
        <div style='width: 483px'>
          <p style='margin-bottom: 4px'>Linker Sequence</p>
          <TextArea :text='currentResult.linker' width='509px' height='50px'/>
        </div>
      </div>

      <div style='display: flex; flex-direction: row; gap: 24px; margin-top: 23px'>
        <div style='width: 483px'>
          <p style='margin-bottom: 4px'>{{ g_report_dynamic[0] }} Sequence</p>
          <TextArea width='509px'
                    height='150px'
                    :text='g_report_dynamic[4]'/>
        </div>
        <div style='width: 483px'>
          <p style='margin-bottom: 4px'>{{ g_report_dynamic[1] }} Sequence</p>
          <TextArea :text='g_report_dynamic[5]' width='509px' height='150px'/>
        </div>
      </div>

      <div style='display: flex; flex-direction: row; gap: 24px; margin-top: 23px'>
        <div style='width: 483px'>
          <p style='margin-bottom: 4px'>{{ g_report_dynamic[6] }} Sequence</p>
          <TextArea width='509px'
                    height='150px'
                    :text='g_report_dynamic[7]'/>
        </div>
        <div style='width: 483px'>
          <p style='margin-bottom: 4px'>{{ g_report_dynamic[8] }} Sequence</p>
          <TextArea width='509px'
                    height='150px'
                    :text='g_report_dynamic[9]'/>
        </div>
      </div>

      <div style='display: flex; flex-direction: row; gap: 24px; margin-top: 23px'>
        <div style='width: 483px'>
          <p style='margin-bottom: 4px'>Targeted Subcellular Location</p>
          <p style='font-weight: 400; margin-bottom: 15px'>
            {{
              g_positioningDemand_dynamic == 'NLS' ? 'Cytoplasm -> Nucleus' :
                g_positioningDemand_dynamic == 'NES' ? 'Nucleus -> Cytoplasm' :
                  g_positioningDemand_dynamic == 'SP' ? 'Cytoplasm -> Endoplasmic Reticulum Lumen' :
                    g_positioningDemand_dynamic == 'SP_TM' ? 'Anchored on the Endoplasmic Reticulum Membrane' :
                      g_positioningDemand_dynamic == 'SP_GPI' ? 'Cytoplasm -> Endoplasmic Reticulum Lumen -> Cytoplasm -> Cell Surface' :
                        g_positioningDemand_dynamic == 'GPI' ? 'Cell Surface' :
                          g_positioningDemand_dynamic == 'TM' ? 'Embedded in Cell Membrane' :
                            g_positioningDemand_dynamic == 'PTS' ? 'Peroxisome' :
                              g_positioningDemand_dynamic == 'MT' ? 'Mitochondria' :
                                g_positioningDemand_dynamic == 'LYS' ? 'Lysosome' : ''
            }}
            ({{ g_positioningDemand_dynamic }})
          </p>
          <p style='margin-bottom: 4px'>Fluorescent Tag Color</p>
          <p style='font-weight: 400; margin-bottom: 15px'>{{ g_report_dynamic[10] }}</p>
          <p style='margin-bottom: 4px'>Inducing Light</p>
          <p style='font-weight: 400; margin-bottom: 15px'>{{ g_report_dynamic[11] }}</p>
          <p style='margin-bottom: 4px'>Fluorescent Tag Color</p>
          <p style='font-weight: 400; margin-bottom: 15px'>{{ g_report_dynamic[12] }}</p>
        </div>

        <div style='width: 483px'>
          <p style='margin-bottom: 4px'>Target Protein Sequence</p>
          <TextArea :text='currentResult.fusionProtein' width='509px' height='200px'/>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang='ts'>
import {ref, watch} from 'vue'
import {useRoute, useRouter} from 'vue-router'
import {
  g_csvRecord,
  g_fastaFileName_dynamic,
  g_lightInduction_dynamic,
  g_matchingResults_dynamic,
  g_pdbFileName_dynamic,
  g_positioningDemand_dynamic,
  g_report_dynamic
} from '@/global'
import TextArea from '@/components/TextArea.vue'
import {ArrowRight} from '@element-plus/icons-vue'

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
  justify-content: flex-start;
  align-items: stretch;
  width: 100%;
  height: 100vh;
  overflow-y: auto;
}

.detailed-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  margin: 0 auto;
  transform: translateX(51px);
  padding-top: 30px;
  padding-bottom: 30px;
}

p {
  font-weight: 600;
  color: #2F3235;
}

.image-container img {
  height: 38px;
}

.breadcrumb {
  margin-bottom: 30px;
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
  width: 990px;
  height: 28px;
  font-size: 16px;
  text-align: center;
  margin-bottom: 24px;
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
</style>
