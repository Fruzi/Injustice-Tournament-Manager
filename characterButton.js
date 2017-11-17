function characterButton(x, y, index) {
  this.x = x;
  this.y = y;
  this.index = index;
  this.w = 30;
  this.h = 50;
  this.pinged = false;
}

characterButton.prototype.show = function() {
  if (this.index < 19) {
    image(characterArt[this.index], this.x, this.y, this.w, this.h);
  } else {
    image(characterArt[this.index - 19], this.x, this.y, this.h, this.w);
  }
  if (this.pinged) {
    showBorder();
  }
}

characterButton.prototype.contains = function(x, y) {
  return (x > this.x && x < this.x + this.w && y > this.y && y < this.y + this.h);
}

characterButton.prototype.showBorder = function() {
  stroke([0, 255, 0]);
  strokeWeight(3);
}
