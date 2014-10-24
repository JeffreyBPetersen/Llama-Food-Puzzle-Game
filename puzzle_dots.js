drawGrid(3);

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
