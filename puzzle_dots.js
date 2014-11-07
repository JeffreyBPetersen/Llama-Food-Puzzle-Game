/**
	Puzzle Dots: A game for llamas everywhere!
	Team: Adam, Connor, Jeff, Vanda
	
**/

// constructor for game object
function Game(){
}

// constructor for gui object
function Gui(){
}

// constructor for gfx object
function graphics() {
	var canvas = document.getElementById('game_canvas');
	var ctx = canvas.getContext('2d');
	
	// Board x and y origin
	var board_x = (canvas.width - canvas.height) / 2;
	var board_y = 0;

	// length of each side of board
	var board_side = canvas.height;

	//draws the board.size X board.size grid (not including pieces)
	this.drawGrid = function() {
		var space_side = board_side / board.size;
		ctx.beginPath();
		
		// Draw vertical lines
		for (var i = 0; i <= board.size; i++) {
			ctx.moveTo(i * space_side + board_x, 0);
			ctx.lineTo(i * space_side + board_x, board_side);
			ctx.stroke();
		}

		// Draw horizontal lines
		for (var i = 0; i <= board.size; i++) {
			ctx.moveTo(board_x, i * space_side);
			ctx.lineTo(board_x + board_side, i * space_side);
			ctx.stroke();
		}
	}
	
	this.drawPieces = function() {
		var space_side = board_side / board.size;
		
		for (var i = 0; i < board.size; i++) {
			for (var j = 0; j < board.size; j++) {
				var dot = board.space[i][j];
				if (dot !== undefined) {				
					dot.draw((board_x + space_side / 2) + space_side * i,
							 (board_y + space_side / 2) + space_side * j);
				}
			}
		}	
	}
	
	//TODO
	this.drawDot = function(dot, x, y) {
		var space_side = board_side / board.size;
		var radius = space_side / 2 * dot_size;
		//incomplete
	}
}

// initialize all necessary objects
function init(){
}

// Global canvas and context variables
var canvas = document.getElementById('game_canvas');
var ctx = canvas.getContext('2d');

// Define a size x size grid
var board_size = 3;

// Define dot size as a percentage of square size
var dot_size = 0.8;

var board;
var gfx;

// Game launch method
function launch () {
	// Make a board object
	board = new Board(board_size);
	gfx = new graphics();
	
	// Populate board spaces
	board.populate(0.3);
	
	// Draw the board grid
	gfx.drawGrid();
	
	// Draw board pieces
	gfx.drawPieces();

	// Draw the game UI
	drawUI();
	
	// Initialize keyHandler
	document.addEventListener('keydown', keyHandler, true);
    
    // make GameLoop object
	//game = new GameLoop();

	// Start loop
	//game.puzzleLoop();
}

// KeyHandler
function keyHandler (event) {
	switch (event.keyCode) {
		case 87:
			// w is up
			break;
		case 83:
			// s is down
			break;
		case 65:
			// a is left
			break;
		case 68:
			// d is right
			break;
	}
}

/** Board object **/
function Board (size) {
	// Board x and y origin
	this.x = (canvas.width - canvas.height) / 2;
	this.y = 0;

	// Board width and height from its origin
	this.height = canvas.height;
	this.width = this.x + this.height;

	// Set board size
	this.size = size;

	// Board square width
	this.x_spacing = this.height / size;

	// Board square height
	this.y_spacing = this.height / size;

	// Initialize 2D array of spaces
	this.space = new Array();
	for (var i = 0; i < size; i++) {
		this.space[i] = new Array();
	}
	

	
	// Board populate method
	this.populate = function (density) {
		for (var i = 0; i < this.size; i++) {
			for (var j = 0; j < this.size; j++) {
				if (Math.random() < density) {
					var color, direction;
					switch (Math.floor(Math.random() * 3)) {
						case 0:
						color = "#FF0000";
						break
						case 1:
						color = "#00FF00";
						break;
						case 2:
						color = "#0000FF";
						break;
					}
					switch (Math.floor(Math.random() * 4)) {
						case 0:
						direction = "up";
						break;
						case 1:
						direction = "down";
						break;
						case 2:
						direction = "left";
						break;
						case 3:
						direction = "right";
						break;
					}
					var radius = (this.x_spacing / 2) * dot_size;
					var dot = new Dot(radius, color, direction);
					this.space[i][j] = dot;
				}
			}
		}
	}
}

/** Dot object **/
function Dot (radius, color, direction) {
	// Dot x and y origin
	this.x;
	this.y;
	
	// Dot radius
	this.radius = radius;
	
	// Color hex code
	this.color = color;

	// up, down, left, or right
	this.direction = direction;
	
	// Dot draw method
	this.draw = function (x, y) {
		// Update dot position
		this.x = x;
		this.y = y;
		
		// Draw circle
		ctx.beginPath();
		c_radius = this.radius * 0.66;
		ctx.fillStyle = this.color;
		ctx.moveTo(x, y);
		ctx.arc(x, y, c_radius, 0, 2 * Math.PI);
		ctx.fill();
		
		// Draw arrow
		ctx.beginPath();
		ctx.fillStyle = "#000000";
		var point = c_radius * 1.5;
		var in_point = c_radius * 0.4;
		var base_width = c_radius * 0.6;
		var base_offset = c_radius * 0.2;
		switch (this.direction) {
			case "up":
				ctx.moveTo(x - base_width, y - base_offset);
				ctx.lineTo(x, y - point);
				ctx.lineTo(x + base_width, y - base_offset);
				ctx.lineTo(x, y - in_point);
				ctx.lineTo(x - base_width, y - base_offset);
				ctx.fill();
				break;
			case "down":
				ctx.moveTo(x - base_width, y + base_offset);
				ctx.lineTo(x, y + point);
				ctx.lineTo(x + base_width, y + base_offset);
				ctx.lineTo(x, y + in_point);
				ctx.lineTo(x - base_width, y + base_offset);
				ctx.fill();
				break;
			case "left":
				ctx.moveTo(x - base_offset, y - base_width);
				ctx.lineTo(x - point, y);
				ctx.lineTo(x - base_offset, y + base_width);
				ctx.lineTo(x - in_point, y);
				ctx.lineTo(x - base_offset, y - base_width);
				ctx.fill();
				break;
			case "right":
				ctx.moveTo(x + base_offset, y - base_width);
				ctx.lineTo(x + point, y);
				ctx.lineTo(x + base_offset, y + base_width);
				ctx.lineTo(x + in_point, y);
				ctx.lineTo(x + base_offset, y - base_width);
				ctx.fill();
				break;
		}
	}
}

// Game UI draw method
function drawUI () {
	// UI background color
	ctx.fillStyle = "#969696";
	ctx.fillRect(0, 0, board.x, canvas.height);
	ctx.fillRect(board.width, 0, canvas.width, canvas.height);
}

/* Game Loop Object -- doesn't do anythng yet since there's no game logic/graphics yet */
function GameLoop() {

	this.update = function() {
		// Update stuff and game logic.
	}

	this.render = function() {
		// Animates dots.
	}

	this.puzzleLoop = function() {
	    var last = Date.now(); 
	    // frame rate, fps = 60
	    var frameRate = 1000/60; 

		function loop() {
			// Calculate time elapsed since last frame.
			var now = Date.now();
			var elapsed = now - last;
			last = now;

			// request the next frame
			window.requestAnimationFrame(loop); 
			
			// Update frames when elapsed is >= frame
			while(elapsed >= frameRate){
				elapsed = elapsed - frameRate;
				this.update();
			}

			this.render();		
		}

		loop();
	}
}
