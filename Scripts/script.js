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
    { french: "Salut",                       answers: ["hi", "hey", "hello"] },
  { french: "Bonsoir",                     answers: ["good evening"] },
  { french: "Bonne nuit",                  answers: ["good night"] },
  { french: "Bonne journée",               answers: ["have a good day", "have a nice day", "good day"] },
  { french: "À bientôt",                   answers: ["see you soon"] },
  { french: "À demain",                    answers: ["see you tomorrow"] },
  { french: "Bienvenue",                   answers: ["welcome"] },
  { french: "De rien",                     answers: ["you're welcome", "you are welcome", "it's nothing", "it is nothing"] },
  { french: "Merci beaucoup",              answers: ["thank you very much", "thank you so much", "thanks a lot", "thanks so much"] },
  { french: "Oui",                         answers: ["yes"] },
  { french: "Non",                         answers: ["no"] },
  { french: "Peut-être",                   answers: ["maybe", "perhaps"] },
  { french: "D'accord",                    answers: ["okay", "ok", "alright", "all right", "agreed"] },
  { french: "Pas de problème",             answers: ["no problem", "no worries"] },
  { french: "Je ne sais pas",              answers: ["i don't know", "i do not know"] },
  { french: "Je comprends",                answers: ["i understand"] },
  { french: "Parlez-vous anglais?",        answers: ["do you speak english?", "do you speak english"] },
  { french: "Je ne parle pas français",    answers: ["i don't speak french", "i do not speak french"] },
  { french: "Où sont les toilettes?",      answers: ["where are the toilets?", "where are the toilets", "where are the bathrooms?", "where are the bathrooms", "where is the bathroom?", "where is the bathroom"] },
  { french: "Combien ça coûte?",           answers: ["how much does it cost?", "how much does it cost", "how much is it?", "how much is it", "how much is that?", "how much is that"] },
  { french: "Quelle heure est-il?",        answers: ["what time is it?", "what time is it"] },
  { french: "Comment tu t'appelles?",      answers: ["what's your name?", "what's your name", "what is your name?", "what is your name"] },
  { french: "Enchanté",                    answers: ["nice to meet you", "pleased to meet you", "delighted"] },
  { french: "Ça va bien",                  answers: ["i'm doing well", "i am doing well", "i'm fine", "i am fine", "i'm good", "i am good", "it's going well", "it is going well"] },
  { french: "Et vous?",                    answers: ["and you?", "and you"] },
  { french: "Je voudrais un café",         answers: ["i would like a coffee", "i'd like a coffee"] },
  { french: "L'addition, s'il vous plaît", answers: ["the bill, please", "the bill please", "the check, please", "the check please"] },
  { french: "J'ai faim",                   answers: ["i'm hungry", "i am hungry"] },
  { french: "J'ai soif",                   answers: ["i'm thirsty", "i am thirsty"] },
  { french: "Je suis fatigué",             answers: ["i'm tired", "i am tired"] },
  { french: "Je suis perdu",               answers: ["i'm lost", "i am lost"] },
  { french: "Aidez-moi",                   answers: ["help me", "help me!"] },
  { french: "Bon appétit",                 answers: ["enjoy your meal", "enjoy your food", "enjoy", "have a good meal"] },
  { french: "Félicitations",               answers: ["congratulations", "congrats"] },
  { french: "Bonne chance",                answers: ["good luck"] },
  { french: "Joyeux anniversaire",         answers: ["happy birthday"] },
  { french: "Bonne année",                 answers: ["happy new year"] },
  { french: "Santé",                       answers: ["cheers", "to your health"] },
  { french: "Pardon",                      answers: ["pardon", "sorry", "excuse me", "pardon me"] },
    { french: "Comment allez-vous?",                    answers: ["how are you?", "how are you", "how do you do?", "how do you do"] },
  { french: "Je vais bien",                           answers: ["i'm well", "i am well", "i'm fine", "i am fine", "i'm good", "i am good", "i'm doing well", "i am doing well"] },
  { french: "Très bien",                              answers: ["very good", "very well", "great"] },
  { french: "Pas mal",                                answers: ["not bad"] },
  { french: "Comme ci, comme ça",                     answers: ["so-so", "so so", "okay"] },
  { french: "Quoi de neuf?",                          answers: ["what's new?", "what's new", "what is new?", "what is new", "what's up?", "what's up"] },
  { french: "Bien sûr",                               answers: ["of course", "sure", "certainly"] },
  { french: "Exactement",                             answers: ["exactly"] },
  { french: "Pas du tout",                            answers: ["not at all"] },
  { french: "Tant pis",                               answers: ["too bad", "oh well", "never mind"] },
  { french: "C'est vrai",                             answers: ["it's true", "it is true", "that's true", "that is true", "that's right", "that is right"] },
  { french: "C'est faux",                             answers: ["it's false", "it is false", "that's false", "that is false", "that's wrong", "that is wrong"] },
  { french: "Je suis d'accord",                       answers: ["i agree", "i'm in agreement", "i am in agreement"] },
  { french: "Je ne suis pas d'accord",                answers: ["i disagree", "i don't agree", "i do not agree"] },
  { french: "Je ne suis pas sûr",                     answers: ["i'm not sure", "i am not sure"] },
  { french: "Je suis en retard",                      answers: ["i'm late", "i am late"] },
  { french: "Je suis content",                        answers: ["i'm happy", "i am happy", "i'm glad", "i am glad", "i'm pleased", "i am pleased"] },
  { french: "Je suis malade",                         answers: ["i'm sick", "i am sick", "i'm ill", "i am ill"] },
  { french: "J'ai besoin d'aide",                     answers: ["i need help"] },
  { french: "J'ai besoin d'un médecin",               answers: ["i need a doctor"] },
  { french: "J'habite à Paris",                       answers: ["i live in paris"] },
  { french: "Où habitez-vous?",                       answers: ["where do you live?", "where do you live"] },
  { french: "Quel âge as-tu?",                        answers: ["how old are you?", "how old are you"] },
  { french: "Qu'est-ce que c'est?",                   answers: ["what is this?", "what is this", "what is it?", "what is it", "what's this?", "what's this", "what is that?", "what is that", "what's that?", "what's that"] },
  { french: "Pourquoi?",                              answers: ["why", "why?"] },
  { french: "Quand?",                                 answers: ["when", "when?"] },
  { french: "Où?",                                    answers: ["where", "where?"] },
  { french: "Qui?",                                   answers: ["who", "who?"] },
  { french: "Répétez, s'il vous plaît",               answers: ["please repeat", "please repeat that", "repeat, please", "repeat please", "repeat that, please", "repeat that please"] },
  { french: "Parlez plus lentement, s'il vous plaît", answers: ["please speak more slowly", "speak more slowly, please", "speak more slowly please", "please speak slower", "speak slower, please", "speak slower please"] },
  { french: "Je voudrais de l'eau",                   answers: ["i would like water", "i'd like water", "i would like some water", "i'd like some water"] },
  { french: "Une table pour deux",                    answers: ["a table for two"] },
  { french: "C'est délicieux",                        answers: ["it's delicious", "it is delicious", "that's delicious", "that is delicious"] },
  { french: "C'est trop cher",                        answers: ["it's too expensive", "it is too expensive", "that's too expensive", "that is too expensive"] },
  { french: "Je cherche la gare",                     answers: ["i'm looking for the train station", "i am looking for the train station", "i'm looking for the station", "i am looking for the station"] },
  { french: "Tournez à gauche",                       answers: ["turn left"] },
  { french: "Tournez à droite",                       answers: ["turn right"] },
  { french: "Tout droit",                             answers: ["straight ahead", "straight on", "go straight", "straight"] },
  { french: "C'est loin?",                            answers: ["is it far?", "is it far", "is that far?", "is that far"] },
  { french: "Il fait beau",                           answers: ["the weather is nice", "the weather is good", "it's nice out", "it is nice out", "it's nice weather", "it is nice weather"] },
  { french: "Il pleut",                               answers: ["it's raining", "it is raining"] },
  { french: "Il fait froid",                          answers: ["it's cold", "it is cold"] },
  { french: "Il fait chaud",                          answers: ["it's hot", "it is hot", "it's warm", "it is warm"] },
  { french: "Quel temps fait-il?",                    answers: ["what's the weather like?", "what's the weather like", "what is the weather like?", "what is the weather like", "how's the weather?", "how's the weather", "how is the weather?", "how is the weather"] },
  { french: "À tout à l'heure",                       answers: ["see you later", "see you in a bit", "see you shortly"] },
  { french: "À plus tard",                            answers: ["see you later", "until later"] },
  { french: "Bonne soirée",                           answers: ["have a good evening", "have a nice evening", "enjoy your evening"] },
  { french: "Bon week-end",                           answers: ["have a good weekend", "have a nice weekend", "enjoy your weekend"] },
  { french: "Bon voyage",                             answers: ["have a good trip", "have a nice trip", "safe travels", "bon voyage"] },
  { french: "Je vous en prie",                        answers: ["you're welcome", "you are welcome", "go ahead", "after you"] },
  { french: "Aujourd'hui",                            answers: ["today"] },
  { french: "Demain",                                 answers: ["tomorrow"] },
  { french: "Hier",                                   answers: ["yesterday"] },
  { french: "Maintenant",                             answers: ["now"] },
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
