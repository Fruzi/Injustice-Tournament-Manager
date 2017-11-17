var level = -1;
var bgArt = new Array(2);
var characterArt1 = new Array(50);
var characterArt2 = new Array(50);
var canvas;
var resetButton;
var modeButtons = new Array(3);

function preload() {
  for (var i = 0; i < bgArt.length; i++) {
    bgArt[i] = loadImage('assets/bg/bg' + i + '.jpg');
  }
  // for (var i = 0; i < 50; i++) {
  //   characterArt[i] = loadImage('assets/characters/character' + i + '.jpg');
  // }
}

function setup() {
  canvas = createCanvas(1280 * 0.7, 720 * 0.7);
  imageMode(CORNER);
  createButtons();
}

function draw() {
  if (level == -1) { // select mode
    background(bgArt[0]);
    displayModeButtons();
  } else if (level < 100) { //game modes
    background(bgArt[1]);
  } else { //fight
    background(bgArt[2]);
  }
}

function createButtons() {
  resetButton = createButton('RESET');
  resetButton.mousePressed(reset);
  resetButton.position(10, height - 15);
  modeButtons[0] = new modeButton(600, 100, 0, "3v3 Draft");
  modeButtons[1] = new modeButton(600, 200, 1, "5v5 Draft");
  modeButtons[2] = new modeButton(600, 300, 2, "3v3 All Random");
}

function displayModeButtons() {
  for (var i = 0; i < modeButtons.length; i++) {
    modeButtons[i].show();
  }
}

function mousePressed() {
  for (var i = 0; i < modeButtons.length; i++) {
    if (modeButtons[i].contains(mouseX, mouseY)) {
      level = modeButtons[i].mode;
      break;
    }
  }
}

function reset() {
  level = -1;
}
