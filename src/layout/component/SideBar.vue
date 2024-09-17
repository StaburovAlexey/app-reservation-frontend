<template>
  <el-menu
    :class="[isJober ? 'side-bar-jober' : 'side-bar']"
    :router="true"
    :default-active="route.path"
    :collapse="openSidebar"
  >
    <ItemSideBar
      v-for="(item, index) in routesForRole"
      :value="item"
      :index="`${item.path}`"
      :key="item.name"
    ></ItemSideBar>
  </el-menu>
</template>

<script setup>
import ItemSideBar from './ItemSideBar.vue';
import { toRefs, onMounted, reactive, ref } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { useUserStore } from '@/stores/userStore.js';
// Определяем props
const props = defineProps({
  openSidebar: {
    type: Boolean,
    default: false,
  }, // Ожидаем, что openSidebar будет булевым значением
  isJober: {
    type: Boolean,
    default: false,
  },
});
// Приводим openSidebar к реактивности
const { openSidebar, jober } = toRefs(props);
const router = useRouter();
const route = useRoute();
const routes = router.getRoutes();
const userStore = useUserStore();
const routesForRole = ref([]);

//ищем роуты для определенной роли
function getRoutesForRole() {
  //ищем родительские роуты
  const filtredRoutesParent = routes.filter((route) => {
    return route.meta.parent;
  });

  console.log('parent for role: ', filtredRoutesParent);
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
.side-bar-jober:not(.el-menu--collapse) {
  width: 250px;
  height: 100%;
  position: relative;
  z-index: 20;
  box-shadow: var(--el-box-shadow-light-right);
  flex-shrink: 0;
}
.el-menu--collapse {
  position: relative;
  z-index: 20;
  box-shadow: var(--el-box-shadow-light-right);
  flex-shrink: 0;
}

.user-card {
  height: 50px;
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 5px;
  gap: 10px;
  box-sizing: border-box;
}
</style>
