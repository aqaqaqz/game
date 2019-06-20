var ballObj = (p)=>{
	var ballImg = p.ballImg;
	var ctx = p.ctx;
	var MAX_X = p.MAX_X;
	var MAX_Y = p.MAX_Y;
	var pos = {y:MAX_Y/2, x:MAX_X/2};

	var speed = 3;
	var vector = {x:3, y:2}; 

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
		pos.x += vector.x;
		pos.y += vector.y;
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
			pos.y = barInfo.pos.y-barInfo.height;
			vector.y *= -1;
			vector.x;
		}
	}

	var changeBallVector = (obj)=>{
		//거지같은 수학 신발 수정필요함
		var incline = vector.y/vector.x;
		var r = $(ballImg).width()/2;
		var c = pos.y+r-(pos.x+r)*incline;
		
		var tx = Math.abs((obj.pos.x-c)*(1/incline)/vector.x);
		tx = Math.min(tx, Math.abs((obj.pos.x+obj.width-c)*(1/incline)/vector.x));
		var ty = Math.abs((obj.pos.x*incline + c)/vector.y);
		ty = Math.min(ty, Math.abs(((obj.pos.x+obj.width)*incline + c)/vector.y));

		if(tx > ty){
			vector.x *= -1;
			pos.x += vector.x;
		}else{
			vector.y *= -1;
			pos.y += vector.y;
		}
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