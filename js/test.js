(function() {
	'use strict';

	var board = function() {
		var canvas = document.getElementById('board');
		var context = canvas.getContext('2d');

		var gridWidth = 140;
		var gridHeight = 70;
		var gridSquareWidth = 10;

		canvas.width = gridWidth * gridSquareWidth;
		canvas.height = gridHeight * gridSquareWidth;
		// canvas.style.width = canvas.width;
		// canvas.style.height = canvas.height;

		var grid = [];
		var gridNext = [];

		for(var x = 0; x < gridWidth; x++) {
			grid[x] = [];
			gridNext[x] = [];
			
			for(var y=0; y < gridHeight; y++) {
				grid[x][y] = [];
				gridNext[x][y] = [];

				var rand = Math.random()*100;

				if (rand > 44) {
					grid[x][y] = 1;
				}
			}
		}

		function life() {
			for(var x = 0; x < gridWidth; x++) {
				for(var y=0; y < gridHeight; y++){
					var count = countNearby(x,y);

					if (grid[x][y] == 0) {
						if(count == 3) {
							gridNext[x][y] = 1;
						}
					} else {
						if (count < 2 || count > 3) {
							gridNext[x][y] = 0;
						} else {
							gridNext[x][y] = 1;
						}
					}
				}
			}

			grid = gridNext;
		}

		function countNearby(x,y) {
			var count = 0;

			counter(x-1,y-1);
			counter(x-1,y);
			counter(x-1,y+1);
			counter(x,y-1);
			counter(x,y+1);
			counter(x+1,y-1);
			counter(x+1,y);
			counter(x+1,y+1);

			function counter(x, y) {
				if (x > 0 && x < gridWidth && y > 0 && y < gridHeight) {
					if (grid[x][y] == 1) {
						count ++;
					}
				}
			}

			return count;
		}

		function update(dt) {
			life();
			draw();
		}

		function draw() {
			context.fillStyle = '#fee';
			context.fillRect(0,0,canvas.width,canvas.height);

			for(var x = 0; x < gridWidth; x++) {
				for(var y=0; y < gridHeight; y++){
					if (grid[x][y] == 1) {
						context.fillStyle = '#ee66aa';
						context.fillRect(x*gridSquareWidth, y*gridSquareWidth, gridSquareWidth, gridSquareWidth);
					}
				}
			}
		}

		var lastTime;
		function gameLoop() {
			var now = Date.now();
			var dt = (now - lastTime) / 1000.0;

			update(dt);

			lastTime = now;
			window.setTimeout(gameLoop, 50);
		}

		return {
			gameLoop: gameLoop
		};

	};

	var obj = new board();
	obj.gameLoop();
})();