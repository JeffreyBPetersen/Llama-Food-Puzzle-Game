/**
	Puzzle Dots: A game for llamas everywhere!
	Team: Adam, Connor, Jeff, Vanda
	
**/


// Define a size by size grid
var board_size = 5;

// Define dot size as a percentage of square size
var dot_size = 0.8

var game;
var board;
var gfx;
var gui;

// Game launch method
function launch () {
    strS = new startScreen();
    strS.start();
	//init();
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
	gfx.drawGoal();
	gfx.drawPieces();
}

var buttonX, buttonY, mouseX, mouseY;
function startScreen() {
    var snd3;  
    var canvas = document.getElementById('game_canvas');
	var ctx = canvas.getContext('2d');
    var y = ctx.canvas.height / 6;
    var x = ctx.canvas.height /2;
    
    this.start = function (){
    //this.playSound();
    // fill background
    ctx.rect(0, 0, ctx.canvas.width, ctx.canvas.height);
    ctx.fillStyle = "#9ED6E8";
    ctx.fill();
    
    var logoImage = new Image();
    var creditsImage = new Image();
    var levelsImage = new Image();
    var startImage = new Image();
    var instructImage = new Image();
    
    //load images
    startImage.src = "pics/start.png";  
    startImage.style.margin = "0 auto";
    creditsImage.src = "pics/credits.png";
    logoImage.src = "pics/puzzle.png";
    levelsImage.src = "pics/levels.png";
    instructImage.src = "pics/instructions.png";
    
    buttonX = [622,533,616,601];
    buttonY = [173,197,268,355];
    var buttonWidth = [levelsImage.width, startImage.width, instructImage.width, creditsImage.width];
    var buttonHeight = [levelsImage.height, startImage.height, instructImage.height, creditsImage.height]; 
    
    logoImage.onload = function(){
        centerImage(ctx, logoImage, 5);
    }
    
    startImage.onload = function(){
        centerImage(ctx, startImage, y + 20);
    }
    
    instructImage.onload = function(){
        centerImage(ctx, instructImage, y + 95);
    }
    
    levelsImage.onload = function(){
        centerImage(ctx, levelsImage, y + 170);
    }
    
    creditsImage.onload = function(){
        centerImage(ctx, creditsImage, y + 250);
    }
    
    canvas.addEventListener("mouseup", checkClick);
    }
    
    this.update = function(){
        this.clear();
        init();
    }
    
    this.clear = function(){
        //snd3.pause();
        canvas.removeEventListener("mousemove", checkPos);
        canvas.removeEventListener("mouseup", checkClick);
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
    
    this.playSound = function(){
        snd3 = new Audio("sound/ambient.mp3"); 
        snd3.loop = true;
        snd3.play();
    }

}

// center the images in start screen
function centerImage(ctx, img, y){
    var d_width = img.width;
    var d_height = img.height;
    var x = (ctx.canvas.width - d_width) / 2;
    ctx.drawImage(img, x, y);
}

// check for mouse positions
function checkPos(mouseEvent){
    if(mouseEvent.pageX || mouseEvent.pageY == 0){
        mouseX = mouseEvent.pageX - this.offsetLeft;
        mouseY = mouseEvent.pageY - this.offsetTop;
    }else if(mouseEvent.offsetX || mouseEvent.offsetY == 0){
        mouseX = mouseEvent.offsetX;
        mouseY = mouseEvent.offsetY;
    }
}

// check whether the position of the mouse is correct. Still working on this.
function checkClick(mouseEvent){
    for(i = 0; i < buttonX.length; i++){
        if(mouseX > buttonX[i] && mouseX < buttonX[i] + buttonWidth[i]){
            if(mouseY > buttonY[i] && mouseY < buttonY[i] + buttonHeight[i]){
                alert("Hi!")
                //init();
            }
        }
    }
    strS.update();
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
	
	this.direction_enum = {
		"up" : 0,
		"right" : 1,
		"down" : 2,
		"left" : 3,
		0 : "up",
		1 : "right",
		2 : "down",
		3 : "left"
	}
	
	this.load_level = function(level){
		switch(level){
			// moving forward
			case 0:
				this.board = new this.Board(3)
				this.board.space[1][0].goal = "blue"
				this.board.space[1][2].dot = new this.Dot("blue", "up")
				break
			// turning
			case 1:
				this.board = new this.Board(3)
				this.board.space[0][0].goal = "blue"
				this.board.space[2][2].dot = new this.Dot("blue", "up")
				break
			// shared movement
			case 2:
				this.board = new this.Board(3)
				this.board.space[0][0].goal = "blue"
				this.board.space[2][2].goal = "blue"
				this.board.space[0][2].dot = new this.Dot("blue", "up")
				this.board.space[2][0].dot = new this.Dot("blue", "down")
				break
			// simple blending
			case 3:
				this.board = new this.Board(3)
				this.board.space[1][0].goal = "purple"
				this.board.space[0][2].dot = new this.Dot("red", "up")
				this.board.space[2][2].dot = new this.Dot("blue", "up")
				break
			// absorbent blending
			case 4:
				this.board = new this.Board(3)
				this.board.space[1][0].goal = "red"
				this.board.space[0][2].dot = new this.Dot("red", "up")
				this.board.space[1][2].dot = new this.Dot("red", "up")
				this.board.space[2][2].dot = new this.Dot("blue", "up")
				break
			// destructive blending
			case 5:
				this.board = new this.Board(3)
				this.board.space[0][1].dot = new this.Dot("red", "right")
				this.board.space[2][1].dot = new this.Dot("green", "left")
				break
		}
	}
	
	// constructor for board object
	// size is >= 3
	this.Board = function(size){
		this.size = size
		
		// constructor for space object
		// start is a dot, goal is a color in color_enum
		// start is the dot on the space at the beginning of the level
		// goal is the color of the dot on the space at the end of the level
		this.Space = function(start, goal){
			this.dot = start
			this.goal = goal
			this.resolved = false
		}
		
		this.space = new Array()
		for(var i = 0; i < size; i++){
			this.space[i] = new Array()
			for(var j = 0; j < size; j++){
				this.space[i][j] = new this.Space(null, null)
			}
		}
	}
	
	// Board populate method
	this.populate = function (density) {
		for(var i = 0; i < this.board.size; i++) {
			for(var j = 0; j < this.board.size; j++) {
				if( Math.random() < density ) {
					var color = this.color_enum[Math.floor(Math.random() * 6)]
					var direction = ["up", "right", "down", "left"]
						[Math.floor(Math.random() * 4)]
					this.board.space[i][j].dot = new this.Dot(color, direction)
				}
				if( Math.random() < density ){
					this.board.space[i][j].goal = this.color_enum[Math.floor(Math.random() * 6)]
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
		// this.moved = false;
	}
    
    // sound for blending
    this.loadSound = function(){
        var snd2 = new Audio("sound/pop.mp3"); 
        snd2.play();
    }

	// blending function for when dot_a moved into dot_b
	// takes dot objects dot_a and dot_b
	// returns blended dot or null for mutually destructive blending
	this.blend = function(dot_a, dot_b){
        this.loadSound();
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
	
	// checks if color is in color_group
	// takes two colors from color_enum
	// returns boolean
	this.check_color_group = function(color, color_group){
		var color_val = this.color_enum[color]
		var group_val = this.color_enum[color_group]
		if((color_val + 1) % 6 == group_val
		|| color_val == group_val
		|| (color_val + 5) % 6 == group_val)
			return true
		return false
	}
	
	// gets the space that's direction from space[x][y]
	// takes x and y coordinates of a space and a direction
	// returns the adjacent space in that direction
	this.get_adjacent = function(x, y, direction){
		switch(direction){
			case "up":
				return this.board.space[x][(y + this.board.size - 1) % this.board.size]
			case "right":
				return this.board.space[(x + 1) % this.board.size][y]
			case "down":
				return this.board.space[x][(y + 1) % this.board.size]
			case "left":
				return this.board.space[(x + this.board.size - 1) % this.board.size][y]
		}
	}
	
	// checks whether there is a moving dot on space[x][y] and where it's moving
	// takes x and y coordinates of the space and color_group being moved
	// returns space the dot on space[x][y] will move to
	// returns null if there is no moving dot on space[x][y]
	this.get_move_target = function(x, y, color_group){
		var source = this.board.space[x][y]
		if(source.dot == null)
			return null
		if(!this.check_color_group(source.dot.color, color_group))
			return null
		return this.get_adjacent(x, y, source.dot.direction)
	}
	
	// returns boolean of whether the level is currently completed
	this.is_win_state = function(){
		for(var x = 0; x < this.board.size; x++){
			for(var y = 0; y < this.board.size; y++){
				if(this.board.space[x][y].dot == null){
					if(this.board.space[x][y].goal != null)
						return false
				}
				else if(this.board.space[x][y].dot.color != this.board.space[x][y].goal)
					return false
			}
		}
        var snd4 = new Audio("sound/level_passed.mp3"); 
        snd4.play();
		return true
	}
	
	// move the selected color group using the chosen move
	// color_group is "red", "yellow", or "blue"
	// move is "left" (turning), "right" (turning), or "forward"
	this.process_move = function(color_group, move){
		var size = this.board.size
		if(move == "forward"){
			// reinitialize space states to unprocessed
			for(var x = 0; x < size; x++){
				for(var y = 0; y < size; y++){
					this.board.space[x][y].resolved = false
				}
			}
			// process board state until a steady state is reached
			var progress = true
			while(progress){
				progress = false
				// build new board state with unprocessed cycles
				for(var x = 0; x < size; x++){
					for(var y = 0; y < size; y++){
						var target = this.board.space[x][y]
						if(!target.resolved){
							var source = null
							var up = false
							var right = false
							var down = false
							var left = false
							if(!this.get_adjacent(x,y,"up").resolved && this.get_move_target(x, (y + size - 1) % size, color_group) == target){
								up = true
								source = this.get_adjacent(x,y,"up")
							}
							if(!this.get_adjacent(x,y,"right").resolved && this.get_move_target((x + 1) % size, y, color_group) == target){
								right = true
								if(source == null)
									source = this.get_adjacent(x,y,"right")
								else
									source = "split"
							}
							if(!this.get_adjacent(x,y,"down").resolved && this.get_move_target(x, (y + 1) % size, color_group) == target){
								down = true
								if(source == null)
									source = this.get_adjacent(x,y,"down")
								else
									source = "split"
							}
							if(!this.get_adjacent(x,y,"left").resolved && this.get_move_target((x + size - 1) % size, y, color_group) == target){
								left = true
								if(source == null)
									source = this.get_adjacent(x,y,"left")
								else
									source = "split"
							}
							// collision on attempting to move to target
							if(source == "split"){
								if(up)
									this.get_adjacent(x,y,"up").resolved = true
								if(right)
									this.get_adjacent(x,y,"right").resolved = true
								if(down)
									this.get_adjacent(x,y,"down").resolved = true
								if(left)
									this.get_adjacent(x,y,"left").resolved = true
								progress = true
							}
							// no dot moving from target
							if(this.get_move_target(x, y, color_group) == null){
								if(source != null && source != "split"){
									if(target.dot == null){
										target.dot = source.dot
										source.dot = null
									}
									else{
										target.dot = this.blend(source.dot, target.dot)
										source.dot = null
									}
								}
								target.resolved = true
								progress = true
							}
							// collision on attempting to move from target into resolved space
							else if(this.get_move_target(x, y, color_group).resolved == true)
								target.resolved = true
						}
					}
				}
			}
			progress = true
			// check for and process cyclic movement to finalize new board state
			while(progress){
				progress = false
				var x, y
				for(x = 0; x < size; x++){
					for(y = 0; y < size; y++){
						if(this.board.space[x][y].resolved == false){
							progress = true
							break
						}
					}
					if(progress)
						break
				}
				if(x == size)
					continue
				// handle head to head collisions
				var target = this.board.space[x][y]
				switch(target.dot.direction){
					case "up":
						if(this.get_move_target(x, (y + size - 1) % size, color_group) == target){
							target.resolved = true
							this.get_adjacent(x,y,"up").resolved = true
							progress = true
							continue
						}
						break
					case "right":
						if(this.get_move_target((x + 1) % size, y, color_group) == target){
							target.resolved = true
							this.get_adjacent(x,y,"right").resolved = true
							progress = true
							continue
						}
						break
					case "down":
						if(this.get_move_target(x, (y + 1) % size, color_group) == target){
							target.resolved = true
							this.get_adjacent(x,y,"down").resolved = true
							progress = true
							continue
						}
						break
					case "left":
						if(this.get_move_target((x + size - 1) % size, y, color_group) == target){
							target.resolved = true
							this.get_adjacent(x,y,"left").resolved = true
							progress = true
							continue
						}
						break
				}
				// handle circuitous movement
				var current = this.board.space[x][y].dot
				this.board.space[x][y].dot = null
				var next
				while(true){
					switch(current.direction){
						case "up":
							y = (y + size - 1) % size
							break
						case "right":
							x = (x + 1) % size
							break
						case "down":
							y = (y + 1) % size
							break
						case "left":
							x = (x + size - 1) % size
							break
					}
					if(this.board.space[x][y].dot != null){
						next = this.board.space[x][y].dot
						this.board.space[x][y].dot = current
						current = next
						this.board.space[x][y].resolved = true
					}
					else{
						this.board.space[x][y].dot = current
						this.board.space[x][y].resolved = true
						break
					}
				}
			}
		}
		else{
			for(var x = 0; x < this.board.size; x++){
				for(var y = 0; y < this.board.size; y++){
					if(this.board.space[x][y].dot == null)
						continue
					if(this.check_color_group(this.board.space[x][y].dot.color, color_group)){
						var dirs = ["up", "right", "down", "left"]
						var dir = dirs.indexOf(this.board.space[x][y].dot.direction)
						if(move == "right")
							this.board.space[x][y].dot.direction = dirs[(dir + 1) % 4]
						else
							this.board.space[x][y].dot.direction = dirs[(dir + 3) % 4]
					}
				}
			}
		}
	}

	/*this.rotate = function (color, direction) {
		switch (direction) {
			case "left":
				direction = -1;
				break;
			case "right":
				direction = 1;
				break;
		}
		for (i = 0; i < this.board.size; i++) {
			for (j = 0; j < this.board.size; j++) {
				if (this.board.space[i][j].dot != null && this.board.space[i][j].dot.color == color) {
					var new_direction = this.direction_enum[this.board.space[i][j].dot.direction] + direction;
					new_direction %= 4;
					if (new_direction == -1)
						new_direction = 3;
					this.board.space[i][j].dot.direction = this.direction_enum[new_direction];
				}
			}
		}
		gfx.render();
	}
	
	this.resetMoves = function () {
		for (i = 0; i < game.board.size; i++) {
			for (j = 0; j < game.board.size; j++) {
				var dot = game.board.space[i][j].dot;
				if (dot !== null) {
					dot.moved = false;
				}
			}
		}
	}

	this.move = function (dot, i, j, i_offset, j_offset) {
		if (game.board.space[i + i_offset][j + j_offset].dot !== null) {
			// Collision
			dot_a = dot;
			dot_b = game.board.space[i + i_offset][j + j_offset].dot;
			new_dot = this.blend(dot_a, dot_b);
			game.board.space[i][j].dot = new_dot;
			new_dot.moved = true;
		} else {
			game.board.space[i + i_offset][j + j_offset].dot = dot;
			dot.moved = true;
		}
	}

	this.moveDots = function (color) {
		for (i = 0; i < game.board.size; i++) {
			for (j = 0; j < game.board.size; j++) {
				var dot = game.board.space[i][j].dot;
				if (dot !== null && dot.color == color && !dot.moved) {
					// Remove dot reference
					game.board.space[i][j].dot = null;
					
					// Move dot in dot.direction one space
					// Toroid if at board edge
					switch (dot.direction) {
						case "up":
							if (j == 0) {
								this.move(dot, i, j, 0, game.board.size - 1);
							} else {
								this.move(dot, i, j, 0, -1);
							}
							break;
						case "down":
							if (j == (game.board.size - 1)) {
								this.move(dot, i, j, 0, - (game.board.size - 1));
							} else {
								this.move(dot, i, j, 0, 1);
							}
							break;
						case "left":
							if (i == 0) {
								this.move(dot, i, j, game.board.size - 1, 0);
							} else {
								this.move(dot, i, j, -1, 0);
							}
							break;
						case "right":
							if (i == (game.board.size - 1)) {
								this.move(dot, i, j, -(game.board.size - 1), 0);
							} else {
								this.move(dot, i, j, 1, 0);
							}
							break;
					}
				}
			}
		}
		this.resetMoves();
		gfx.render();
	}*/
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
			// W moves selected dots in their arrow direction
			game.process_move(gui.current_color, "forward");
			gfx.render();
			break;
		case 65:
			// A rotates selected dots 90 degrees counter-clockwise
			game.process_move(gui.current_color, "left");
			gfx.render();
			break;
		case 68:
			// D rotates selected dots 90 degrees clockwise
			game.process_move(gui.current_color, "right");
			gfx.render();
			break;
	}
}

function mouseClick(event) {
	var x = event.pageX - gui.canvas.offsetLeft;
	var y = event.pageY - gui.canvas.offsetTop;
	var space_side = gfx.board_side / game.board.size;
    var click = new Audio("sound/click.mp3");
   
	x -= gfx.board_x;
	x = Math.floor(x / space_side);
	y -= gfx.board_y;
	y = Math.floor(y / space_side);

	// First click selects dots of dot.color
	// Subsequent clicks move selected dots
	if (x >= 0 && x < game.board.size && y >= 0 && y < game.board.size) {
		var dot = game.board.space[x][y].dot;
		if (dot !== null) {
			gui.current_color = dot.color;
            click.play();
		}
	}
	gfx.render();
}

/* Game Loop Object -- doesn't do anythng yet since there's no game logic/graphics yet */
function GameLoop() {

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
				update();
			}
			render();		
		}

		loop();
	}
}

function update() {
    // add game logic
}
    
function render() {
    // draw stuff
}

// constructor for gui object
function Gui(){
	this.prev_color = undefined;
	this.current_color = undefined;
	this.canvas = document.getElementById('game_canvas');
	this.canvas.addEventListener("click", mouseClick, false);
	document.addEventListener('keydown', keyHandler, true);
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

	// Draw UI, Board, and Pieces in that order
	this.render = function () {
		this.drawUI();
		this.drawGrid();
		this.drawPieces();
		this.highlightColor();
		this.drawGoal();
	}

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
				var dot = game.board.space[i][j].dot;
				if (dot !== null) {	
					this.drawDot(dot, (this.board_x + space_side / 2) + space_side * i, (this.board_y + space_side / 2) + space_side * j);
				}
			}
		}	
	}
	
	this.drawGoal = function() {
		var space_side = this.board_side / game.board.size;
		
		for (i = 0; i < game.board.size; i++) {
			for (j = 0; j < game.board.size; j++) {
				if (game.board.space[i][j].goal != null) {
					ctx.fillStyle = game.board.space[i][j].goal;
					ctx.strokeStyle = game.board.space[i][j].goal;
					ctx.lineWidth = 2;
					ctx.beginPath();
					ctx.moveTo(this.board_x + (i + 1) * space_side - space_side / 5, this.board_y + j * space_side);
					ctx.lineTo(this.board_x + (i + 1) * space_side, this.board_y + j * space_side + space_side / 5);
					ctx.lineTo(this.board_x + (i + 1) * space_side, this.board_y + j * space_side);
					ctx.moveTo(this.board_x + (i + 1) * space_side - space_side / 5, this.board_y + j * space_side);
					ctx.fill();
					ctx.stroke();
				}
			}
		}
	}

	this.highlightColor = function() {
		var space_side = this.board_side / game.board.size;
		for (i = 0; i < game.board.size; i++) {
			for (j = 0; j < game.board.size; j++) {
				var dot = game.board.space[i][j].dot;
				if (dot !== null) {
					if (game.check_color_group(dot.color, gui.current_color) == true) {
						ctx.strokeStyle = gui.current_color;
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
