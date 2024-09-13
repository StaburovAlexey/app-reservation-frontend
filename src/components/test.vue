<template>
  <span>{{ users }}</span>
</template>

<script setup>
import { reactive, ref, onMounted } from 'vue';
import { getUsers } from '@/db';
const users = ref([]);
const fetchUsers = async () => {
  try {
    const result = await getUsers(); // Дожидаемся выполнения промиса
    users.value = result; // Обновляем значение переменной
  } catch (error) {
    console.error('Error fetching users:', error);
  }
};
onMounted(() => {
  fetchUsers();
});
</script>

<style lang="scss" scoped></style>
