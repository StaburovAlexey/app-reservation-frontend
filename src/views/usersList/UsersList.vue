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
        <el-table-column prop="login" label="Почта" width="180" />
        <el-table-column prop="role" label="Роль" width="180" />
        <el-table-column prop="_id" label="ID в системе" />
      </el-table>
    </template>
  </CustomCard>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import CustomCard from '@/components/custom-element/CustomCard.vue';
import { getUsers } from '@/api/index.js';

const tableData = ref([]);
onMounted(() => {
  getUsers().then((res) => {
    tableData.value = res;
    console.log(res);
  });
});
</script>

<style scoped></style>
