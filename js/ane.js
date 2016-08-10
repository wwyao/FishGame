var ane = function(){
	this.lWidth = 20;
	this.rootX = [];
	this.rootY = [];
	this.controlX = [];
	this.controlY = []
	this.headX = [];
	this.headY = [];
	this.fruitX = [];
	this.fruitY = [];
	this.amp = [];
	this.degree;
	this.num = 46;
	this.init = function(height){
		this.degree = 0;
		for(var i = 0 ; i < this.num ; i++){
			this.rootX[i] = i*18 + Math.random() * 25;
			this.rootY[i] = height;
			this.controlX[i] = this.rootX[i];
			this.controlY[i] = height*0.8;
			this.headX[i] = this.rootX[i];
			this.headY[i] = height*0.7 - Math.random() * 100;
			this.fruitX[i] = this.headX[i];
			this.fruitY[i] = this.headY[i];
			this.amp[i] = Math.random() * 30 + 50;
		}
//		console.log("aaa");
	}
	//绘制海葵
	this.draw = function(cans,cxt){
		this.degree += deltaTime * 0.001;
		var l = Math.sin(this.degree);
		cxt.save();
		cxt.strokeStyle = "rgba(55,12,77,0.6)";
		cxt.lineWidth = this.lWidth;
		cxt.lineCap = "round";
		for(var i = 0 ; i < this.num ; i++){
			cxt.beginPath();
			cxt.moveTo(this.rootX[i],this.rootY[i]);
			this.fruitX[i] = this.headX[i] + l * this.amp[i];
			cxt.quadraticCurveTo(this.controlX[i],this.controlY[i],this.headX[i] + l * this.amp[i],this.headY[i]);
			cxt.stroke();
			cxt.closePath();
		}
		cxt.restore();
	}
}

