<template>
  <el-dialog
    v-model="openDialog"
    :title
    :width
    destroy-on-close
    append-to-body
    :before-close="close"
  >
    <slot name="body"></slot>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="$emit('close')">Закрыть</el-button>
        <el-button type="primary" @click="$emit('confirm')">
          Сохранить
        </el-button>
      </div>
    </template>
  </el-dialog>
</template>

<script setup>
import { ref, watch } from 'vue';
const props = defineProps({
  open: {
    type: Boolean,
    default: false,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  width: {
    type: String,
    default: '500',
  },
});
const emits = defineEmits(['confirm', 'close']);
const close = () => {
  emits('close');
};

const openDialog = ref();
// Отслеживание изменений пропса open и синхронизация с openDialog
watch(
  () => props.open,
  (newVal) => {
    openDialog.value = newVal;
  },
);
</script>

<style lang="css" scoped></style>
