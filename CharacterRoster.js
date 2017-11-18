/**
 * Created by Uzi on 11/18/2017.
 */
function CharacterRoster(size, initial_x, initial_y){
    this.size=size;
    this.pinged=false;
    var number_of_ele_per_row=Math.floor((canvas_w*0.9)/((thumb_w-1)*x_space_between_thumbs));
    console.log(number_of_ele_per_row);
    this.number_of_rows = Math.ceil(size/number_of_ele_per_row);
    console.log(this.number_of_rows);
    this.rows=new Array(this.number_of_rows);
    for(var i=0; i< this.number_of_rows; i++){
        this.rows[i]=new CharacterRow(number_of_ele_per_row, i*number_of_ele_per_row, initial_x, initial_y+i*(thumb_h+y_space_between_thumbs));
    }
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
    this.pinged=false;
};

CharacterRoster.prototype.checkPinged = function(mouseX,mouseY){
    //console.log("the number of rows to check when pinged " + this.number_of_rows);
    for (var i=0; i<this.number_of_rows; i++){
        var j=this.rows[i].checkPinged(mouseX,mouseY);
        if(j!=false){
            if(this.pinged!=false){
                this.rows[this.pinged[0]].characterButtons[this.pinged[1]].reset();
            }
            this.pinged = [i, j];
        }
    }
};