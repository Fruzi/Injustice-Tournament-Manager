/**
 * Created by Uzi on 11/18/2017.
 */
function PlayerStack(pos) {
    this.pos = pos;
    this.banRow;
    this.pickRow;
    this.currPick = 0;
    this.currBan = 0;
}

PlayerStack.prototype.pushChosen = function (index) {
    this.pickRow.characterButtons[this.currPick].index = index;
    this.currPick++;
};

PlayerStack.prototype.pushBanned = function (index) {
    this.banRow.characterButtons[this.currBan].index = index;
    this.currBan++;
};

PlayerStack.prototype.createStacks = function (teamSize, banSize) {
    var initialTeam = [];
    var initialBan = [];
    for (var i = 0; i < teamSize; i++) {
        initialTeam.push(NUM_CHARACTERS)
    }
    for (i = 0; i < banSize; i++) {
        initialBan.push(NUM_CHARACTERS);
    }
    this.createRow(initialTeam, initialBan);
};

PlayerStack.prototype.createStacksFromArr = function (arr, pick) {
    var team=[];
    var bans=[];
    for (var i=0; i<pick;i++){
        team.push(arr[i]);
    }
    for (i;i<arr.length;i++){
        bans.push(arr[i]);
    }
    this.createRow(team, bans);
};

PlayerStack.prototype.show = function () {
    this.pickRow.show();
    this.banRow.show();
};

PlayerStack.prototype.reset = function () {
    this.currPick = 0;
    this.currBan = 0;
    this.pickRow = [];
    this.banRow = [];
};

PlayerStack.prototype.createRow = function(team, ban){
    if (this.pos) {
        this.pickRow = new CharacterRow1(team, (thumb_w + x_space_between_thumbs), canvas_h * 0.7);
        this.banRow = new CharacterRow1(ban, (thumb_w + x_space_between_thumbs) + 1 / 2 * (teamSize - banSize) * (thumb_w + x_space_between_thumbs), canvas_h * 0.7 - thumb_h - y_space_between_thumbs);
    }
    else {
        this.pickRow = new CharacterRow1(team, canvas_w - (teamSize + 1) * (thumb_w + x_space_between_thumbs), canvas_h * 0.7);
        this.banRow = new CharacterRow1(ban, canvas_w - (teamSize + 1) * (thumb_w + x_space_between_thumbs) + 1 / 2 * (teamSize - banSize) * (thumb_w + x_space_between_thumbs), canvas_h * 0.7 - thumb_h - y_space_between_thumbs);
    }
};