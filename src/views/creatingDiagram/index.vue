<template>
  <CustomCard title="Создание схемы столов">
    <template #body>
      <fabric></fabric>
    </template>
  </CustomCard>
</template>

<script setup>
import fabric from '@/components/fabric/fabric.vue';
import CustomCard from '@/components/custom-element/CustomCard.vue';
</script>

<style lang="css" scoped></style>
