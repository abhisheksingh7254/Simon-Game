var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];

var started = false;
var level = 0;

function nextSequence() {
  userClickedPattern = [];
  level++;
  $("#level-title").text("Level " + level);

  var randomNumber = Math.floor(Math.random() * 4);
  var randomChoosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChoosenColour);
  $("#" + randomChoosenColour)
    .fadeIn(100)
    .fadeOut(100)
    .fadeIn(100);
  makeSound(randomChoosenColour);
}
function checkAnswer(currentLevel) {
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    if (gamePattern.length === userClickedPattern.length) {
      setTimeout(function () {
        nextSequence();
      }, 1000);
    }
  } else {
    makeSound("wrong");
    $("body").addClass("game-over");
    $("#level-title").text("Game Over,Press Any Key To Restart");

    setTimeout(function () {
      $("body").removeClass("game-over");
    }, 200);
    startOver();
  }
}
function startOver() {
  level = 0;
  gamePattern = [];
  started = false;
}

function makeSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

$(".btn").click(function () {
  var userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);
  makeSound(userChosenColour);
  animatePress(userChosenColour);
  checkAnswer(userClickedPattern.length - 1);
});
function animatePress(currentColor) {
  $("#" + currentColor).addClass("pressed");
  setTimeout(function () {
    $("#" + currentColor).removeClass("pressed");
  }, 100);
}

$(document).keydown(function () {
  if (!started) {
    $("#level-title").text("Level" + level);
    nextSequence();
    started = true;
  }
});
