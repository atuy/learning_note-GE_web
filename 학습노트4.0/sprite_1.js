'use strict';

var vcanvas, ctx, img, img_b;
var img_cl, img_cr;                                 //고양이 이미지 좌우 변수
var i = 0;                                          //카운트 변수
var charw = 95.6, charh = 158.75;                   //캐릭터의 스프라이트이미지 사이즈
var sx = 0, sy = 0;                                 //캐릭터 스프라이트의 좌표
var key_u, key_d, key_l, key_r;                     //키변수
var picture_w;                                      //배경화면의 사이즈
var fc_x, fb_x, fb_y;                               //카메라의 x좌표와 배경의 시작 좌표값
var cam_vel = 10;                                   //카메라의 이동속도
var ckeck_f = false;                                //체크를 위한 변수
var c_sx = 0, c_sy = 0, c_w = 400, c_h = 200;       //고양이의 스프라이트 좌표
var cat_move = 0;                                   //고양이의 움직임을 체크하기 위한 변수


function set_key() {
	if (event.keyCode === 37) { key_l = 1; }
	if (event.keyCode === 38) { key_u = 1; }
	if (event.keyCode === 39) { key_r = 1; }
	if (event.keyCode === 40) { key_d = 1; }
    ckeck_f = true;                                 //키를 누를 때 체크 변수를 참으로 둠
}
function stop_key() {
	if (event.keyCode === 37) { key_l = 0; }
	if (event.keyCode === 38) { key_u = 0; }
	if (event.keyCode === 39) { key_r = 0; }
	if (event.keyCode === 40) { key_d = 0; }
    ckeck_f = false;                                //키를 때었을 때 체크 변수를 거짓으로 둠
}

document.onkeydown = set_key;
document.onkeyup = stop_key;

function update() {
    if (ckeck_f) {                                  //키가 눌러진 상태일 경우
        if (key_d) {
            sy = charh * 3;                         //캐릭터의 스프라이트 이미지 좌표를 수정
            cat_move = 1;                           //고양이의 움직임 체크를 1로 변경
        }
        if (key_u) {
            sy = 0;
            cat_move = 1;
        }
        if (key_l) {
            sy = charh;
            fc_x -= cam_vel;
            cat_move = 0;
        }
        if (key_r) {
            sy = charh * 2;
            fc_x += cam_vel;
            cat_move = 1;
        }
        
        if (fc_x < vcanvas.width / 2) {             //카메라의 x 좌표가 캔버스의 넓이의 반보다 작으면 
            fc_x = vcanvas.width / 2;               //좌표값을 고정한다
        }
        if (fc_x > picture_w - vcanvas.width / 2) { //카메라 x좌표가 캔버스의 넓이의 반보다 크면
            fc_x = picture_w - vcanvas.width / 2;   //좌표값을 고정한다
        }
        fb_x = fc_x - vcanvas.width / 2;
        
        if (i > 11) {
            i = 0;
        } else {
            sx = i * charw;
            if (key_r === 1 || key_l === 1) {       //좌우로 입력될 때
                c_sy = i * c_h;                     //고양이를 움직이게 스프라이트 이미지의 카운트를 증가한다
            }
            i += 1;
        }
    }
}
function catdraw() {
    if (cat_move === 1 || ckeck_f === false) {      //고양이가 움직이고 체크 변수가 거짓일때 
        ctx.drawImage(img_cr, c_sx, c_sy, c_w, c_h, 500, 600, c_w / 3, c_h / 3);    //오른쪽 고양이 이미지를 그려줌
        
    } else {
        ctx.drawImage(img_cl, c_sx, c_sy, c_w, c_h, 500, 600, c_w / 3, c_h / 3);
    }
}
function loop() {                                   //레이어 구조임으로 순서대로 그려줌 
    ctx.clearRect(0, 0, vcanvas.width, vcanvas.height);
    update();
    ctx.drawImage(img_b, fb_x, fb_y, vcanvas.width, vcanvas.height, 0, 0, vcanvas.width, vcanvas.height);
    ctx.drawImage(img, sx, sy, charw, charh, 700, 530, charw, charh);
    catdraw();
}
function init() {
    vcanvas = document.getElementById("myCanvas");
    ctx = vcanvas.getContext("2d");
    
    img = new Image();
    img.src = "media/walking1.png";
    
    img_b = new Image();
    img_b.src = "media/bgi-3360x1050.jpg";
    
    img_cl = new Image();
    img_cl.src = "media/catwalkL_400x2400.png";
    
    img_cr = new Image();
    img_cr.src = "media/catwalkR_400x2400.png";
    
    fc_x = vcanvas.width / 2;                   //카메라의 x좌표를 설정
    fb_x = 0;                                   //이미지를 보여주는 캔버스의 x좌표를 설정
    fb_y = 100;                                 //이미지를 보여주는 캔버스의 y좌표를 설정
    picture_w = 3360;
    
    window.setTimeout(loop, 500);
    setInterval(loop, 100);
}

document.addEventListener("DOMContentLoaded", init);