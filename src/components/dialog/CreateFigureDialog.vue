<template>
  <CustomDialog
    title="Создать фигуру"
    width="50%"
    :open="openDialog"
    @close="close"
    @confirm="saveModal"
    v-loading="loading"
  >
    <template #body>
      <div class="conteiner_dialog">
        <el-form
          :model="form"
          label-width="auto"
          label-position="top"
          style="width: 100%"
        >
          <el-form-item label="Activity name">
            <el-input v-model="form.name" />
          </el-form-item>
        </el-form>
        <canvas
          ref="canvasPrewRef"
          class="prewiew"
          width="150px"
          height="150px"
          style="border: 1px solid rebeccapurple"
        ></canvas>
      </div>
    </template>
  </CustomDialog>
</template>

<script setup>
import CustomDialog from '../custom-element/CustomDialog.vue';
import { ref, watch, onMounted, nextTick } from 'vue';
import { Canvas, Rect, Triangle, Circle } from 'fabric';
const props = defineProps({
  open: {
    type: Boolean,
    default: false,
    required: true,
  },
});
const emits = defineEmits(['close']);

const openDialog = ref(false);
const loading = ref(false);
const canvasPrewRef = ref(null);
const form = ref({ name: '' });
let canvas = null; // Store the canvas instance

onMounted(() => {
  // Optional: You can do additional setup here if needed
});

watch(
  () => props.open,
  async (newVal) => {
    openDialog.value = newVal;
    if (newVal === true) {
      await nextTick(); // Ensure the DOM updates before initializing the canvas
      initFabric(); // Initialize the canvas
    }
  },
);

const close = () => {
  emits('close');
};

const saveModal = () => {
  // Save modal logic
};
const rect = new Rect({
  left: 10,
  top: 10,
  fill: 'blue',
  width: 130,
  height: 130,
  selectable: false,
  evented: false,
});
const triangle = new Triangle({
  width: 130,
  height: 130,
  fill: 'green', // Цвет заливки
  left: 10, // Положение по оси X
  top: 10, // Положение по оси Y
  selectable: false,
  evented: false,
});
const circle = new Circle({
  radius: 65, // Радиус круга
  fill: 'red', // Цвет заливки
  left: 10, // Положение по оси X
  top: 10, // Положение по оси Y
  selectable: false,
  evented: false,
});
const initFabric = () => {
  canvas = new Canvas(canvasPrewRef.value);

  canvas.add(rect); // Add the rectangle to the canvas
};
</script>

<style scoped>
.conteiner_dialog {
  display: grid;
  width: 100%;
  grid-template-columns: 1fr 0.5fr;
  gap: 10px;
  justify-items: center; /* Центрирование всех элементов по горизонтали */
  align-items: center; /* Центрирование всех элементов по вертикали */
}
</style>
