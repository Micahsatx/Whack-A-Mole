(function(){
"use strict"
// global value that is set equal to random button in the newRandomTube
// newRandomButton returns a value for randomTubeChosen
var randomTubeChosen;
// setting initial value's for values used.
var score = 0;
var highScore = 0;
var timer = 30;
// this variable is tied to the click listener that checks if flower click was successful 
var flower = $(".flower");
// used in the 2 timer functions.  start button / countDown
var flowerInterval;
var intervalTime = 1500;
var intervalTimeHard = 900;
var intervalTimeEasy = 2500;

    function startGame(interval){
        countDown();
        // interval that selects a tube at a set interval.  animates flower using that
        flowerInterval = setInterval(function() {
            // gives randomTubeChosen a value
            randomTubeChosen = newRandomTube();
            // animates the flower within the randomTubeChosen
            animateFlower(randomTubeChosen);
        }, interval);
    }

    // the countDown function.  starts at 30seconds then lowers the count by 1
    // at an interval or aprox. 1 second.
    function countDown(){
        var gameTimerInterval = setInterval(function(){
            timer--;
            if(timer == 0){
                // stop intervals for flower animation and game timer so it doesnt continue
                // running when the game ends
                clearInterval(flowerInterval);
                clearInterval(gameTimerInterval);
                alert("Game Over!");
                timer = 30;
                score = 0;
            }
            // score and timer were reset above.  change html to show default values
            $("#timer").html(timer);
            $("#score").html(score);
        // game timer goes down at this interval. 1 second.
        }, 1000)
    }

    // randomizer function
    function newRandomTube(){
        var $keys = $('.flower');
        var randomTubeChosen = $keys[Math.floor(Math.random()*$keys.length)];
        // declare the randomTubeChosen so it can be used in the click listener
        return randomTubeChosen;
    };
    
    // function animates the flower.  note the interval is 1 seconds divided by 2.  shortens code.
    // if -= was not included in the animate portion the flower wont return to original position
    function animateFlower(button) {
            $(button).animate({
                'margin-top': '-=50px'
            },
            (intervalTime / 2)).delay(1000).animate({
                'margin-top': '+=50px'
            });
    }

    function scoreKeeper(){
        $("#score").html(score);
        // if the score is greater than the highscore then replace the previous highscore
        if(score > highScore){
            highScore = score;
            // what actually appends the html of the highscore.
            $("#highScore").html(highScore);
        }
    }

    function playTubeSound() {
        $("#tubeSound")[0].play();
    }

    // flower click listener
    flower.click(function(event){
        if ( this == randomTubeChosen ){
            // when clicked correctly add 1 to the current score.  starts at 0 because
            // of global variable value set at the start
            score++;
            scoreKeeper();
            playTubeSound();
        }
    });
    
    $("#idOfStartEasyMode").click(function(){
        startGame(intervalTimeEasy);
    });

    $("#idOfStartNormalMode").click(function(){
        startGame(intervalTime);
    });

    $("#idOfStartHardMode").click(function(){
        startGame(intervalTimeHard);
    });

}());