<template>
  <CustomCard title="Список пользователей">
    <template #body>
      <el-table
        :data="tableData"
        style="width: 100%; height: 500px"
        empty-text="Нет данных"
      >
        <el-table-column type="expand">
          <template #default="props">
            <div m="6">
              <p m="t-0 b-2">Имя: {{ props.row.name }}</p>
              <p m="t-0 b-2">Почта: {{ props.row.login }}</p>
              <p m="t-0 b-2">Пароль: {{ props.row.password }}</p>
              <p m="t-0 b-2">ID Телеграмм: {{ props.row.tg }}</p>
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="name" label="Фио" />
        <el-table-column prop="role" label="Роль" />
        <el-table-column prop="_id" label="ID" />
        <el-table-column fixed="right" width="100">
          <template #header>
            <div class="btn-container__table-header">
              <el-button type="primary" size="small" @click="openDialogAddUser">
                Добавить
              </el-button>
            </div>
          </template>
          <template #default="scope">
            <div class="btn-container__table-row">
              <CustomTooltip content="Редактировать">
                <el-button
                  size="small"
                  class="table-btn"
                  @click="openDialogEditUser(scope.row)"
                >
                  <el-icon><EditPen /></el-icon>
                </el-button>
              </CustomTooltip>
              <CustomPopConfirm @confirm="delUser(scope.$index, scope.row)">
                <CustomTooltip content="Удалить">
                  <el-button size="small" class="table-btn">
                    <el-icon color="red"><Delete /></el-icon>
                  </el-button>
                </CustomTooltip>
              </CustomPopConfirm>
            </div>
          </template>
        </el-table-column>
      </el-table>
    </template>
  </CustomCard>
  <CreateUsersDialog
    :open="dialogVisible"
    :userEdit="rowActive"
    @close="dialogVisible = false"
    @add-user="addUser"
    @edit-user="editUser"
  />
</template>

<script setup>
import { ref, onMounted } from 'vue';
import CustomCard from '@/components/custom-element/CustomCard.vue';
import CreateUsersDialog from '@/components/dialog/CreateUsersDialog.vue';
import CustomTooltip from '@/components/custom-element/CustomTooltip.vue';
import CustomPopConfirm from '@/components/custom-element/CustomPopConfirm.vue';
import { getUsers, deleteUser } from '@/api/index.js';

const tableData = ref([]);
const dialogVisible = ref(false);
const rowActive = ref({});
const delUser = async (index, row) => {
  const res = await deleteUser(row._id, row.login);
  tableData.value.splice(index, 1);
};
const addUser = (user) => {
  tableData.value.unshift(user);
};
const editUser = (user) => {
  rowActive.value = user;
};
const openDialogAddUser = () => {
  rowActive.value = {};
  dialogVisible.value = true;
};
const openDialogEditUser = (row) => {
  rowActive.value = row;
  dialogVisible.value = true;
};
onMounted(() => {
  getUsers().then((res) => {
    tableData.value = res;
  });
});
</script>

<style scoped></style>
