const DEFAULT_COLOR = '#3a3a3a';
const DEFAULT_MODE = 'color';
const DEFAULT_SIZE = 16;

let currentColor = DEFAULT_COLOR;
let currentMode = DEFAULT_MODE;
let currentSize = DEFAULT_SIZE;
let isDrawing = false;

const colorPicker = document.getElementById('colorPicker');
const colorBtn = document.getElementById('colorBtn');
const rainbowBtn = document.getElementById('rainbowBtn');
const eraserBtn = document.getElementById('eraserBtn');
const clearBtn = document.getElementById('clearBtn');
const sizeValue = document.getElementById('sizeValue');
const sizeSlider = document.getElementById('sizeSlider');
const grid = document.getElementById('grid');
const yearSpan = document.getElementById('year');

colorPicker.oninput = (e) => setCurrentColor(e.target.value);
colorBtn.onclick = () => setCurrentMode('color');
rainbowBtn.onclick = () => setCurrentMode('rainbow');
eraserBtn.onclick = () => setCurrentMode('eraser');
clearBtn.onclick = () => reloadGrid();
sizeSlider.oninput = (e) => updateSizeValue(e.target.value);
sizeSlider.onchange = (e) => changeSize(e.target.value);

document.addEventListener('pointerdown', (e) => {
  if (!grid.contains(e.target)) return;
  isDrawing = true;
  if (e.target.classList.contains('grid-element')) {
    colorCell(e.target);
  }
});

document.addEventListener('pointerup', () => {
  isDrawing = false;
});

document.addEventListener('pointercancel', () => {
  isDrawing = false;
});

document.addEventListener('pointermove', (e) => {
  if (!isDrawing) return;
  const cell = document.elementFromPoint(e.clientX, e.clientY);
  if (cell && cell.classList.contains('grid-element')) {
    colorCell(cell);
  }
});

function setCurrentColor(newColor) {
  currentColor = newColor;
}

function setCurrentMode(newMode) {
  activateButton(newMode);
  currentMode = newMode;
}

function setCurrentSize(newSize) {
  currentSize = newSize;
}

function updateSizeValue(value) {
  sizeValue.innerHTML = `${value}×${value}`;
}

function changeSize(value) {
  setCurrentSize(value);
  updateSizeValue(value);
  reloadGrid();
}

function reloadGrid() {
  grid.innerHTML = '';
  setupGrid(currentSize);
}

function setupGrid(size) {
  grid.style.gridTemplateColumns = `repeat(${size}, 1fr)`;
  grid.style.gridTemplateRows = `repeat(${size}, 1fr)`;

  for (let i = 0; i < size * size; i++) {
    const cell = document.createElement('div');
    cell.classList.add('grid-element');
    grid.appendChild(cell);
  }
}

function colorCell(cell) {
  if (currentMode === 'rainbow') {
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);
    cell.style.backgroundColor = `rgb(${r}, ${g}, ${b})`;
  } else if (currentMode === 'color') {
    cell.style.backgroundColor = currentColor;
  } else if (currentMode === 'eraser') {
    cell.style.backgroundColor = '';
  }
}

function activateButton(newMode) {
  colorBtn.classList.remove('active');
  rainbowBtn.classList.remove('active');
  eraserBtn.classList.remove('active');

  if (newMode === 'color') colorBtn.classList.add('active');
  if (newMode === 'rainbow') rainbowBtn.classList.add('active');
  if (newMode === 'eraser') eraserBtn.classList.add('active');
}

window.onload = () => {
  setupGrid(DEFAULT_SIZE);
  activateButton(DEFAULT_MODE);
  updateSizeValue(DEFAULT_SIZE);
  yearSpan.textContent = new Date().getFullYear();
};