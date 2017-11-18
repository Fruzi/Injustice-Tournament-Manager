var rules = [];
var pickOrder = [];
var teamSize;
var banSize;
var rulesCreated = false;
var player1;
var player2;

function createRules() {
  rules = [];
    if (random([0, 1]) == 0) {
        player1 = input1.value();
        player2 = input2.value();
    } else {
        player2 = input1.value();
        player1 = input2.value();
    }
    if (level == 1) { //3v3 draft
      rules.push(player1 + " chooses:");
      rules.push(player2 + " chooses:");
      rules.push(player2 + " bans:");
      rules.push(player1 + " chooses:");
      rules.push(player1 + " bans:");
      rules.push(player2 + " chooses:");
      rules.push(player2 + " bans:");
      rules.push(player1 + " chooses:");
      rules.push(player1 + " bans:");
      rules.push(player2 + " chooses:");
      pickOrder=[1,2,-2,1,-1,2,-2,1,-1,2];
      teamSize=3;
      banSize=2;
  }
  rulesCreated = true;
  playerstacks1.createStacks(teamSize, banSize);
  playerstacks2.createStacks(teamSize, banSize);
}

function updateRules() {
  if (!rulesCreated) {
    createRules();
  }
  if (submitted) {
    submitted = false;
    eventsCounter++;
    if (eventsCounter == rules.length) {
      level = 100;
      eventsCounter = 0;
    }
  }
  if (level == 100) { //fight mode
    push();
    fill(255);
    textSize(20);
    text('fight', 50, 50);
    pop();
  } else if (level == 1) { //3v3 draft
    push();
    fill(255);
    textSize(20);
    text(rules[eventsCounter], canvas_w * 0.05, canvas_h * 0.08);
    pop();
  }
}

function resetRulls(){
    teamSize=0;
    banSize=0;
    rules = [];
    rulesCreated = false;
    eventsCounter = 0;
}
