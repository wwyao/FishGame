var bigFish = function(){
	this.x;
	this.y;
	this.angle;
	this.bigBody = new Image();
	this.bigBodyOrange = [];
	this.bigBodyBlue = [];
	this.bigBodyIndex;
	this.bigBodyTimer;
	
	this.bigTail = [];
	this.bigTailIndex;
	this.bigTailTimer;
	
	this.bigEyes = [];
	this.bigEyesIndex;
	this.bigEyesTimer;
	this.bigEyesInterval;
	
	this.init = function(){
		this.x = canvas1.width*0.5;
		this.y = canvas1.height*0.5;
		this.angle = 0;
		
		this.bigBodyIndex = 0;
		this.bigBodyTimer = 0;
		this.bigBody.src = "img/bigSwim0.png";
		for(var i =  0 ; i < 8 ; i++){
			this.bigBodyOrange[i] = new Image();
			this.bigBodyOrange[i].src = "img/bigSwim" + i + ".png";
			this.bigBodyBlue[i] = new Image();
			this.bigBodyBlue[i].src = "img/bigSwimBlue" + i + ".png";
		}
		
		this.bigTailIndex = 0;
		this.bigTailTimer = 0;
		for(var i =  0 ; i < 8 ; i++){
			this.bigTail[i] = new Image();
			this.bigTail[i].src = "img/bigTail" + i + ".png";
		}
		
		this.bigEyesIndex = 0;
		this.bigEyesTimer = 0;
		for(var i =  0 ; i < 2 ; i++){
			this.bigEyes[i] = new Image();
			this.bigEyes[i].src = "img/bigEye" + i + ".png";
		}
		this.bigEyesInterval = 1000;
	}
	
	this.draw = function(){
		this.x = lerpDistance(mX, this.x,0.96);
		this.y = lerpDistance(mY, this.y,0.96);
			
		var deltaX = mX - this.x;
		var deltaY = mY - this.y;
		var beta = Math.atan2(deltaY,deltaX)+Math.PI;
		this.angle = lerpAngle(beta,this.angle,0.6);
		
		//摆尾
		this.bigTailTimer += deltaTime;
		if(this.bigTailTimer > 70){
			this.bigTailIndex = (this.bigTailIndex + 1) % 8 ;
			this.bigTailTimer %= 70;
		}
		//眨眼
		this.bigEyesTimer += deltaTime;
		if(this.bigEyesTimer > this.bigEyesInterval){
			this.bigEyesIndex = (this.bigEyesIndex + 1) % 2 ;
			this.bigEyesTimer %= this.bigEyesInterval;
			if(this.bigEyesIndex == 0){
				this.bigEyesInterval = Math.random()*1500 + 2000;
			}else{
				this.bigEyesInterval = 200;
			}
		}
		//身体变化
		this.bigBodyTimer += deltaTime;
		if(this.bigBodyTimer > 300){
			this.bigBodyIndex = (this.bigBodyIndex + 1);
			if(this.bigBodyIndex > 7){
				this.bigBodyIndex = 7;
			}
			this.bigEyesTimer %= 300;
		}
		
		context1.save();
		context1.translate(this.x,this.y);
		context1.rotate(this.angle);
		if(fruitsData.fColor == 0){
			context1.drawImage(this.bigBody,-this.bigBody.width*0.5,-this.bigBody.height*0.5);
		}else if(fruitsData.fColor == 1){
			context1.drawImage(this.bigBodyOrange[this.bigBodyIndex],-this.bigBodyOrange[this.bigBodyIndex].width*0.5,-this.bigBodyOrange[this.bigBodyIndex].height*0.5);
		}else{
			context1.drawImage(this.bigBodyBlue[this.bigBodyIndex],-this.bigBodyBlue[this.bigBodyIndex].width*0.5,-this.bigBodyBlue[this.bigBodyIndex].height*0.5);
		}

		context1.drawImage(this.bigEyes[this.bigEyesIndex],-this.bigEyes[this.bigEyesIndex].width*0.5 - 2,-this.bigEyes[this.bigEyesIndex].height*0.5);
		context1.drawImage(this.bigTail[this.bigTailIndex],-this.bigTail[this.bigTailIndex].width*0.5 + 30,-this.bigTail[this.bigTailIndex].height*0.5);
		context1.restore();
	}
}
