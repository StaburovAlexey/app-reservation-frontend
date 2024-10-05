<template>
  <CustomDialog
    title="Создать фигуру"
    width="50%"
    :open="openDialog"
    @close="close"
    @confirm="saveModal"
    v-loading="loading"
  ></CustomDialog>
</template>

<script setup>
import CustomDialog from '../custom-element/CustomDialog.vue';
import { ref, watch, getCurrentInstance } from 'vue';
const props = defineProps({
  open: {
    type: Boolean,
    default: false,
    required: true,
  },
});
const emits = defineEmits(['close']);

const openDialog = ref(false);
const loading = ref(false);
const close = () => {
  emits('close');
};
watch(
  () => props.open,
  (newVal) => {
    openDialog.value = newVal;
  },
  { deep: true },
);
</script>

<style lang="css" scoped></style>
