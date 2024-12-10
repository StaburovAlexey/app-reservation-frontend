<template>
  <CustomCard title="Настройка Telegram бота">
    <template #body>
      <div class="card-body">
        <div class="gap-4 mb-4 iput-container">
          <span>
            Токен Telegram бота
            <CustomTooltip :content="info.token">
              <el-icon class="icon-info" color="grey"><InfoFilled /></el-icon>
            </CustomTooltip>
          </span>
          <el-input v-model="apiBot" />
          <el-button type="success" @click="saveApiBot()">Сохранить</el-button>
        </div>
        <div class="gap-4 mb-4 iput-container">
          <span>
            Идентификатор Telegram администратора бота
            <CustomTooltip :content="info.id">
              <el-icon class="icon-info" color="grey"><InfoFilled /></el-icon>
            </CustomTooltip>
          </span>
          <el-input v-model="idAdmin" />
          <el-button type="success" @click="saveApiBot()">Сохранить</el-button>
        </div>
      </div>
    </template>
  </CustomCard>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { getBotApi, createApiBot, editApiBot } from '@/api/index.js';
import CustomCard from '@/components/custom-element/CustomCard.vue';
import CustomTooltip from '@/components/custom-element/CustomTooltip.vue';
const apiBot = ref('');
const id = ref('');
const idAdmin = ref('');
const info = {
  token: 'Токен Telegram бота, который вы можете получить на сайте @BotFather',
  id: 'Идентификатор администратора бота. Чтобы получить идентификатор, используйте @userinfobot или команду "/id" в боте.',
};
onMounted(async () => {
  getApi();
});
const getApi = async () => {
  const res = await getBotApi();
  apiBot.value = res[0].api || '';
  idAdmin.value = res[0].idAdmin || '';
  id.value = res[0]._id || null;
  console.log(id.value);
};
const saveApiBot = async () => {
  if (!id.value) {
    await createApiBot(apiBot.value, idAdmin.value);
  } else {
    await editApiBot(id.value, apiBot.value, idAdmin.value);
  }
  await getApi();
};
</script>

<style lang="css" scoped>
.iput-container {
  display: grid;
  grid-template-columns: minmax(200px, 1fr) 1fr 100px;
  align-items: center;
  gap: 10px;
}
.iput-container {
  cursor: pointer;
}
.card-body {
  display: flex;
  flex-direction: column;
  gap: 10px;
}
</style>
