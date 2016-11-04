var game = function() {
	var board = new gameBoard();
	var gameInterval;

	function btnStart() {
		document.getElementById('start').className += ' disabled';
		document.getElementById('start').disabled = true;
	}

	function btrnStop() {
		document.getElementById('start').className = 'default';
		document.getElementById('start').disabled = false;
	}

	this.init = function() {
		document.getElementById('start').addEventListener('click', this.start);
		document.getElementById('stop').addEventListener('click', this.stop);
		board.init(false);
	};

	this.start = function() {
		board.init(true);
		btnStart();
		gameInterval = setInterval(function() {
			board.update();
		}, 200);
	};

	this.stop = function() {
		clearInterval(gameInterval);
		board.delete();
		btrnStop();
	};
};

// Start game
var game = new game();
game.init();