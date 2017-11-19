//battleLog:
// [1,                        //battleLog[0] => fightsCounter
//   {                        //battleLog[n] => map of nth fight
//     "p1pick": p1 nth pick,
//     "p1pickHP": 2,         //update in updateBattleLog()
//     "p2pick": p2 nth pick,
//     "p2pickHP": 2
//   }
// ]

var battleLogged = false; //TODO add to reset
var battleLog = new Array(); //TODO add to reset

function createBattleLog(p1picks, p2picks) {
  battleLog.push(0); //fightsCounter
  for (var i = 0; i < p1picks.length; i++) {
    var tmpFightMap = new Map([
      ["p1pick", p1picks[i]], //CharacterButton
      ["p1pickHP", 2],
      ["p2pick", p2picks[i]], //CharacterButton
      ["p2pickHP", 2]
    ]);
    battleLog.push(tmpFightMap);
  }
  // console.log(battleLog[1].get("p1pick") instanceof CharacterButton); //true
  battleLog[1].get("p1pick").show();
  battleLogged = true;
}

function updateBattleLog() {
  // if (check for more fights) {
  //   //push new fights to battleLog
  // }
  // else {
  //   generateSummary();
  // }
}

function generateSummary() {
  //add statistics and bans to battleLog
}
