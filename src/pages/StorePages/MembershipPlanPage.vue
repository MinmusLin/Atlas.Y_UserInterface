<template>
  <div class='page-container'>
    <div class='subscription-info'>
      <p>Current Subcribtion: Free</p>
    </div>
    <div class='cards-grid'>
      <div class='card-container' v-for='(card, index) in cards' :key='index'>
        <h2 class='title'>{{ card.title }}</h2>
        <ul class='description'>
          <li v-for='(item, i) in card.description' :key='i'>
            <div v-if="typeof item == 'object'">
              {{ item.main }}
              <ul>
                <li v-for='(subItem, j) in item.sub' :key='j'>{{ subItem }}</li>
              </ul>
            </div>
            <div v-else>{{ item }}</div>
          </li>
        </ul>
        <button
          :class="['subscribe-button', index == 0 ? 'disabled-button' : '']"
          :disabled='index == 0'
          v-if='index != 0'
          @click='openDialog(index)'>
          {{ index == 0 ? 'Your current subscription' : 'Subscribe' }}
        </button>
        <button
          :class="['subscribe-button', index == 0 ? 'disabled-button' : '']"
          :disabled='index == 0'
          v-else>
          Your current subscription
        </button>
      </div>
    </div>

    <Dialog v-model='dialogVisible' style='padding: 14px 40px 0 40px; width: 732px; height: 292px'>
      <div class='dialog-content'>
        <h2 class='dialog-title'>{{ dialogTitle }}</h2>
        <p class='dialog-description'>
          Copy and paste it into the Text Box or upload the Fasta file.
        </p>
        <div class='price-cards' v-if='dialogPrices.length'>
          <button v-for='(price, index) in dialogPrices' :key='index' class='price-card'>
            <div class='price-amount'>{{ price.amount }}</div>
            <div class='price-duration'>{{ price.duration }}</div>
          </button>
        </div>
        <button class='subscribe-btn'>Subscribe</button>
      </div>
    </Dialog>
  </div>
</template>

<script setup lang='ts'>
import {ref} from 'vue'

interface Price {
  amount: string
  duration: string
}

const dialogVisible = ref(false)
const dialogTitle = ref<string>('')
const dialogPrices = ref<Price[]>([])

const cards = [
  {
    title: 'Free',
    description: [
      'Basic protein localization design',
      'Overall functionality scoring',
      'Overall stability scoring',
    ],
    prices: []
  },
  {
    title: 'Professional',
    description: [
      'Includes all Free Version features',
      {
        main: 'Access to all algorithms in the algorithm store',
        sub: [
          'Specific site functionality scoring',
          'Protein localization prediction system',
          'Localization-optimized protein evolution system',
          'Time-dynamic localization design system'
        ]
      }
    ],
    prices: [
      {amount: '30$', duration: '1 month'},
      {amount: '160$', duration: 'half year'},
      {amount: '300$', duration: '1 year'}
    ]
  },
  {
    title: 'Company',
    description: [
      'Includes all Professional Version features',
      {
        main: 'Exclusive enterprise services and functions',
        sub: [
          'Custom Development',
          'Team Management',
          'Enterprise-level Data Security',
          'Sustainability Reports',
        ]
      }
    ],
    prices: [
      {amount: '100$', duration: '1 month'},
      {amount: '550$', duration: 'half year'},
      {amount: '1000$', duration: '1 year'}
    ]
  }
]

function openDialog(index: number) {
  dialogTitle.value = cards[index].title
  dialogPrices.value = cards[index].prices
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
  padding: 40px 40px 20px 40px;
  width: 358px;
  height: 428px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  text-align: left;
}

.cards-grid {
  gap: 20px;
  display: flex;
  justify-content: space-between;
}

.title {
  width: 90%;
  font-size: 24px;
  font-weight: bold;
  color: #2F3235;
  line-height: 25px;
  margin-bottom: 10px;
}

.description {
  flex-grow: 1;
  font-size: 16px;
  color: #8F9396;
  list-style-type: disc;
  padding-left: 20px;
}

.description ul {
  list-style-type: disc;
  padding-left: 15px;
}

.subscribe-button {
  background-color: #5182F8;
  color: white;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  width: 100%;
  height: 35px;
  transition: background-color 0.5s ease;
}

.subscribe-button:hover {
  background-color: #2F62D7;
}

.disabled-button {
  background-color: white;
  color: #8F9396;
  border: 1px solid #D3D3D3;
  cursor: not-allowed;
  pointer-events: none;
}

.dialog-content {
  text-align: left;
  position: relative;
  padding-bottom: 60px;
}

.subscribe-btn {
  background-color: #5182F8;
  color: white;
  border: none;
  border-radius: 8px;
  width: 100%;
  height: 34px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 14px;
  text-align: center;
  cursor: pointer;
  transition: background-color 0.5s ease;
  position: absolute;
  bottom: 20px;
  left: 0;
}

.dialog-title {
  font-size: 22px;
  font-weight: bold;
  color: #2F3235;
  margin-bottom: 5px;
}

.dialog-description {
  font-size: 14px;
  color: #8F9396;
  margin-bottom: 20px;
}

.price-cards {
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
}

.price-card {
  width: 210px;
  height: 100px;
  border: 1px solid #7AA8F3;
  border-radius: 10px;
  background-color: #ffffff;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  transition: border 0.1s ease;
}

.price-card:hover {
  border: 3px solid #7AA8F3;
}

.price-amount {
  font-size: 38px;
  color: #FFCA31;
  font-weight: bold;
  font-family: 'Inter', sans-serif;
}

.price-duration {
  font-size: 14px;
  color: #8F9396;
  font-weight: bold;
  font-family: 'Inter', sans-serif;
}

.subscribe-btn:hover {
  background-color: #2F62D7;
}

.subscription-info {
  text-align: center;
  margin-bottom: 20px;
  font-size: 16px;
  font-weight: bold;
  color: #8F9396;
}
</style>
