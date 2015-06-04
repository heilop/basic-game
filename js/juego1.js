$(document).ready(function(){
        // Variables
        var canvas = $("#canvas")[0];
        var cWidth = $("#canvas").width();
        var cHeight = $("#canvas").height();
        var ctx = canvas.getContext("2d");

        //var img = new Image();

        var open = true;

        var player = {direction: "r",posX: 100, posY: 100, width: 15, height:15};

        function init(){

            if(typeof gameLoop != "undefined") {
                clearInterval(gameLoop);
            }
            // Create interval
            gameLoop = setInterval(game, 500);
        }

        // KeyPress
        $(document).keydown(function(event){
            var key = event.which;
            switch(key){
                case 39:
                    player.direction = "r";
                    break;
                case 37:
                    player.direction = "l";
                    break;
                case 38:
                    player.direction = "u";
                    break;
                case 40:
                    player.direction = "d";
                    break;

            }
        })

        function game(){
            setBackground();
            //pacmanAnimation();
            movePlayer();
            drawPlayer();
        }
        function setBackground(){
            ctx.save();
            // backgroud canvas.
            ctx.fillStyle = "white";
            ctx.fillRect(0, 0, cWidth, cHeight);
            //
            ctx.strokeStyle = "black";
            //ctx.lineWidth = 5;
            ctx.strokeRect(0, 0, cWidth, cHeight);
            ctx.restore();
        }

        function setPlayer(color, x, y, width, height){
            ctx.save();
            ctx.fillStyle = color;
            ctx.fillRect(x, y, width, height);
            ctx.restore();
        }

        game();

        function degreesToRadian(degr){
            return (degr * Math.PI)/180;
        }

        //Drawing circles
        function pacmanAnimation(){
            ctx.save();
            ctx.beginPath();

            // Is not open
            if(!open){
                ctx.arc(250, 175, 60, degreesToRadian(40), degreesToRadian(320));
                ctx.lineTo(250, 175);
                ctx.lineTo(297, 212);
                open = true;
            }else{
                ctx.arc(250, 175, 60, degreesToRadian(0), degreesToRadian(360));
                ctx.lineTo(250, 175);
                open = false;
            }

            ctx.closePath();

            ctx.fillStyle = "yellow";
            ctx.fill();

            ctx.lineWidth =2;
            ctx.strokeStyle = "black";
            ctx.stroke();

            ctx.fillStyle = "black";
            ctx.beginPath();
            ctx.arc(242, 145, 10, degreesToRadian(0), degreesToRadian(360));
            ctx.closePath();
            ctx.fill();
        }

        function drawPlayer(){
            ctx.save();
            ctx.fillStyle = "blue";
            ctx.fillRect(player.posX, player.posY, player.width, player.height);
            ctx.restore();
        }

        function movePlayer(){
            switch(player.direction){
                case "r":
                    player.posX += 10;
                    break;
                case "l":
                    player.posX -= 10;
                    break;
                case "u":
                    player.posY -= 10;
                    break;
                case "d":
                    player.posY += 10;
                    break;
                default:
                    player.posX = player.posX;
                    player.posY = player.posY;
            }

        }

        init();
        /*
        img.onload = function(){
          ctx.drawImage(img, 10, 20);
        }
        img.src = "http://heilop.com/sites/default/files/heilop-logo.png";
        */

    }
)