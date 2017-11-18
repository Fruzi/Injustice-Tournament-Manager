var MAX_CHARACTER_THUMBART = 19;
var level = -1;
var bgArt = new Array(2);
var characterArt = new Array(MAX_CHARACTER_THUMBART * 2+1);
var canvas;
var resetButton;
var modeButtons = new Array(3);
var submitButton;
var eventsCounter = 0;
var submitted = false;
var thumb_h=60;
var thumb_w=40;
var x_space_between_thumbs = 1.07;
var y_space_between_thumbs = 1.2;
var roster;
var canvas_w = 1280 * 0.7;
var canvas_h = 720 * 0.7

function preload() {
  for (var i = 0; i < bgArt.length; i++) {
    bgArt[i] = loadImage('assets/bg/bg' + i + '.jpg');
  }
  roster = new CharacterRoster(38, 35, 100);
}

function setup() {
  canvas = createCanvas(canvas_w, canvas_h);
  imageMode(CORNER);
  createModeButtons();
  for (var i = 0; i < MAX_CHARACTER_THUMBART*2; i++) {
      characterArt[i] = loadImage('assets/characters/character' + i + '.jpg');
  }
  characterArt[characterArt.length] = loadImage('assets/characters/locked_character.jpg');
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
    roster.show();
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
  if (level >= 0) {
      if (submitButton.contains(mouseX, mouseY) && roster.pinged) {
          submitted = true;
          //make the pinged char greyed out
          roster.getCharacter_ping().pick();
      }
      roster.checkPinged(mouseX,mouseY);
  }else {
      for (var i = 0; i < modeButtons.length; i++) {
          if (modeButtons[i].contains(mouseX, mouseY)) {
              level = modeButtons[i].mode;
              break;
          }
      }
  }
}

function reset() {
  level = -1;
  rules = [];
  rulesCreated = false;
  eventsCounter = 0;
  roster.reset();
}
