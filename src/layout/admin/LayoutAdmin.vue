<template>
  <div class="layout-container">
    <Header @clickBurger="openSidebar = !openSidebar"></Header>
    <SideBar :openSidebar></SideBar>
    <Main :openSidebar></Main>
  </div>
</template>

<script>
import { reactive, ref } from 'vue';
import Header from '@/layout/admin/component/Header.vue';
import SideBar from './component/SideBar.vue';
import Main from '@/layout/admin/component/Main.vue';
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
.layout-container {
  width: 100%;
  height: calc(100% - 50px);
  position: relative;
  padding-top: 50px;
  display: flex;
  flex-direction: row;
  overflow: hidden;
}
</style>
