<template>
  <div :class="['app-conteiner', { 'app-conteiner-collapse': openSidebar }]">
    <RouterView></RouterView>
  </div>
</template>

<script setup>
import { toRefs } from 'vue';

// Определяем props
const props = defineProps({
  openSidebar: Boolean, // Ожидаем, что openSidebar будет булевым значением
});
// Приводим openSidebar к реактивности
const { openSidebar } = toRefs(props);
</script>

<style scoped>
.app-conteiner {
  height: calc(100vh - 50px);
  width: calc(100% - 250px);
  height: 100%;
  box-sizing: border-box;
  background-color: var(--el-backgroud-color-base);
  display: flex;
  padding: 20px;
  transition: all 0.25s linear;
}
.app-conteiner-collapse {
  width: 100%;
  transition: all 0.25s linear;
}
</style>
