<template>
  <el-popconfirm
    :title
    @confirm="confirmEvent"
    confirm-button-text="Да"
    cancel-button-text="Нет, спасибо"
    :width="200"
  >
    <template #reference>
      <div><slot></slot></div>
    </template>
  </el-popconfirm>
</template>

<script setup>
defineProps({
  title: {
    type: String,
    default: 'Вы точно хотите удалить?',
  },
});
const emits = defineEmits(['confirm']);
const confirmEvent = () => {
  emits('confirm');
};
</script>

<style lang="scss" scoped></style>
