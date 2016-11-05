var game = function() {
	var board = new gameBoard();
	var gameInterval;

	function buttonStyles(disabled) {
		var buttonClassName = (disabled) ? 'default disabled' : 'default';
		document.getElementById('start').className = buttonClassName;
		document.getElementById('start').disabled = disabled;
	}

	this.init = function() {
		document.getElementById('start').addEventListener('click', this.start);
		document.getElementById('stop').addEventListener('click', this.stop);
		board.init(false);
	};

	this.start = function() {
		board.init(true);
		// btnStart();
		buttonStyles(true);
		gameInterval = setInterval(function() {
			board.update();
		}, 200);
	};

	this.stop = function() {
		clearInterval(gameInterval);
		board.delete();
		// btrnStop();
		buttonStyles(false);
	};
};

// Start game
var game = new game();
game.init();