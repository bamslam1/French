<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="google" content="notranslate">
    <title>Practice French</title>
    <link rel="stylesheet" href="Styles/style.css">
  </head>
  <body>
    <img src="https://ps.w.org/svisciano-light-dark-theme-mode/assets/icon-256x256.png?rev=3535289" onclick="isDark = !isDark; applyTheme();" class="theme-button">
    <p class="score">Wins: 0 | Losses: 0</p>
    <button class="reset-score" onclick="score.wins = 0; score.losses = 0;updateScore();">Reset Score</button>
    <main>
      <section id="startScreen">
        <h1 class="title">Something went wrong. Please reload the page. If the problem continues, report it at <a href="https://github.com/bamslam1/French/issues">https://github.com/bamslam1/French/issues</a></h1>
        <p>
          This game is designed to help you practice your French skills by providing a French phrase or word and you answer them in the input field.<br><br>Rerolling the phrase will take off one point.<br><br>This website is meant for learning french, not cheating it. If you use translators, you're just sabotaging yourself. I strongly recommend you don't use translators.
        </p>
        <button data-page="game" onclick="startGame()">Start Game</button>
      </section>

      <section id="game" hidden>
        <button class="back" onclick="showStartScreen()">Back</button>
        <span lang="fr" translate="no"><p class="phrase">
        Loading...
        </p></span>
        <input type="text" id="userInput" placeholder="Type english here" onkeypress="if(event.key === 'Enter') checkAnswer();"/>
        <button class="submit" onclick="checkAnswer()">Submit</button>
        <button class="reroll" onclick="reroll();">Reroll</button>
      </section>
      <section id="result" hidden>
        <img src="https://media.tenor.com/Wlu-ZlnW7QYAAAAj/no-dislike.gif" class="wrongGif" hidden>
        <img src="https://assets.dochipo.com/editor/animations/confetti/854a56df-cb2c-478c-ab6d-967ea2dee737.gif" class="rightGif" hidden>
        <p class="result-message"></p>
        <p class="correct-answer"></p>
        <button data-page="result" onclick="
        startGame()" id="goAgain">Play Again</button>
      </section>
    </main>
    <script src="Scripts\script.js" defer></script>
  </body>
</html>
