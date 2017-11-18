function CharacterButton(x, y, index) {
  this.x = x;
  this.y = y;
  this.index = index;
  this.w = thumb_w;
  this.h = thumb_h;
  this.pinged = false;
  this.banned = false;
  this.picked = false;
}

CharacterButton.prototype.show = function() {
    if(!(this.banned||this.picked)){
        image(characterArt[this.index], this.x, this.y, this.w, this.h);
    }
    else{
        image(characterArt[characterArt.length], this.x, this.y, this.w, this.h);
    }
  if (this.pinged) {
      stroke([0, 255, 0]);
      strokeWeight(3);
  }
};

CharacterButton.prototype.contains = function(x, y) {
  return (x > this.x && x < this.x + this.w && y > this.y && y < this.y + this.h);
};

CharacterButton.prototype.showBorder = function() {
  stroke([0, 255, 0]);
  strokeWeight(3);
};
