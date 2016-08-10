var fruits = function(){
	this.num = 22;
	this.aneID = [];
	this.x = [];
	this.y = [];
	this.fruitsLength = [];
	this.vol = [];
	this.orange = new Image();
	this.blue = new Image();
	this.isAlive = [];
	this.fruitColor = [];
	this.idArray = new Array();
	this.init = function(cans,aneObj){
		this.orange.src = "img/fruit.png";
		this.blue.src = "img/blue.png";
		
		for(var i = 0 ; i < this.num ; i++){
			this.aneID[i] = -1;
			this.y[i] = 0;
			this.x[i] = 0;
			this.isAlive[i] = false;
			this.vol[i] = Math.random()*0.1 + 0.005;
			this.born(i,cans,aneObj);
		}
	}
	this.draw = function(cans,cxt,aneObj){	
//		console.log("alive");
		for(var j = 0 ; j < this.num ; j++){
			if(this.y[j] <= 0){
				this.isAlive[j] =false;
//				this.idArrays[j] = -1;
			}
			if(this.isAlive[j]){
				if(this.fruitsLength[j] < aneObj.lWidth){
					this.fruitsLength[j] += this.fruitsLength[j]*this.vol[j];
					cxt.drawImage(this.fruitColor[j],aneObj.fruitX[this.aneID[j]]-this.fruitsLength[j]*0.5,aneObj.fruitY[this.aneID[j]]-this.fruitsLength[j]*0.5,this.fruitsLength[j],this.fruitsLength[j]);

				}else{
					this.x[j] = aneObj.fruitX[this.aneID[j]] - Math.random() * 1;
					this.y[j] -= this.fruitsLength[j]*this.vol[j];
					cxt.drawImage(this.fruitColor[j],this.x[j]-this.fruitsLength[j]*0.5,this.y[j]-this.fruitsLength[j]*0.5,this.fruitsLength[j],this.fruitsLength[j]);
					
				}
	//			console.log(this.fruitsLength[j]);
//				cxt.drawImage(this.fruitColor[j],this.x[j]-this.fruitsLength[j]*0.5,this.y[j]-this.fruitsLength[j]*0.5,this.fruitsLength[j],this.fruitsLength[j]);
				
			}else{
//				this.born(j,cans,aneObj);
			}
		}
	}
	this.born = function(i,cans,aneObj){
//		var isOver = false;
//		var aneID = Math.floor(Math.random()*aneObj.num);
//		while(!isOver){
//			if(this.isDoubleId[aneID]){
//				aneID = Math.floor(Math.random()*aneObj.num);
//			}else{
//				this.isDoubleId[aneID] = true;
//				this.x[i] = aneObj.x[aneID];
//				this.y[i] = cans.height - aneObj.length[aneID];
//				isOver = true;
//			}	
//		}
//		this.fruitsLength[i] = 0.1;
//		this.isAlive[i] = true;
		
		this.aneID[i] = Math.floor(Math.random()*aneObj.num);
		this.y[i] = aneObj.fruitY[this.aneID[i]];
		this.fruitsLength[i] = 0.1;
		this.isAlive[i] = true;
		//随机产生蓝（0.3）或橙（0.7）的果实
		if(Math.random() < 0.3){
			this.fruitColor[i] = this.blue;
		}else{
			this.fruitColor[i] = this.orange;
		}
	}
	this.controlNum = function(cans,aneObj){
		for(var j = 0 ; j <this.num ; j++){
			if(!this.isAlive[j]){
				this.born(j,cans,aneObj);
			}
		}
	}
}
