// Global default for board size
var board_size = 3;
const dot_size = 3; //increasing number will decrease size of dot
var canvas = document.getElementById('game_canvas');
var ctx = canvas.getContext('2d');
var test =  document.getElementById('demo');
var levels = 1;

// Executed when page is loaded
function launch(){
	board = new Board(board_size)
        board.drawGrid();
        
        DEBUG_randomize_board(.3);
        board.drawPieces();
        document.addEventListener('keydown', keyHandler, true);
        document.addEventListener('click', mouseClick, false);
}

// future use for moving dots and clicking spaces?
function getPosition(e)
{
    var x = e.x;
    var y = e.y;

    x -= canvas.offsetLeft;
    y -= canvas.offsetTop;

    x = x - window.pageXOffset;
    y = y + window.pageYOffset;

    test.innerHTML = "x:" + x + " y:" + y; 
    
}

// arrow keys control
function keyHandler(event){
    switch(event.keyCode){
        case 87: /* w is up */
            test.innerHTML = "w is up";
            break;
        case 83: /* s to move down */
            test.innerHTML = "s is down";
            break;
        case 65: /* a to move left */
            test.innerHTML = "a is left";
            break;
        case 68: /* d to move right */
            test.innerHTML = "d is right";
            break;
    }
}

// mouse clicks 
function mouseClick(e){
    getPosition(e);
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
        this.x_padding = document.getElementById('game_canvas').width / 5;   //padding on sides of board 
        this.x_spacing = (document.getElementById('game_canvas').width - 2 * this.x_padding) / size;   //width of each rectangle on board
        this.y_spacing = document.getElementById('game_canvas').height / size;   //height of each rectangle on board
	
	//Initialize 2D array of spaces
	this.space = new Array()
	for(var i = 0; i < size; i++){
		this.space[i] = new Array()
	}
        
        //draws auto-scaled grid on the canvas
        this.drawGrid = function()
        {
            var canvas = document.getElementById('game_canvas');
            var ctx = canvas.getContext('2d');
            
            //draws lines separating board from sides
            ctx.beginPath();
            ctx.moveTo(this.x_padding, 0);
            ctx.lineTo(this.x_padding, canvas.height);
            ctx.stroke();
            ctx.moveTo(canvas.width - this.x_padding, 0);
            ctx.lineTo(canvas.width - this.x_padding, canvas.height);
            ctx.stroke();
            
            //draws inner this lines
            for (i = 1; i < this.size; i++)
            {
                ctx.moveTo(i * this.x_spacing + this.x_padding, 0);
                ctx.lineTo(i * this.x_spacing + this.x_padding, canvas.height);
                ctx.stroke();
            }
            for (i = 1; i < this.size; i++)
            {
                ctx.moveTo(this.x_padding, i * this.y_spacing);
                ctx.lineTo(canvas.width - this.x_padding, i * this.y_spacing);
                ctx.stroke();
            }
            
            //colors the spaces to the left and right of this
            ctx.fillStyle = "#9932CC";
            ctx.fillRect(0, 0, this.x_padding, canvas.height)
            ctx.fillRect(canvas.width - this.x_padding, 0, canvas.width, canvas.height);
            
            //show Level
            ctx.fillStyle = "white";
            ctx.font = "20px Helvetica";
            ctx.textAlign = "left";
            ctx.textBaseline = "top";
            ctx.fillText("Level " + levels, 32, 32);
        }
        
        //draws all pieces to the canvas
        this.drawPieces = function()
        {
            for (i = 0; i < this.size; i++)
            {
                for (j = 0; j < this.size; j++)
                {
                    if (this.space[i][j] !== undefined)  //if the space isn't blank, draw the object
                    {  
                        this.space[i][j].draw(this.x_padding + j * this.x_spacing, i * this.y_spacing, this.x_spacing, this.y_spacing);
                    }
                }
            }
        }
}

// Takes color code and direction, ex: board.space[1][2] = new Dot("#0000FF", "up")
function Dot(color, direction){ // color is a hex code, direction is "up", "right", "down", or "left"
	this.color = color
	this.direction = direction
        
        // takes a location to be drawn, and the width and height of each board tile and draws the dot
        this.draw = function(x, y, space_width, space_height)
        {
            var canvas = document.getElementById('game_canvas');
            var ctx = canvas.getContext('2d');
            x += space_width / 2;
            y += space_height / 2;
            radius = Math.min(space_width / dot_size, space_height / dot_size);
                  
            ctx.fillStyle = this.color;
            ctx.moveTo(x, y);
            ctx.beginPath();
            ctx.arc(x, y, radius, 0, 2 * Math.PI);
            ctx.fill();
            
            //draw the arrows
            distance_to_arrow = Math.min(space_width / 2, space_height / 2);
            switch (this.direction)
            {
                case "down":
                    ctx.moveTo(x - radius, y);
                    ctx.lineTo(x, y + distance_to_arrow);
                    ctx.lineTo(x + radius, y);
                    ctx.lineTo(x - radius, y);
                    ctx.fill();
                    break;
                case "up":
                    ctx.moveTo(x - radius, y);
                    ctx.lineTo(x, y - distance_to_arrow);
                    ctx.lineTo(x + radius, y);
                    ctx.lineTo(x - radius, y);
                    ctx.fill();
                    break;
                case "left":
                    ctx.moveTo(x, y - radius);
                    ctx.lineTo(x - distance_to_arrow, y);
                    ctx.lineTo(x, y + radius);
                    ctx.lineTo(x, y - radius);
                    ctx.fill();
                    break;
                case "right":
                    ctx.moveTo(x, y - radius);
                    ctx.lineTo(x + distance_to_arrow, y);
                    ctx.lineTo(x, y + radius);
                    ctx.lineTo(x, y - radius);
                    ctx.fill();
                    break;
            }


        }
}

