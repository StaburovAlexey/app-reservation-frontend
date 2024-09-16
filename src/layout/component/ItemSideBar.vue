<template>
  <router-link :to="props.value.path" v-if="!props.value.children">
    <el-menu-item :index="props.index">
      <el-icon><component :is="props.value.meta.icon" /></el-icon>
      <template #title>
        <span>{{ props.value.meta.title }}</span>
      </template>
    </el-menu-item>
  </router-link>
  <el-sub-menu :index="props.index" v-else>
    <template #title>
      <el-icon><component :is="props.value.meta.icon" /></el-icon>
      <span>{{ props.value.meta.title }}</span>
    </template>
    <ItemSideBar
      v-for="(item, index) in props.value.children"
      :value="item"
      :index="`${props.index}`"
      :key="item.name"
    ></ItemSideBar>
  </el-sub-menu>
</template>

<script setup>
import { reactive, computed } from 'vue';
import ItemSideBar from './ItemSideBar.vue';
const props = defineProps({
  value: {
    type: Object,
    default: {},
  },
  index: {
    type: String,
    default: '',
  },
});

const activeElMenu = computed(() => {
  return;
});
</script>

<style lang="scss" scoped></style>
