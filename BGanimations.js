var greenL;
var bgX = canvas_w * 0.25;
var bgY = canvas_h * 0.5;
var bgW = 0;
var bgH = 0;
var m;
var move = true;

//stars
var stars = [];
var speed;

function loadBG() {
  greenL = loadImage('assets/bgAnimations/Green_Lantern.png');
  //stars
  for (var i = 0; i < 800; i++) {
    stars[i] = new Star();
  }
}

function updateBG() {
  if (bgW === 0) {
    bgW = greenL.width;
    bgH = greenL.height;
  }
  if (bgH < canvas_h * 1.4) {
    bgW = bgW * 1.0005;
    bgH = bgH * 1.0005;
  }

  if ((move && bgX >= canvas_w * 0.4)) {
    move = !move;
  }
  if (move) {
    m = 1.0005;
  } else {
    m = 1;
  }
  bgX = bgX * m;
  bgY = bgY * m;
}

function drawBG() {
  //stars
  speed = map(mouseX, 0, width, 0, 50);
  push();
  // translate(width / 3, height / 2);
  translate(bgX, bgY - 100);
  for (var i = 0; i < stars.length; i++) {
    stars[i].update();
    stars[i].show();
  }
  pop();

  push();
  imageMode(CENTER);
  image(greenL, bgX, bgY, bgW, bgH);
  pop();
}
