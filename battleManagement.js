var battleLogged = false;
var p1Queue = [];
var p2Queue = [];

function createbattlelog(p1picks, p2picks) {
  for (var i = 0; i < p1picks.length; i++) {
    var tmpP1Map = new Map([
      ["p1pick", p1picks[i]], //CharacterButton
      ["p1HP", 2]
    ]);
    p1Queue.push(tmpP1Map);
    var tmpP2Map = new Map([
      ["p2pick", p2picks[i]], //CharacterButton
      ["p2HP", 2]
    ]);
    p2Queue.push(tmpP2Map);
  }
  battleLogged = true;
}

function updateFight() {
  if (p1Queue.length === 0) {
    //p2 wins
    generateSummary(player2);
    level = 101; //go to summary screen
  } else if (p2Queue.length === 0) {
    //p1 wins
    generateSummary(player1);
    level = 101; //go to summary screen
  } else {
    for (var i = 0; i < p1Queue.length; i++) { //display playable character thumbs
      if (p1Queue[i].get('p1HP') > 0) {
        p1Queue[i].get('p1pick').show();
      }
    }
    for (var i = 0; i < p2Queue.length; i++) { //display playable character thumbs
      if (p2Queue[i].get('p2HP') > 0) {
        p2Queue[i].get('p2pick').show();
      }
    }
    push(); //display character portraits
    imageMode(CENTER);
    image(portraits[p1Queue[0].get("p1pick").index], canvas_w * 0.75, canvas_h * 0.35, 1140 * 0.35, 840 * 0.35);
    image(portraits[p2Queue[0].get("p2pick").index], canvas_w * 0.25, canvas_h * 0.35, 1140 * 0.35, 840 * 0.35);
    pop(); //TODO resize ALL art
  }
}

function updateBattlelog() {
  var p1 = p1Queue.shift();
  var p2 = p2Queue.shift();
  if (sumHP(HPButtons1) > 0) {
    p1.set("p1HP", sumHP(HPButtons1)); //updates hp of last match
    p1Queue.push(p1);
  }
  if (sumHP(HPButtons2) > 0) {
    p2.set("p2HP", sumHP(HPButtons2)); //updates hp of last match
    p2Queue.push(p2);
  }
  updateHPbutton();
}

function generateSummary(winner) {
  console.log(winner + " is the winner!");
  //add statistics and bans to battlelog
}

function updateHPbutton() {
  if (p1Queue.length > 0 && p1Queue[0].get('p1HP') === 2) {
    HPButtons1[0].value = 1;
    HPButtons1[1].value = 1;
  } else {
    HPButtons1[0].value = 1;
    HPButtons1[1].value = 0;
  }
  if (p2Queue.length > 0 && p2Queue[0].get('p2HP') === 2) {
    HPButtons2[0].value = 1;
    HPButtons2[1].value = 1;
  } else {
    HPButtons2[0].value = 1;
    HPButtons2[1].value = 0;
  }
}

function sumHP(HParr) {
  var sum = 0;
  for (var i = 0; i < HParr.length; i++) {
    sum = sum + HParr[i].value;
  }
  return sum;
}

function resetBattlelog() {
  battleLogged = false;
  p1Queue = [];
  p2Queue = [];
  for (var i = 0; i < HPButtons1.length; i++) {
    HPButtons1[i].value = 1;
    HPButtons2[i].value = 1;
  }
}
