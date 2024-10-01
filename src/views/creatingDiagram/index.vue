<template>
  <custom-card :header="false">
    <template #body>
      <fabric></fabric>
    </template>
  </custom-card>
</template>

<script setup>
import fabric from '@/components/fabric/fabric.vue';
import CustomCard from '@/components/custom-element/CustomCard.vue';
</script>

<style lang="css" scoped></style>
