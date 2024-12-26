let previousMouseX;
let previousMouseY;
let canvas;
let selectArea;

let selectMode;
let editMode;
let currentShape = [];
let selectedPixels;

let currentColor;
let strokeWeightValue;

function setup() {
  canvas = createCanvas(800, 800);
  background(200);
  noFill();
  stroke(0);
  
  selectMode = 0;
  editMode = 0;
  selectArea = {x: 0, y: 0, w: 100, h: 100};
  
  createButtons();

  currentColor = color(0);
  strokeWeightValue = 2;
}

function createButtons() {
  let selectButton = createButton('Select area');
  let clearButton = createButton('Clear');
  let editButton = createButton('Create Shape');
  let colorPicker = createColorPicker('#000000');
  let strokeSlider = createSlider(1, 10, 2);
  
  selectButton.mousePressed(() => {
    switch (selectMode) {
      case 0:
        selectMode += 1;
        selectButton.html('Cut');
        break;
      case 1:
        selectMode += 1;
        selectButton.html('End Paste');
        selectedPixels = get(selectArea.x, selectArea.y, selectArea.w, selectArea.h);
        fill(200);
        noStroke();
        rect(selectArea.x, selectArea.y, selectArea.w, selectArea.h);
        break;
      case 2:
        selectMode = 0;
        selectButton.html('Select Area');
        previousMouseX = -1; 
        previousMouseY = -1;
        selectArea = {x: 0, y: 0, w: 100, h: 100};
        break;
    }
  });

  clearButton.mousePressed(() => {
    background(200);
    previousMouseX = -1; 
    previousMouseY = -1;
    currentShape = [];
  });

  editButton.mousePressed(() => {
    switch (editMode) {
      case 0:
        editMode = 1;
        editButton.html("Edit Vertices");
        break;
      case 1:
        editMode = 2;
        editButton.html("Finish Shape");
        break;
      case 2:
        editMode = 0;
        editButton.html('Create Shape');
        currentShape = [];
        break;
    }
  });

  colorPicker.input(() => {
    currentColor = colorPicker.color();
  });

  strokeSlider.input(() => {
    strokeWeightValue = strokeSlider.value();
  });
}

function draw() {
  if (mouseIsPressed) {
    switch (selectMode) {
      case 0:
        if (mousePressOnCanvas(canvas)) {
          if (previousMouseX === -1) {
            previousMouseX = mouseX;
            previousMouseY = mouseY;
          } else {
            loadPixels();
            stroke(currentColor);
            strokeWeight(strokeWeightValue);
            line(previousMouseX, previousMouseY, mouseX, mouseY);
            previousMouseX = mouseX;
            previousMouseY = mouseY;
          }
        }
        break;
      case 1:
        updatePixels();
        noStroke();
        fill(255, 0, 0, 100);
        rect(selectArea.x, selectArea.y, selectArea.w, selectArea.h);
        break;
    }
  }

  if (editMode > 0) {
    updatePixels();
    if (editMode === 2 && mousePressOnCanvas(canvas)) {
      loadPixels();
      for (let i = 0; i < currentShape.length; i++) {
        if (dist(currentShape[i].x, currentShape[i].y, mouseX, mouseY) < 15) {
          currentShape[i].x = mouseX;
          currentShape[i].y = mouseY;
        }
      }
    }
    beginShape();
    for (let i = 0; i < currentShape.length; i++) {
      vertex(currentShape[i].x, currentShape[i].y);
      if (editMode === 2) {
        fill('red');
        ellipse(currentShape[i].x, currentShape[i].y, 10, 10);
      }
    }
    endShape();
  }
}

function mousePressed() {
  switch (selectMode) {
    case 0:
      previousMouseX = -1; 
      previousMouseY = -1;
      break;
    case 1:
      selectArea.x = mouseX;
      selectArea.y = mouseY;
      break;
    case 2:
      image(selectedPixels, mouseX, mouseY);
      break;
  }
}

function mouseDragged() {
  if (selectMode === 1) {
    let width = mouseX - selectArea.x;
    let height = mouseY - selectArea.y;

    selectArea.w = width;
    selectArea.h = height;
  }
}

function mousePressOnCanvas(canvas) {
  return mouseX >= 0 && mouseX <= canvas.width && mouseY >= 0 && mouseY <= canvas.height;
}