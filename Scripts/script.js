const msg = document.querySelector(".phrase");
let wins = 0;
let losses = 0;
let isDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
const userInput = document.getElementById("userInput").value;
document.querySelector(".title").innerHTML = 'Practice French';

function applyTheme() {
  document.body.style.backgroundColor = isDark ? 'rgb(25, 25, 25)' : 'rgb(244, 243, 242)';
  document.body.style.color = isDark ? 'white' : 'black';

  document.querySelectorAll('.move-button').forEach(button => {
    button.style.borderColor = isDark ? 'white' : 'black';
  });

  document.querySelectorAll('.reset-score-button').forEach(button => {
    button.style.backgroundColor = isDark ? 'white' : 'black';
    button.style.color = isDark ? 'black' : 'white';
  });
};

applyTheme();

function showStartScreen() {
  document.getElementById('startScreen').hidden = false;
  document.getElementById('game').hidden = true;
  document.getElementById('result').hidden = true;
};

function startGame() {
  document.getElementById("startScreen").hidden = true;
  document.getElementById("result").hidden = true;
  document.getElementById("game").hidden = false;
  document.getElementById('userInput').value = '';
  document.getElementById("userInput").focus();
  if (Math.random() < 0.1) {
    msg.innerHTML = 'Bonjour';
    msg.english = 'hello';
  } else if (Math.random() < 0.2) {
    msg.innerHTML = 'Merci';
    msg.english = 'thank you';
  } else if (Math.random() < 0.3) {
    msg.innerHTML = 'Au revoir';
    msg.english = 'goodbye';
  } else if (Math.random() < 0.4) {
    msg.innerHTML = `S'il vous plaît`;
    msg.english = 'please';
  } else if (Math.random() < 0.5) {
    msg.innerHTML = 'Comment ça va?';
    msg.english = 'how are you?';
  } else if (Math.random() < 0.6) {
    msg.innerHTML = 'Je ne comprends pas';
    msg.english = `i don't understand`;
  } else if (Math.random() < 0.7) {
    msg.innerHTML = 'Je suis désolé';
    msg.english = 'i am sorry';
  } else if (Math.random() < 0.8) {
    msg.innerHTML = `Je t'aime`;
    msg.english = 'i love you';
  } else if (Math.random() < 0.9) {
    msg.innerHTML = 'Excusez-moi';
    msg.english = 'excuse me';
  } else {
    msg.innerHTML = `Je m'appelle tom`;
    msg.english = 'my name is tom';
  };
};

function checkAnswer() {
  if (userInput.toLowerCase() === msg.english) {
    new Audio("Sounds/correct.mp3").play
    document.querySelector(".result-message").innerHTML = "Correct!";
    document.querySelector(".result-message").style.color = "limegreen";
    wins += 1;
  } else {
    new Audio("Sounds/wrong.mp3").play
    document.querySelector(".result-message").innerHTML = "Incorrect.";
    document.querySelector(".result-message").style.color = "red";
    losses += 1;
  };
  const phrase = document.querySelector(".phrase").innerHTML;
  document.querySelector(".correct-answer").innerHTML = `PHRASE: ${phrase}<br>YOUR ANSWER: ${userInput}<br>CORRECT ANSWER: ${msg.english}`;
  document.getElementById("game").hidden = true;
  document.getElementById("result").hidden = false;
  document.getElementById('userInput').value = '';
  document.querySelector('.score').innerHTML = `Wins: ${wins} | Losses: ${losses}`;
};

function reroll() {
  const phrase = document.querySelector(".phrase").innerHTML;
  document.querySelector(".correct-answer").innerHTML = `PHRASE: ${phrase}<br>CORRECT ANSWER: ${msg.english}`;
  document.getElementById("game").hidden = true;
  document.getElementById("result").hidden = false;
  losses += 1;
  document.querySelector('.score').innerHTML = `Wins: ${wins} | Losses: ${losses}`;
};