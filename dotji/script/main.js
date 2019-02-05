$(document).ready(function(){
	var MAX_Y = 800;
	var MAX_X = 600;
	var c = characterObj({
		y : MAX_Y/2+200,
		x : MAX_X/2,
		MAX_Y : MAX_Y,
		MAX_X : MAX_X
	});
	var b = bulletObj({
		MAX_Y : MAX_Y,
		MAX_X : MAX_X
	});
	
	var ship = document.getElementById("ship");
	var canvas = $("#canvas")[0];
	var ctx = canvas.getContext("2d");
	var timer = 0;

	function drawBackground(ctx){
		ctx.beginPath();
		ctx.fillStyle = "black";
		ctx.fillRect(0, 0, MAX_X, MAX_Y);
		ctx.fill();
	}
	
	function update() {
		timer++;
		drawBackground(ctx);
		c.uptPosAndDrawChar(ship, ctx);
		b.uptPosAndDrawBullet(ctx);
		if(timer%5 == 0) 
			b.createBullet({type:1, y:MAX_Y/2-200, x:MAX_X/2});
	}

	var fnInit = ()=>{
		$("body").keydown(function(e){ c.keyDown(e); });
		$("body").keyup(function(e){ c.keyUp(e) });
		$("#canvas").attr("height", MAX_Y);
		$("#canvas").attr("width", MAX_X);

		setInterval(update, 15);
	};
	fnInit();
});