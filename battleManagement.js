//battlelog:
// [1,                        //battlelog[0] => fightsCounter
//   {                        //battlelog[n] => map of nth fight
//     "p1pick": p1 nth pick,
//     "p1HP": 2,         //update in updatebattlelog()
//     "p2pick": p2 nth pick,
//     "p2HP": 2
//   }
// ]

var battleLogged = false;
var battlelog = new Array();
var fightsCounter = 1;

function createbattlelog(p1picks, p2picks) {
  battlelog.push(1); //fightsCounter
  for (var i = 0; i < p1picks.length; i++) {
    var tmpFightMap = new Map([
      ["p1pick", p1picks[i]], //CharacterButton
      ["p1HP", 2],
      ["p2pick", p2picks[i]], //CharacterButton
      ["p2HP", 2]
    ]);
    battlelog.push(tmpFightMap);
  }
  // console.log(battlelog[1].get("p1pick") instanceof CharacterButton); //true
  battleLogged = true;
}

function updateFight() {
  for (var i = 1; i < battlelog.length; i++) { //display playable character thumbs
    if (battlelog[i].get('p1HP') > 0) {
      battlelog[i].get('p1pick').show();
    }
    if (battlelog[i].get('p2HP') > 0) {
      battlelog[i].get('p2pick').show();
    }
  }
  push(); //display character portraits
  imageMode(CENTER);
  image(portraits[battlelog[fightsCounter].get("p1pick").index], canvas_w * 0.75, canvas_h * 0.35, 1140 * 0.35, 840 * 0.35);
  image(portraits[battlelog[fightsCounter].get("p2pick").index], canvas_w * 0.25, canvas_h * 0.35, 1140 * 0.35, 840 * 0.35);
  pop(); //TODO resize ALL art
}

function updateBattlelog() {
  battlelog[fightsCounter].set("p1HP", sumHP(HPButtons1)); //updates hp of last match
  battlelog[fightsCounter].set("p2HP", sumHP(HPButtons2));
  fightsCounter++; //looking for new match
  if (fightsCounter < battlelog.length) {
    updateHPbutton();
  } else {
    addAvailableMatch();
    updateHPbutton();
  }
}

function addAvailableMatch() {
  var n = battlelog.length;
  var nextP1pick = null;
  var nextP1HP = 0;
  var nextP2pick = null;
  var nextP2HP = 0;
  for (var i = 1; i < n; i++) {
    if (nextP1pick === null) {
      if (battlelog[i].get('p1HP') > 0) { //find next p1 available character
        nextP1pick = battlelog[i].get('p1pick');
        nextP1HP = battlelog[i].get('p1HP');
      }
    }
    if (nextP2pick === null) {
      if (battlelog[i].get('p2HP') > 0) { //find next p2 available character
        nextP2pick = battlelog[i].get('p2pick');
        nextP2HP = battlelog[i].get('p2HP');
      }
    }
  }
  console.log(nextP1pick);
  console.log(nextP2pick);
  if (nextP1pick != null && nextP2pick != null) { //add new match
    var tmpFightMap = new Map([
      ["p1pick", nextP1pick],
      ["p1HP", nextP1HP],
      ["p2pick", nextP2pick],
      ["p2HP", nextP2HP]
    ]);
    battlelog.push(tmpFightMap);
    console.log(fightsCounter);
    console.log(tmpFightMap);
    console.log(battlelog);
    nextP1pick = null;
    nextP2pick = null;
  } else { //no Available Match
    var winner;
    if (nextP1pick === null) {
      winner = player2;
    } else {
      winner = player1;
    }
    battlelog[0] = fightsCounter;
    generateSummary(winner);
    level = 101; //go to summary screen
  }
}

function generateSummary(winner) {
  console.log(winner + " is the winner!");
  //add statistics and bans to battlelog
}

function updateHPbutton() {
  if (battlelog[fightsCounter].get('p1HP') === 2) {
    HPButtons1[0].value = 1;
    HPButtons1[1].value = 1;
  } else {
    HPButtons1[0].value = 1;
    HPButtons1[1].value = 0;
  }
  if (battlelog[fightsCounter].get('p2HP') === 2) {
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
  battlelog = [];
  for (var i = 0; i < HPButtons1.length; i++) {
    HPButtons1[i].value = 1;
    HPButtons2[i].value = 1;
  }
}
