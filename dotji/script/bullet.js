var bulletObj = (p)=>{
	var obj;
	var MAX_Y = p.MAX_Y;
	var MAX_X= p.MAX_X;
	var bullet = {
		pos : {x:0, y:0},	//좌표
		vec : {x:0, y:0},	//벡터
		cir : {x:0, y:0},	//회전
		r : 0,				//반경
		vr : 0,				//변화반경
		angle : 0,			//각도
		angleRate : 0,		//변화각도
		type : 0,			//총알타입
		speed : 0,			//속도
		size : 0			//총알크기
	}
	
	var bulletList = [];

	var updatePos = ()=>{
		for(var i=0;i<bulletList.length;i++){
			var b = bulletList[i];
			if(b.type == 1){
				if(!checkValid(b)){
					bulletList.splice(i, 1);
					i--;
				}else{
					b.angle += b.angleRate;
					b.r += b.vr*(parseInt(Math.random()*2)==0?1:-1);

					b.pos.x += b.cir.x + b.r*Math.cos(b.angle);
					b.pos.y += b.cir.y + b.r*Math.sin(b.angle);

					b.vec.x = -b.r*b.angle*Math.sin(b.angle);
					b.vec.y = -b.r*b.angle*Math.cos(b.angle);
				}
			}
		};
	}

	var createBullet = (p)=>{
		if(p.type == 1){
			var b = deepClone(bullet);
			b.pos.x = p.x; 	b.pos.y = p.y;
			b.vec.x = 0;	b.vec.y = 0;
			b.cir.x = Math.random()*(parseInt(Math.random()*2)!=0?1:-1);
			b.cir.y = Math.random()*(parseInt(Math.random()*5)!=0?1:-1);
			b.r = 1;		b.vr = 0.005;
			b.angle = 0;	b.angleRate = 0.05;
			b.type = 1;		b.size = 2;
			b.speed = 0.01;
			bulletList.push(b);
		}
	}

	var uptPosAndDrawBullet = (ctx)=>{
		updatePos();
		
		$.each(bulletList, function(idx, b){
			ctx.beginPath();
			ctx.fillStyle = "white";
			ctx.arc(b.pos.x, b.pos.y, b.size, 0, 2*Math.PI);
			ctx.fill();
		});
	}

	var checkValid = (b)=>{
		if(b.type == 1){
			if(b.pos.x>0 && b.pos.x<MAX_X && b.pos.y>0 && b.pos.y<MAX_Y) return true;
			return false;
		}
	}

	var deepClone = function(obj) { 
		var objectClone = new obj.constructor(); 
		for (var p in obj) {
			if (typeof obj[p] == 'object') 
				objectClone[p] = deepClone(obj[p]); 
			else 
				objectClone[p] = obj[p]; 
		}
		return objectClone; 
	};

	obj = {uptPosAndDrawBullet : uptPosAndDrawBullet, createBullet:createBullet};

	return obj;
}