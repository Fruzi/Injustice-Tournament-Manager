function CharacterRow(length, initial_index, inital_x, inital_y) {
  this.length = length;
  this.characterButtons = new Array(length);
  for (i = 0; i < length; i++) {
    var x_value = inital_x + thumb_w*1.07 * i;
    this.characterButtons[i] = new CharacterButton(x_value, inital_y, i+initial_index);
  }
}

CharacterRow.prototype.show = function() {
  for (i = 0; i < this.length; i++) {
    this.characterButtons[i].show();
  }
};


CharacterRow.prototype.checkPinged = function(mouseX,mouseY){
    for (i = 0; i < this.length; i++) {
        if(this.characterButtons[i].contains(mouseX,mouseY)){
            this.characterButtons[i].pinged=true;
            break;
        }
    }
};