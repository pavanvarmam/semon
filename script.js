var buttonPause = false;
var gameRunning = false;
const systemArray = [];
var clickCount = -1;
var score = 0;
const colors = ['green','red','yellow','blue'];

function textChanger(tagName,text){
  $(tagName).text(text);
}

function randomGenerator(){
  var random = Math.floor(Math.random()*4)+1;
  if(random === 1){
    animateButtons('green',random);
  }else if(random === 2){
    animateButtons('red',random);
  }else if(random === 3){
    animateButtons('yellow',random);
  }else if(random === 4){
    animateButtons('blue',random);
  }
}

function animateButtons(className,arrayValue){
  buttonPause = true;
  systemArray.push(arrayValue);
  setTimeout(function () {
    $('.'+className).animate({opacity : '0.2',borderWidth : '0px'});
  }, 100);
  setTimeout(function () {
    $('.'+className).animate({opacity : '1',borderWidth : '10px'});
    buttonPause = false;
  }, 400);
}

function playSound(className){
  var audio = new Audio('sounds/'+className+'.mp3');
  audio.play();
}

function clickChecker(clickValue){
  clickCount++;
  if(systemArray[clickCount] === clickValue){
    if(clickCount === systemArray.length-1){
      clickCount = -1;
      randomGenerator();
      score++;
      textChanger('h1','Score : '+score);
    }
    return true;
  }else{
    console.log('Wrong move');
    gameRunning = false;
    return false;
  }
}

function whenWrong(){
  playSound('wrong');
  textChanger('h1','Game over please refresh');
}

function driverClass(className){
  if (className === 'green') {
    if(clickChecker(1)){
      playSound(className);
    }else {
      whenWrong();
    }
  }else if (className === 'red') {
    if(clickChecker(2)){
      playSound(className);
    }else {
      whenWrong();
    }
  }else if (className === 'yellow') {
    if(clickChecker(3)){
      playSound(className);
    }else {
      whenWrong();
    }
  }else if (className === 'blue') {
    if(clickChecker(4)){
      playSound(className);
    }else {
      whenWrong();
    }
  }
}

function onBtnClicked(className){
  $('.'+className).on('click',function(){

      if(buttonPause || !gameRunning){
        return;
      }
      driverClass(className);
  });
}

function startGame(){
  $('body').on('keydown',function(event){
    if((event.key === 's' || event.key === 'S') && !gameRunning){
      textChanger('h1','Game start');
      gameRunning = true;
      randomGenerator();
    }
  })

  for(var i=0; i<colors.length; i++){
    onBtnClicked(colors[i]);
  }

  $('.start').on('click',function(){
    if(!gameRunning){
      textChanger('h1','Game start');
      gameRunning = true;
      randomGenerator();
    }
  });
}


//////////////////////////

startGame();
