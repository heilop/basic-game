$(document).ready(function(){
        // Variables
        var canvas = $("#canvas")[0];
        var cWidth = $("#canvas").width();
        var cHeight = $("#canvas").height();
        var ctx = canvas.getContext("2d");

        //

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

        setBackground();

        function degreesToRadian(degr){
            return (degr * Math.PI)/180;
        }

        //Drawing circles
        ctx.beginPath();
        ctx.arc(250, 175, 60, degreesToRadian(40), degreesToRadian(320));
        ctx.lineTo(250, 175);
        ctx.lineTo(297, 212);
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
)