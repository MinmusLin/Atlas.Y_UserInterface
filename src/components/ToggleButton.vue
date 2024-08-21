<template>
  <div ref='toggleContainer' :style='containerStyle' class='toggle-container' @click='toggle'>
    <div :style='buttonStyle' class='toggle-button'></div>
    <div :style='leftBoxStyle'>
      <span :style='leftLabelStyle'>{{ leftLabel }}</span>
    </div>
    <div :style='rightBoxStyle'>
      <span :style='rightLabelStyle'>{{ rightLabel }}</span>
    </div>
  </div>
</template>

<script setup lang='ts'>
import {ref, computed, defineProps, defineEmits, onMounted, CSSProperties, watch} from 'vue'

const backgroundColor = ref('white')

let timerId: ReturnType<typeof setTimeout> | null = null

const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false,
  },
  leftLabel: {
    type: String,
    default: ''
  },
  rightLabel: {
    type: String,
    default: ''
  },
  width: {
    type: String,
    default: '100%'
  },
  height: {
    type: String,
    default: '40px'
  },
  borderRadius: {
    type: String,
    default: '10px / 10px'
  },
  fontSize: {
    type: String,
    default: '16px'
  }
})

const isOnRight = ref(!props.modelValue)

onMounted(() => {
  backgroundColor.value = props.modelValue
    ? 'linear-gradient(to right, #5182F8 0%, #5182F8 30%, #FFFFFF 30%)'
    : 'linear-gradient(to left, #5182F8 0%, #5182F8 30%, #FFFFFF 30%)'
})

const emit = defineEmits(['update:modelValue'])

const toggle = () => {
  isOnRight.value = !isOnRight.value
  emit('update:modelValue', !isOnRight.value)
}

watch(isOnRight, (newVal) => {
  backgroundColor.value = '#FFFFFF'
  if (timerId != null) {
    clearTimeout(timerId)
  }
  timerId = setTimeout(() => {
    backgroundColor.value = newVal
      ? 'linear-gradient(to left, #5182F8 0%, #5182F8 30%, #FFFFFF 30%)'
      : 'linear-gradient(to right, #5182F8 0%, #5182F8 30%, #FFFFFF 30%)'
  }, 200)
})

const containerStyle = computed<CSSProperties>(() => ({
  width: props.width,
  height: props.height,
  borderRadius: props.borderRadius,
  background: backgroundColor.value,
  transition: 'background 0s ease',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  position: 'relative',
  cursor: 'pointer',
  overflow: 'hidden',
  userSelect: 'none',
  borderWidth: '2.5px',
  borderStyle: 'solid',
  borderColor: '#5182F8',
  boxSizing: 'border-box'
}))

const buttonStyle = computed<CSSProperties>(() => ({
  width: '53%',
  height: '100%',
  backgroundColor: '#5182F8',
  position: 'absolute',
  top: '0',
  left: isOnRight.value ? '47%' : '0',
  transition: 'left 0.3s cubic-bezier(0.25, 1.5, 0.5, 1)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  cursor: 'pointer',
  zIndex: 1,
  userSelect: 'none',
  padding: '0',
  margin: '0',
  borderRadius: isOnRight.value
    ? `${props.borderRadius.split(' / ')[0]} 0 0 ${props.borderRadius.split(' / ')[1]}`
    : `0 ${props.borderRadius.split(' / ')[0]} ${props.borderRadius.split(' / ')[1]} 0`,
  borderColor: '#5182F8',
  boxSizing: 'border-box'
}))

const leftBoxStyle = computed<CSSProperties>(() => ({
  width: '53%',
  height: '100%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  position: 'absolute',
  left: '0',
  top: '0',
  zIndex: 2,
  cursor: 'pointer',
  userSelect: 'none',
  pointerEvents: isOnRight.value ? 'none' : 'auto'
}))

const rightBoxStyle = computed<CSSProperties>(() => ({
  width: '53%',
  height: '100%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  position: 'absolute',
  right: '0',
  top: '0',
  zIndex: 2,
  cursor: 'pointer',
  userSelect: 'none',
  pointerEvents: isOnRight.value ? 'auto' : 'none'
}))

const leftLabelStyle = computed<CSSProperties>(() => ({
  fontSize: props.fontSize,
  color: isOnRight.value ? '#5182F8' : '#FFFFFF',
  userSelect: 'none',
  transition: 'color 0.2s'
}))

const rightLabelStyle = computed<CSSProperties>(() => ({
  fontSize: props.fontSize,
  color: isOnRight.value ? '#FFFFFF' : '#5182F8',
  userSelect: 'none',
  transition: 'color 0.2s'
}))
</script>

<style scoped>
.toggle-container {
  border: 1px solid #CCCCCC;
  position: relative;
  box-sizing: border-box;
}

.toggle-button {
  z-index: 0;
  box-sizing: border-box;
}
</style>
