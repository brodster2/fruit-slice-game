$(function(){
    var playing = false;
    var lives;
    var score;
    var gameOver;
    var step;
    var action; //interval
    var fruitArray = ["apple", "banana", "cherry", "grapes", "orange", "pear", "pineapple", "plum", "strawberry"];
    
    //Click on start-reset button
    $("#start-reset-box").click(function(){
        //We are playing
        if(playing == true){
            location.reload();
        }else{
            //We are not playing
            playing = true;
            lives = 3;
            score = 0;
            $("#game-over-wrapper").hide();
            $("#score-display").html(score);
            //change button text
            $("#start-reset-box").html("Reset Game");
            //show lives box
            $("#lives-box").show();
            addLives();
            startAction();
        }
    });
    
    $("#fruit-image").mouseover(function(){
        score++;
        $("#score-display").html(score);
//        document.getElementById("slicesound").play();
        $("#sliceSound")[0].play();
        
        //Stop fruit moving
        clearInterval(action);
        
        //explode fruit animation
        $("#fruit-image").hide("explode", 500);
        
        //Send new fruit
        setTimeout(startAction, 500);
    });
    
/*-------- Functions start here -----------*/
    
    //show lives left
    function addLives(){
        $("#lives-box").empty();
        for(i=0; i<lives; i++){
            $("#lives-box").append('<img src="images/life.png" id="life-img">');
        }
    }
    
    //Start showing a fruit image
    function startAction() {
        $("#fruit-image").show();
        
        //Choose random fruit.
        chooseFruit(); 
        
        //Randomly positon the fruit on x-axis
        $("#fruit-image").css({'left':''+ Math.round(82*Math.random())+'%', 'top': -5});
        
        //Generate a random step to move fruit
        step = 1 + Math.round(5 * Math.random());
        
        //move fruit by step every 10ms
        action = setInterval(function(){
            
            //Add the step to the fruit-image
            $("#fruit-image").css('top', $("#fruit-image").position().top + step);
            
            //Check the height of the fruit-image
            if($("#fruit-image").position().top > $("#fruits-box").height()) {
                if(lives > 1) {
                    lives--;
                    addLives();
                    $("#fruit-image").show();
        
                    //Choose random fruit.
                    chooseFruit(); 

                    //Randomly positon the fruit on x-axis
                    $("#fruit-image").css({'left':''+ Math.round(82*Math.random())+'%', 'top': 0});

                    //Generate a random step to move fruit
                    step = 1 + Math.round(5 * Math.random());
                } else {
                    //Game Over
                    playing = false;
                    $("#game-over-wrapper").show();
                    $("#start-reset-box").html("Start Game");
                    $("#lives-box").hide();
                    $("#game-over-score").html("" + score);
                    stopAction();
                }
            }
            
        },10);
    
    }
    //Choose a random fruit image from fruitArray
    function chooseFruit() {
        var x = Math.round(8*Math.random());
        $("#fruit-image").attr('src', 'images/' + fruitArray[x] + '.png');
    }
    
    function stopAction() {
        clearInterval(action);
        $("#fruit-image").hide();
    }
    
    /*  My idea for moving fruit-image down
    function fallingFruit() {
        $("#fruit-image").animate({
            top: '380'
        },3000,"linear",function(){
            lives--;
            $("#lives-box").html("");
            addLives();
        });
    }*/
});

/*
              
    ***Slice fruit > play explosion sound > score++
*/