<template>
  <el-card
    :body-class="{
      'body-class': true,
    }"
    style="
      width: 100%;
      display: flex;
      flex-direction: column;
      height: 100%;
      box-sizing: border-box;
    "
  >
    <template #header v-if="header">
      <div class="card-header">
        <span>{{ title }}</span>
      </div>
    </template>
   
    <slot name="body"></slot>

    <template #footer v-if="footer">Footer content</template>
  </el-card>
</template>

<script setup>
const props = defineProps({
  title: {
    type: String,
    default: 'Card name',
  },
  footer: {
    type: Boolean,
    default: false,
  },
  header: {
    type: Boolean,
    default: true,
  },
});
</script>

<style scoped>
:deep(.body-class) {
  box-sizing: border-box;
  width: 100%;
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow-y: auto;
}

:deep(.el-card__header) {
  background-color: var(--el-color-primary);
}
.card-header {
}
</style>
