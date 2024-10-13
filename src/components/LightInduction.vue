<template>
  <div class='light-induction-container'>
    <div class='custom-select-container' :class="{ 'is-open': isOpen }">
      <div class='custom-select' :class='{ warning: props.warning, selected: selectedValue }' @click='toggleDropdown'>
        <span v-if="selectedValue=='blue'">
          <span class='color-circle blue' style='transform: translateY(2px)'/>
          <span style='color: #2F3235; font-weight: 500'>Blue Light (450nm)</span>
        </span>
        <span v-if="selectedValue=='red'">
          <span class='color-circle red' style='transform: translateY(2px)'/>
          <span style='color: #2F3235; font-weight: 500'>Red Light (600nm)</span>
        </span>
        <span v-if="selectedValue=='far-red'">
          <span class='color-circle far-red' style='transform: translateY(2px)'/>
          <span style='color: #2F3235; font-weight: 500'>Far-Red Light (760nm)</span>
        </span>
        <span v-if="selectedValue==''" style='font-weight: 500'>Select Light Induction</span>
        <ArrowDownBold :class='{ open: isOpen, warning: props.warning }' class='arrow-icon'/>
      </div>
      <div v-if='isOpen' class='custom-options'>
        <div class='custom-option' @click="selectOption('blue')">
          <span class='color-circle blue'/>
          Blue Light (450nm)
        </div>
        <div class='custom-option' @click="selectOption('red')">
          <span class='color-circle red'/>
          Red Light (600nm)
        </div>
        <div class='custom-option' @click="selectOption('far-red')">
          <span class='color-circle far-red'/>
          Far-Red Light (760nm)
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang='ts'>
import {ref, defineProps, defineEmits, watch} from 'vue'
import {ArrowDownBold} from '@element-plus/icons-vue'

const props = withDefaults(defineProps<{
  modelValue: string
  warning: boolean
}>(), {warning: false})

const isOpen = ref(false)
const selectedValue = ref(props.modelValue)
const emit = defineEmits(['update:modelValue'])

const selectOption = (value: string) => {
  selectedValue.value = value
  emit('update:modelValue', value)
  isOpen.value = false
}

const toggleDropdown = () => {
  isOpen.value = !isOpen.value
}

watch(() => props.modelValue, (newVal) => {
  selectedValue.value = newVal
})
</script>

<style scoped>
.light-induction-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.custom-select-container {
  position: relative;
  width: 324px;
  height: 40px;
  font-weight: 400;
}

.custom-select {
  width: 100%;
  padding: 6px 10px;
  font-size: 16px;
  border: 2px solid #5182F8;
  border-radius: 10px;
  background-color: white;
  color: #C5C9CD;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: relative;
  transition: border-color 0.2s, color 0.2s;
}

.custom-select.warning {
  border-color: #DA2420;
  color: #DA2420;
}

.custom-select.selected {
  color: #5182F8;
}

.custom-options {
  position: absolute;
  top: 100%;
  left: 0;
  width: 100%;
  margin-top: 10px;
  border-radius: 10px;
  background-color: white;
  box-shadow: 0 0 8px 0 #00000026;
  z-index: 1;
  display: flex;
  flex-direction: column;
  max-height: 200px;
  overflow-y: auto;
  opacity: 0.95;
}

.custom-option {
  color: #5182F8;
  padding: 8px;
  display: flex;
  align-items: center;
  cursor: pointer;
  transition: background-color 0.2s ease;
}

.custom-option:hover {
  background-color: #EEF3FE;
}

.color-circle {
  width: 15px;
  height: 15px;
  border-radius: 50%;
  display: inline-block;
  margin-right: 10px;
  margin-left: 5px;
}

.color-circle.blue {
  background-color: #5182F8;
}

.color-circle.red {
  background-color: #DA2420;
}

.color-circle.far-red {
  background-color: #671C1C;
}

.arrow-icon {
  width: 16px;
  height: 16px;
  color: #5182F8;
  transition: transform 0.2s ease;
  margin-right: 2px;
}

.arrow-icon.open {
  transform: rotate(180deg);
}

.arrow-icon.warning {
  color: #DA2420;
}
</style>
