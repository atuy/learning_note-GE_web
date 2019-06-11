var ctx, vcanvas;

//색상을 랜덤으로 출력하는 함수
function makec() {
	var x, y, z;
	x = Math.floor(Math.random() * 256);
	y = Math.floor(Math.random() * 256);
	z = Math.floor(Math.random() * 256);
	return "rgb(" + x + "," + y + "," + z + ")";
}

//선을 랜덤으로 출력하는 함수
function drawline() {
	var x, y, x1, y1;
	x = (Math.floor(Math.random() * vcanvas.width));
	y = (Math.floor(Math.random() * vcanvas.height));
	x1 = (Math.floor(Math.random() * vcanvas.width));
	y1 = (Math.floor(Math.random() * vcanvas.height));
	//(x,y)좌표와 (x1,y1)좌표를 랜덤으로 잡아준다
    
	ctx.moveTo(x, y);	
	ctx.lineTo(x, y);	
	ctx.lineTo(x1, y1);
	ctx.strokeStyle = makec();
	ctx.stroke();
}

//사각형을 랜덤으로 출력하는 함수
function drawrec()
{
	var x,y,h,w;
	var flag = (Math.floor(Math.random()*2));
	x=(Math.floor(Math.random()*vcanvas.width));
	y=(Math.floor(Math.random()*vcanvas.height));
	w=(Math.floor(Math.random()*400));
	h=(Math.floor(Math.random()*400));   
	//플래그를 통해 색을 채워서 그릴지 선만 그릴지 결정함
    if(flag==1)
		{
			ctx.fillStyle=makec();
			ctx.fill();
		}
	else
	{
		ctx.strokeStyle=makec();
		ctx.strokeRect(x,y,w,h);
	}
	
}

//원을 랜덤으로 출력하는 함수
function drawcir()
{
	var x,y,r;
	var flag = (Math.floor(Math.random()*2));
	x=Math.floor(Math.random()*vcanvas.width);
	y=Math.floor(Math.random()*vcanvas.height);
	r=Math.floor(Math.random()*150)+50
	ctx.beginPath();
	ctx.arc(x,y,r,0,2*Math.PI);
    //플래그를 통해 색을 채워서 그릴지 선만 그릴지 결정함
	if(flag==1)
		{
			ctx.fillStyle=makec();
			ctx.fill();
		}
	else
	{
		ctx.strokeStyle=makec();
		ctx.stroke();
	}
	
	

}

// 태극을 그리는 함수
function draw(x,y,r)
{
	ctx.beginPath();
	ctx.arc(x,y,r,0,Math.PI,true);
	ctx.fillStyle="red";
	ctx.fill();
	ctx.beginPath();
	ctx.arc(x,y,r,0,Math.PI);
	ctx.fillStyle="blue";
	ctx.fill();
	
	ctx.beginPath();
	ctx.arc(x-r/2,y,r/2,0,Math.PI);
	ctx.fillStyle="red";
	ctx.fill();
	
	ctx.beginPath();
	ctx.arc(x+r/2,y,r/2,0,Math.PI,true);
	ctx.fillStyle="blue";
	ctx.fill();
	
}

//애니메이션을 위한 루프함수
function loop()
{
	var i;
	i=(Math.floor(Math.random()*3));

	if(i==0)
		{
			drawline();
		}
	else if(i==1)
		{
			drawrec();
		}
	else
	{
		drawcir();
	}
	draw(400,400,80);
}

//시작함수
function init() 
{
	vcanvas = document.getElementById("myCanvas")
	ctx=vcanvas.getContext("2d");
	setInterval(loop,1000);
	draw(400,400,80);
}