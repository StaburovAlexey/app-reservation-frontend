<template>
  <div class="container-canvas">
    <el-tabs
      type="border-card"
      class="tabs"
      tab-position="left"
      editable
      v-model="activeName"
      @edit="handleTabsEdit"
      @tab-click="handleClick"
    >
      <el-tab-pane
        v-for="item in list"
        :key="item._id"
        :label="item.name"
        :name="item.name"
      >
        <tab-pane :schema="item" @update="getList()"></tab-pane>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script setup>
import { getSchemas, deleteSchema } from '@/api/index.js';
import tabPane from './tabPane.vue';
import { ref, onMounted } from 'vue';
const list = ref([]);
const activeName = ref('')
const getList = async () => {
  list.value = await getSchemas();
};
onMounted(async () => {
  await getList();
  activeName.value = list.value[0]?.name || ''
});
const handleTabsEdit = (targetName, action) => {
  switch (action) {
    case 'add':
      list.value.push({
        name: 'Новое поле',
        json: '',
      });
      console.log(list.value);
      break;
    case 'remove':
      delTab(targetName);
      break;
    default:
  }
};

const delTab = async (name) => {
  const item = list.value.find((item) => item.name === name);
  await deleteSchema(item._id).then(() => {
    getList();
  });
};

const handleClick= (tab, event) => {
  console.log(tab)
}
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
