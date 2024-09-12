<template>
  <div class="layout-container__jober">
    <Header :collapseEnabled="false"></Header>
  </div>
</template>

<script>
import Header from '@/layout/component/Header.vue';
export default {
  components: {
    Header,
  },
  setup() {
    return {};
  },
};
</script>

<style scoped>
.layout-container__admin {
  width: 100%;
  height: 100%;
  background-color: var(--el-backgroud-color-base);
}
</style>
