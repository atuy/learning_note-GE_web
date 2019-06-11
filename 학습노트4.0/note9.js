'use strict';

var vcanvas, ctx, img;
var i = 0;                                                  //카운트 변수
var charw = 95.6, charh = 158.75;                           //스프라이트 이미지 각각의 사이즈
var sx = 0, sy = 0;                                         //스프라이트의 좌표
var key_u, key_d, key_l, key_r;                             //키의 변수


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
    if (key_d) { sy = charh * 3; }  //키가 눌리면 이미지에서 좌표를 수정함
    if (key_u) { sy = charh * 0; }
    if (key_l) { sy = charh * 1; }
    if (key_r) { sy = charh * 2; }
    
    if (i > 11) {                   //카운트가 진행되면서 i번째의 이미지 순서를 출력함
        i = 0;
    } else {
        sx = i * charw;
        i += 1;
    }
}

function loop() {                   //루프는 레이어 구조
    ctx.clearRect(0, 0, vcanvas.width, vcanvas.height);
    update();
    ctx.drawImage(img, sx, sy, charw, charh, 700, 300, charw, charh);
}
function init() {
    vcanvas = document.getElementById("myCanvas");      //id에 맞는 요소를 찾아 반환한다
    ctx = vcanvas.getContext("2d");                     //캔버스에 대한 2d컨텍스트를 가지고 있는 ctx를 만듬
    
    img = new Image();
    img.src = "media/walking1.png";
    
    setInterval(loop, 100);
}

document.addEventListener("DOMContentLoaded", init);