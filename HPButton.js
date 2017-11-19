function HPButton(x, y) {
  this.x = x;
  this.y = y;
  this.w = 30;
  this.h = 30;
  this.value = 1;
}

HPButton.prototype.show = function() {
  push();
  if (this.value === 1) {
    fill(0, 255, 0);
  } else {
    fill(255, 0, 0);
  }
  rect(this.x, this.y, this.w, this.h);
  pop();
}

HPButton.prototype.contains = function(x, y) {
  return (x > this.x && x < this.x + this.w && y > this.y && y < this.y + this.h);
}

HPButton.prototype.toggle = function() {
  this.value = (this.value + 1) % 2
  console.log(this.value);
}
