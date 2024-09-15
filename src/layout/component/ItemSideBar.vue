<template>
  <router-link :to="props.value.path" v-if="!props.value.children">
    <el-menu-item :index="props.index">
      <template #title>{{ props.value.meta.title }}</template>
    </el-menu-item>
  </router-link>
  <el-sub-menu :index="props.index" v-else>
    <template #title>
      <el-icon><Location /></el-icon>
      <span>{{ props.value.meta.title }}</span>
    </template>
    <ItemSideBar
      v-for="(item, index) in props.value.children"
      :value="item"
      :index="`${props.index}-${index}`"
      :key="item.name"
    ></ItemSideBar>
  </el-sub-menu>
</template>

<script setup>
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
</script>

<style lang="scss" scoped></style>
