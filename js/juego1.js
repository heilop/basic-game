$(document).ready(function(){
        // Variables
        var canvas = $("#canvas")[0];
        var cWidth = $("#canvas").width();
        var cHeight = $("#canvas").height();
        var ctx = canvas.getContext("2d");

        var img = new Image();

        var open = true;
        //

        if(typeof gameLoop != "undefined") {
            clearInterval(gameLoop);
        }

        // Create interval
        gameLoop = setInterval(game, 800);

        function game(){
            setBackground();
            pacmanAnimation();
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

        //setBackground();

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

        /*
        img.onload = function(){
          ctx.drawImage(img, 10, 20);
        }
        img.src = "http://heilop.com/sites/default/files/heilop-logo.png";
        */

    }
)