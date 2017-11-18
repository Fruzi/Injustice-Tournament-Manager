/**
 * Created by Uzi on 11/18/2017.
 */
function PlayerStack(pos){
    this.pos=pos;
    this.banRow;
    this.pickRow;
    this.currPick=0;
    this.currBan=0;
}

PlayerStack.prototype.pushChosen = function(index){
    this.pickRow.characterButtons[this.currPick].index=index;
    this.currPick++;
};

PlayerStack.prototype.pushBanned = function(index){
    this.banRow.characterButtons[this.currBan].index=index;
    this.currBan++;
};

PlayerStack.prototype.createStacks = function(teamSize, banSize){
    var initialTeam=[];
    var initialBan=[];
    for (var i=0; i<teamSize ; i++){
        initialTeam.push(NUM_CHARACTERS)
    }
    for (i=0; i<banSize; i++){
        initialBan.push(NUM_CHARACTERS);
    }
    if(this.pos) {
        this.pickRow = new CharacterRow1(initialTeam,canvas_w*0.1, canvas_h*0.7);
        this.banRow = new CharacterRow1(initialBan,canvas_w*0.1+1/2*(thumb_w+x_space_between_thumbs), canvas_h*0.7-thumb_h-y_space_between_thumbs);
    }
    else{
        this.pickRow = new CharacterRow1(initialTeam,canvas_w*0.8, canvas_h*0.7);
        this.banRow = new CharacterRow1(initialBan,canvas_w*0.8+1/2*(thumb_w+x_space_between_thumbs), canvas_h*0.7-thumb_h-y_space_between_thumbs);
    }
};

PlayerStack.prototype.show = function(){
    this.pickRow.show();
    this.banRow.show();
};