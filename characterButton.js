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

CharacterButton.prototype.show = function () {
    if (!(this.banned || this.picked)) {
        image(characterArt[this.index], this.x, this.y, this.w, this.h);
    }
    else {
        image(characterArt[NUM_CHARACTERS], this.x, this.y, this.w, this.h);
    }
    if (this.pinged) {
        this.showPinged();
    }
};

CharacterButton.prototype.contains = function (x, y) {
    return (x > this.x && x < this.x + this.w && y > this.y && y < this.y + this.h);
};

CharacterButton.prototype.showPinged = function () {
    stroke(0, 255, 0);
    strokeWeight(1);
    var c = color(0, 0);
    fill(c);
    rect(this.x, this.y, this.w, this.h);


    image(portraits[this.index], canvas_w / 2.5, canvas_h / 2.2, canvas_w / 5, canvas_h / 2.7);
};

CharacterButton.prototype.reset = function () {
    this.pinged = false;
    this.banned = false;
    this.picked = false;
    strokeWeight(0);
};

CharacterButton.prototype.pickOrBan = function () {
    var action = pickOrder[eventsCounter];
    switch (action) {
        case 1:
            playerstacks1.pushChosen(this.index);
            this.picked = true;
            break;
        case 2:
            playerstacks2.pushChosen(this.index);
            this.picked = true;
            break;
        case -1:
            playerstacks1.pushBanned(this.index);
            this.banned = true;
            break;
        case -2:
            playerstacks2.pushBanned(this.index);
            this.banned = true;
            break;
    }
    this.pinged = false;
}

CharacterButton.prototype.locked = function () {
    return (this.banned || this.picked);
};


