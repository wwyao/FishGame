var FData = function(){
	//吃到的果实的数量
	this.fruitsNum = 0;
	//吃到的果实的颜色  0--没吃到果实  1--橙色果实  2--蓝色果实
	this.fColor = 0;
	//分数
	this.score = 0;
	//用来判断游戏是否结束
	this.isGameOver = false;
	//字体的透明度
	this.alpha = 0;
	
	//绘制分数及gameover
	this.draw = function(){
		var width = canvas1.width;
		var height = canvas1.height;
		context1.save();
		context1.shadowBlur = 10;
		context1.shadowColor = "white";
		context1.font = "24px serif";
		context1.fillText("SCORE:"+this.score,width*0.5,height-80);
		
		if(this.isGameOver && !isStart){
			this.alpha += 0.01;
			context1.font = "40px serif";
			context1.fillStyle = "rgba(255,255,255,"+ this.alpha +")";
			context1.fillText("GAME OVER",width*0.5,height*0.5);
			
			if(this.alpha > 0.4){
				restart.style.cssText = "display:block";
			}
		}
		context1.restore();
	}
	//更新分数 
	this.updateScore = function(){
		var grade = 0;
		if(this.fColor == 0){
			grade = 0;
		}else if(this.fColor == 1){
			grade = 100;
		}else{
			grade = 200;
		}
		this.score = this.score + this.fruitsNum * grade;
		this.fruitsNum = 0;
		this.fColor = 0;
	}
}
