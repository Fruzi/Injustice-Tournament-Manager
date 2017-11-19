//battlelog:
// [1,                        //battlelog[0] => fightsCounter
//   {                        //battlelog[n] => map of nth fight
//     "p1pick": p1 nth pick,
//     "p1HP": 2,         //update in updatebattlelog()
//     "p2pick": p2 nth pick,
//     "p2HP": 2
//   }
// ]

var battleLogged = false; //TODO add to reset
var battlelog = new Array(); //TODO add to reset

function createbattlelog(p1picks, p2picks) {
  battlelog.push(0); //fightsCounter
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
  console.log(battlelog[1].get("p1pick"));
  battleLogged = true;
}

function updatebattlelog() {
  if (battlelog[0] == 0) { //1st time?
    battlelog[0] = 1;
  } else {
    for (var i = 1; i < battlelog.length; i++) {
      if (battlelog[i].get('p1HP') > 0) {
        battlelog[i].get('p1pick').show();
      }
      if (battlelog[i].get('p2HP') > 0) {
        battlelog[i].get('p2pick').show();
      }
    }
  }
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
