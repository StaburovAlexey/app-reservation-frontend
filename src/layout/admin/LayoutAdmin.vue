<template>
  <div class="layout-container">
    <Header></Header>
    <SideBar></SideBar>
  </div>
</template>

<script>
import Header from '@/layout/admin/component/Header.vue';
import SideBar from './component/SideBar.vue';
export default {
  components: {
    Header,
    SideBar,
  },

  setup() {
    return {};
  },
};
</script>

<style scoped>
.layout-container {
  width: 100%;
  height: 100%;
  position: relative;
  padding-top: 60px;
}
</style>
