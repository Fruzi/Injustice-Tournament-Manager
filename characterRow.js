function CharacterRow(length, initial_index, initial_x, initial_y) {
  this.length = length;
  this.characterButtons = new Array(length);
  for (var i = 0; i < length; i++) {
    var x_value = initial_x + thumb_w * x_space_between_thumbs * i;
    this.characterButtons[i] = new CharacterButton(x_value, initial_y, i + initial_index);
  }
}

function CharacterRow1(indices, initial_x, initial_y) {
  this.length = indices.length;
  this.characterButtons = new Array(this.length);
  for (var i = 0; i < this.length; i++) {
    var x_value = initial_x + thumb_w * x_space_between_thumbs * i;
    this.characterButtons[i] = new CharacterButton(x_value, initial_y, indices[i]);
  }
}

CharacterRow.prototype.show = function() {
  for (var i = 0; i < this.length; i++) {
    this.characterButtons[i].show();
  }
};

CharacterRow1.prototype.show = function() {
  for (var i = 0; i < this.length; i++) {
    this.characterButtons[i].show();
  }
};

CharacterRow.prototype.checkPinged = function(mouseX, mouseY) {
  for (var i = 0; i < this.length; i++) {
    if (this.characterButtons[i].contains(mouseX, mouseY) && !this.characterButtons[i].locked()) {
      this.characterButtons[i].pinged = true;
      return i + 1;
    }
  }
  return false;
};

CharacterRow.prototype.reset = function() {
  for (var i = 0; i < this.length; i++) {
    this.characterButtons[i].reset();
  }
};
