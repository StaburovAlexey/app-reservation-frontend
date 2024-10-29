<template>
  <div class="container-canvas">
    <el-tabs
      type="border-card"
      class="tabs"
      tab-position="left"
      editable
      @edit="handleTabsEdit"
    >
      <el-tab-pane
        v-for="item in list"
        :key="item.name"
        :label="item.name"
        :name="item.name"
      >
        <tab-pane :schema="item"></tab-pane>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script setup>
import { getSchemas } from '@/api/index.js';
import tabPane from './tabPane.vue';
import { ref, onMounted } from 'vue';
const list = ref({});
onMounted(async () => {
  list.value = await getSchemas();
});
const handleTabsEdit = (targetName, action) => {
  console.log(action);
};
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
