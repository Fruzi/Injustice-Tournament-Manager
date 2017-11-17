var level = -1;
var bgArt = new Array(2);
var characterArt1 = new Array(50);
var characterArt2 = new Array(50);
var canvas;
var resetButton;
var modeButtons = new Array(3);
var submitButton;
var rules = new Array();
var eventsCounter = 0;
var submitted = false;

function preload() {
  for (var i = 0; i < bgArt.length; i++) {
    bgArt[i] = loadImage('assets/bg/bg' + i + '.jpg');
  }
  // for (var i = 0; i < 50; i++) {
  //   characterArt1[i] = loadImage('assets/characters/character' + i + '.jpg');
  // }
  //TODO load buttons art
}

function setup() {
  canvas = createCanvas(1280 * 0.7, 720 * 0.7);
  imageMode(CORNER);
  createButtons();
  createRules();
}

function draw() {
  if (level == 100) { //fight mode
    console.log("fightmode");
    level = -1;
  } else if (level == -1) { // select mode
    background(bgArt[0]);
    displayModeButtons();
  } else if (level < 100) { //game modes
    background(bgArt[1]);
    submitButton.show();
    updateRules();
  }
}

function createButtons() {
  resetButton = createButton('RESET');
  resetButton.mousePressed(reset);
  resetButton.position(10, height - 15);
  modeButtons[0] = new modeButton(600, 100, 0, "3v3 Draft");
  modeButtons[1] = new modeButton(600, 200, 1, "5v5 Draft");
  modeButtons[2] = new modeButton(600, 300, 2, "3v3 All Random");
  submitButton = new SubmitButton(width / 2 - 50, height - 100, "Submit");
}

function createRules() {
  rules.push("player 1 chooses:");
  rules.push("player 2 bans:");
}

function displayModeButtons() {
  for (var i = 0; i < modeButtons.length; i++) {
    modeButtons[i].show();
  }
}

function mousePressed() {
  console.log("ping");
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

function reset() {
  level = -1;
  rules = [];
  eventsCounter = 0;
}

function updateRules() {
  if (submitted) {
    submitted = false;
    eventsCounter++;
  }
  if (level == 100) { //fight mode
    push();
    fill(255);
    textSize(20);
    text('fight', 50, 50);
    pop();
  } else if (level == 0) { //3v3 draft
    push();
    fill(255);
    textSize(20);
    text(rules[eventsCounter], 50, 50);
    pop();
    if (eventsCounter == rules.length) {
      level = 100;
      eventsCounter = 0;
    }
  }
}
