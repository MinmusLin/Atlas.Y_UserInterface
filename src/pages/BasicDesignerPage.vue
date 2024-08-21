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

      <p>
        Select Positioning Demand
        <v-icon :size='22' color='#2F3235'>mdi-information-variant-circle</v-icon>
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
                        rightLabel='hydrophilic'
                        width='488px'/>
        </div>
      </div>

      <ShadowButton width='100%' height='50px' style='margin-top: 23px'>
        Start Matching
      </ShadowButton>
    </div>
  </div>

  <Dialog v-model='showProteinSequenceDialog' width='200px'>
    45456
  </Dialog>
</template>

<script setup lang='ts'>
import {ref} from 'vue'
import DefaultButton from '@/components/DefaultButton.vue'
import ToggleButton from '@/components/ToggleButton.vue'
import Dialog from '@/components/Dialog.vue'
import ShadowButton from '@/components/ShadowButton.vue'
import NLS_Initial from '@/assets/PositioningDemand/NLS_Initial.mp4'
import NLS_Basic from '@/assets/PositioningDemand/NLS_Basic.mp4'

const showProteinSequenceDialog = ref(false)
const showPDBDialog = ref(false)
const mechanicalProperties = ref(true)
const solubility = ref(true)
const selectedIndex = ref<number | null>(null)
const showInitialVideo = ref(true)
const initialVideoElement = ref<HTMLVideoElement | null>(null)
const basicVideoElement = ref<HTMLVideoElement | null>(null)

const items = ref([
  {name: 'NLS', basic: NLS_Basic, initial: NLS_Initial},
  {name: 'NES', basic: NLS_Basic, initial: NLS_Initial},
  {name: 'SP', basic: NLS_Basic, initial: NLS_Initial},
  {name: 'SP_TM', basic: NLS_Basic, initial: NLS_Initial},
  {name: 'SP_GPI', basic: NLS_Basic, initial: NLS_Initial},
  {name: 'GPI', basic: NLS_Basic, initial: NLS_Initial},
  {name: 'TM', basic: NLS_Basic, initial: NLS_Initial},
  {name: 'LD', basic: NLS_Basic, initial: NLS_Initial},
  {name: 'MT', basic: NLS_Basic, initial: NLS_Initial},
  {name: 'PTS', basic: NLS_Basic, initial: NLS_Initial}
])

const changeVideo = (initial: string, basic: string, index: number) => {
  if (index == selectedIndex.value) {
    return
  }
  selectedIndex.value = index
  initialVideoElement.value!.src = initial
  basicVideoElement.value!.src = basic
  showInitialVideo.value = true
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
  background: url('@/assets/PositioningDemand/Default.png');
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
</style>
