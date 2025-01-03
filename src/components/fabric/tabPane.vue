<template>
  <div class="tab-pane">
    <div class="menu-canvas">
      <label>Имя схемы</label>
      <el-input v-model="nameSchema"></el-input>
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
      <el-button type="primary" @click="saveSVG">Сохранить SVG</el-button>
      <el-button type="primary" @click="loadJson">Загрузить</el-button>
      <el-button type="warning" @click="saveJson">Сохранить</el-button>
    </div>
    <canvas
      ref="canvasRef"
      width="320px"
      height="600px"
      style="border: 1px solid rebeccapurple"
    ></canvas>
    <teleport to="body">
      <div
        v-if="isContextMenuVisible"
        :style="{
          top: `${contextMenuPosition.y}px`,
          left: `${contextMenuPosition.x}px`,
        }"
        class="context-menu"
      >
        <ul>
          <li @click="changeColor">Изменить цвет</li>
          <li @click="deleteShape">Удалить фигуру</li>
          <li @click="copyShape">Копировать фигуру</li>
          <!-- Другие действия -->
        </ul>
      </div>
    </teleport>
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
import { createSchema, editSchema } from '@/api/index.js';
const canvasRef = ref(null);
const nameSchema = ref('');
const widthGrid = ref(30);
const showGrid = ref(false); // State for showing/hiding the grid
const openDialogCreateFigure = ref(false);
const canvas = ref(null); // Store the canvas instance
const backgroundColor = ref('#f0f0f0');
const selectedObject = ref('');
const isContextMenuVisible = ref(false);
const contextMenuPosition = ref({ x: 0, y: 0 });
const json = ref({});
const props = defineProps(['schema']);
const emits = defineEmits(['update']);
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
  canvas.value.backgroundColor = backgroundColor.value;
  // Обработка события нажатия на фигуру
  canvas.value.on('mouse:dblclick', (e) => {
    selectedObject.value = e.target; // Сохраняем выбранный объект
    console.log(selectedObject.value);
    // Позиция меню
    contextMenuPosition.value = {
      x: e.e.clientX,
      y: e.e.clientY,
    };

    isContextMenuVisible.value = true; // Показываем меню
  }); // Укажите нужный цвет фона
  drawGrid(widthGrid.value); // Initial grid draw
  if (props.schema.json) {
    loadJson(props.schema.json);
  }
  nameSchema.value = props.schema.name;
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
const changeColor = () => {
  if (selectedObject.value) {
    if (selectedObject.value.type === 'group') {
      selectedObject.value.item(0).set('fill', 'orange');
    } else {
      selectedObject.value.set('fill', 'orange');
    }

    canvas.value.requestRenderAll();
  }
  isContextMenuVisible.value = false; // Скрываем меню после действия
};

// Действие "Удалить фигуру"
const deleteShape = () => {
  if (selectedObject.value) {
    canvas.value.remove(selectedObject.value);
    selectedObject.value = null;
  }
  isContextMenuVisible.value = false; // Скрываем меню после действия
};
// Действие "Копировать фигуру"
const copyShape = () => {
  if (selectedObject.value) {
    const clonedProps = selectedObject.value.toObject(); // Получение параметров объекта

    let cloned;
    if (selectedObject.value.type === 'rect') {
      cloned = new Rect(clonedProps);
    } else if (selectedObject.value.type === 'circle') {
      cloned = new Circle(clonedProps);
    } else if (selectedObject.value.type === 'triangle') {
      cloned = new Triangle(clonedProps);
    }

    // Смещение копии относительно оригинала
    selectedObject.value.set({
      left: selectedObject.value.left + 20,
      top: selectedObject.value.top + 20,
    });

    canvas.value.add(cloned); // Добавление клонированного объекта на канвас
    canvas.value.requestRenderAll();
  }
  isContextMenuVisible.value = false; // Скрытие меню после действия
};
document.addEventListener('click', () => {
  isContextMenuVisible.value = false;
});

const allObject = () => {
  const allObjects = canvas.value.getObjects();
  const initialPositions = allObjects.map((obj) => ({
    left: obj.left,
    top: obj.top,
  }));
  const activeSelection = new fabric.ActiveSelection(allObjects, {
    canvas: canvas.value,
  });
  canvas.value.setActiveObject(activeSelection);
  canvas.value.discardActiveObject();
  canvas.value.requestRenderAll();
};
const saveJson = () => {
  if (props.schema._id) {
    editJson().then((res) => {
      emits('update');
    });
  } else {
    showGrid.value = false;
    const canvasData = canvas.value.toJSON();
    json.value = JSON.stringify(canvasData);
    createSchema(nameSchema.value, json.value).then((res) => {
      emits('update');
    });
  }
};
const loadJson = async (json) => {
  const canvasData = JSON.parse(json);
  await canvas.value.loadFromJSON(canvasData, () => {
    // Обновление рендеринга после загрузки данных
    canvas.value.renderAll();
    canvas.value.requestRenderAll();
  });
  // allObject();
};
const editJson = () => {
  showGrid.value = false;
  const canvasData = canvas.value.toJSON();
  json.value = JSON.stringify(canvasData);
  editSchema(props.schema._id, nameSchema.value, json.value);
};
const saveSVG = () => {
  const svgData = canvas.value.toSVG({});
  const svgString = svgData; // Вставьте сюда ваш SVG

  // Парсим SVG с помощью DOMParser
  const parser = new DOMParser();
  const svgDoc = parser.parseFromString(svgString, 'image/svg+xml');

  // Находим все группы <g> с текстом
  const groups = svgDoc.querySelectorAll('g');

  // Проходимся по каждой группе <g>
  groups.forEach((group) => {
    const tspan = group.querySelector('tspan'); // Находим <tspan> внутри группы
    const shape = group.querySelector('rect, circle, polygon'); // Находим фигуру внутри группы

    if (tspan && shape) {
      const text = tspan.textContent.trim(); // Извлекаем текст из <tspan>
      shape.setAttribute('id', `figure-${text}`); // Добавляем атрибут id к фигуре
    }
  });

  // Сериализуем модифицированный SVG обратно в строку
  const serializer = new XMLSerializer();
  const updatedSvgString = serializer.serializeToString(svgDoc);
  // Если нужно сохранить как файл
  const blob = new Blob([updatedSvgString], { type: 'image/svg+xml' });
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = 'canvas.svg';
  link.click();
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
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-around;
}
.context-menu {
  position: absolute;
  top: 0;
  left: 0;
  background-color: white;
  border: 1px solid #ccc;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2);
  padding: 5px 0;
  z-index: 10;
}

.context-menu ul {
  list-style: none;
  margin: 0;
  padding: 0;
}

.context-menu ul li {
  padding: 8px 12px;
  cursor: pointer;
}

.context-menu ul li:hover {
  background-color: #eee;
}
</style>
