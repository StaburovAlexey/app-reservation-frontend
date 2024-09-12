<template>
  <div class="layout-container__admin">
    <Header @clickBurger="openSidebar = !openSidebar"></Header>
    <SideBar :openSidebar></SideBar>
    <Main :openSidebar></Main>
  </div>
</template>

<script>
import { reactive, ref } from 'vue';
import Header from '@/layout/component/Header.vue';
import SideBar from '@/layout/component/SideBar.vue';
import Main from '@/layout/component/Main.vue';
export default {
  components: {
    Header,
    SideBar,
    Main,
  },

  setup() {
    const openSidebar = ref(false);
    return { openSidebar };
  },
};
</script>

<style scoped>
.layout-container__admin {
  width: 100%;
  height: calc(100% - 50px);
  position: relative;
  padding-top: 50px;
  background-color: var(--el-backgroud-color-base);
  display: flex;
  flex-direction: row;
  overflow: hidden;
}
</style>
