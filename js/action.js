function eat(){
	if(!fruitsData.isGameOver){
		for(var i = 0 ; i < fruits.num ; i++){
			if(fruits.isAlive[i] && fruits.fruitsLength[i] >= ane.lWidth){
				var l = calLength2(fruits.x[i],fruits.y[i],bigFish.x,bigFish.y);
				if(l < 200){
					fruits.isAlive[i] = false;
					fruitsData.fruitsNum++;
					if(fruits.fruitColor[i] == fruits.blue){
						fruitsData.fColor = 2;
					}else if(fruits.fruitColor[i] == fruits.orange){
						fruitsData.fColor = 1;
					}else{
						fruitsData.fColor = 0;
					}
					eatFruitEffect.born(fruits.x[i],fruits.y[i],"white",20);
				}
			}
		}
	}
	
}
 function feedBaby(){
 	if(!fruitsData.isGameOver && fruitsData.fColor != 0){
	 	var l = calLength2(smallFish.x,smallFish.y,bigFish.x,bigFish.y);
				if(l < 200){
					smallFish.smallBobyIndex = 0;
					bigFish.bigBodyIndex = 0;
					fruitsData.updateScore();
					feedSmallFishEffect.born(smallFish.x,smallFish.y,"#ffff00",20);
				}
	}
 }
