var rules = new Array();

function createRules() {
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
