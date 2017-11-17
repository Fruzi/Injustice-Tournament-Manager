function characterButton(x, y, mode, txt) {
  this.x = x;
  this.y = y;
  this.w = w;
  this.h = h;
  this.mode = mode;
  this.txt = txt;
}

characterButton.prototype.show = function() {
  fill(200);
  rect(this.x, this.y, this.w, this.h);
  fill(0);
  textSize(20);
  text(this.txt, this.x + (this.w / 3), this.y + (this.h / 2));
}

characterButton.prototype.contains = function(x, y) {
  return (x > this.x && x < this.x + this.w && y > this.y && y < this.y + this.h);
}

characterButtom.prototype.showBorder = function(){
    
}
