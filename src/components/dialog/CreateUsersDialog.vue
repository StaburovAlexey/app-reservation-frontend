<template>
  <CustomDialog
    title="Создать пользователя"
    width="50%"
    :open="openDialog"
    @close="close"
    @confirm="saveModal"
    v-loading="loading"
  >
    <template #body>
      <el-form
        ref="refForm"
        :rules="rules"
        :model="form"
        :inline-message="true"
        label-width="auto"
        style="max-width: 600px"
      >
        <el-form-item label="Логин" prop="login">
          <el-input v-model="form.login" clearable />
        </el-form-item>
        <el-form-item label="Пароль" prop="password">
          <el-input v-model="form.password" clearable />
        </el-form-item>
        <el-form-item label="Роль" prop="role">
          <el-select v-model="form.role" placeholder="Выбирите роль из списка">
            <el-option
              v-for="(role, index) in roles"
              :key="role"
              :label="role == 'admin' ? 'Администратор' : 'Официант'"
              :value="role"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="Имя и фамилия" prop="name">
          <el-input v-model="form.name" clearable />
        </el-form-item>
      </el-form>
    </template>
  </CustomDialog>
</template>

<script setup>
import CustomDialog from '../custom-element/CustomDialog.vue';
import { registerUser } from '@/api/index.js';
import { ref, watch, getCurrentInstance } from 'vue';
const props = defineProps({
  open: {
    type: Boolean,
    default: false,
    required: true,
  },
});
const emits = defineEmits(['close']);
const openDialog = ref(false);
const form = ref({
  login: '',
  password: '',
  role: '',
  name: '',
});
const refForm = ref(null);
const loading = ref(false);
const validatePassword = (rule, value, callback) => {
  const uppercasePattern = /[A-Z]/;
  const numberPattern = /\d/;
  const specialCharPattern = /[!@#$%^&*(),.?":{}|<>]/;

  let errorMessages = [];

  if (!value) {
    callback(new Error('Пожалуйста, введите пароль'));
    return;
  }

  if (!uppercasePattern.test(value)) {
    errorMessages.push('хотя бы одну заглавную букву');
  }
  if (!numberPattern.test(value)) {
    errorMessages.push('хотя бы одну цифру');
  }
  if (!specialCharPattern.test(value)) {
    errorMessages.push('хотя бы один специальный символ');
  }

  if (errorMessages.length > 0) {
    callback(new Error(`Пароль должен содержать ${errorMessages.join(', ')}`));
  } else {
    callback(); // Валидация успешна
  }
};
const rules = ref({
  login: [
    {
      required: true,
      message: 'Поле обязательно для заполнения',
      trigger: 'blur',
    },
  ],
  password: [
    { required: true, message: 'Пароль обязателен', trigger: 'blur' },
    { validator: validatePassword, trigger: 'blur' },
  ],
  role: [
    {
      required: true,
      message: 'Поле обязательно для заполнения',
      trigger: 'blur',
    },
  ],
  name: [
    {
      required: true,
      message: 'Поле обязательно для заполнения',
      trigger: 'blur',
    },
  ],
});
const roles = ref(['admin', 'jober']);

const saveModal = () => {
  loading.value = true;
  refForm.value.validate(async (valid) => {
    if (valid) {
      // Логика отправки данных на сервер
      const res = await registerUser(form.value).then((res) => {
        emits('close');
        form.value = {};
      });
    }
  });
  loading.value = false;
};
const close = () => {
  emits('close');
};
// Отслеживание изменений пропса open и синхронизация с openDialog
watch(
  () => props.open,
  (newVal) => {
    openDialog.value = newVal;
  },
);
</script>

<style lang="scss" scoped></style>
