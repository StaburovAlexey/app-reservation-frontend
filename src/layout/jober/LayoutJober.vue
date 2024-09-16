<template>
  <div class="layout-container__jober">
    <Header
      @clickBurger="drawer = !drawer"
      :collapseEnabled="false"
      :jober="true"
    ></Header>
    <el-drawer v-model="drawer" direction="ltr" :size="250">
      <template class="user-card" #header>
        <el-icon><User /></el-icon>
        <span>
          Login:{{ user.login }} Role: {{ user.role }} Id:{{ user._id }}
        </span>
      </template>
      <SideBar :isJober="true"></SideBar>
    </el-drawer>
  </div>
</template>

<script>
import { reactive, ref } from 'vue';
import Header from '@/layout/component/Header.vue';
import SideBar from '@/layout/component/SideBar.vue';
import { useUserStore } from '@/stores/userStore.js';
export default {
  components: {
    Header,
    SideBar,
  },
  setup() {
    const drawer = ref(false);
    const userStore = useUserStore();
    const user = userStore.user;
    return { drawer, user };
  },
};
</script>

<style scoped>
.layout-container__jober {
  width: 100%;
  height: calc(100% - 50px);
  position: relative;
  padding-top: 50px;
  background-color: var(--el-backgroud-color-base);
  display: flex;
  flex-direction: row;
  overflow: hidden;
}
.user-card {
  height: 50px;
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 5px;
  gap: 10px;
  box-sizing: border-box;
}
:deep(.el-drawer__body) {
  padding: 0 !important;
}
:deep(.el-drawer__header) {
  border-right: 1px solid var(--el-menu-border-color);
  margin-bottom: 0;
  padding-bottom: 20px;
}
</style>
