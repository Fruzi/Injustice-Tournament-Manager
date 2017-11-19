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
  image(portraits[battlelog[battlelog[0]].get("p1pick").index], canvas_w * 0.75, canvas_h * 0.35, 1140 * 0.35, 840 * 0.35);
  image(portraits[battlelog[battlelog[0]].get("p2pick").index], canvas_w * 0.25, canvas_h * 0.35, 1140 * 0.35, 840 * 0.35);
  pop(); //TODO resize ALL art
}

function updateBattlelog() {
  //adds new fights to battlelog

  // if (check for more fights) {
  //   //push new fights to battlelog
  // }
  // else {
  //   generateSummary();
  // }
}

function generateSummary() {
  //add statistics and bans to battlelog
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
}
