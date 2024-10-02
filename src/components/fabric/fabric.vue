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
      <!-- Checkbox to show/hide the grid -->
      <el-button type="primary">Кнопка 1</el-button>
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
  </div>
</template>

<script>
import { ref, onMounted, watch } from 'vue';
import { Canvas, Rect, Line } from 'fabric';

export default {
  setup() {
    const canvasRef = ref(null);
    const widthGrid = ref(30);
    const showGrid = ref(true); // State for showing/hiding the grid
    let canvas = null; // Храним экземпляр канваса

    const drawGrid = (gridSize) => {
      // Удаляем старые линии сетки
      const gridLines = canvas
        .getObjects()
        .filter((obj) => obj.type === 'line');
      canvas.remove(...gridLines); // Удаляем линии сетки

      if (showGrid.value) {
        // Проверяем, нужно ли рисовать сетку
        // Рисуем вертикальные линии
        for (let i = 0; i < canvas.width / gridSize; i++) {
          const line = new Line(
            [i * gridSize, 0, i * gridSize, canvas.height],
            {
              stroke: '#ccc',
              selectable: false,
              evented: false,
              type: 'line',
            },
          );
          canvas.add(line);
        }

        // Рисуем горизонтальные линии
        for (let i = 0; i < canvas.height / gridSize; i++) {
          const line = new Line([0, i * gridSize, canvas.width, i * gridSize], {
            stroke: '#ccc',
            selectable: false,
            evented: false,
            type: 'line',
          });
          canvas.add(line);
        }
      }

      canvas.renderAll(); // Перерисовываем холст
    };

    onMounted(() => {
      canvas = new Canvas(canvasRef.value);
      drawGrid(widthGrid.value); // Initial grid draw

      // Пример добавления объекта на холст
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
      drawGrid(widthGrid.value); // Перерисовываем сетку с новой шириной
      canvas.renderAll(); // Перерисовываем холст после добавления нового объекта
    });

    return {
      canvasRef,
      widthGrid,
      showGrid, // Return the showGrid ref
    };
  },
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
