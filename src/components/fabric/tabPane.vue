<template>
  <div class="tab-pane">
    <div class="menu-canvas">
      <div>
        <span>Ширина сетки</span>
        <el-slider
          v-model="widthGrid"
          :step="10"
          :min="10"
          show-stops
          size="small"
        />
      </div>
      <el-checkbox v-model="showGrid">Показать сетку</el-checkbox>
      <el-button @click="openDialogCreate" type="primary">
        Создать фигуру
      </el-button>
      <el-form-item label="Выбрать цвет фона">
        <el-color-picker
          v-model="backgroundColor"
          @change="backgroundColorChange"
        />
      </el-form-item>
      <el-button type="primary">Кнопка 2</el-button>
      <el-button type="primary">Кнопка 3</el-button>
      <el-button type="primary">Кнопка 4</el-button>
      <el-button type="primary">Кнопка 5</el-button>
      <el-button type="warning">Сохранить</el-button>
    </div>
    <canvas
      ref="canvasRef"
      width="320px"
      height="600px"
      style="border: 1px solid rebeccapurple"
    ></canvas>
    <create-figure-dialog
      :open="openDialogCreateFigure"
      @close="openDialogCreateFigure = false"
      @save="createFigure"
    />
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue';
import { Canvas, Rect, Circle, Triangle, Text, Line, Group } from 'fabric';
import CreateFigureDialog from '../dialog/CreateFigureDialog.vue';
const canvasRef = ref(null);
const widthGrid = ref(30);
const showGrid = ref(true); // State for showing/hiding the grid
const openDialogCreateFigure = ref(false);
const canvas = ref(null); // Store the canvas instance
const backgroundColor = ref('#f0f0f0');

const drawGrid = (gridSize) => {
  // Remove old grid lines
  const gridLines = canvas.value
    .getObjects()
    .filter((obj) => obj.type === 'line');
  canvas.value.remove(...gridLines); // Remove grid lines

  if (showGrid.value) {
    // Check if grid should be drawn
    // Draw vertical lines
    for (let i = 0; i < canvas.value.width / gridSize; i++) {
      const line = new Line(
        [i * gridSize, 0, i * gridSize, canvas.value.height],
        {
          stroke: '#ccc',
          selectable: false,
          evented: false,
        },
      );
      canvas.value.add(line);
    }

    // Draw horizontal lines
    for (let i = 0; i < canvas.value.height / gridSize; i++) {
      const line = new Line(
        [0, i * gridSize, canvas.value.width, i * gridSize],
        {
          stroke: '#ccc',
          selectable: false,
          evented: false,
        },
      );
      canvas.value.add(line);
    }
  }

  canvas.value.renderAll(); // Redraw the canvas
};
const createFigure = (value) => {
  console.log(value);
  let figure = null;
  switch (value.figure) {
    case 'Rect':
      figure = new Rect({
        width: 130,
        height: 130,
        fill: value.color,
        selectable: true,
        evented: true,
      });
      break;
    case 'Circle':
      console.log('круг');
      figure = new Circle({
        radius: 65,
        fill: value.color,
        selectable: true,
        evented: true,
      });
      break;
    case 'Triangle':
      figure = new Triangle({
        width: 130,
        height: 130,
        fill: value.color, // Устанавливаем цвет заливки
        selectable: true,
        evented: true,
      });
      break;
  }
  const text = new Text(value.value, {
    left: figure.left + figure.width / 2,
    top: figure.top + figure.height / 2,
    fontSize: 36,
    fill: '#ffffff',
    originX: 'center',
    originY: 'center',
    selectable: true,
    evented: true,
  });
  const group = new Group([figure, text], {
    left: 10,
    top: 10,
    selectable: true,
    evented: true,
  });
  canvas.value.add(group);
  canvas.value.setActiveObject(group); // Активируем группу
  canvas.value.requestRenderAll();
};
onMounted(() => {
  canvas.value = new Canvas(canvasRef.value);
  canvas.value.backgroundColor = backgroundColor.value; // Укажите нужный цвет фона
  drawGrid(widthGrid.value); // Initial grid draw

  // Example of adding an object to the canvas
  const rect = new Rect({
    left: 100,
    top: 100,
    fill: 'blue',
    width: 110,
    height: 110,
  });
  const rect2 = new Rect({
    left: 0,
    top: 0,
    fill: 'blue',
    width: 50,
    height: 50,
  });
  canvas.value.add(rect);
  canvas.value.add(rect2);
});

watch([widthGrid, showGrid], () => {
  drawGrid(widthGrid.value); // Redraw the grid with new width
  canvas.value.renderAll(); // Redraw the canvas after adding a new object
});
const backgroundColorChange = () => {
  canvas.value.backgroundColor = backgroundColor.value;
  canvas.value.renderAll();
};
const openDialogCreate = () => {
  openDialogCreateFigure.value = true;
};
</script>

<style lang="css" scoped>
.container-canvas {
  width: 100%;
  display: flex;
  justify-content: space-around;
}
.menu-canvas {
  height: 100%;
  width: 200px;
  display: flex;
  flex-direction: column;
  gap: 10px;
}
.el-button + .el-button {
  margin-left: 0;
}
.tab-pane {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-around;
}
</style>
