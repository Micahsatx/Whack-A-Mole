// (function(){
"use strict"
// global value that is set equal to random button in the newRandomButton
// newRandomButton returns a value for buttonChosen
var buttonChosen;
// setting initial value's for values used.
var score = 0;
var highScore = 0;
var timer = 30;
// this variable is tied to the click listener that checks if it is correct 
// can this variable box be cut out in someway to shorten/clean up code
var box = $(".flower");
var moleInt;
var intervalTime = 1500;


// function that chooses a random button and assigns it to buttonChosen
    function newRandomButton(){
        // find a random button
        var $keys = $('.flower');
        var buttonChosen = $keys[Math.floor(Math.random()*$keys.length)];
        // set the value for button chosen so it can be used if start button is used.
        return buttonChosen;
    };
    // one of these random box variable usages that will likely be changed.
    box.click(function(event){
            console.log(buttonChosen);
            if ( this == buttonChosen ){
                console.log("CORRECT");
                // when clicked correctly add 1 to the current score.  starts at 0 because
                // of global variable value set at the start
                score++;
                $("#score").html(score);
                // if the score is greater than the highscore then replace the previous highscore
                if(score > highScore){
                    highScore = score;
                    // what actually appends the html of the highscore.
                    $("#highScore").html(highScore);
                }
            } else {
                console.log("WRONG")
            }
    });


    function moleInSingleButton(button) {
            $(button).animate({
                'margin-top': '-=50px'
            }, (intervalTime / 2)).delay(1000).animate({
                'margin-top': '+=50px'
            });
            console.log($(button));
    }

    // this likely can be chopped into 2 function so that it is shorter.  start button
    // runs countDown function
    // then the interval uses buttonChosen(the random button/hole)
    // puts the random button/hole into moleInSingleButton that animates a specific random button
    $("#idOfStart").click(function(){
            countDown();
            moleInt = setInterval(function() {
            buttonChosen = newRandomButton();
            moleInSingleButton(buttonChosen);
        }, intervalTime);
    });


    // the countDown function.  starts at 30seconds then lowers the count by 1
    // at an interval or aprox. 1 second.
    function countDown(){
        var timeInt = setInterval(function(){
            timer--;
            $("#timer").html(timer);
            if(timer == 0){
                clearInterval(moleInt);
                clearInterval(timeInt);
                alert("Game Over!")
            }
        }, 1000)
    }















// }());