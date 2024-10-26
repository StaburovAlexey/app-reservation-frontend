<template>
  <div class="container-canvas">
    <el-tabs
      type="border-card"
      class="tabs"
      tab-position="left"
      editable
      @edit="handleTabsEdit"
    >
      <el-tab-pane label="Зал №1">
        <tab-pane></tab-pane>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script setup>
import tabPane from './tabPane.vue';
</script>

<style lang="css" scoped>
.container-canvas {
  width: 100%;
}
.tabs {
  height: 100%;
}

.menu-canvas {
  height: 100%;
  width: 200px;
  display: flex;
  flex-direction: column;
  gap: 10px;
}
.el-button + .el-button {
  margin-left: 0;
}
</style>
