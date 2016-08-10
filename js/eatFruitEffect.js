var eatFruitEffect = function (){
	this.x = [];
	this.y = [];
	this.num;
	this.color;
	this.r = [];
	this.alpha = [];
	this.isAlive = [];
	
	this.init = function(){
		for(var i = 0 ; i < this.num ; i++){
			this.x[i] = 0;
			this.y[i] = 0;
			this.r[i] = 20;
			this.alpha[i] = 0;
			this.isAlive[i] = false;
		}
		this.num = 20;
		
		this.color = "white";
		
		
	}
	this.draw = function(cxt){
		cxt.save();
		cxt.strokeStyle = this.color;
		cxt.lineWidth = 3;
		cxt.shadowBlur = 20;
		cxt.shadowColor = this.color;
		for(var i = 0 ; i < this.num ; i++){
			if(this.isAlive[i]){
				this.r[i] += deltaTime * 0.04;
				if(this.r[i] > 50){
					this.isAlive[i] = false;
					break;
				}
				this.alpha[i] = 1 - this.r[i]/50;
				cxt.beginPath();
				cxt.globalAlpha = this.alpha[i];
				cxt.arc(this.x[i],this.y[i],this.r[i],0,Math.PI * 2 , false);
				cxt.stroke();
				cxt.closePath();
			}
		}
		cxt.restore();
		
	}
	
	this.born = function(x,y,color,r){
		for(var i = 0 ; i < this.num ; i++){
			if(!this.isAlive[i]){
				this.isAlive[i] = true;
				this.x[i] = x;
				this.y[i] = y;
				this.color = color;
				this.r[i] = r;
				return;
			}
		}
	}
}
