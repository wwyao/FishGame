var canvas1,canvas2;
var context1,context2;
//上一帧执行的时间
var lastTime;
//两帧之间的时间差
var deltaTime;
//海葵
var ane;
//果实
var fruits;
//大鱼
var bigFish;

//小鱼
var smallFish;

//漂浮物
var floater;

//背景图片
var bgImg = new Image();

//果实的数据
var fruitsData;

//吃果实的特效对象
var eatFruitEffect;

//喂小鱼的特效对象
var feedSmallFishEffect;

var isStart;

var startTip;

var startGame;

var restart;

var mX = 100,mY = 100;

window.onload = function(){
	init();
	isStart = true;
	fruitsData.isGameOver = true;
	gameLoop();

}

function init(){
	
	
	//fishes dust UI circle 绘制在canvas1
	canvas1 = document.getElementById("canvas1");
//	canvas1.width = document.documentElement.clientWidth * 0.6;
//	canvas1.height = document.documentElement.clientHeight * 0.9;
	canvas1.width = 800;
	canvas1.height = 520;
	//background ane fruits 绘制在canvas2
	canvas2 = document.getElementById("canvas2");
//	canvas2.width = document.documentElement.clientWidth * 0.6;
//	canvas2.height = document.documentElement.clientHeight * 0.9;
	canvas2.width = 800;
	canvas2.height = 520;
	
	
	startTip = document.getElementById("startTip");
	startTip.style.cssText = "width: "+ canvas1.width*0.2 +"px;height: "
							 + canvas1.height*0.3 +"px;left:"+canvas1.width*0.4
							 +"px;margin-top:"+canvas1.height * 0.25 + "px;";
	
	startGame = document.getElementById("btnStartGame");
	startGame.addEventListener("click",function(){
		isStart = false;
		fruitsData.isGameOver = false;
		smallFish.smallBobyIndex = 0;
		startTip.style.display = "none";
	});
	
	restart = document.getElementById("restart");
	restart.addEventListener("click",function(){
		isStart = false;
		fruitsData.isGameOver = false;
		smallFish.smallBobyIndex = 0;
		fruitsData.score = 0;
		fruitsData.fruitsNum = 0;
		fruitsData.fColor = 0;
		restart.style.display = "none";
	});
	
	
	console.log(document.documentElement.clientWidth + ":" + document.documentElement.clientHeight);
	
	if(canvas1.getContext){
		context1 = canvas1.getContext("2d");
		context1.fillStyle = "white";
		context1.textAlign = "center";
		
	}
	if(canvas2.getContext){
		context2 = canvas1.getContext("2d");
	}
	
	canvas1.addEventListener("mousemove",onMouseMove,false);
//	canvas1.addEventListener("click",onClick,false);
	
	bgImg.src = "img/background.jpg";
	
	lastTime = new Date();
	
	//初始化海葵对象
	ane = new ane();
	ane.init(canvas2.height);
	
	//初始化果实对象
	fruits = new fruits();
	fruits.init(canvas2,ane);
	
	//初始化大鱼对象
	bigFish = new bigFish();
	bigFish.init();
	
	//初始化小鱼对象
	smallFish = new smallFish();
	smallFish.init();
	
	//初始化漂浮物对象
	floater = new floater();
	floater.init(canvas1.width,canvas1.height);
	
	fruitsData = new FData();
	
	eatFruitEffect = new eatFruitEffect();
	eatFruitEffect.init();
	
	feedSmallFishEffect = new feedSmallFishEffect();
	feedSmallFishEffect.init();
	
	isStart = false;
	
}
function gameLoop(){
	
	requestAnimationFrame(gameLoop);
	var now =  Date.now();
	deltaTime = now - lastTime;
	lastTime = now;

	context1.clearRect(0,0,canvas1.width,canvas1.height);

	//绘制背景
	drawBg(context2,bgImg,canvas2.clientLeft,canvas2.clientTop,canvas2.width,canvas2.height);
	//绘制海葵
	ane.draw(canvas2,context2);
	fruits.controlNum(canvas2,ane);
	//绘制果实
	fruits.draw(canvas2,context2,ane);
	//绘制大鱼
	bigFish.draw();
	//绘制小鱼
	smallFish.draw();
	
	floater.draw(context1,deltaTime);
	
	fruitsData.draw();
	eat();
	feedBaby();
	eatFruitEffect.draw(context1);
	feedSmallFishEffect.draw(context1);
	
	//是否显示开始界面
	if(isStart){
		drawStartTip(canvas1,context1);
	}
	
}

function onMouseMove(e){
	if(!fruitsData.isGameOver && !isStart){
		if(e.offsetX || e.layerX){
			mX = undefined == e.offsetX ? e.layerX : e.offsetX;
			mY = undefined == e.offsetY ? e.layerY : e.offsetY;
		}
	}
}

function onClick(e){
	if(isStart){
		
		var x = e.clientX;
		var y = e.clientY;
		var middleX = canvas1.width * 0.5 + window.screen.width * 0.2;
		var middleY = canvas1.height * 0.5 + window.screen.height * 0.05;
		if( middleX - 50  < x && x < middleX + 90 && middleY + 30 < y && y < middleY + 70){
			isStart = false;
			fruitsData.isGameOver = false;
			smallFish.smallBobyIndex = 0;
		}
		
		console.log(x + ":" + y + ":" + middleX + ":" + middleY);
	}
}

function drawStartTip(canvasObj,cxt){
//	var mX = canvasObj.width * 0.5;
//	var mY = canvasObj.height * 0.5;
//	cxt.save();
//	cxt.globalAlpha = 0.6;
//	cxt.fillRect(mX * 0.5 , mY * 0.15, canvasObj.width * 0.4,canvasObj.height * 0.6);
//	cxt.globalAlpha = 1;
//	cxt.fillStyle = "#880000";
//	cxt.font = "28px serif";
//	cxt.fillText("游戏说明",canvasObj.width * 0.5 + 20, canvasObj.height * 0.5 - 160);
//	cxt.font = "14px serif";
//	cxt.fillText("  通过鼠标控制大鱼去吃果实，然后",canvasObj.width * 0.5 + 20, canvasObj.height * 0.5 - 120);
//	cxt.fillText("  去喂小鱼，从而得到分数，如果不",canvasObj.width * 0.5 + 20, canvasObj.height * 0.5 - 90);
//	cxt.fillText("  喂小鱼，小鱼则经过一段时间后死",canvasObj.width * 0.5 + 20, canvasObj.height * 0.5 - 60);
//	cxt.fillText("  亡,游戏结束。",canvasObj.width * 0.5 + 20, canvasObj.height * 0.5 - 30);
//	cxt.font = "35px serif";
//	cxt.strokeRect(canvasObj.width * 0.5 - 50,canvasObj.height * 0.5 + 10,140,50);
//	cxt.strokeText("开始游戏",canvasObj.width * 0.5 + 20, canvasObj.height * 0.5 + 50);
//	cxt.restore();
}
