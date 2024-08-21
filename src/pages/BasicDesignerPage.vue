<template>
  <div class='page-container'>
    <div class='inner-layer'>
      <div class='upload-button'>
        <div>
          <p>Protein Sequence Demand</p>
          <DefaultButton width='488px'
                         height='40px'
                         text='Upload Protein Sequence'
                         @click='showProteinSequenceDialog=true'/>
        </div>
        <div>
          <p>PDB Demand</p>
          <DefaultButton width='488px'
                         height='40px'
                         text='Upload PDB'
                         @click='showPDBDialog=true'/>
        </div>
      </div>

      <p>Select Positioning Demand</p>
      <div class='positioning-info'>
        <div class='image'>
          <img :src='currentImage' alt='Demo'>
        </div>
        <div class='button-scroller'>
          <div class='item-buttons'>
            <DefaultButton v-for='(item, index) in items'
                           :key='index'
                           height='40px'
                           width='304px'
                           :text='item.name'
                           :active='selectedIndex==index'
                           @click='selectedIndex=index'/>
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
                        rightLabel='hydrophilic'
                        width='488px'/>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang='ts'>
import {ref} from 'vue'
import DefaultButton from '@/components/DefaultButton.vue'
import ToggleButton from '@/components/ToggleButton.vue'
import defaultImage from '@/assets/PositioningDemand/Default.png'
import initialNLSImage from '@/assets/PositioningDemand/NLS_initial.gif'
import initialNESImage from '@/assets/PositioningDemand/NES_initial.gif'
import initialSPImage from '@/assets/PositioningDemand/SP_initial.gif'
import initialSPTMImage from '@/assets/PositioningDemand/SP_TM_initial.gif'
import initialSPGPIImage from '@/assets/PositioningDemand/SP_GPI_initial.gif'
import initialGPIImage from '@/assets/PositioningDemand/GPI_initial.gif'
import initialTMImage from '@/assets/PositioningDemand/TM_initial.gif'
import initialLDImage from '@/assets/PositioningDemand/LD_initial.gif'
import initialMTImage from '@/assets/PositioningDemand/MT_initial.gif'
import initialPTSImage from '@/assets/PositioningDemand/PTS_initial.gif'
import basicNLSImage from '@/assets/PositioningDemand/NLS_basic.gif'
import basicNESImage from '@/assets/PositioningDemand/NES_basic.gif'
import basicSPImage from '@/assets/PositioningDemand/SP_basic.gif'
import basicSPTMImage from '@/assets/PositioningDemand/SP_TM_basic.gif'
import basicSPGPIImage from '@/assets/PositioningDemand/SP_GPI_basic.gif'
import basicGPIImage from '@/assets/PositioningDemand/GPI_basic.gif'
import basicTMImage from '@/assets/PositioningDemand/TM_basic.gif'
import basicLDImage from '@/assets/PositioningDemand/LD_basic.gif'
import basicMTImage from '@/assets/PositioningDemand/MT_basic.gif'
import basicPTSImage from '@/assets/PositioningDemand/PTS_basic.gif'

const showProteinSequenceDialog = ref(false)
const showPDBDialog = ref(false)
const mechanicalProperties = ref(true)
const solubility = ref(true)
const currentImage = ref(defaultImage)
const selectedIndex = ref<number | null>(null)

const items = ref([
  {name: 'NLS', basicAnimation: basicNLSImage, initialAnimation: initialNLSImage, gifDuration: 360},
  {name: 'NES', basicAnimation: basicNESImage, initialAnimation: initialNESImage, gifDuration: 360},
  {name: 'SP', basicAnimation: basicSPImage, initialAnimation: initialSPImage, gifDuration: 360},
  {name: 'SP_TM', basicAnimation: basicSPTMImage, initialAnimation: initialSPTMImage, gifDuration: 1000},
  {name: 'SP_GPI', basicAnimation: basicSPGPIImage, initialAnimation: initialSPGPIImage, gifDuration: 360},
  {name: 'GPI', basicAnimation: basicGPIImage, initialAnimation: initialGPIImage, gifDuration: 360},
  {name: 'TM', basicAnimation: basicTMImage, initialAnimation: initialTMImage, gifDuration: 360},
  {name: 'LD', basicAnimation: basicLDImage, initialAnimation: initialLDImage, gifDuration: 1000},
  {name: 'MT', basicAnimation: basicMTImage, initialAnimation: initialMTImage, gifDuration: 1000},
  {name: 'PTS', basicAnimation: basicPTSImage, initialAnimation: initialPTSImage, gifDuration: 1000}
])

const changeImage = (initialAnimation: string, basicAnimation: string, index: number, gifDuration: number) => {
  currentImage.value = initialAnimation
  setTimeout(() => {
    currentImage.value = basicAnimation
  }, gifDuration)
  selectedIndex.value = index
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

.image {
  width: 640px;
  height: 320px;
}

.image img {
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
</style>
