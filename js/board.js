var gameBoard = function() {
	var canvas = document.getElementById('board');
	var context = canvas.getContext('2d');
	var cellZise = 20;
	var row = canvas.width / cellZise;
	var colum = canvas.height / cellZise;
	var generation = [];
	var newGeneration = [];

	function createBoard(rows, colums, state) {
		generation = []; // empty generation array
		for(var x = 0; x < rows; x++) {
			generation.push([]); // create bidimentional array
			for(var y = 0; y < colums; y++) {
				// add new random or 0 items to generation array
				generation[x][y] = (state) ? Math.round(Math.random()) : 0;
			}
		}
	}

	function drawGrid() {
		// draw grid rows
		for(var x=0; x < generation.length; x++) {
			// draw grid colums
			for(var y=0; y < generation[x].length; y++) {
				drawCell(x, y, generation[x][y]);
			}
		}
	}

	function drawCell(xCell, yCell, cellAlive) {
		context.strokeStyle = 'rgba(86, 132, 26, 0.5)';
		context.lineWidth = 2;
		context.strokeRect(xCell * row, yCell * colum, row, colum);

		context.fillStyle = (cellAlive) ? 'black': 'white';
		context.fillRect(xCell * row + 1, yCell * colum + 1, row-1, colum-1);
	}

	function createNextGeneration() {
		for(var x = 0; x < generation.length; x++) {// grid rows
			newGeneration.push([]); // create bidimentional array
			for(var y = 0; y < generation[x].length; y++) { // grid colums
				var neighbors = getNeighborsAlive(x,y);
				var cellValue = validateCell(neighbors, generation[x][y]);
				newGeneration[x].push(cellValue);
			}
		}
		generation = newGeneration;
		newGeneration = [];
	}

	function getNeighborsAlive(x, y) {
		var cellLife= 0;

		if(x >= 0 && y-1 >= 0 && generation[x] !== undefined) {
			if (generation[x][y-1] !== undefined) {
				cellLife += generation[x][y-1];
			}
		}
		if(x+1 >= 0 && y-1 >= 0 && generation[x+1] !== undefined) {
			if (generation[x+1][y-1] !== undefined) {
				cellLife += generation[x+1][y-1];
			}
		}
		if(x+1 >= 0 && y >= 0 && generation[x+1] !== undefined) {
			if (generation[x+1][y] !== undefined) {
				cellLife += generation[x+1][y];
			}
		}
		if (x+1 >= 0 && y+1 >= 0 && generation[x+1] !== undefined) {
			if (generation[x+1][y+1] !== undefined) {
				cellLife += generation[x+1][y+1];
			}
		}
		if (x >=0 && y+1 >= 0 && generation[x] !== undefined) {
			if (generation[x][y+1] !== undefined) {
				cellLife += generation[x][y+1];
			}
		}
		if(x-1 >= 0 && y+1 >= 0 && generation[x-1] !== undefined) {
			if (generation[x-1][y+1] !== undefined) {
				cellLife += generation[x-1][y+1];
			}
		}
		if(x-1 >= 0 && y >= 0 && generation[x-1] !== undefined) {
			if (generation[x-1][y] !== undefined) {
				cellLife += generation[x-1][y];
			}
		}
		if(x-1 >= 0 && y-1 >= 0 && generation[x-1] !== undefined) {
			if (generation[x-1][y-1] !== undefined) {
				cellLife += generation[x-1][y-1];
			}
		}

		return cellLife;
	}

	function validateCell(neighbors, cellType) {
		var cellValue = 0; // dead by default

		if (cellType === 0) { // when a cell if dead
			if(neighbors === 3) {
				cellValue = 1;
			}
		} else { // when a cell is alive
			if(neighbors === 2 || neighbors === 3) {
				cellValue = 1;
			}
		}
		return cellValue;
	}

	this.init = function(state) {
		createBoard(20,20, state);
		drawGrid();
	};

	this.update = function() {
		createNextGeneration();
		drawGrid();
	};

	this.delete = function() {
		generation = []; // empty generation array
		newGeneration = []; // empty newGeneration array
		this.init(false);
	};
};