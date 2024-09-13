<template>
  <div class="container-login">
    <el-form
      ref="formRef"
      :model="form"
      :rules="rules"
      label-width="auto"
      class="form"
    >
      <img src="../../assets/vue.svg" alt="Logo" class="logo" />
      <el-form-item label="Почта" prop="mail">
        <el-input v-model="form.mail" />
      </el-form-item>
      <el-form-item label="Пароль" prop="password">
        <el-input v-model="form.password" type="password" />
      </el-form-item>
      <el-form-item class="form__button-container">
        <el-button class="btn-submit" type="primary" @click="validate">
          Войти
        </el-button>
        <router-link
          :to="{
            path: $route.path == '/admin/login' ? '/login' : '/admin/login',
          }"
        >
          Главная
        </router-link>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { reactive, ref } from 'vue';
import { createUser, getUsers, findUser } from '@/db/index.js';
export default {
  setup() {
    const form = reactive({
      mail: '',
      password: '',
    });
    const formRef = ref();
    const rules = reactive({
      mail: [
        {
          required: true,
          message: 'Введите почту',
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
    });
    const submitForm = async (form) => {
      try {
        const user = await findUser(form);
        console.log('User created:', user);
      } catch (error) {
        console.error('Error creating user:', error);
      }
    };
    const validate = async () => {
      formRef.value.validate((valid) => {
        if (valid) {
          submitForm(form);
        }
      });
    };
    return {
      form,
      formRef,
      rules,
      validate,
    };
  },
};
</script>

<style lang="css" scoped>
.container-login {
  width: 100%;
  height: 100%;
  background-color: rgb(5, 1, 20);
  display: flex;
  align-items: center;
  justify-content: center;
}
.form__button-container {
}
.btn-submit {
  width: 100%;
}
.form {
  min-width: 300px;
  width: 40%;
}
.logo {
  display: block;
  width: 60%;
  aspect-ratio: 1/1;
  margin: 0 auto 20px;
  align-items: center;
}
:deep(.el-input__wrapper) {
  background-color: silver;
}
:deep(.el-input__inner) {
  color: black;
}
</style>
