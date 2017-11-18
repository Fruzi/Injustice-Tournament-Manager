var NUM_CHARACTERS = 38;
var level = 0;
var bgArt = new Array(3);
var characterArt = new Array(NUM_CHARACTERS + 1);
var portraits = new Array(NUM_CHARACTERS);
var canvas;
var resetButton;
var modeButtons = new Array(3);
var submitButton;
var eventsCounter = 0;
var submitted = false;
var thumb_h = 60;
var thumb_w = 40;
var x_space_between_thumbs = 1.07;
var y_space_between_thumbs = 1.2;
var roster;
var canvas_w = 1280 * 0.7;
var canvas_h = 720 * 0.7;
var playerstacks1;
var playerstacks2;
//TODO add config screen to choose which champs are owned
var unowned = [0, 1, 9, 17, 18, 19, 20, 36, 37];

function preload() {
  for (var i = 0; i < bgArt.length; i++) {
    bgArt[i] = loadImage('assets/bg/bg' + i + '.jpg');
  }
  for (var i = 0; i < NUM_CHARACTERS; i++) {
    characterArt[i] = loadImage('assets/Thumbs/thumb' + i + '.jpg');
    portraits[i] = loadImage('assets/Portraits/portrait' + i + '.png');
  }
  characterArt[NUM_CHARACTERS] = loadImage('assets/Thumbs/locked_character_thumb.jpg');
}

function setup() {
  canvas = createCanvas(canvas_w, canvas_h);
  imageMode(CORNER);
  createModeButtons();
  roster = new CharacterRoster(38);
  playerstacks1 = new PlayerStack(0);
  playerstacks2 = new PlayerStack(1);
  input1 = createInput('Player 1');
  input1.size(100);
  input2 = createInput('Player 2');
  input2.size(100);
}

function draw() {
  if (level == 100) { //fight mode
    background(bgArt[2]);
    displayInput(false);
    updateRules();
  } else if (level == 0) { // select mode
    background(bgArt[0]);
    displayModeButtons();
    displayInput(true);
  } else if (level < 100) { //game modes
    background(bgArt[1]);
    submitButton.show();
    displayInput(false);
    updateRules();
    roster.show();
    playerstacks1.show();
    playerstacks2.show();
  }
}

function createModeButtons() {
  resetButton = createButton('RESET');
  resetButton.mousePressed(reset);
  resetButton.position(10, height - 15);
  modeButtons[0] = new modeButton(600, 100, 1, "3v3 Draft");
  modeButtons[1] = new modeButton(600, 200, 2, "5v5 Draft");
  modeButtons[2] = new modeButton(600, 300, 3, "3v3 All Random");
  submitButton = new SubmitButton(width / 2 - 50, height - 100, "Submit");
}

function displayModeButtons() {
  for (var i = 0; i < modeButtons.length; i++) {
    modeButtons[i].show();
  }
}

function displayInput(on) {
  if (on) {
    input1.position(width / 2, 100);
    input2.position(width / 2, 140);
  } else {
    input1.hide();
    input2.hide();
  }
}

function mousePressed() {
  if (level < 0) {
    for (var i = 0; i < modeButtons.length; i++) {
      if (modeButtons[i].contains(mouseX, mouseY)) {
        level = modeButtons[i].mode;
        break;
      }
    }
  } else if (level > 0) {
    if (submitButton.contains(mouseX, mouseY) && roster.pinged) {
      submitted = true;
      //make the pinged char greyed out
      roster.getCharacter_ping().pickOrBan();
      updateRules();
    }
    roster.updatePing(mouseX, mouseY);
  } else if (level == 0) {
    for (var i = 0; i < modeButtons.length; i++) {
      if (modeButtons[i].contains(mouseX, mouseY)) {
        level = modeButtons[i].mode;
        break;
      }
    }
  }

}


function reset() {
  level = 0;
  resetRules();
  roster.reset();
  playerstacks1.reset();
  playerstacks2.reset();
}
