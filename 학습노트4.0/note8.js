'use strict';
var vcanvas, ctx;                                   //캔버스 출력을 위한 변수
var boxx = 50;                                      //박스의 x좌표
var boxy = 50;                                      //박스의 y좌표
var boxwidth = 900;                                 //박스의 넓이
var boxheight = 500;                                //박스의 높이
var lineW = 10;                                     //라인의 넓이
var ballx = boxx + boxwidth / 2;                    //볼의 x좌표 박스의 x좌표부터 넓이를 더한 값의 반 즉 박스의 절반에 위치
var bally = boxy + boxheight / 2;                   //볼의 y좌표
var velocityx = 8;                                  //x 방향의 속도
var velocityy = 8;                                  //y 방향의 속도
var ballRad = 10;                                   //볼의 반지름을 설정
var rkx1 = 100, rkx2 = 880, rkW = 20, rkH = 100;    //라켓의 좌표와 넓이 높이를 설정
var rky1 = boxy + boxheight / 2 - rkH / 2;          //라켓의 y좌표를 구함 박스의 중심에서 라켓의 길이를 /2로 구해 라켓을 가운데에 마춤
var rky2 = boxy + boxheight / 2 - rkH / 2;          //라켓의 y좌표를 구함 박스의 중심에서 라켓의 길이를 /2로 구해 라켓을 가운데에 마춤
var l_up, l_down, r_up, r_down;
var racketspeed = 10;                               //라켓의 속도를 설정
var score1 = 0, score2 = 0;                         //스코어 설정


function set_key() {                                //키가 눌렸을 때 함수
	if (event.keyCode === 38) { r_up = 1; }
    if (event.keyCode === 40) { r_down = 1; }
	if (event.keyCode === 87) { l_up = 1; }
	if (event.keyCode === 83) { l_down = 1; }
}
function stop_key() {                               //키가 떼어졌을때 함수
	if (event.keyCode === 38) { r_up = 0; }
	if (event.keyCode === 40) { r_down = 0; }
	if (event.keyCode === 87) { l_up = 0; }
	if (event.keyCode === 83) { l_down = 0; }
}

document.onkeydown = set_key;                       //키가 눌려졌는지 확인하는 이벤트
document.onkeyup = stop_key;                        //키가 그만 눌려졌는지 확인하는 이벤트


function update() {
    if (l_up) { rky1 -= racketspeed; }             //up키가 눌려졌을 때 위로 올라가기 위해 y좌표에서 뺌
	if (l_down) { rky1 += racketspeed; }           //down키가 눌려졌을 때 아래로 내려가기 위해 y 좌표에서 더함
	if (r_up) { rky2 -= racketspeed; }             //up키가 눌려졌을 때 위로 올라가기 위해 y좌표에서 뺌
	if (r_down) { rky2 += racketspeed; }           //down키가 눌려졌을 때 아래로 내려가기 위해 y 좌표에서 더함

	if (rky1 <= boxy) { rky1 = boxy; }             //라켓의 y좌표가 박스를 넘지 않도록 설정
	if (rky1 >= boxy + boxheight - rkH) { rky1 = boxy + boxheight - rkH; } //라켓의 y좌표가 박스를 넘지 않도록 설정
	if (rky2 <= boxy) { rky2 = boxy; }
	if (rky2 >= boxy + boxheight - rkH) { rky2 = boxy + boxheight - rkH; }
    
    ballx += velocityx;                             //볼의 x축 움직임을 구현
    if (ballx + ballRad > boxx + boxwidth) {        //볼이 오른쪽박스의 벽에 충돌하면
        ballx = boxx + boxwidth - ballRad;          //볼의 x좌표를 수정한다
        velocityx *= -1;                            //볼의 x방향을 수정한다
        score1 += 1;                                //스코어를 늘린다
    }
    if (ballx - ballRad < boxx) {                   //볼이 왼쪽 벽에 충돌하면
        ballx = boxx + ballRad;                     //좌표를 수정한다
        velocityx *= -1;                            //방향을 수정한다
        score2 += 1;                                //스코어를 늘린다
    }
    bally += velocityy;                             //볼의 y축 움직임을 구현
    if (bally + ballRad > boxy + boxheight) {       //아래쪽 벽에 충돌하면
        bally = boxy + boxheight - ballRad;         //볼의 y좌표를 수정한다
        velocityy *= -1;                            //볼의 y방향을 수정한다
    }
    if (bally - ballRad < boxy) {                   //볼이 위쪽벽에 충돌하면
        bally = boxy + ballRad;                     //좌표를 수정한다
        velocityy *= -1;                            //방향을 수정한다
    }
    if (score1 === 10 || score2 === 10) {           //스코어가 10이 되면 스코어를 초기화한다
        score1 = 0;
        score2 = 0;
    }
    if (ballx + ballRad > rkx2 && bally > rky2 && bally < rky2 + rkH && velocityx > 0 && ballx < rkx2) {    //라켓에 충돌하면 볼의 방향을 바꿈
        ballx = rkx2 - ballRad;
        velocityx = -velocityx;
    }
    if (ballx - ballRad < rkx1 + rkW && bally > rky1 && bally < rky1 + rkH && velocityx < 0 && ballx > rkx1 + rkW) {
        ballx = rkx1 + rkW + ballRad;
        velocityx = -velocityx;
    }
}


function drawRacket() {                             //라켓을 그리는 함수
	ctx.fillStyle = "black";                        //색상을 블랙으로 설정
	ctx.fillRect(rkx1, rky1, rkW, rkH);             //라켓을 그림
	ctx.fillRect(rkx2, rky2, rkW, rkH);
}
function drawCourt() {                              //코트를 그림
    var x = vcanvas.width / 2, y = vcanvas.height / 2, rad = vcanvas.height / 4;    //x,y좌표를 박스의 반으로 설정 반지름은 높이의 1/4로 설정

    ctx.beginPath();
    ctx.arc(x, y, rad, 0, Math.PI * 2, true);       //박스 가운데에 원을 설정함
    ctx.lineWidth = 5;                              //선 두께를 설정
    ctx.stroke();                                   //위의 설정을 그림
    ctx.beginPath();                                //다시 새로운 그림을 그림
    ctx.moveTo(x, boxy);                            //(x,boxy)에 점을 찍고 
    ctx.lineTo(x, boxy + boxheight);                //(x, boxy+boxheight)까지 라인을 설정
    ctx.stroke();                                   //그림을 그림

    ctx.font = "130px Arial";                       //폰트를 설정
    ctx.fillText(score1, x - 110, y + 40);          //스코어를 그릴 위치를 잡음
    ctx.fillText(score2, x + 40, y + 40);
}
function drawBox() {
	ctx.lineWidth = lineW;
	ctx.strokeRect(boxx, boxy, boxwidth, boxheight);
}
function drawBall() {
	ctx.beginPath();
	ctx.arc(ballx, bally, ballRad, 0, Math.PI * 2);
	ctx.fillStyle = "rgb(200,0,50)";
	ctx.fill();
}
function gameLoop() {                               //게임루프의 순서는 레이어구조 같음 
	update();
    ctx.clearRect(0, 0, vcanvas.width, vcanvas.height);
	
    drawBox();
	drawBall();
	drawRacket();
    drawCourt();

}
function init() {
	vcanvas = document.getElementById("myCanvas");
	ctx = vcanvas.getContext("2d");
	setInterval(gameLoop, 30);

	
}