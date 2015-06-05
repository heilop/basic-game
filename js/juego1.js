$(document).ready(function(){
        // Variables
        var canvas = $("#canvas")[0];
        var cWidth = $("#canvas").width();
        var cHeight = $("#canvas").height();
        var ctx = canvas.getContext("2d");

        //var img = new Image();

        var open = true;

        var player = {direction: "r",posX: 100, posY: 300, width: 15, height:15};
        var coin = {draw:false, posX: 200, posY: 200, width: 10, height: 10};

        /*
         * Function init().
         * Initial settings for run game.
         */
        function init(){
            // Chek if exist a game loop.
            if(typeof gameLoop != "undefined") {
                // Clear interval
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

        /*
         * Function game().
         * Call other functions.
         */
        function game(){
            setBackground();
            borderCollision();
            //pacmanAnimation();
            movePlayer();
            drawPlayer();
        }

        /*
         * Function setBackground().
         * Draw canvas background.
         */
        function setBackground(){
            //Save context.
            ctx.save();
            // Set fill color.
            ctx.fillStyle = "white";
            ctx.fillRect(0, 0, cWidth, cHeight);
            // Set stroke color.
            ctx.strokeStyle = "black";
            //ctx.lineWidth = 5;
            ctx.strokeRect(0, 0, cWidth, cHeight);
            ctx.restore();
        }

        /*
         * Function setPlayer().
         * Use to create a player with settings.
         */
        function setPlayer(color, x, y, width, height){
            ctx.save();
            ctx.fillStyle = color;
            ctx.fillRect(x, y, width, height);
            ctx.restore();
        }

        // Call functions.
        game();

        /*
         * Function degreesToRadian().
         * Return Radians from grades.
         */
        function degreesToRadian(degr){
            return (degr * Math.PI)/180;
        }

        /*
         * Function pacmanAnimation().
         * Function to Animate a pacman.
         */
        function pacmanAnimation(){
            ctx.save();
            // Initializing path.
            ctx.beginPath();

            // Is not open(mouth).
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

        /*
         * Function drawPlayer().
         * Draw player on the canvas.
         */
        function drawPlayer(){
            ctx.save();
            ctx.fillStyle = "blue";
            ctx.fillRect(player.posX, player.posY, player.width, player.height);
            ctx.restore();
        }

        /*
         * Function movePlayer().
         * Used to move player: up, down, right, left.
         */
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

        /*
        * Function borderCollision().
        * Stop player when crash border.
        */
        function borderCollision(){
            if(player.posY <= 5 && player.direction == "u"){
                player.posY = 0;
                player.direction = "s";
            }
            else if(player.posX <= 5 && player.direction == "l"){
                player.posX = 0;
                player.direction = "s";
            }
            else if(player.posY + player.height >= cHeight - 5 && player.direction == "d"){
                player.posY = cHeight - player.height;
                player.direction = "s";
            }
            else if(player.posX + player.width  >= cWidth -5 && player.direction == "r"){
                player.posX = cWidth - player.width;
                player.direction = "s";
            }
        }

        function coinProbability(){
            if(!coin.draw && Math.floor((Math.random()*50) +1) < 4){
                coin.draw = true;
            }
        }

        // Call functions.
        init();
        /*
        img.onload = function(){
          ctx.drawImage(img, 10, 20);
        }
        img.src = "http://heilop.com/sites/default/files/heilop-logo.png";
        */


        //https://www.youtube.com/watch?v=eTTXr2trsMw
    }
)