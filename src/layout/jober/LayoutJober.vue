<template>
  <div class="layout-container__jober">
    <Header
      @clickBurger="drawer = !drawer"
      :collapseEnabled="false"
      :jober="true"
    ></Header>
    <el-drawer v-model="drawer" direction="ltr" :size="250">
      <template class="user-card" #header>
        <div class="block">
          <el-avatar
            :size="40"
            src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
          />
        </div>
        <div class="conteiner-user__info">
          <el-text class="mx-1" size="small">{{ user.login }}</el-text>
        </div>
      </template>
      <SideBar :isJober="true"></SideBar>
    </el-drawer>
    <Main :openSidebar></Main>
  </div>
</template>

<script>
import { reactive, ref } from 'vue';
import Header from '@/layout/component/Header.vue';
import SideBar from '@/layout/component/SideBar.vue';
import Main from '@/layout/component/Main.vue';
import { useUserStore } from '@/stores/userStore.js';
export default {
  components: {
    Header,
    SideBar,
    Main
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

.conteiner-user__info {
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 5px;
}
:deep(.el-drawer__body) {
  padding: 0 !important;
}
:deep(.el-drawer__header) {
  border-right: 1px solid var(--el-menu-border-color);
  margin-bottom: 0;
  padding: 10px 10px 20px 10px;
  gap: 5px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}
:deep(.el-drawer__header > :first-child) {
  flex: 0;
}
:deep(.el-text) {
  max-width: 150px;
  word-wrap: break-word;
}
</style>
