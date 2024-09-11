<template>
  <el-menu
    default-active="2"
    class="side-bar"
    :collapse="openSidebar"
    @open="handleOpen"
    @close="handleClose"
  >
    <el-sub-menu index="1">
      <template #title>
        <el-icon><location /></el-icon>
        <span>Navigator One</span>
      </template>
      <el-menu-item-group>
        <template #title><span>Group One</span></template>
        <el-menu-item index="1-1">item one</el-menu-item>
        <el-menu-item index="1-2">item two</el-menu-item>
      </el-menu-item-group>
      <el-menu-item-group title="Group Two">
        <el-menu-item index="1-3">item three</el-menu-item>
      </el-menu-item-group>
      <el-sub-menu index="1-4">
        <template #title><span>item four</span></template>
        <el-menu-item index="1-4-1">item one</el-menu-item>
      </el-sub-menu>
    </el-sub-menu>
    <el-menu-item index="2">
      <template #title>Navigator Two</template>
    </el-menu-item>
    <el-menu-item index="3" disabled>
      <el-icon><document /></el-icon>
      <template #title>Navigator Three</template>
    </el-menu-item>
    <el-menu-item index="4">
      <el-icon><setting /></el-icon>
      <template #title>Navigator Four</template>
    </el-menu-item>
  </el-menu>
</template>

<script setup>
import { toRefs } from 'vue';

// Определяем props
const props = defineProps({
  openSidebar: Boolean, // Ожидаем, что openSidebar будет булевым значением
});
// Приводим openSidebar к реактивности
const { openSidebar } = toRefs(props);
// Определяем методы handleOpen и handleClose
function handleOpen() {
  console.log('Sidebar opened');
}

function handleClose() {
  console.log('Sidebar closed');
}
</script>

<style scoped>
.side-bar:not(.el-menu--collapse) {
  width: 250px;
  height: calc(100vh - 50px);
  position: relative;
  z-index: 20;
  box-shadow: var(--el-box-shadow-light-right);
}
.el-menu--collapse {
  position: relative;
  z-index: 20;
}

:deep(.el-menu--inline) {
}
</style>
