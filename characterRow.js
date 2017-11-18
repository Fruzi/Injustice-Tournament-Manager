function CharacterRow(length, initial_index, initial_x, initial_y) {
  this.length = length;
  this.characterButtons = new Array(length);
  for (i = 0; i < length; i++) {
    var x_value = initial_x + thumb_w*x_space_between_thumbs * i;
    this.characterButtons[i] = new CharacterButton(x_value, initial_y, i+initial_index);
  }
}

CharacterRow.prototype.show = function() {
  for (i = 0; i < this.length; i++) {
    this.characterButtons[i].show();
  }
};


CharacterRow.prototype.checkPinged = function(mouseX,mouseY){
    for (i = 0; i < this.length; i++) {
        if(this.characterButtons[i].contains(mouseX,mouseY) && !this.characterButtons[i].chosen()){
            this.characterButtons[i].pinged=true;
            return i;
        }
    }
    return false;
};

CharacterRow.prototype.reset = function(){
    for (i = 0; i < this.length; i++) {
        this.characterButtons[i].reset();
    }
};