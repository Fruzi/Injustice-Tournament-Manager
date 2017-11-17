function SubmitButton(x, y, txt) {
  this.x = x;
  this.y = y;
  this.w = 100;
  this.h = 50;
  this.txt = txt;
}

SubmitButton.prototype.show = function() {
  fill(200);
  rect(this.x, this.y, this.w, this.h);
  fill(0);
  textSize(20);
  text(this.txt, this.x + 10, this.y + this.h / 2);
}

SubmitButton.prototype.contains = function(x, y) {
  return (x > this.x && x < this.x + this.w && y > this.y && y < this.y + this.h);
}
