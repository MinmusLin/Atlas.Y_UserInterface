<template>
  <el-dialog :modal='true'
             :close-on-click-modal='false'
             :close-on-press-escape='false'
             :width='props.width'
             style='padding: 16px'
             :align-center='true'
             :show-close='true'>
    <div>
      <slot/>
    </div>
  </el-dialog>
</template>

<script setup lang='ts'>
import {defineProps, withDefaults} from 'vue'

const props = withDefaults(defineProps<{
  width: string
}>(), {
  width: '760px'
})
</script>

<style>
/* noinspection CssUnusedSymbol */
.el-dialog {
  border-radius: 10px !important;
}

/* noinspection CssUnusedSymbol */
.el-dialog__headerbtn {
  cursor: pointer;
  font-size: var(--el-message-close-size, 24px);
  height: 44px;
  width: 44px;
  top: calc(100% + 17px);
  left: 50%;
  transform: translateX(-50%);
  background: #FFFFFF;
  border-radius: 10px;
  display: grid;
  justify-content: center;
  align-content: center;
  transition: transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
}

/* noinspection CssUnusedSymbol */
.el-dialog__headerbtn:hover {
  transform: translateX(-50%) scale(1.15);
}
</style>
