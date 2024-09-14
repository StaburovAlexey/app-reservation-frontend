<template>
  <div class="conteiner-test">
    <span>USER: {{ user }}</span>
    <span>USERS LIST:{{ users }}</span>
    <el-form
      ref="formRef"
      :model="form"
      :rules="rules"
      label-width="auto"
      class="form"
      style="padding-top: 20px"
    >
      <el-form-item label="Почта" prop="login">
        <el-input v-model="form.login" />
      </el-form-item>
      <el-form-item label="Пароль" prop="password">
        <el-input v-model="form.password" type="password" />
      </el-form-item>
      <el-form-item label="Роль" prop="role">
        <el-input v-model="form.role" />
      </el-form-item>
      <el-form-item class="form__button-container">
        <el-button class="btn-submit" type="primary" @click="validate">
          Зарегистроировать
        </el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup>
import { reactive, ref, onMounted, computed } from 'vue';
import { registerUser, loginUser, getUsers } from '@/api/index.js';
import { useUserStore } from '@/stores/userStore.js';

// Получаем доступ к состоянию Pinia
const userStore = useUserStore();
const users = ref([]);
const form = reactive({
  login: '',
  password: '',
  role: '',
});
const formRef = ref();
const rules = reactive({
  login: [
    {
      required: true,
      message: 'Введите логин',
      trigger: 'blur',
    },
  ],
  password: [
    {
      required: true,
      message: 'Введите пароль',
      trigger: 'change',
    },
  ],
  role: [
    {
      required: true,
      message: 'Введите роль',
      trigger: 'change',
    },
  ],
});
async function fetchUsers() {
  try {
    const response = await getUsers();
    users.value = response;
  } catch (error) {
    console.error('Failed to fetch users:', error);
  }
}
const submitForm = async (form) => {
  try {
    const response = await registerUser(form.login, form.password, form.role);
    users.value.push(response);
    // Логика после успешного логина
  } catch (error) {
    console.error('Login failed:', error);
  }
};
const validate = async () => {
  formRef.value.validate((valid) => {
    if (valid) {
      submitForm(form);
    }
  });
};
const user = computed(() => userStore.user);
console.log('user в test', user);
onMounted(() => {
  fetchUsers();
});
</script>

<style scoped>
.conteiner-test {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.form {
  min-width: 300px;
  width: 40%;
}

.btn-submit {
  width: 100%;
}
</style>
