const DEFAULT_SIZE = 16;

const yearSpan = document.getElementById('year');
const grid = document.getElementById('grid');

function setupGrid(size) {
  grid.style.gridTemplateColumns = `repeat(${size}, 1fr)`;
  grid.style.gridTemplateRows = `repeat(${size}, 1fr)`;

  for (let i = 0; i < size * size; i++) {
    const cell = document.createElement('div');
    cell.classList.add('grid-element');
    grid.appendChild(cell);
  }
}

window.onload = () => {
  setupGrid(DEFAULT_SIZE);
  yearSpan.textContent = new Date().getFullYear();
};