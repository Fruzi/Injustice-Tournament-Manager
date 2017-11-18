var rules = new Array();
var rulesCreated = false;

function createRules() {
  rules = [];
  if (level == 0) { //3v3 draft
    rules.push("player 1 chooses:");
    rules.push("player 2 chooses:");
    rules.push("player 2 bans:");
    rules.push("player 1 chooses:");
    rules.push("player 1 bans:");
    rules.push("player 2 chooses:");
    rules.push("player 2 bans:");
    rules.push("player 1 chooses:");
    rules.push("player 1 bans:");
    rules.push("player 2 chooses:");
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
  } else if (level == 0) { //3v3 draft
    push();
    fill(255);
    textSize(20);
    text(rules[eventsCounter], canvas_w*0.05,canvas_h*0.08);
    pop();
  }
}
