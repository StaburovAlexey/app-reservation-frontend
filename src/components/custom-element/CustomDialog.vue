<template>
  <el-dialog v-model="open" :title :width destroy-on-close center>
    <span>
      Notice: before dialog gets opened for the first time this node and the one
      bellow will not be rendered
    </span>
    <div>
      <strong>Extra content (Not rendered)</strong>
    </div>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="open = false">Закрыть</el-button>
        <el-button type="primary" @click="$emit('confirm')">
          Сохранить
        </el-button>
      </div>
    </template>
  </el-dialog>
</template>

<script setup>
defineProps({
  open: {
    type: Boolean,
    default: false,
    required: true,
  },
  title: {
    type: String,
    default: 'Notice',
    required: true,
  },
  width: {
    type: String,
    default: '500',
  },
});
defineEmits(['confirm']);
</script>

<style lang="css" scoped></style>
