<template>
  <div class='page-container'>
    <div class='inner-layer'>
      <div class='title-section'>
        <div class='title'>
          <p class='primary'>Function Evaluation</p>
          <p class='secondary'>Local CAD Score</p>
        </div>
        <div class='subtitle'>
          <span style='margin-right: 50px'>
            <strong>Fusion Protein: </strong>FP_0001
          </span>
          <span style='margin-right: 50px'>
            <strong>Signal: </strong>SG_0001
          </span>
          <span>
            <strong>Linker: </strong>LK_0001
          </span>
        </div>
      </div>

      <div class='content-section'>
        <div class='left-section'>
          <p>Interactive 3D Structure</p>
          <div id='local-pdb-container' class='threeD-picture'/>
        </div>

        <div class='right-section' v-if='true'>
          <p class='residue'>{{ '(' + currentResidueName + ', ' + currentResidueIndex + ')' }}</p>

          <DefaultButton width='488px'
                         height='40px'
                         text='Calculate'
                         :active='true'/>
        </div>

        <div class='right-section' v-else>
          <div class='residue-section'>
            <p class='residue-title'>Center Residue</p>
            <p class='residue'>{{ '(' + currentResidueName + ', ' + currentResidueIndex + ')' }}</p>
          </div>

          <div class='radius-section'>
            <p class='radius-title'>Radius (Å)</p>
            <p class='radius'>8.0</p>
          </div>

          <div class='score-a-a-section'>
            <p>CAD A-A Score
              <InfoTooltip width='310px' height='90px'>
                <div style='text-align: justify'>
                  <p class='info-title'>CAD A-A Score</p>
                  <p class='info-content'>
                    measures the difference in contact areas between all atoms of the central residue and surrounding
                    residues.
                  </p>
                </div>
              </InfoTooltip>
            </p>
            <p class='score'>{{ score_A }}</p>
          </div>

          <div class='score-a-s-section'>
            <p>CAD A-S Score
              <InfoTooltip width='324px' height='90px'>
                <div style='text-align: justify'>
                  <p class='info-title'>CAD A-S Score</p>
                  <p class='info-content'>
                    assesses the difference in contact areas between the central residue's atoms and surrounding
                    side-chain atoms.
                  </p>
                </div>
              </InfoTooltip>
            </p>
            <p class='score'>{{ score_S }}</p>
          </div>

          <DefaultButton width='488px'
                         height='40px'
                         text='Calculate Another Site'
                         :active='true'/>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang='ts'>
import {ref, computed, onMounted} from 'vue'
import DefaultButton from '@/components/DefaultButton.vue'
import InfoTooltip from '@/components/InfoTooltip.vue'
import {Stage} from 'ngl'

const cad_AScore = ref(0.0)
const score_A = computed(() => cad_AScore.value)
const cad_SScore = ref(0.0)
const score_S = computed(() => cad_SScore.value)
const currentResidueIndex = ref('null')
const currentResidueName = ref('null')

cad_AScore.value = 0.970826775404717
cad_SScore.value = 0.9217568423111843

onMounted(() => {
  const stage = new Stage('local-pdb-container', {
    impostor: false,
    quality: 'high',
    mousePreset: 'pymol'
  })
  stage.loadFile('/PDB/6uzq.pdb').then(function (component) {
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
      let highlightRepr = null
      stage.signals.clicked.add((pickingProxy) => {
        if (pickingProxy && pickingProxy.atom && pickingProxy.atom.atomname == 'CA') {
          const atom = pickingProxy.atom
          currentResidueIndex.value = atom.residueIndex
          currentResidueName.value = atom.resname

          if (highlightRepr) {
            component.removeRepresentation(highlightRepr);
          }

          // 添加新的高亮表示
          highlightRepr = component.addRepresentation('ball+stick', {
            sele: `.CA`,
            colorScheme: 'uniform',
            colorValue: '#12ff39', // 设置高亮颜色为黄色
            radiusScale: 2 // 可以设置不同的大小来进一步增加可见性
          });
        }
      })
      component.autoView()
    }
  })
})
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
</style>
