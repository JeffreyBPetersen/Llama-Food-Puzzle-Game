/**
	Puzzle Dots: A game for llamas everywhere!
	Team: Adam, Connor, Jeff, Vanda
	
**/


// Define a size x size grid
var board_size = 6;

// Define dot size as a percentage of square size
var dot_size = 0.8

var game;
var board;
var gfx;
var gui;

// Game launch method
function launch () {
	init();
/*
	// Make a board object
	board = new Board(board_size);
	gui = new Gui();
	gfx = new graphics();
	
	// Populate board spaces
	board.populate(0.3);
	
	// Draw the game UI
	gfx.drawUI();
	
	// Draw the board grid
	gfx.drawGrid();
	
	// Draw board pieces
	gfx.drawPieces();
	
	// Initialize keyHandler
	document.addEventListener('keydown', keyHandler, true);
    
    // make GameLoop object
	//game = new GameLoop();

	// Start loop
	//game.puzzleLoop();*/
}

// initialize all necessary objects
function init(){
	game = new Game()
	game.board = new game.Board(board_size)
	game.populate(.3);
	gui = new Gui()
	gfx = new graphics()
	gfx.drawUI();
	gfx.drawGrid();
	gfx.drawPieces();
}

// constructor for game object
function Game(){
	// variable for board
	// contains positions of pieces and goals
	// initialize when level is launched
	this.board = null
	
	this.color_enum = {
		"red" : 0,
		"orange" : 1,
		"yellow" : 2,
		"green" : 3,
		"blue" : 4,
		"purple" : 5,
		0: "red",
		1: "orange",
		2: "yellow",
		3: "green",
		4: "blue",
		5: "purple"
	}
	
	// constructor for board object
	// size is >= 2
	this.Board = function(size){
		this.size = size
		
		this.goal = new Array()
		this.space = new Array()
		for(var i = 0; i < size; i++){
			this.goal[i] = new Array()
			this.space[i] = new Array()
		}
	}
	
	// Board populate method
	this.populate = function (density) {
		for (var i = 0; i < this.board.size; i++) {
			for (var j = 0; j < this.board.size; j++) {
				if (Math.random() < density) {
					var color, direction;
					switch (Math.floor(Math.random() * 3)) {
						case 0:
						color = "red";
						break
						case 1:
						color = "blue";
						break;
						case 2:
						color = "yellow";
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
					var dot = new this.Dot(color, direction);
					this.board.space[i][j] = dot;
				}
			}
		}
	}
	
	// constructor for dot object
	// color is a string from color_enum
	// direction is one of ["down", "left", "right", "up"]
	this.Dot = function(color, direction){
		this.color = color
		this.direction = direction
	}
	
	// constructor for goal object
	// color is a string from color_enum
	this.Goal = function(color){
		this.color = color
	}
	
	// blending function for when dot_a moved into dot_b
	// takes dot objects dot_a and dot_b
	// returns blended dot or null for mutually destructive blending
	this.blend = function(dot_a, dot_b){
		// case for destructive blending
		if((this.color_enum[dot_a.color] + 3) % 6 == this.color_enum[dot_b.color])
			return null
		// 1st case for standard blending
		else if((this.color_enum[dot_a.color] + 2) % 6 == this.color_enum[dot_b.color])
			return new this.Dot(this.color_enum[(this.color_enum[dot_a.color] + 1) % 6], 
			dot_a.direction)
		// 2nd case for standard blending
		else if((this.color_enum[dot_a.color] + 4) % 6 == this.color_enum[dot_b.color])
			return new this.Dot(this.color_enum[(this.color_enum[dot_a.color] + 5) % 6], 
			dot_a.direction)
		// case for dominant blending
		else
			return new this.Dot(dot_a.color, dot_a.direction)
	}
}

// debug function for working on game object, prone to change as needed
function debug_game(){
	game = new Game()
	d0 = new game.Dot("red", "up")
	d1 = new game.Dot("orange", "right")
	d2 = new game.Dot("yellow", "down")
	d3 = new game.Dot("green", "left")
	d4 = new game.Dot("blue", "up")
	d5 = new game.Dot("purple", "right")
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

function mouseClick(event) {
	var x = event.layerX - gui.canvas.offsetLeft;
	var y = event.layerY - gui.canvas.offsetTop;
	var space_side = gfx.board_side / game.board.size;
	
	x -= gfx.board_x;
	x = Math.floor(x / space_side);
	y -= gfx.board_y;
	y = Math.floor(y / space_side);

	if (x >= 0 && x < game.board.size && y >= 0 && y < game.board.size) {
		var dot = game.board.space[x][y];
		if (dot !== undefined) {
			gfx.highlightColor(dot.color);
		}
	}
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

// constructor for gui object
function Gui(){
	this.canvas = document.getElementById('game_canvas');
	this.canvas.addEventListener("mousedown", mouseClick, false);
}

// constructor for gfx object
function graphics() {
	var canvas = document.getElementById('game_canvas');
	var ctx = canvas.getContext('2d');
	
	// Board x and y origin
	this.board_x = (canvas.width - 18 * canvas.height / 20) / 2;
	this.board_y = canvas.height / 20;

	// length of each side of board
	this.board_side = 18 * canvas.height / 20;
	this.ui_width = (canvas.width - this.board_side) / 2;
	
	this.drawUI = function() {
		ctx.fillStyle = "#969696";
		ctx.fillRect(0, 0, this.ui_width, canvas.height);
		ctx.fillRect(this.ui_width + this.board_side, 0, canvas.width, canvas.height);
		ctx.fillRect(this.board_x, 0, this.board_x + this.board_side, this.board_y);
		ctx.fillRect(this.board_x, this.board_y + this.board_side, canvas.height, this.board_x + this.board_side);
	}

	//draws the board.size X board.size grid (not including pieces)
	this.drawGrid = function() {
		var space_side = this.board_side / game.board.size;
		
		ctx.fillStyle = "white";
		ctx.fillRect(this.board_x, this.board_y, this.board_side, this.board_side);
		ctx.strokeStyle = "black";
		ctx.lineWidth = 2;
		ctx.beginPath();
		
		// Draw vertical lines
		for (var i = 0; i <= game.board.size; i++) {
			ctx.moveTo(i * space_side + this.board_x, this.board_y);
			ctx.lineTo(i * space_side + this.board_x, this.board_y + this.board_side);
			ctx.stroke();
		}

		// Draw horizontal lines
		for (var i = 0; i <= game.board.size; i++) {
			ctx.moveTo(this.board_x, i * space_side + this.board_y);
			ctx.lineTo(this.board_x + this.board_side, i * space_side + this.board_y);
			ctx.stroke();
		}
	}
	
	// Takes a dot object and x,y location to draw
	this.drawDot = function(dot, x, y) {
		var space_side = this.board_side / game.board.size;
		var radius = space_side / 2 * dot_size;
		var c_radius = radius * 0.66;
		
		//draw circle
		ctx.fillStyle = dot.color;
		ctx.beginPath();
		ctx.moveTo(x, y);
		ctx.arc(x, y, c_radius, 0, 2 * Math.PI);
		ctx.fill();
		
		//draw arrow
		ctx.fillStyle = "#000000";
		ctx.beginPath();
		var point = c_radius * 1.5;
		var in_point = c_radius * 0.4;
		var base_width = c_radius * 0.6;
		var base_offset = c_radius * 0.2;
		switch (dot.direction) {
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

	this.drawPieces = function() {
		var space_side = this.board_side / game.board.size;
		
		for (var i = 0; i < game.board.size; i++) {
			for (var j = 0; j < game.board.size; j++) {
				var dot = game.board.space[i][j];
				if (dot !== undefined) {	
					this.drawDot(dot, (this.board_x + space_side / 2) + space_side * i, (this.board_y + space_side / 2) + space_side * j);
				}
			}
		}	
	}
	
	this.highlightColor = function(color) {
		this.drawUI();
		this.drawGrid();
		this.drawPieces();
		var space_side = this.board_side / game.board.size;
		for (i = 0; i < game.board.size; i++) {
			for (j = 0; j < game.board.size; j++) {
				var dot = game.board.space[i][j];
				if (dot !== undefined) {
					if (dot.color == color) {
						ctx.strokeStyle = color;
						ctx.lineWidth = 6;
						ctx.beginPath();
						ctx.rect(this.board_x + i * space_side, this.board_y + j * space_side, space_side, space_side);
						ctx.stroke();
					}
				}
			}
		}
	}
}

