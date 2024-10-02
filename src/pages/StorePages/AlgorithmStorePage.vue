<template>
  <div class='page-container'>
    <div class='algorithm-store-info'>
      <p>Algorithm Store</p>
    </div>
    <div class='subscription-info'>
      <p>Current Subcribtion: Free</p>
    </div>
    <div class='cards-grid'>
      <div class='card-container' v-for='(card, index) in cards' :key='index'>
        <h2 class='title' ref='titles'>{{ card.title }}</h2>
        <p class='description'>{{ card.truncatedDescription }}</p>
        <div class='info-container'>
          <span class='times-left'>
            <span class='number'>{{ card.timesLeft }} </span>
            <span class='text'> times left</span>
          </span>
          <div class='price-container'>
            <span class='price'>{{ card.price }}$</span>
            <button class='buy-button' @click='openDialog(index)'>BUY</button>
          </div>
        </div>
      </div>
    </div>
    <Dialog v-model='dialogVisible' style='padding: 14px 40px 0 40px; width: 732px; height: 310px'>
      <div class='dialog-content'>
        <h2 class='title'>{{ cards[selectedIndex].title }}</h2>
        <p class='description'>{{ currentDialogContent }}</p>
        <div class='info-container'>
          <span class='times-left'>
            <span class='number'>{{ cards[selectedIndex].timesLeft }} </span>
            <span class='text'> times left</span>
          </span>
          <div class='price-container'>
            <span class='price'>{{ cards[selectedIndex].price }}$</span>
            <button class='buy-button'>BUY</button>
          </div>
        </div>
      </div>
    </Dialog>
  </div>
</template>

<script setup lang='ts'>
import {ref} from 'vue'
import Dialog from '@/components/Dialog.vue'

const dialogVisible = ref(false)
const currentDialogContent = ref('')
const selectedIndex = ref(0)
const titles = ref<HTMLElement[]>([])
const cards = [
  {
    title: 'Site-Specific CAD Scoring System',
    description: 'The CAD scoring algorithm provides a quantitative evaluation of the structural similarity between a protein\'s active site and a reference model. This algorithm assesses the accuracy and physical realism of a protein model by calculating the differences in residue-residue contact areas. By selecting specific sites in the protein, users can obtain CAD scores for these locations, enabling precise evaluation of the structural fidelity and potential functionality of the site.',
    truncatedDescription: 'The CAD scoring algorithm provides a quantitative evaluation of the structural similarity between a protein\'s active site and a reference model. This algorithm assesses the accuracy and physical realism of a protein model by calculating the...',
    timesLeft: 3,
    price: 10
  },
  {
    title: 'Temporal Dynamic Localization Design System',
    description: 'The Temporal Dynamic Localization Design System utilizes light-sensitive components and localization tags to achieve time-controlled regulation of protein localization. This system can precisely manipulate the positioning of proteins within cells or other environments, aiding in the study of protein behavior, interactions, and functions over time.',
    truncatedDescription: 'The Temporal Dynamic Localization Design System utilizes light-sensitive components and localization tags to achieve time-controlled regulation of protein localization. This system can ...',
    timesLeft: 3,
    price: 15
  },
  {
    title: 'Optimized Protein Evolution Localization System',
    description: 'The Optimized Protein Evolution Localization System uses computational algorithms to assist in protein evolution. Based on the user\'s selection of a specific organelle, the system evolves the user\'s fusion protein to be suitable for localization within that organelle. This system is a powerful tool in the field of protein engineering, aiding in the design of proteins with enhanced localization capabilities and functionality tailored to specific cellular environments.',
    truncatedDescription: 'The Optimized Protein Evolution Localization System uses computational algorithms to assist in protein evolution. Based on the user\'s selection of a specific organelle, the system evolves ...',
    timesLeft: 3,
    price: 20
  },
  {
    title: 'Protein Localization Prediction System',
    description: 'The Protein Localization Prediction System analyzes protein sequences and structural features using advanced algorithms to predict protein localization within cells. This system helps optimize research workflows, supports the design of novel proteins, enhances experimental efficiency, and improves protein design for specific cellular applications.',
    truncatedDescription: 'The Protein Localization Prediction System analyzes protein sequences and structural features using advanced algorithms to predict protein localization within cells. This system helps ...',
    timesLeft: 3,
    price: 10
  }
]

function openDialog(index: number) {
  selectedIndex.value = index
  currentDialogContent.value = cards[index].description
  dialogVisible.value = true
}
</script>

<style scoped>
.page-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.card-container {
  background-color: white;
  border: 1px solid #7AA8F3;
  border-radius: 8px;
  padding: 20px;
  width: 540px;
  height: 234px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  text-align: left;
}

.cards-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px 15px;
}

.title {
  width: 90%;
  font-size: 24px;
  font-weight: bold;
  color: #2F3235;
  margin-bottom: 10px;
  line-height: 1.3;
}

.description {
  flex-grow: 1;
  font-size: 16px;
  color: #8F9396;
}

.info-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
}

.price-container {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 20px;
}

.number {
  color: #4a90e2;
}

.text {
  color: #8F9396;
}

.times-left {
  font-size: 16px;
  font-weight: bold;
}

.price {
  font-size: 16px;
  color: #FFCA31;
}

.buy-button {
  background-color: #5182F8;
  color: white;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  width: 74px;
  height: 35px;
  transition: background-color 0.5s ease;
}

.buy-button:hover {
  background-color: #2F62D7;
}

.dialog-content {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  text-align: left;
  padding-top: 10px;
}

.dialog-content .info-container {
  margin-top: 10px;
}

.dialog-content .price-container {
  margin-top: 5px;
}

.algorithm-store-info {
  text-align: center;
  margin-bottom: 20px;
  font-size: 50px;
  font-weight: bold;
  color: #5182F8;
}

.subscription-info {
  text-align: center;
  margin-bottom: 30px;
  font-size: 16px;
  color: #8F9396;
  font-weight: bold;
}
</style>
