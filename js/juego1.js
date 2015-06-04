$(document).ready(function(){
        // Variables
        var canvas = $("#canvas")[0];
        var cWidth = $("#canvas").width();
        var cHeight = $("#canvas").height();
        var ctx = canvas.getContext("2d");

        //

        function setBackground(){
            // backgroud canvas.
            ctx.fillStyle = "white";
            ctx.fillRect(0, 0, cWidth, cHeight);
            //
            ctx.strokeStyle = "black";
            //ctx.lineWidth = 5;
            ctx.strokeRect(0, 0, cWidth, cHeight);

        }
        setBackground();

        ctx.fillStyle = "lime";
        ctx.fillRect(10, 320, 20, 20);

        ctx.fillStyle = "blue";
        ctx.fillRect(470, 320, 20, 20);
    }
)