var rules = [];
var pickOrder = [];
var teamSize;
var banSize;
var rulesCreated = false;
var player1;
var player2;

function createRules() {
  var c = " chooses:";
  var b = " bans:";
  var c2 = " chooses again:";
  var b2 = " bans again:";
  rules = [];
  if (random([0, 1]) === 0) {
    player1 = input1.value();
    player2 = input2.value();
  } else {
    player2 = input1.value();
    player1 = input2.value();
  }
  if (level === 1) { //3v3 draft
    rules.push(player1 + c);
    rules.push(player2 + c);
    rules.push(player2 + b);
    rules.push(player1 + c);
    rules.push(player1 + b);
    rules.push(player2 + c);
    rules.push(player2 + b);
    rules.push(player1 + c);
    rules.push(player1 + b);
    rules.push(player2 + c);
    pickOrder = [1, 2, -2, 1, -1, 2, -2, 1, -1, 2];
    teamSize = 3;
    banSize = 2;
    playerstacks1.createStacks(teamSize, banSize);
    playerstacks2.createStacks(teamSize, banSize);
  } else if (level === 2) { //5v5 draft
    rules.push(player1 + c);
    rules.push(player1 + b);
    rules.push(player2 + c);
    rules.push(player2 + b);
    rules.push(player2 + b2);
    rules.push(player1 + c);
    rules.push(player1 + c2);
    rules.push(player1 + b);
    rules.push(player2 + c);
    rules.push(player2 + c2);
    rules.push(player2 + b);
    rules.push(player1 + c);
    rules.push(player1 + c2);
    rules.push(player1 + b);
    rules.push(player2 + c);
    rules.push(player2 + c2);


    pickOrder = [1, -1, 2, -2, -2, 1, 1, -1, 2, 2, -2, 1, 1, -1, 2, 2];
    teamSize = 5;
    banSize = 3;
    playerstacks1.createStacks(teamSize, banSize);
    playerstacks2.createStacks(teamSize, banSize);
  } else if (level === 3) {
    teamSize = 3;
    banSize = 0;
    autoAssign();
  }
  rulesCreated = true;
}

function updateRules() {
  if (!rulesCreated) {
    createRules();
  }
  if (submitted) {
    submitted = false;
    eventsCounter++;
    if (eventsCounter === rules.length) {
      level = 100;
      eventsCounter = 0;
    }
  }
  if (level === 100) { //fight mode
    push();
    fill(255);
    textSize(20);
    text('Fight', 50, 50);
    pop();
    if (!battleLogged) {
      createbattlelog(playerstacks1.pickRow.characterButtons, playerstacks2.pickRow.characterButtons);
    }
  } else if (level > 0 && level < 100) { //draft
    push();
    fill(255);
    textSize(20);
    text(rules[eventsCounter], canvas_w * 0.05, canvas_h * 0.08);
    pop();
  }
}

function resetRules() {
  teamSize = 0;
  banSize = 0;
  rules = [];
  pickOrder = [];
  rulesCreated = false;
  eventsCounter = 0;
}

function autoAssign() {
  var picksAndBans1 = [];
  var picksAndBans2 = [];
  while (picksAndBans1.length < teamSize + banSize) {
    var rand = Math.ceil(Math.random() * NUM_CHARACTERS);
    if ((picksAndBans1.indexOf(rand) > -1) || (unowned.indexOf(rand) > -1)) continue;
    picksAndBans1[picksAndBans1.length] = rand;
  }
  while (picksAndBans2.length < teamSize + banSize) {
    rand = Math.ceil(Math.random() * NUM_CHARACTERS);
    if ((picksAndBans2.indexOf(rand) > -1) || (picksAndBans1.indexOf(rand) > -1) || (unowned.indexOf(rand) > -1)) continue;
    picksAndBans2[picksAndBans2.length] = rand;
  }
  playerstacks1.createStacksFromArr(picksAndBans1, teamSize);
  playerstacks2.createStacksFromArr(picksAndBans2, teamSize);
  level = 100;
}
