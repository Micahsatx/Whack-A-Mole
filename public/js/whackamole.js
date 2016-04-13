(function(){
"use strict"
// global value that is set equal to random button in the newRandomButton
// newRandomButton returns a value for randomTubeChosen
var randomTubeChosen;
// setting initial value's for values used.
var score = 0;
var highScore = 0;
var timer = 30;
// this variable is tied to the click listener that checks if it is correct 
var flower = $(".flower");
// used in the 2 timer functions.  start button / countDown
var flowerInterval;
var intervalTime = 1500;

    function playTubeSound() {
        $("#tubeSound")[0].play();
    }

    // function animates the flower.  note the interval is 1 seconds divided by 2.  shortens code.
    // if -= was not included in the animate portion the flower wont return to original position
    function animateFlower(button) {
            $(button).animate({
                'margin-top': '-=50px'
            }, (intervalTime / 2)).delay(1000).animate({
                'margin-top': '+=50px'
            });
    }
    
    // randomizer function
    function newRandomButton(){
        var $keys = $('.flower');
        var randomTubeChosen = $keys[Math.floor(Math.random()*$keys.length)];
        // declare the randomTubeChosen so it can be used in the click listener
        return randomTubeChosen;
    };

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
                alert("Game Over!")
                timer = 30;
                score = 0;
            }
            // score and timer were reset above.  change html to show default values
            $("#timer").html(timer);
            $("#score").html(score);
        // game timer goes down at this interval. 1 second.
        }, 1000)
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


    // this likely can be chopped into 2 function so that it is shorter.  start button
    // runs countDown function
    // then the interval uses randomTubeChosen(the random button/hole)
    // puts the random button/hole into animateFlower that animates a specific random button
    $("#idOfStart").click(function(){
        countDown();
        
        // interval that selects a tube at a set interval.  animates flower using that
        flowerInterval = setInterval(function() {
            randomTubeChosen = newRandomButton();
            animateFlower(randomTubeChosen); // function that....
        }, intervalTime);
    });


}());