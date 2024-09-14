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
  box-sizing: border-box;
  background-color: var(--el-backgroud-color-base);
  display: flex;
  padding: 20px;
}
.app-conteiner-collapse {
}
</style>
