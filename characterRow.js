function characterRow(length, inital_x, inital_y) {
  this.length = length;
  this.characterButtons = new Array(length);
  this.inital_x = inital_x;
  this.inital_y = inital_y;
  for (i = 0; i < length; i++) {
    var x_value = inital_x + 35 * i;
    this.characterButtons[i] = new characterButton(x_value, inital_y, i);
  }
}

characterRow.prototype.show = function() {
  for (i = 0; i < this.length; i++) {
    this.characterButtons[i].show();
  }
}
