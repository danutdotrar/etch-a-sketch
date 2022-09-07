// set a default grid size
// set to change color of one grid on click
// set the reset button to delete all colors
// set the eraser to erase a grid on click

// Set the default grid size, color and mode
const defaultSize = 16;
const defaultColor = '#000000';
const defaultMode = 'color'

// Set the current size, color and mode
let currentSize = defaultSize;
let currentColor = defaultColor;
let currentMode = defaultMode;

const grid = document.querySelector('.grid')
const slider = document.querySelector('.slider')
const sizeValue = document.querySelector('.size-value')
const erase = document.querySelector('.erase')
const reset = document.querySelector('.reset')
const multi = document.querySelector('.multi')
const color = document.querySelector('.color')
const colorPick = document.querySelector('.colorPick')


erase.onclick = () => setCurrentMode('erase');
multi.onclick = () => setCurrentMode('multi');
color.onclick = () => setCurrentMode('color');
reset.onclick = () => resetDefault();

// Set the color pick to user's choice
colorPick.oninput = (e) => setCurrentColor(e.target.value);
colorPick.onclick = () => setCurrentMode('color');

// Color when you hold click
let mouseDown = false
document.body.onmousedown = () => (mouseDown = true)
document.body.onmouseup = () => (mouseDown = false)



// Set the current color
function setCurrentColor(newColor) {
    currentColor = newColor
};

// Set the current mode
function setCurrentMode(newMode) {
    currentMode = newMode
};

// Create a function for building the grid
function setupGrid(size) {
    grid.style.gridTemplateColumns = `repeat(${size}, 1fr)`;
    grid.style.gridTemplateRows = `repeat(${size}, 1fr)`;

    for (let i = 0; i < size * size; i++) {
        const gridElement = document.createElement("div");
        gridElement.classList.add("grid-element");
        // Change color on click and on drag
        gridElement.addEventListener('mouseover', changeColor)
        gridElement.addEventListener('mousedown', changeColor)
        grid.appendChild(gridElement);
    }
};

// Function that changes the color
function changeColor(e) {
    // if click and/or hold then
    if (e.type === 'mouseover' && !mouseDown) return
    if (currentMode === 'color') {
        e.target.style.backgroundColor = currentColor
    } else if (currentMode === 'erase') {
        e.target.style.backgroundColor = '#FEFEFE'
    } else if (currentMode === 'multi') {
        const randomR = Math.floor(Math.random() * 256)
        const randomG = Math.floor(Math.random() * 256)
        const randomB = Math.floor(Math.random() * 256)
        e.target.style.backgroundColor = `rgb(${randomR}, ${randomG}, ${randomB})`
    }
}



// Create a function that updates the text values from slider 
function updateSizeValue(value) {
    sizeValue.innerHTML = `${value} x ${value}`
}

// Create a function that updates the currentSize
function setCurrentSize(newSize) {
    currentSize = newSize
};

// Create a function that changes the grid based on value of slider
// This function sets the current size to the current value of the slider,
// and reloads the grid 
function changeSize(value) {
    setCurrentSize(value)
    updateSizeValue(value)
    reloadGrid();
};

// Create a function that clears the old grid and update the new grid with currentSize
function reloadGrid() {
    clearGrid()
    setupGrid(currentSize)
};



// Create a function that clears the grid
function clearGrid() {
    grid.innerHTML = '';
}

// Reset function, restore all to default
function resetDefault() {
    clearGrid();
    setupGrid(defaultSize);
    updateSizeValue(defaultSize);
    setCurrentColor(defaultColor);
    setCurrentMode(defaultMode);
   colorPick.value = defaultColor;
    // Set the slider back to its original position
    slider.value = defaultSize;
};

// Update the value of the slider and the text
slider.onmousemove = (e) => updateSizeValue(e.target.value)
slider.onchange = (e) => changeSize(e.target.value)

window.onload = () => {
    setupGrid(defaultSize)
}