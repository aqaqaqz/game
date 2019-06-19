var ballObj = (p)=>{
	var ballImg = p.ballImg;
	var ctx = p.ctx;
	var MAX_X = p.MAX_X;
	var MAX_Y = p.MAX_Y;
	var pos = {y:MAX_Y/2, x:MAX_X/2};

	var speed = 3;
	var vector = {x:1, y:1}; 

	var checkCrash = (obj)=>{
		var barX1 = obj.pos.x;
		var barX2 = obj.pos.x + obj.width;
		var ballX1 = pos.x;
		var ballX2 = pos.x + $(ballImg).width();
		if( !(ballX1<=barX2 && ballX2>=barX1) ) return false;

		var barY1 = obj.pos.y;
		var barY2 = obj.pos.y + obj.height;
		var ballY1 = pos.y;
		var ballY2 = pos.y + $(ballImg).height();
		if( !(ballY1<=barY2 && ballY2>=barY1) ) return false;
		
		return true;
	}

	var updatePos = ()=>{
		//수정필요
		pos.x += speed/vector.x;
		pos.y += speed/vector.y;
	}

	var checkWall = ()=>{
		var r = $(ballImg).width();
		if(pos.x <= 0 || pos.x+r >= MAX_X){
			if(pos.x <= 0) pos.x = 0;
			if(pos.x+r >= MAX_X) pos.x = MAX_X-r;
			vector.x *= -1;
		}
		if(pos.y <= 0 || pos.y+r >= MAX_Y){
			if(pos.y <= 0) pos.y = 0;
			if(pos.y+r >= MAX_Y) pos.y = MAX_Y-r;
			vector.y *= -1;
		}
	}

	var checkBar = (barInfo)=>{
		if(checkCrash(barInfo)){
			changeBallVector(barInfo);
		}
	}

	var changeBallVector = (obj)=>{
		//obj의 충돌 위치에 맞춰서 ball vector갱신 필요.
	}

	var checkBrick = (brickObj)=>{
		var brickInfo = brickObj.getBrickInfo();
		var brickList = brickInfo.brickList;
		for(var h=0;h<brickList.length;h++){
			for(var w=0;w<brickList[h].length;w++){
				if(brickList[h][w] == 1){
					var brick = {
						pos:{x:w*brickInfo.width, y:h*brickInfo.height}, 
						height:brickInfo.height, 
						width:brickInfo.width
					};
					if(checkCrash(brick)){
						brickObj.setBrickList(h, w, 0);
						changeBallVector(brick);
					}
				}
			}
		}
	}

	var draw = (brickObj, barInfo)=>{
		checkWall();
		checkBar(barInfo);
		checkBrick(brickObj);

		updatePos();
		ctx.beginPath();
		ctx.drawImage(ballImg, pos.x, pos.y);
		ctx.fill();
	}

	var init = ()=>{
		key.l = false;
		key.r = false;
		pos.y = MAX_Y/2+200;
		pos.x = MAX_X/2;
	}

	return {draw:draw};
}