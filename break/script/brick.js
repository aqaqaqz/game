var brickObj = (p)=>{
	var brickImg1 = p.brickImg1;
	var brickImg2 = p.brickImg2;
	var ctx = p.ctx;
	var MAX_X = p.MAX_X;
	var MAX_Y = p.MAX_Y;
	var brickInfo = p.brickInfo;

	var width = MAX_X/brickInfo[0].length;
	var height = MAX_Y/brickInfo.length;

	var draw = ()=>{
		ctx.beginPath();
		ctx.fillRect(0,0,MAX_X,MAX_Y);
		ctx.drawImage(brickImg1, 0, 0);
		
		ctx.fillStyle = "yellow";
		for(var h=0;h<brickInfo.length;h++){
			for(var w=0;w<brickInfo[h].length;w++){
				if(brickInfo[h][w] == 1){
					ctx.drawImage(brickImg2, w*width, h*height, width, height, w*width, h*height, width, height);
				}
			}
		}
		ctx.fill();
	}

	var getBrickInfo = ()=>{
		return {brickInfo:brickInfo, width:width, height:height};
	}
	var setBrickInfo = (h, w, val)=>{
		brickInfo[h][w] = val;
	}

	return {draw:draw, getBrickInfo:getBrickInfo, setBrickInfo:setBrickInfo};
}