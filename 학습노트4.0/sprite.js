'use strict';

var vcanvas, ctx, img;
var i = 0;
var charw = 95.6, charh = 158.75;
var sx = 0, sy = 0;
var key_u, key_d, key_l, key_r;


function set_key() {
	if (event.keyCode === 37) { key_l = 1; }
	if (event.keyCode === 38) { key_u = 1; }
	if (event.keyCode === 39) { key_r = 1; }
	if (event.keyCode === 40) { key_d = 1; }
}
function stop_key() {
	if (event.keyCode === 37) { key_l = 0; }
	if (event.keyCode === 38) { key_u = 0; }
	if (event.keyCode === 39) { key_r = 0; }
	if (event.keyCode === 40) { key_d = 0; }
}

document.onkeydown = set_key;
document.onkeyup = stop_key;

function update() {
    if (key_d) { sy = charh * 3; }
    if (key_u) { sy = charh * 0; }
    if (key_l) { sy = charh * 1; }
    if (key_r) { sy = charh * 2; }
    
    if (i > 11) {
        i = 0;
    } else {
        sx = i * charw;
        i += 1;
    }
}

function loop() {
    ctx.clearRect(0, 0, vcanvas.width, vcanvas.height);
    update();
    ctx.drawImage(img, sx, sy, charw, charh, 700, 300, charw, charh);
}
function init() {
    vcanvas = document.getElementById("myCanvas");
    ctx = vcanvas.getContext("2d");
    
    img = new Image();
    img.src = "walking1.png";
    
    setInterval(loop, 100);
}

document.addEventListener("DOMContentLoaded", init);