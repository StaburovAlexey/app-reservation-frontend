<template>
  <div class="container-canvas">
    <canvas
      ref="canvasRef"
      width="320px"
      height="600px"
      style="border: 1px solid rebeccapurple"
    ></canvas>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import { Canvas, Rect, Line } from 'fabric';

export default {
  setup() {
    const canvasRef = ref(null);

    onMounted(async () => {
      const canvas = new Canvas(canvasRef.value);
      // Функция для рисования сетки
      const drawGrid = () => {
        const gridSize = 33; // Размер сетки (например, 50px)

        // Рисуем вертикальные линии
        for (let i = 0; i < canvas.width / gridSize; i++) {
          const line = new Line(
            [i * gridSize, 0, i * gridSize, canvas.height],
            {
              stroke: '#ccc',
              selectable: false, // Сетка не должна быть кликабельной
              evented: false,
            },
          );
          canvas.add(line);
        }

        // Рисуем горизонтальные линии
        for (let i = 0; i < canvas.height / gridSize; i++) {
          const line = new Line([0, i * gridSize, canvas.width, i * gridSize], {
            stroke: '#ccc',
            selectable: false, // Сетка не должна быть кликабельной
            evented: false,
          });
          canvas.add(line);
        }
      };

      // Вызываем функцию для рисования сетки
      drawGrid();
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

    return {
      canvasRef,
    };
  },
};
</script>
<style lang="css" scoped>
.container-canvas {
  width: 100%;
}
</style>
