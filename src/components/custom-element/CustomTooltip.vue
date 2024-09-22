<template>
  <el-tooltip :content :placement :enterable="false" :hide-after="1">
    <slot></slot>
  </el-tooltip>
</template>

<script setup>
defineProps({
  content: {
    type: String,
    required: true,
  },
  placement: {
    type: String,
    default: 'top',
  },
});
</script>

<style scoped></style>
