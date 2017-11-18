var MAX_CHARACTER_THUMBART = 19
var level = -1;
var bgArt = new Array(2);
var characterArt = new Array(MAX_CHARACTER_THUMBART * 2);
var characterRow1;
var characterRow2;
var canvas;
var resetButton;
var modeButtons = new Array(3);
var submitButton;
var eventsCounter = 0;
var submitted = false;

function preload() {
  for (var i = 0; i < bgArt.length; i++) {
    bgArt[i] = loadImage('assets/bg/bg' + i + '.jpg');
  }
  //TODO load buttons art
  characterRow1 = new characterRow(MAX_CHARACTER_THUMBART, 0, 120, 100);
  characterRow2 = new characterRow(MAX_CHARACTER_THUMBART, 19, 120, 170);
}

function setup() {
  canvas = createCanvas(1280 * 0.7, 720 * 0.7);
  imageMode(CORNER);
  createModeButtons();
  for (var i = 0; i < MAX_CHARACTER_THUMBART * 2; i++) {
    characterArt[i] = loadImage('assets/characters/character' + i + '.jpg');
  }
}

function draw() {
  if (level == 100) { //fight mode
    background(bgArt[2]);
    console.log("fightmode");
    updateRules();
  } else if (level == -1) { // select mode
    background(bgArt[0]);
    displayModeButtons();
  } else if (level < 100) { //game modes
    background(bgArt[1]);
    submitButton.show();
    updateRules();
    displayCharacterThumbs();
  }
}

function createModeButtons() {
  resetButton = createButton('RESET');
  resetButton.mousePressed(reset);
  resetButton.position(10, height - 15);
  modeButtons[0] = new modeButton(600, 100, 0, "3v3 Draft");
  modeButtons[1] = new modeButton(600, 200, 1, "5v5 Draft");
  modeButtons[2] = new modeButton(600, 300, 2, "3v3 All Random");
  submitButton = new SubmitButton(width / 2 - 50, height - 100, "Submit");
}

function displayModeButtons() {
  for (var i = 0; i < modeButtons.length; i++) {
    modeButtons[i].show();
  }
}

function mousePressed() {
  console.log("mousePressed");
  if (level >= 0) {
    if (submitButton.contains(mouseX, mouseY)) {
      submitted = true;
    }
  } else {
    for (var i = 0; i < modeButtons.length; i++) {
      if (modeButtons[i].contains(mouseX, mouseY)) {
        level = modeButtons[i].mode;
        break;
      }
    }
  }
}

function displayCharacterThumbs() {
  characterRow1.show();
  characterRow2.show()
}

function reset() {
  level = -1;
  rules = [];
  rulesCreated = false;
  eventsCounter = 0;
}
