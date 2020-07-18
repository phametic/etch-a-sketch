let board = document.getElementById("board");

let resetBtn = document.getElementById("resetButton");
let rgbBtn = document.getElementById("rgbButton");
let shadowBtn = document.getElementById("shadowButton");
let blackBtn = document.getElementById("blackButton");
let gridBtn = document.getElementById("gridButton");

let rgbClicked = false, shadowClicked = false, blackClicked = true;
let transparency = 0;

let tileBlocks = document.getElementsByClassName("tile");
let userInput = 16;

let tile = [];

function grid(size) {
  tile = [];
  board.style.setProperty('--grid-rows', size);
  board.style.setProperty('--grid-cols', size);
  for(let i = 0; i < size * size; i++) {
    tile[i] = document.createElement("div");
    tile[i].className = "tile";
    tile[i].style.setProperty('--tileWidth', (960 / size) + "px");
    tile[i].style.setProperty('--tileHeight', (960 / size) + "px");
    tile[i].style.background = "white";
    board.appendChild(tile[i]);
    blackButton();
  }
}

grid(16);

resetBtn.addEventListener("click", (event) => {
  while(board.hasChildNodes()) {
    board.removeChild(board.firstChild);
  }
  userInput = prompt("Enter a size.", "16");
  grid(userInput);
});

function getRandomColor() {
  var letters = '0123456789ABCDEF';
  var color = '#';
  for(let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

function rgbButton() {
  for(let i = 0; i < tile.length; i++) {
    tile[i].addEventListener("mouseenter", () => {
      tile[i].style.background = getRandomColor();
    });
  }
}

rgbBtn.addEventListener("click", rgbButton);

function blackButton() {
  for(let i = 0; i < tile.length; i++) {
    tile[i].addEventListener("mouseenter", () => {
      tile[i].style.background = "black";
    });
  }
}
blackBtn.addEventListener("click", blackButton);

function shadowButton() {
  let shadowTile = [];

  for(let i = 0; i < tile.length; i++) {
    shadowTile[i] = 0.1;
  }
  for(let i = 0; i < tile.length; i++) {
    tile[i].addEventListener("mouseenter", () => {
      shadowTile[i] += 0.1;
      if(shadowTile[i] > 1) shadowTile[i] = 1;

      tile[i].style.background = "black";
      tile[i].style.opacity = shadowTile[i];
    });
  }
}
shadowBtn.addEventListener("click", shadowButton);

let gridOn = true;

function gridLines() {
  if(gridOn) {
    for(let i = 0; i < tile.length; i++) {
      tile[i].style.border = "0px solid black";
    } 
    gridOn = !gridOn;
    } else {
      for(let i = 0; i < tile.length; i++) {
        tile[i].style.border = "1px solid black";
      } 
      gridOn = !gridOn;
    }
    
} 

gridBtn.addEventListener("click", gridLines);