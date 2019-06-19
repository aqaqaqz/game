$(document).ready(function(){
	var MAX_Y = 500;
	var MAX_X = 500;

	var canvas = $("#canvas")[0];
	var ctx = canvas.getContext("2d");

	var timer = 0;
	var game;

	var barImg = document.getElementById("barImg");
	var ballImg = document.getElementById("ballImg");
	var brickImg1 = document.getElementById("brickImg1");
	var brickImg2 = document.getElementById("brickImg2");

	var bar = barObj({
		MAX_Y : MAX_Y,
		MAX_X : MAX_X,
		ctx : ctx,
		barImg : barImg
	});
	var brick = brickObj({
		MAX_Y : MAX_Y,
		MAX_X : MAX_X,
		ctx : ctx,
		brickImg1 : brickImg1,
		brickImg2 : brickImg2,
		brickInfo : [
			[1,0,1,0,1,0,1,0],
			[0,1,0,1,0,1,0,1],
			[1,0,1,0,1,0,1,0],
			[0,1,0,1,0,1,0,1],
			[0,0,0,0,0,0,0,0],
			[0,0,0,0,0,0,0,0],
			[0,0,0,0,0,0,0,0],
			[0,0,0,0,0,0,0,0],
			[0,0,0,0,0,0,0,0],
			[0,0,0,0,0,0,0,0],
			[0,0,0,0,0,0,0,0],
			[0,0,0,0,0,0,0,0],
			[0,0,0,0,0,0,0,0],
			[0,0,0,0,0,0,0,0],
			[0,0,0,0,0,0,0,0],
			[0,0,0,0,0,0,0,0],
			[0,0,0,0,0,0,0,0],
			[0,0,0,0,0,0,0,0],
			[0,0,0,0,0,0,0,0],
			[0,0,0,0,0,0,0,0]
		]
	});
	var ball = ballObj({
		MAX_Y : MAX_Y,
		MAX_X : MAX_X,
		ctx : ctx,
		ballImg : ballImg
	});

	function update() {
		timer++;
		
		brick.draw();
		bar.draw();
		ball.draw(brick, bar.getBarInfo());
	}

	var fnInit = ()=>{
		$("body").keydown(function(e){ bar.keyDown(e); });
		$("body").keyup(function(e){ bar.keyUp(e) });
		$("#canvas").attr("height", MAX_Y);
		$("#canvas").attr("width", MAX_X);

		game = setInterval(update, 15);
	};
	fnInit();
});