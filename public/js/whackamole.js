// (function(){
"use strict"

var index = 0;
var buttonChosen;
var score = 0;
var timer = 30;
// this variable is tied to the click listener that checks if it is correct 
var box = $(".individualBox");



// function that chooses a random button and assigns it to buttonChosen
    function newRandomButton(){
        // find a random button
        var $keys = $('.individualBox');
        var buttonChosen = $keys[Math.floor(Math.random()*$keys.length)];
        moleInSingleButton();
        // console.log(buttonChosen);

        return buttonChosen;
    };

    box.click(function(event){
            console.log(buttonChosen);
            if ( this == buttonChosen ){
                console.log("CORRECT");
                score++;
                $("#score").html(score);
               

            // this is what runs when the sequence fails 
            } else {
                console.log("WRONG")
            }
    });


    function moleInSingleButton(button) {
        $(button).fadeTo("fast", 0.1);
        $(button).fadeTo("fast", 1.0);
        // unsure but i think animating goes here...
        // $(selector).animate({params},speed,callback);
        // $("button").click(function(){
        //     $("div").animate({left: '250px'});
        // }); 
    }


    $("#idOfStart").click(function(){
            countDown();
        setInterval(function() {
            buttonChosen = newRandomButton();
            moleInSingleButton(buttonChosen);
        }, 1500);
    });



    function countDown(){
        var timeInt = setInterval(function(){
            timer--;
            $("#timer").html(timer);
            // onRound();
            if(timer == 0){
                clearInterval(timeInt);
                alert("Game Over!")
            }
        }, 1000)
    }















// }());