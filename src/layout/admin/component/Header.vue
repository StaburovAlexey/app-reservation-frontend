<template>
  <div :class="['header', { 'header-collapse': isCollapsed }]">
    <el-icon class="icon-burger" size="25" @click="clickBurger">
      <Operation />
    </el-icon>
    <el-icon class="icon-burger" size="25" @click="toggleThemeColor">
      <Sunny v-if="isWhiteTheme" />
      <Moon v-else />
    </el-icon>
  </div>
</template>

<script setup>
import { ref, defineEmits, computed } from 'vue';
// Создаем реактивное свойство для отслеживания состояния
const isCollapsed = ref(false);
const isWhiteTheme = ref(true);

// Определяем emit для отправки события
const emit = defineEmits(['clickBurger']);

// Функция переключает состояние и вызывает событие
function clickBurger() {
  isCollapsed.value = !isCollapsed.value; // Переключение класса
  emit('clickBurger');
}

function toggleThemeColor() {
  if (document.body.classList == 'white') {
    document.body.classList.remove('white');
    document.body.classList.add('dark');
    isWhiteTheme.value = false;
  } else {
    document.body.classList.remove('dark');
    document.body.classList.add('white');
    isWhiteTheme.value = true;
  }
}
</script>

<style scoped>
.header {
  box-sizing: border-box;
  width: 100%;
  height: 50px;
  background-color: var(--el-backgroud-color-base);
  box-shadow: 0 1px 4px rgba(0, 21, 41, 0.88);
  padding-left: 260px;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 10;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  transition: padding 0.5s ease;
}
.header-collapse {
  padding-left: 73px;
  transition: padding 0.5s ease;
}
.icon-burger {
  cursor: pointer;
}
</style>
