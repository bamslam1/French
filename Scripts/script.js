const msg = document.querySelector(".phrase");
let isDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
document.querySelector(".title").innerHTML = 'Practice French';
let score = JSON.parse(localStorage.getItem('frenchScore')) || {
  wins: 0,
  losses: 0
};
const phrases = [
  { french: "Bonjour",             answers: ["hello", "hi", "good morning"] },
  { french: "Merci",               answers: ["thank you", "thanks"] },
  { french: "Au revoir",           answers: ["goodbye", "bye"] },
  { french: "S'il vous plaît",     answers: ["please"] },
  { french: "Comment ça va?",      answers: ["how are you?", "how are you"] },
  { french: "Je ne comprends pas", answers: ["i don't understand", "i do not understand"] },
  { french: "Je suis désolé",      answers: ["i am sorry", "i'm sorry", "sorry"] },
  { french: "Je t'aime",           answers: ["i love you"] },
  { french: "Excusez-moi",         answers: ["excuse me"] },
  { french: "Je m'appelle Tom",    answers: ["my name is tom"] },
];

let current = null;   // the phrase object on screen right now

const soundWin = new Audio("Sounds/correct.mp3");
const soundWrong = new Audio("Sounds/wrong.mp3");

function focus() {
document.getElementById("userInput").focus();
};

showScore();
applyTheme();

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
  focus();
  pickPhrase();
};

function updateScore() {
  localStorage.setItem('frenchScore', JSON.stringify(score));
  showScore();
};

function showScore() {
  document.querySelector('.score').innerHTML = `Wins: ${score.wins} | Losses: ${score.losses}`;
};

function checkAnswer() {
  const userInput = document.getElementById("userInput").value;
  document.getElementById("result").hidden = false;
  document.getElementById("goAgain").hidden = true
  document.getElementById('userInput').value = '';

  if (!userInput.trim()) {
    document.getElementById('userInput').value = 'INVALID ENTRY';
    setTimeout(() => {
      document.getElementById('userInput').value = ''
      focus();
      }, 1000);
      return
    };

  document.getElementById("game").hidden = true;

  const isCorrect = current.answers.some(a => normalize(a) === normalize(userInput));

  if (isCorrect) {
    const gif = document.querySelector(".rightGif");
    const result = document.querySelector(".result-message");
    soundWin.play();
    result.innerHTML = "Correct!";
    result.style.color = "limegreen";
    gif.hidden = false;
    setTimeout(() => {
      gif.hidden = true;
      document.getElementById("goAgain").hidden = false;
    }, 1500);
    score.wins++;
    updateScore();
  } else {
    const gif = document.querySelector(".wrongGif");
    const result = document.querySelector(".result-message");
    soundWrong.play();
    result.innerHTML = "Incorrect.";
    result.style.color = "red";
    gif.hidden = false;
    setTimeout(() => {
      gif.hidden = true;
      document.getElementById("goAgain").hidden = false;
    }, 1000);
    score.losses++;
    updateScore();
  }

  document.querySelector(".correct-answer").textContent =
    `PHRASE: ${current.french}\nYOUR ANSWER: ${userInput}\nCORRECT ANSWER: ${current.answers.join(" / ")}`;

  showScore();
};

function reroll() {
  document.querySelector(".result-message").textContent = '';
  document.querySelector(".correct-answer").textContent =
    `PHRASE: ${current.french}\nCORRECT ANSWER: ${current.answers.join(" / ")}`;
  document.getElementById("game").hidden = true;
  document.getElementById("result").hidden = false;
  score.losses++;
  updateScore();
};

function pickPhrase() {
  let next;
  do {
    next = phrases[Math.floor(Math.random() * phrases.length)];
  } while (next === current && phrases.length > 1);   // no immediate repeats
  current = next;
  msg.textContent = current.french;
};

function normalize(text) {
  return text.trim().toLowerCase().replace(/[’‘]/g, "'");   // trim, lowercase, curly to straight apostrophes
};
