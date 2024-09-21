<template>
  <el-card
    body-class="body-class"
    style="
      width: 100%;
      display: flex;
      flex-direction: column;
      height: 100%;
      box-sizing: border-box;
    "
  >
    <template #header>
      <div class="card-header">
        <span>{{ title }}</span>
      </div>
    </template>
    <slot name="body" />
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
});
</script>

<style scoped>
:deep(.body-class) {
  box-sizing: border-box;
  width: 100%;
  flex: 1;
  display: flex;
  flex-direction: column;
}

:deep(.el-card__header) {
  background-color: var(--el-color-primary);
}
.card-header {
}
</style>
