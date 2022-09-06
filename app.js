// set a default grid size
// set to change color of one grid on click
// set the reset button to delete all colors
// set the eraser to erase a grid on click

const grid = document.querySelector('.grid')
const black = document.querySelector('.black')

function makeRows(rows, cols){
    grid.style.setProperty('--grid-rows', rows);
    grid.style.setProperty('--grid-cols', cols);

    for (c = 0; c < (rows * cols); c++) {
        let cell = document.createElement("div");
        // cell.innerText = (c + 1);
        grid.appendChild(cell).className = "grid-item"
    };
};

makeRows(16, 16);




