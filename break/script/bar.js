var barObj = (p)=>{
	var barImg = p.barImg;
	var ctx = p.ctx;
	var MAX_X = p.MAX_X;
	var MAX_Y = p.MAX_Y;
	var key = {l:false, r:false}; 
	var pos = {y:MAX_Y/2+200, x:MAX_X/2-$(barImg).width()/2};
	var life = 3;
	var power = 1;
	var speed = 5;

	var keyDown = (e)=>{
		if(e.keyCode == 37) key.l = true;
		if(e.keyCode == 39) key.r = true;
	}

	var keyUp = (e)=>{
		if(e.keyCode == 37) key.l = false;
		if(e.keyCode == 39) key.r = false;
	}

	var updatePos = ()=>{
		if(key.l && (pos.x-speed>=0)) pos.x-=speed;
		if(key.r && (pos.x+speed<=MAX_X-$(barImg).width())) pos.x+=speed;
	}

	var draw = ()=>{
		updatePos();
		ctx.beginPath();
		ctx.drawImage(barImg, pos.x, pos.y);
		ctx.fill();
	}

	var init = ()=>{
		key.l = false;
		key.r = false;
		pos.y = MAX_Y/2+200;
		pos.x = MAX_X/2;
	}

	var getBarInfo = ()=>{
		return {
			pos:pos, 
			height:$(barImg).height(),
			width:$(barImg).width()
		};
	}

	return {keyDown:keyDown, keyUp:keyUp, draw:draw, pos:pos, init:init, getBarInfo:getBarInfo};
}