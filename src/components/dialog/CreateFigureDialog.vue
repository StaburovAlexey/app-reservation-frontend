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
          <el-form-item label="Форма">
            <el-select
              v-model="form.figure"
              placeholder="Выбирите форму фигуры"
              @change="addShape"
            >
              <el-option label="Квадрат" value="Rect" />
              <el-option label="Круг" value="Circle" />
              <el-option label="Треугольник" value="Triangle" />
            </el-select>
          </el-form-item>
          <el-form-item label="Цвет">
            <el-color-picker v-model="form.color" @change="updateShapeColor" />
          </el-form-item>
          <el-form-item label="Текст внутри">
            <el-input v-model="form.value" @change="addShape" />
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
import { Canvas, Rect, Triangle, Circle, Text } from 'fabric';
const props = defineProps({
  open: {
    type: Boolean,
    default: false,
    required: true,
  },
});
const emits = defineEmits(['close', 'save']);

const openDialog = ref(false);
const loading = ref(false);
const canvasPrewRef = ref(null);
const form = ref({ figure: 'Rect', color: 'blue', value: '' });
const canvas = ref(null); // Store the canvas instance
const shape = ref(null);
const text = ref(null);

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
  emits('save', form.value);
  form.value = { figure: 'Rect', color: 'blue', value: '' };
  close();
};
const rect = new Rect({
  left: 10,
  top: 10,
  fill: form.value.color,
  width: 130,
  height: 130,
  selectable: false,
  evented: false,
});
const triangle = new Triangle({
  width: 130,
  height: 130,
  fill: form.value.color, // Цвет заливки
  left: 10, // Положение по оси X
  top: 10, // Положение по оси Y
  selectable: false,
  evented: false,
});
const circle = new Circle({
  radius: 65, // Радиус круга
  fill: form.value.color, // Цвет заливки
  left: 10, // Положение по оси X
  top: 10, // Положение по оси Y
  selectable: false,
  evented: false,
});
const initFabric = () => {
  // Создаем новый экземпляр Fabric Canvas
  canvas.value = new Canvas(canvasPrewRef.value);
  addShape();
};
const addShape = () => {
  if (shape.value) {
    canvas.value.remove(shape.value);
  }
  if (text.value) {
    canvas.value.remove(text.value);
  }

  if (form.value.figure == 'Rect') {
    shape.value = rect;
  }
  if (form.value.figure == 'Triangle') {
    shape.value = triangle;
  }
  if (form.value.figure == 'Circle') {
    shape.value = circle;
  }

  // Добавляем новую фигуру на холст
  updateShapeColor();
  canvas.value.add(shape.value);
  // Создаем текстовый объект
  text.value = new Text(form.value.value, {
    left: shape.value.left + shape.value.width / 2,
    top: shape.value.top + shape.value.height / 2,
    fontSize: 36,
    fill: '#ffffff',
    originX: 'center',
    originY: 'center',
    selectable: false,
    evented: false,
  });
  canvas.value.add(text.value); // Добавляем текстовый объект на холст
  canvas.value.requestRenderAll();
};
const updateShapeColor = () => {
  if (shape.value) {
    shape.value.set('fill', form.value.color);
    canvas.value.requestRenderAll();
  }
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
