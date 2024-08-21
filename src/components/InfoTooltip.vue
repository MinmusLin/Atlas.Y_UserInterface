<template>
  <div class='info-icon'>
    <v-icon :size='size' color='#2F3235' @mouseover='isHover=true' @mouseleave='isHover=false'>
      mdi-information-variant-circle
    </v-icon>
    <transition name='fade'>
      <v-card v-show='isHover' class='info-card' :style='{ width: props.width, height: props.height }'>
        <slot/>
      </v-card>
    </transition>
  </div>
</template>

<script setup lang='ts'>
import {ref, defineProps} from 'vue'

const isHover = ref(true)
const props = defineProps({
  size: {
    type: Number,
    default: 20
  },
  width: {
    required: true,
    type: String
  },
  height: {
    required: true,
    type: String
  }
})
</script>

<style scoped>
.info-icon {
  position: relative;
  display: inline-flex;
  align-items: center;
}

.info-card {
  position: absolute;
  left: 100%;
  top: 0;
  margin-left: 6px;
  background: rgba(255, 255, 255, 0.95);
  border-radius: 10px;
  box-shadow: 0 0 6px rgba(0, 0, 0, 0.25);
  transition: opacity 0.25s ease-in-out;
  padding: 16px;
  color: #898E91;
}

/* noinspection CssUnusedSymbol */
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.25s ease-in-out;
}

/* noinspection CssUnusedSymbol */
.fade-enter-from, .fade-leave-to {
  opacity: 0;
}

/* noinspection CssUnusedSymbol */
.fade-enter-to, .fade-leave-from {
  opacity: 1;
}
</style>
