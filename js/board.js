var gameBoard = function() {
		var canvas = document.getElementById('board');
		var context = canvas.getContext('2d');
		var cellZise = 20;
		var row = canvas.width / cellZise;
		var colum = canvas.height / cellZise;
		var generation = [];
		var newGeneration = [];

		/*
		//0 1 2 3  => Y
			[1,1,1,1,0],// 0 X
			[1,0,0,1,1],// 1 X
			[1,0,0,1,0],// 2 X
			[1,0,0,1,0], // 3 X
			[0,1,1,0,1]
		*/

		function dranwCell(x, y, isLife) {
			context.strokeStyle = 'rgba(86, 132, 26, 0.5)';
			context.lineWidth = 2;
			context.strokeRect(x * row, y * colum, row, colum);

			context.fillStyle = (isLife) ? 'black': 'white';
			context.fillRect(x*row+1, y*colum+1, row-1, colum-1);
		}

		function getNeighborsCell(x, y) {
			var cellLife = 0;
			var totalCells= 0;
			//console.log('x=>',x,'y=>',y);

			if(x >= 0 && y-1 >= 0 && generation[x] !== undefined){
				if (generation[x][y-1] !== undefined) {
					totalCells += generation[x][y-1];
					//console.log('1', totalCells);
				}
			}
			if(x+1 >= 0 && y-1 >= 0 && generation[x+1] !== undefined){
				if (generation[x+1][y-1] !== undefined) {
					totalCells += generation[x+1][y-1];
					//console.log('2', totalCells);
				}
			}
			if(x+1 >= 0 && y >= 0 && generation[x+1] !== undefined){
				if (generation[x+1][y] !== undefined) {
					totalCells += generation[x+1][y];
					//console.log('3', totalCells);
				}
			}
			if (x+1 >= 0 && y+1 >= 0 && generation[x+1] !== undefined){
				if (generation[x+1][y+1] !== undefined) {
					totalCells += generation[x+1][y+1];
					//console.log('4', totalCells);
				}
			}
			if (x >=0 && y+1 >= 0 && generation[x] !== undefined){
				if (generation[x][y+1] !== undefined) {
					totalCells += generation[x][y+1];
					//console.log('5', totalCells);
				}
			}
			if(x-1 >= 0 && y+1 >= 0 && generation[x-1] !== undefined){
				if (generation[x-1][y+1] !== undefined) {
					totalCells += generation[x-1][y+1];
					//console.log('6', totalCells);
				}
			}
			if(x-1 >= 0 && y >= 0 && generation[x-1] !== undefined){
				if (generation[x-1][y] !== undefined) {
					totalCells += generation[x-1][y];
					//console.log('7', totalCells);
				}
			}
			if(x-1 >= 0 && y-1 >= 0 && generation[x-1] !== undefined){
				if (generation[x-1][y-1] !== undefined) {
					totalCells += generation[x-1][y-1];
					//console.log('8', totalCells);
				}
			}

			return totalCells;
		}

		function nextGeneration() {
			for(var x=0; x < generation.length; x++) {
				newGeneration.push([]);
				for(var y=0; y < generation[x].length; y++) {
					var cellLifeTotal = getNeighborsCell(x,y);
					var result = validateCell(cellLifeTotal, generation[x][y]);
					newGeneration[x].push(result);
				}
			}
			generation = newGeneration;
			newGeneration = [];
		}

		function validateCell(total, type) {
			var result = 0;
			// dead cell
			if (type === 0) {
				if(total === 3) {
					result = 1;
				}
			// live cell
			} else {
				if(total === 2 || total === 3) {
					result = 1;
				}
			}
			return result;
		}

		this.boardZise = function(row, colum) {
			for(var x=0; x < row; x++) {
				generation.push([]);
				for(var y=0; y < colum; y++) {
					generation[x][y] = Math.round(Math.random());
				}
			}
		};

		this.init = function() {
			for(var x=0; x < generation.length; x++) {
				for(var y=0; y < generation[x].length; y++) {
					dranwCell(x, y, generation[x][y]);
				}
			}
		};

		this.update = function() {
			nextGeneration();
		};
};