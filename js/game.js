var game = function() {

	var board = new gameBoard();
	var gameInterval;

	this.init = function() {
		document.getElementById('start').addEventListener('click', this.start);
		document.getElementById('stop').addEventListener('click', this.stop);
	};

	this.start = function() {
		board.boardZise(20,20);
		gameInterval = setInterval(function() {
			board.init();
			board.update();
		}, 200);
	};

	this.stop = function() {
		console.log('stop');
		clearInterval(gameInterval);
	};
};

var game = new game();
game.init();