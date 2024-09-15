<template>
  <el-menu class="side-bar" :collapse="openSidebar">
    <ItemSideBar
      v-for="(item, index) in routesForRole"
      :value="item"
      :index="`${index}`"
      :key="item.name"
    ></ItemSideBar>
  </el-menu>
</template>

<script setup>
import ItemSideBar from './ItemSideBar.vue';
import { toRefs, onMounted, reactive, ref } from 'vue';
import { useRouter } from 'vue-router';
import { useUserStore } from '@/stores/userStore.js';
// Определяем props
const props = defineProps({
  openSidebar: Boolean, // Ожидаем, что openSidebar будет булевым значением
});
// Приводим openSidebar к реактивности
const { openSidebar } = toRefs(props);
const router = useRouter();
const routes = router.getRoutes();
const userStore = useUserStore();
const routesForRole = ref([]);

//ищем роуты для определенной роли
function getRoutesForRole() {
  //ищем родительские роуты
  const filtredRoutesParent = routes.filter((route) => {
    return route.meta.parent;
  });

  // получаем из родителя children
  routesForRole.value = filtredRoutesParent.find((route) => {
    return route.meta.role.includes(userStore.user.role);
  }).children;
}

onMounted(() => {
  getRoutesForRole();
  console.log(routesForRole.value);
});
</script>

<style scoped>
.side-bar:not(.el-menu--collapse) {
  width: 250px;
  height: calc(100vh - 50px);
  position: relative;
  z-index: 20;
  box-shadow: var(--el-box-shadow-light-right);
  flex-shrink: 0;
}
.el-menu--collapse {
  position: relative;
  z-index: 20;
  box-shadow: var(--el-box-shadow-light-right);
}

:deep(.el-menu--inline) {
}
</style>
