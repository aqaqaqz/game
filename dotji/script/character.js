var characterObj = (p)=>{
	var obj;
	var key = {l:false, r:false, u:false, d:false}; 
	var pos = {y:p.y, x:p.x};
	var life = 3;
	var power = 1;
	var speed = 3;

	var keyDown = (e)=>{
		if(e.keyCode == 37) key.l = true;
		if(e.keyCode == 39) key.r = true;
		if(e.keyCode == 38) key.u = true;
		if(e.keyCode == 40) key.d = true;
	}

	var keyUp = (e)=>{
		if(e.keyCode == 37) key.l = false;
		if(e.keyCode == 39) key.r = false;
		if(e.keyCode == 38) key.u = false;
		if(e.keyCode == 40) key.d = false;
	}

	var updatePos = ()=>{
		if(key.l && (pos.x-speed>=0)) pos.x-=speed;
		if(key.r && (pos.x+speed<=p.MAX_X)) pos.x+=speed;
		if(key.u && (pos.y-speed>=0)) pos.y-=speed;
		if(key.d && (pos.y+speed<=p.MAX_Y)) pos.y+=speed;
	}

	var uptPosAndDrawChar = (ship, ctx)=>{
		updatePos();
		ctx.beginPath();
		ctx.drawImage(ship, pos.x, pos.y);
		ctx.fill();
	}

	obj = {keyDown:keyDown, keyUp:keyUp, uptPosAndDrawChar:uptPosAndDrawChar};

	return obj;
}