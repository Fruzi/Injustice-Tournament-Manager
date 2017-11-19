var NUM_CHARACTERS = 38;
var level = 0; //TODO change to "screenID"
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
var HPButtons1 = new Array(2);
var HPButtons2 = new Array(2);

function preload() {
  for (var i = 0; i < bgArt.length; i++) {
    bgArt[i] = loadImage('assets/bg/bg' + i + '.jpg');
  }
  for (i = 0; i < NUM_CHARACTERS; i++) {
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
  if (level < 0) { //transition
    //transition();
  }
  if (level === 100) { //fight mode
    background(bgArt[2]);
    displayInput(false);
    updateRules();
    updateFight();
    displayHPButtons();
    submitButton.show();
    displayNames();
  } else if (level === 0) { // select mode
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
    displayNames();
  } else if (level === 101) {
    console.log("done!");
  }
}

function createModeButtons() {
  resetButton = createButton('RESET');
  resetButton.mousePressed(reset);
  resetButton.position(10, height - 15);
  modeButtons[0] = new ModeButton(600, 100, 1, "3v3 Draft");
  modeButtons[1] = new ModeButton(600, 200, 2, "5v5 Draft");
  modeButtons[2] = new ModeButton(600, 300, 3, "3v3 All Random");
  submitButton = new SubmitButton(width / 2 - 50, height - 100, "Submit");
  for (var i = 0; i < HPButtons1.length; i++) {
    HPButtons1[i] = new HPButton(i * 50 + canvas_w * 0.8 - 80, canvas_h * 0.75);
    HPButtons2[i] = new HPButton(i * 50 + canvas_w * 0.2, canvas_h * 0.75);
  }
}

function displayModeButtons() {
  for (var i = 0; i < modeButtons.length; i++) {
    modeButtons[i].show();
  }
}

function displayHPButtons() {
  for (var i = 0; i < HPButtons1.length; i++) {
    HPButtons1[i].show();
    HPButtons2[i].show();
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
  if (level < 0) { //animation, no mouse functions
    console.log("level " + level);
    for (var i = 0; i < modeButtons.length; i++) {
      if (modeButtons[i].contains(mouseX, mouseY)) {
        level = modeButtons[i].mode;
        break;
      }
    }
  } else if (level === 0) {
    for (i = 0; i < modeButtons.length; i++) {
      if (modeButtons[i].contains(mouseX, mouseY)) {
        level = modeButtons[i].mode;
        break;
      }
    }
  } else if (level > 0 && level < 100) {
    if (submitButton.contains(mouseX, mouseY) && roster.pinged) {
      submitted = true;
      //make the pinged char greyed out
      roster.getCharacter_ping().pickOrBan();
      updateRules();
    }
    roster.updatePing(mouseX, mouseY);
  } else if (level === 100) { //battle mode
    for (i = 0; i < HPButtons1.length; i++) {
      if (HPButtons1[i].contains(mouseX, mouseY)) {
        HPButtons1[i].toggle();
        break;
      } else if (HPButtons2[i].contains(mouseX, mouseY)) {
        HPButtons2[i].toggle();
        break;
      }
    }
    if (submitButton.contains(mouseX, mouseY) && (sumHP(HPButtons1) === 0 || sumHP(HPButtons2) === 0)) {
      updateBattlelog();
    }
  }
}

function displayNames() {
  push();
  fill(255);
  textSize(20);
  text(player1, canvas_w * 0.7, canvas_h * 0.9);
  text(player2, canvas_w * 0.2, canvas_h * 0.9);
  pop();
}

function reset() {
  input1.show();
  input2.show();
  level = 0;
  resetRules();
  roster.reset();
  playerstacks1.reset();
  playerstacks2.reset();
  resetBattlelog();
}
