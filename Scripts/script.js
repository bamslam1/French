const msg = document.querySelector(".phrase");
let isDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

function load(key, fallback) {
  try { return JSON.parse(localStorage.getItem(key)) ?? fallback; }
  catch { return fallback; }
}

let prevFrench = null;

let pressedStartCount = load('frenchStartPressed', 0);   // no longer used, kept so old onclick handlers don't error
document.querySelector(".title").innerHTML = 'FrançaisFlash';
let score = load('frenchScore', null) || {
  wins: 0,
  losses: 0
};

const allPhrases = [
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

const easyPhrases = [
  { french: "Bonjour",          answers: ["hello", "hi", "good morning"] },
  { french: "Salut",            answers: ["hi", "hey", "hello"] },
  { french: "Bonsoir",          answers: ["good evening"] },
  { french: "Au revoir",        answers: ["goodbye", "bye"] },
  { french: "Merci",            answers: ["thank you", "thanks"] },
  { french: "S'il vous plaît",  answers: ["please"] },
  { french: "Oui",              answers: ["yes"] },
  { french: "Non",              answers: ["no"] },
  { french: "Pardon",           answers: ["sorry", "pardon", "excuse me"] },

  { french: "Un",               answers: ["one", "1"] },
  { french: "Deux",             answers: ["two", "2"] },
  { french: "Trois",            answers: ["three", "3"] },
  { french: "Quatre",           answers: ["four", "4"] },
  { french: "Cinq",             answers: ["five", "5"] },
  { french: "Six",              answers: ["six", "6"] },
  { french: "Sept",             answers: ["seven", "7"] },
  { french: "Huit",             answers: ["eight", "8"] },
  { french: "Neuf",             answers: ["nine", "9"] },
  { french: "Dix",              answers: ["ten", "10"] },

  { french: "Rouge",            answers: ["red"] },
  { french: "Bleu",             answers: ["blue"] },
  { french: "Vert",             answers: ["green"] },
  { french: "Jaune",            answers: ["yellow"] },
  { french: "Noir",             answers: ["black"] },
  { french: "Blanc",            answers: ["white"] },

  { french: "L'eau",            answers: ["water", "the water"] },
  { french: "Le pain",          answers: ["bread", "the bread"] },
  { french: "Le lait",          answers: ["milk", "the milk"] },
  { french: "Le café",          answers: ["coffee", "the coffee"] },
  { french: "La pomme",         answers: ["apple", "the apple", "an apple"] },
  { french: "Le chat",          answers: ["cat", "the cat", "a cat"] },
  { french: "Le chien",         answers: ["dog", "the dog", "a dog"] },
  { french: "La maison",        answers: ["house", "the house", "a house", "home"] },
  { french: "L'école",          answers: ["school", "the school"] },
  { french: "Le livre",         answers: ["book", "the book", "a book"] },
  { french: "L'ami",            answers: ["friend", "the friend", "a friend"] },
  { french: "La famille",       answers: ["family", "the family"] },
];

const mediumPhrases = [
  { french: "Je suis étudiant",            answers: ["i am a student", "i'm a student"] },
  { french: "Je suis canadien",            answers: ["i am canadian", "i'm canadian"] },
  { french: "Je viens du Canada",          answers: ["i come from canada", "i am from canada", "i'm from canada"] },
  { french: "Je parle anglais",            answers: ["i speak english"] },
  { french: "J'habite ici",                answers: ["i live here"] },
  { french: "Je travaille ici",            answers: ["i work here"] },
  { french: "Je suis en vacances",         answers: ["i am on vacation", "i'm on vacation", "i am on holiday", "i'm on holiday"] },
  { french: "J'aime le chocolat",          answers: ["i like chocolate", "i love chocolate"] },
  { french: "J'aime lire",                 answers: ["i like to read", "i like reading", "i love to read", "i love reading"] },
  { french: "Je veux manger",              answers: ["i want to eat"] },
  { french: "Je veux dormir",              answers: ["i want to sleep"] },
  { french: "J'ai un chien",               answers: ["i have a dog"] },
  { french: "J'ai deux frères",            answers: ["i have two brothers"] },
  { french: "J'ai mal à la tête",          answers: ["i have a headache", "my head hurts", "my head aches"] },
  { french: "Elle est ma sœur",            answers: ["she is my sister", "she's my sister"] },
  { french: "Il est mon ami",              answers: ["he is my friend", "he's my friend"] },
  { french: "Nous sommes amis",            answers: ["we are friends", "we're friends"] },
  { french: "Ils sont contents",           answers: ["they are happy", "they're happy", "they are glad", "they're glad"] },
  { french: "C'est ma maison",             answers: ["it's my house", "it is my house", "this is my house", "that's my house", "that is my house"] },
  { french: "Il est tard",                 answers: ["it's late", "it is late"] },
  { french: "Il est tôt",                  answers: ["it's early", "it is early"] },
  { french: "Il y a un problème",          answers: ["there is a problem", "there's a problem"] },
  { french: "Qu'est-ce que tu fais?",      answers: ["what are you doing?", "what are you doing"] },
  { french: "Où est la gare?",             answers: ["where is the train station?", "where is the train station", "where's the train station?", "where's the train station", "where is the station?", "where is the station", "where's the station?", "where's the station"] },
  { french: "Où est l'hôtel?",             answers: ["where is the hotel?", "where is the hotel", "where's the hotel?", "where's the hotel"] },
  { french: "Le train part à huit heures", answers: ["the train leaves at eight", "the train leaves at 8", "the train leaves at eight o'clock", "the train leaves at 8 o'clock", "the train departs at eight"] },

  { french: "Lundi",                       answers: ["monday"] },
  { french: "Mardi",                       answers: ["tuesday"] },
  { french: "Mercredi",                    answers: ["wednesday"] },
  { french: "Jeudi",                       answers: ["thursday"] },
  { french: "Vendredi",                    answers: ["friday"] },
  { french: "Samedi",                      answers: ["saturday"] },
  { french: "Dimanche",                    answers: ["sunday"] },

  { french: "Le petit déjeuner",           answers: ["breakfast", "the breakfast"] },
  { french: "Le déjeuner",                 answers: ["lunch", "the lunch"] },
  { french: "Le dîner",                    answers: ["dinner", "the dinner", "supper"] },
  { french: "Une bouteille d'eau",         answers: ["a bottle of water", "bottle of water"] },
];

let backToScreen = 0;

const phrasesByMode = { all: allPhrases, easy: easyPhrases, medium: mediumPhrases };

let currentMode = load('frenchGamemode', 'all');
if (!phrasesByMode[currentMode]) currentMode = 'all';
let phrases = phrasesByMode[currentMode];                 // the array the game is drawing from

let savedPhrases = load('frenchSavedPhrases', {});        // last unresolved phrase for each mode
let current = savedPhrases[currentMode] ?? null;          // the phrase object on screen right now

function storeSavedPhrases() {
  localStorage.setItem('frenchSavedPhrases', JSON.stringify(savedPhrases));
}

const soundWin = new Audio("Sounds/correct.mp3");
const soundWrong = new Audio("Sounds/wrong.mp3");
const soundRoll = new Audio("Sounds/dice.mp3");

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

function invalidErr(log) {
  console.warn(log);
  document.querySelector('.submit').hidden = true;
  document.getElementById('userInput').blur();
  setTimeout(() => {
    document.getElementById('userInput').value = ''
    focus();
    document.querySelector('.submit').hidden = false;
    }, 1000);
};

function speak(text = current.french) {
  if (!('speechSynthesis' in window))   // browser doesn't support it
  {
    document.getElementById('userInput').value = 'SPEACH UNSUPPORTED';
    invalidErr('SPEACH UNSUPPORTED');
    return;
  }
  let utterance = null;
  speechSynthesis.cancel();
  if (document.getElementById('result').hidden) {
    utterance = new SpeechSynthesisUtterance(text);
  } else {
    utterance = new SpeechSynthesisUtterance(prevFrench);
  };
  utterance.lang = 'fr-FR';
  utterance.rate = 0.9;
  speechSynthesis.speak(utterance);
};

function showStartScreen() {
  document.getElementById('gamemode').hidden = true;
  document.getElementById('game').hidden = true;
  document.getElementById('result').hidden = true;
  document.getElementById('startScreen').hidden = false;
};

function startGame(mode = currentMode) {
  if (!phrasesByMode[mode]) mode = 'all';
  document.getElementById("gamemode").hidden = true;
  document.getElementById("result").hidden = true;
  document.getElementById("game").hidden = false;
  document.getElementById('userInput').value = '';
  focus();

  currentMode = mode;
  phrases = phrasesByMode[mode];
  localStorage.setItem('frenchGamemode', JSON.stringify(mode));

  const saved = savedPhrases[mode];
  if (saved) {
    current = saved;
    msg.textContent = current.french;
  } else {
    pickPhrase();
  }
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

  if (!userInput.trim()) {
    document.querySelector('.submit').hidden = true;
    document.getElementById('userInput').value = 'INVALID ENTRY';
    invalidErr('INVALID ENTRY');
    return
    };

  delete savedPhrases[currentMode];
  storeSavedPhrases();

  document.getElementById("result").hidden = false;
  document.getElementById("goAgain").hidden = true
  document.getElementById('userInput').value = '';
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
    `PHRASE: ${current.french}\nYOUR ANSWER: ${userInput}\nACCEPTED ANSWERS: ${current.answers.join(" / ")}`;
  prevFrench = current.french;
  showScore();
};

function reroll() {
  soundRoll.play();
  document.querySelector(".result-message").textContent = '';
  document.querySelector(".correct-answer").textContent =
    `PHRASE: ${current.french}\nCORRECT ANSWER: ${current.answers.join(" / ")}`;
  document.getElementById("game").hidden = true;
  document.getElementById("result").hidden = false;
  score.losses++;
  updateScore();
  prevFrench = current.french;
  pickPhrase();
};

function pickPhrase() {
  let next;
  do {
    next = phrases[Math.floor(Math.random() * phrases.length)];
  } while (next.french === current?.french && phrases.length > 1);
  current = next;
  savedPhrases[currentMode] = current;
  storeSavedPhrases();
  msg.textContent = current.french;
};

function normalize(text) {
  return text.trim().toLowerCase().replace(/[’‘]/g, "'");   // trim, lowercase, curly to straight apostrophes
};

function gamemode() {
  document.getElementById('startScreen').hidden = true;
  document.getElementById('result').hidden = true;
  document.getElementById('gamemode').hidden = false;
  document.getElementById('game').hidden = true;
};
