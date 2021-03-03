
   var userClickedPattern = [];
   var gamePattern = [];
   var buttonColors = ["red", "blue", "green", "yellow"];
   var level = 0;
   var started = false;

   $("h1").click(function() {
     if (!started) {
       started=true;
       nextSecuence();
     }
   });

   $(".btn").click(function(event) {
     var userChosenColor = event.target.id;
     userClickedPattern.push(userChosenColor);
     playSound(userChosenColor);
     animatePress(userChosenColor);
     checkAnswer(userClickedPattern.length - 1);
   });

   function nextSecuence() {
     $("h1").text("Level " + (++level));
     userClickedPattern = [];
     var randomNumber = Math.floor(Math.random()*4);
     var randomChosenColor = buttonColors[randomNumber];
     gamePattern.push(randomChosenColor);

     $("#" + randomChosenColor).fadeOut(100, function() {
       playSound(randomChosenColor);
     }).fadeIn(100);
   }

   function playSound(name) {
     var sound = new Audio("sounds/"+name+".mp3");
     sound.play();
   }

   function animatePress(currentColor) {
     $("#" + currentColor).addClass("pressed");
     setTimeout(function() {
       $("#" + currentColor).removeClass("pressed");
     }, 100);
   }

   function checkAnswer(currentLevel){
     console.log("checking answer for index "+currentLevel+" user length "+userClickedPattern.length+" game length "+gamePattern.length);
     console.log("game "+gamePattern+" / user "+userClickedPattern);
     if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
       console.log("success");
       if (gamePattern.length === userClickedPattern.length) {
         setTimeout(nextSecuence,1000);
       }
     } else {
       console.log("wrong");
       playSound("wrong");
       $("body").addClass("game-over");
       setTimeout(function() {
         $("body").removeClass("game-over");
       },300);
       $("h1").text("Game Over, Click here to Restart");
       startOver();
     }
   }

   function startOver() {
     level = 0;
     gamePattern = [];
     started = false;
   }
