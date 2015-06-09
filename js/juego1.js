$(document).ready(function(){
        // Variables
        var canvas = $("#canvas")[0];
        var cWidth = $("#canvas").width();
        var cHeight = $("#canvas").height();
        var ctx = canvas.getContext("2d");

        //var img = new Image();
        var timer = 0;
        var open = true;
        var score = 0;

        var player = {direction: "r", posX: (cWidth/2) - 7, posY: (cHeight/2) - 7, width: 15, height:15};
        var coin = {draw:false, posX: 0, posY: 0, width: 10, height: 10};

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
            gameLoop = setInterval(game, 30);
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
            coinTimer();
            coinProbability();
            borderCollision();
            coinCollision();
            //pacmanAnimation();
            movePlayer();
            drawPlayer();
            drawCoin();
            drawScore();
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


        function drawScore(){
            var text = "Score: " + score;
            ctx.font = "20px Arial";
            ctx.fillStyle = "black";
            ctx.fillText(text, 10, 30);
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
         * Function drawCoin().
         * Draw Coin on the canvas.
         */
        function drawCoin(){
            if(coin.draw) {
                ctx.save();
                ctx.fillStyle = "yellow";
                ctx.fillRect(coin.posX, coin.posY, coin.width, coin.height);
                ctx.strokeStyle = "black";
                ctx.strokeRect(coin.posX, coin.posY, coin.width, coin.height);
                ctx.restore();
                if(timer > 300){
                    coin.draw = false;

                }
            }
        }

        /*
         * Function movePlayer().
         * Used to move player: up, down, right, left.
         */
        function movePlayer(){
            switch(player.direction){
                case "r":
                    player.posX += 3;
                    break;
                case "l":
                    player.posX -= 3;
                    break;
                case "u":
                    player.posY -= 3;
                    break;
                case "d":
                    player.posY += 3;
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

        function coinCollision(){
            if(coin.draw &&
                player.posX + player.width > coin.posX &&
                player.posX < coin.posX + coin.width &&
                player.posY < coin.posY + coin.height &&
                player.posY + player.height > coin.posY
            ){
                coin.draw = false;
                score += 10;
            }
        }

        function coinProbability(){
            if(!coin.draw && Math.floor((Math.random()*400) +1) < 4){
                coin.posX = Math.floor(Math.random()*(cWidth - coin.width));
                coin.posY = Math.floor(Math.random()*(cHeight - coin.height));
                coin.draw = true;
            }
        }


        function coinTimer(){
            if(coin.draw){
                timer++;
            }else{
                timer = 0;
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