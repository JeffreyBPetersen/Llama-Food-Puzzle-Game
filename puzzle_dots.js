// Global default for board size
var board_size = 3

// Executed when page is loaded
function launch(){
	drawGrid(board_size)
	board = new Board(board_size)
}

function DEBUG_randomize_board(density){ // density is a number from 0 to 1
	for(var i = 0; i < board.size; i++){
		for(var j = 0; j < board.size; j++){
			if(Math.random() < density){
				var color, direction;
				switch(Math.floor(Math.random() * 3)){
					case 0:
						color = "#FF0000"
						break
					case 1:
						color = "#00FF00"
						break;
					case 2:
						color = "#0000FF"
						break;
				}
				switch(Math.floor(Math.random() * 4)){
					case 0:
						direction = "up"
						break;
					case 1:
						direction = "right"
						break;
					case 2:
						direction = "down"
						break;
					case 3:
						direction = "left"
						break;
				}
				board.space[i][j] = new Dot(color, direction)
			}
		}
	}
}

// Board constructor
function Board(size){ // size is any positive integer
	this.size = size
	
	//Initialize 2D array of spaces
	this.space = new Array()
	for(var i = 0; i < size; i++){
		this.space[i] = new Array()
	}
}

// Takes color code and direction, ex: board.space[1][2] = new Dot("#0000FF", "up")
function Dot(color, direction){ // color is a hex code, direction is "up", "right", "down", or "left"
	this.color = color
	this.direction = direction
}

function drawGrid(size)
{
    var canvas = document.getElementById('game_canvas');
    var ctx = canvas.getContext('2d');
    var x_padding = canvas.width / 5;   //padding on sides of board for buttons
    var x_spacing = (canvas.width - 2 * x_padding) / size;  //width of each rectangle on board
    var y_spacing = canvas.height / size;   //height of each rectangle on board
    
    //draws lines separating board from sides
    ctx.beginPath();
    ctx.moveTo(x_padding, 0);
    ctx.lineTo(x_padding, canvas.height);
    ctx.stroke();
    ctx.moveTo(canvas.width - x_padding, 0);
    ctx.lineTo(canvas.width - x_padding, canvas.height);
    ctx.stroke();
    
    //draws inner board lines
    for (i = 1; i < size; i++)
    {
        ctx.moveTo(i * x_spacing + x_padding, 0);
        ctx.lineTo(i * x_spacing + x_padding, canvas.height);
        ctx.stroke();
    }
    for (i = 1; i < size; i++)
    {
        ctx.moveTo(x_padding, i * y_spacing);
        ctx.lineTo(canvas.width - x_padding, i * y_spacing);
        ctx.stroke();
    }
    
    //colors the spaces to the left and right of board
    ctx.fillStyle = "#9932CC";
    ctx.fillRect(0, 0, x_padding, canvas.height)
    ctx.fillRect(canvas.width - x_padding, 0, canvas.width, canvas.height);
}
