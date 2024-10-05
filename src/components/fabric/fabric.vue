<template>
  <div class="container-canvas">
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
      <el-button @click="openDialogCreate" type="primary">Создать</el-button>
      <el-button type="primary">Кнопка 2</el-button>
      <el-button type="primary">Кнопка 3</el-button>
      <el-button type="primary">Кнопка 4</el-button>
      <el-button type="primary">Кнопка 5</el-button>
      <el-button type="primary">Кнопка 6</el-button>
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
    />
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue';
import { Canvas, Rect, Line } from 'fabric';
import CreateFigureDialog from '../dialog/CreateFigureDialog.vue';
const canvasRef = ref(null);
const widthGrid = ref(30);
const showGrid = ref(true); // State for showing/hiding the grid
const openDialogCreateFigure = ref(false);
let canvas = null; // Store the canvas instance

const drawGrid = (gridSize) => {
  // Remove old grid lines
  const gridLines = canvas.getObjects().filter((obj) => obj.type === 'line');
  canvas.remove(...gridLines); // Remove grid lines

  if (showGrid.value) {
    // Check if grid should be drawn
    // Draw vertical lines
    for (let i = 0; i < canvas.width / gridSize; i++) {
      const line = new Line([i * gridSize, 0, i * gridSize, canvas.height], {
        stroke: '#ccc',
        selectable: false,
        evented: false,
      });
      canvas.add(line);
    }

    // Draw horizontal lines
    for (let i = 0; i < canvas.height / gridSize; i++) {
      const line = new Line([0, i * gridSize, canvas.width, i * gridSize], {
        stroke: '#ccc',
        selectable: false,
        evented: false,
      });
      canvas.add(line);
    }
  }

  canvas.renderAll(); // Redraw the canvas
};

onMounted(() => {
  canvas = new Canvas(canvasRef.value);
  drawGrid(widthGrid.value); // Initial grid draw

  // Example of adding an object to the canvas
  const rect = new Rect({
    left: 100,
    top: 100,
    fill: 'blue',
    width: 110,
    height: 110,
  });

  canvas.add(rect);
});

watch([widthGrid, showGrid], () => {
  drawGrid(widthGrid.value); // Redraw the grid with new width
  canvas.renderAll(); // Redraw the canvas after adding a new object
});

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
}
.el-button + .el-button {
  margin-left: 0;
}
</style>
