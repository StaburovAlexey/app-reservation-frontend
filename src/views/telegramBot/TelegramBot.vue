<template>
  <CustomCard title="Настройки телеграмм бота">
    <template #body>
      <div class="gap-4 mb-4 iput-container">
        <span>Введите Api телеграмм бота</span>
        <el-input v-model="apiBot" style="width: 240px" />
        <el-button type="success" @click="saveApiBot()">Сохранить</el-button>
      </div>
    </template>
  </CustomCard>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { getBotApi, createApiBot, editApiBot } from '@/api/index.js';
import CustomCard from '@/components/custom-element/CustomCard.vue';
const apiBot = ref('');
const id = ref('');
onMounted(async () => {
    getApi();
});
const getApi = async () => {
  const res = await getBotApi();
  apiBot.value = res[0].api || '';
  id.value = res[0]._id || null;
  console.log(id.value);
};
const saveApiBot = async () => {
  if (!id.value) {
    await createApiBot(apiBot.value);
  } else {
    await editApiBot(id.value, apiBot.value);
  }
  await getApi();
};
</script>

<style lang="css" scoped>
.iput-container {
  display: flex;
  align-items: center;
  gap: 10px;
}
</style>
