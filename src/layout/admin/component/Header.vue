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
  box-shadow: var(--el-box-shadow-light);
  padding-left: 260px;
  padding-right: 10px;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 10;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  transition: padding 0.3s linear;
}
.header-collapse {
  padding-left: 73px;
}
.icon-burger {
  cursor: pointer;
}
</style>
