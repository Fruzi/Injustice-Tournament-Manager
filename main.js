var MAX_CHARACTER_THUMBART = 19
var level = -1;
var bgArt = new Array(2);
var characterArt = new Array(MAX_CHARACTER_THUMBART*2);
var characterRow1;
var characterRow2;
var canvas;
var resetButton;
var modeButtons = new Array(3);

function preload() {
  for (var i = 0; i < bgArt.length; i++) {
    bgArt[i] = loadImage('assets/bg/bg' + i + '.jpg');
  }
  characterRow1 = new characterRow(MAX_CHARACTER_THUMBART, 60, 0)
  characterRow2 = new characterRow(MAX_CHARACTER_THUMBART ,60 ,60)
  var path;
  for (var i = 0; i < 10; i++) {
    if(i<=18){
      path = 'assets/characters/character' + '_a' + i + '.jpg';
    }
    else{
        path = 'assets/characters/character' + '_b' + i-19 + '.jpg';
    }
     characterArt[i] = loadImage(path,console.log("success image " +i),console.log("fail image " + i)/*loadImage('assets/characters/locked_character.js')*/);
  }
}

function setup() {
  canvas = createCanvas(1280 * 0.7, 720 * 0.7);
  imageMode(CORNER);
  createModeButtons();
}

function draw() {
  if (level == -1) { // select mode
    background(bgArt[0]);
    displayModeButtons();
  } else if (level < 100) { //game modes
    background(bgArt[1]);
    //displayCharacterThumbs();
  } else { //fight
    background(bgArt[2]);
  }
}

function createModeButtons() {
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
      createImage
      break;
    }
  }
}

function displayCharacterThumbs() {
    characterRow1.show();
    characterRow2.show()
}

function reset() {
  level = -1;
}
