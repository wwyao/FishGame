var floater = function(){
	this.x = [];
	this.y = [];
	this.num;
	this.degree;
	this.amp = [];
	this.imgs = [];
	this.NO = [];
	
	this.init = function(canvasWidth,canvasHeight){
		this.num = 30;
		for(var i = 0 ; i < this.num ; i++){
			this.x[i] = Math.random() * canvasWidth;
			this.y[i] = Math.random() * canvasHeight;
			this.amp[i] = 20 + Math.random() * 25;
			this.NO[i] = Math.floor(Math.random() * 7);
		}
		this.degree = 0;
		for(var i = 0 ; i < 7 ; i++){
			this.imgs[i] = new Image();
			this.imgs[i].src = "img/dust" + i + ".png";
		}
	}
	
	this.draw = function(cxt,intervalTime){
		this.degree += intervalTime * 0.001;
		var l = Math.sin(this.degree);
		for(var i = 0 ; i < this.num ; i++){
			context1.drawImage(this.imgs[this.NO[i]],this.x[i]+this.amp[i]*l,this.y[i]);
		}
	}
}
