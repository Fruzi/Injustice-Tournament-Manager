/**
 * Created by Uzi on 11/18/2017.
 */
function CharacterRoster(size, initial_x, initial_y){
    this.size=size;
    this.pinged=false;
    //TODO make this work better with leftovers when dividing
    this.number_of_ele_per_row=Math.floor((canvas_w*0.9)/((thumb_w-1)*x_space_between_thumbs));
    this.number_of_rows = Math.ceil(size/this.number_of_ele_per_row);
    this.rows=new Array(this.number_of_rows);
    for(var i=0; i< this.number_of_rows; i++){
        this.rows[i]=new CharacterRow(this.number_of_ele_per_row, i*this.number_of_ele_per_row, initial_x, initial_y+i*(thumb_h+y_space_between_thumbs));
    }
    this.updateUnowned();
}

CharacterRoster.prototype.show = function(){
    for (var i=0; i<this.number_of_rows; i++){
        this.rows[i].show();
    }
}

CharacterRoster.prototype.reset = function(){
    for (var i=0; i<this.number_of_rows; i++){
        this.rows[i].reset();
    }
    this.updateUnowned();
    this.pinged=false;
};

CharacterRoster.prototype.updateUnowned = function(){
    for (var i=0;i<unowned.length;i++){
        this.getCharacter_index(unowned[i]).banned=true;
    }
};

CharacterRoster.prototype.getCharacter_ping = function(){
    return this.rows[this.pinged[0]].characterButtons[this.pinged[1]];
};

CharacterRoster.prototype.getCharacter_index = function(index){
    var row= Math.floor(index/this.number_of_ele_per_row);
    var col= index-row*this.number_of_ele_per_row;
    return this.rows[row].characterButtons[col];
};

CharacterRoster.prototype.checkPinged = function(mouseX,mouseY){
    //console.log("the number of rows to check when pinged " + this.number_of_rows);
    for (var i=0; i<this.number_of_rows; i++){
        var j=this.rows[i].checkPinged(mouseX,mouseY);
        if(j!=false){
            if(this.pinged!=false && !this.getCharacter_ping().chosen()){
                this.getCharacter_ping().reset();
            }
            this.pinged = [i, j-1];
        }
    }
};

