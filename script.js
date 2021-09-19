var buttoncolours=["red","blue","green","yellow"];
var gamePatern=[];
var userClickedPattern=[];
var started=false;
var level=0;


    $(document).keypress(function(){
    
     if(!started){   
     $("#level-title").text("Level "+ level);
    nextSequence();
    started=true;
   // document.querySelectorAll("#level-title");
    //this.text="level"+level;
    }
});
$(".btn").click(function(){
    var userChooseColor=$(this).attr("id")
    userClickedPattern.push(userChooseColor);
    playSound(userChooseColor);
    animatePress(userChooseColor);
    checkAnswer(userClickedPattern.length-1);
    
});

function checkAnswer(currentLevel){
    if(gamePatern[currentLevel]===userClickedPattern[currentLevel]){
        if(userClickedPattern.length===gamePatern.length){
            setTimeout(function(){
                nextSequence();
            },1000);
        }
    }
    else{
        playSound("wrong")
        $("body").addClass("game-over");
        $("#level-title").text("Game Over,Press any key to restart")

        setTimeout(function(){
            $("body").removeClass("game-over")
        },200);
        startOver();
    }
}


function nextSequence(){
    userClickedPattern=[];
    level++;
    $("#level-title").text("Level"+level)
    var randomNumber=Math.round(Math.random()*4);
    var randomChoosenColor=buttoncolours[randomNumber];
    gamePatern.push(randomChoosenColor);

    $("#"+randomChoosenColor).fadeIn(100).fadeOut(100).fadeIn(100);
     playSound(randomChoosenColor);   
}
function animatePress(currentColor) {
    $("#" + currentColor).addClass("pressed");
    setTimeout(function () {
      $("#" + currentColor).removeClass("pressed");
    }, 100);
  }
function playSound(name){
var audio=new Audio("sounds/"+ name + ".mp3")
audio.play();
}
function startOver(){
    level=0;
    gamePatern=[];
    started=false;
}