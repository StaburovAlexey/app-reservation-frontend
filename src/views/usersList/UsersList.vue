<template>
  <CustomCard>
    <template #body>
      <el-table :data="tableData" style="width: 100%">
        <el-table-column type="expand">
          <template #default="props">
            <div m="6">
              <p m="t-0 b-2">State: {{ props.row.state }}</p>
              <p m="t-0 b-2">City: {{ props.row.city }}</p>
              <p m="t-0 b-2">Address: {{ props.row.address }}</p>
              <p m="t-0 b-2">Zip: {{ props.row.zip }}</p>
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="login" label="Почта" />
        <el-table-column prop="role" label="Роль" />
        <el-table-column prop="_id" label="ID" />
        <el-table-column fixed="right" width="100">
          <template #header>
            <div class="btn-container__table-header">
              <el-button
                type="primary"
                size="small"
                @click="dialogVisible = true"
              >
                Добавить
              </el-button>
            </div>
          </template>
          <template #default="scope">
            <div class="btn-container__table-row">
              <el-button size="small" class="table-btn">
                <el-icon><EditPen /></el-icon>
              </el-button>
              <el-button size="small" class="table-btn">
                <el-icon><Delete /></el-icon>
              </el-button>
            </div>
          </template>
        </el-table-column>
      </el-table>
    </template>
  </CustomCard>
  <CustomDialog v-model:open="dialogVisible" @close="dialogVisible = false" title="Диалоговое окно"/>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import CustomCard from '@/components/custom-element/CustomCard.vue';
import CustomDialog from '@/components/custom-element/CustomDialog.vue';
import { getUsers } from '@/api/index.js';

const tableData = ref([]);
const dialogVisible = ref(false);
onMounted(() => {
  getUsers().then((res) => {
    tableData.value = res;
    console.log(res);
  });
});
</script>

<style scoped></style>
