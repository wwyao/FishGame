var smallFish = function(){
	this.x;
	this.y;
	this.angle;
	this.smallBody = [];
	this.smallBobyIndex;
	this.smallBobyTimer;
	
	this.smallTail = [];
	this.smallTailIndex;
	this.smallTailTimer;
	
	this.smallEyes = [];
	this.smallEyesIndex;
	this.smallEyesTimer;
	this.smallEyesInterval;
	
	this.init = function(){
		this.x = bigFish.x;
		this.y = bigFish.y;
		this.angle = 0;
		this.smallBobyIndex = 0;
		this.smallBobyTimer = 0;
		for(var i = 0 ; i < 20 ; i++){
			this.smallBody[i] = new Image();
			this.smallBody[i].src = "img/babyFade"+i+".png";
		}
		
		this.smallTailIndex = 0;
		this.smallTailTimer = 0;
		for(var i =  0 ; i < 8 ; i++){
			this.smallTail[i] = new Image();
			this.smallTail[i].src = "img/babyTail" + i + ".png";
		}
		this.smallEyesIndex = 0;
		this.smallEyesTimer = 0;
		for(var i =  0 ; i < 2 ; i++){
			this.smallEyes[i] = new Image();
			this.smallEyes[i].src = "img/babyEye" + i + ".png";
		}
		this.smallEyesInterval = 1000;
	}
	
	this.draw = function(){
		this.x = lerpDistance(bigFish.x, this.x,0.96);
		this.y = lerpDistance(bigFish.y, this.y,0.96);
			
		var deltaX = bigFish.x - this.x;
		var deltaY = bigFish.y - this.y;
		var beta = Math.atan2(deltaY,deltaX)+Math.PI;
		this.angle = lerpAngle(beta,this.angle,0.3);
		//摆尾
		this.smallTailTimer += deltaTime;
		if(this.smallTailTimer > 70){
			this.smallTailIndex = (this.smallTailIndex + 1) % 8 ;
			this.smallTailTimer %= 70;
		}
		//眨眼
		this.smallEyesTimer = this.smallEyesTimer + deltaTime;
		if(this.smallEyesTimer > this.smallEyesInterval){
			this.smallEyesIndex = (this.smallEyesIndex + 1) % 2 ;
			this.smallEyesTimer %= this.smallEyesInterval;
			if(this.smallEyesIndex == 0){
				this.smallEyesInterval = Math.random()*1500 + 2000;
			}else{
				this.smallEyesInterval = 200;
			}
		}
		//身体变化
		this.smallBobyTimer += deltaTime;
		if(this.smallBobyTimer > 200){
			this.smallBobyIndex += 1;
			if(this.smallBobyIndex > 19){
				this.smallBobyIndex = 19;
				//game over
				fruitsData.isGameOver = true;
			}
			this.smallBobyTimer %= 200;
		}
		
		context1.save();
		context1.translate(this.x,this.y);
		context1.rotate(this.angle);
		context1.drawImage(this.smallTail[this.smallTailIndex],-this.smallTail[this.smallTailIndex].width*0.5 + 24,-this.smallTail[this.smallTailIndex].height*0.5);
		context1.drawImage(this.smallBody[this.smallBobyIndex],-this.smallBody[this.smallBobyIndex].width*0.5,-this.smallBody[this.smallBobyIndex].height*0.5);
		context1.drawImage(this.smallEyes[this.smallEyesIndex],-this.smallEyes[this.smallEyesIndex].width*0.5 - 2,-this.smallEyes[this.smallEyesIndex].height*0.5);
		context1.restore();
	}
}
