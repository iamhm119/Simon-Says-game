<!DOCTYPE html>
<html>
<head>
  <title>Simon Game</title>
  <style>
    /* Example CSS to demonstrate .flash, .userflash */
    .flash {
      opacity: 0.5;
      transition: opacity 0.25s;
    }
    .userflash {
      opacity: 0.5;
      transition: opacity 0.25s;
    }
  </style>
</head>
<body>
  <h2>Press any key to start</h2>
  <div class="btn yellow" id="yellow" style="width:100px;height:100px;background:yellow;display:inline-block;"></div>
  <div class="btn red" id="red" style="width:100px;height:100px;background:red;display:inline-block;"></div>
  <div class="btn purple" id="purple" style="width:100px;height:100px;background:purple;display:inline-block;"></div>
  <div class="btn green" id="green" style="width:100px;height:100px;background:green;display:inline-block;"></div>

  <script>
    let gameSequence = [];
    let userSequence = [];

    let colors = ["yellow", "red", "purple", "green"];

    let gameStarted = false;
    let level = 0;

    let heading = document.querySelector("h2");
    let allButtons = document.querySelectorAll(".btn");

    // Start game on keypress
    document.addEventListener("keypress", function() {
      if (!gameStarted) {
        console.log("Game started");
        gameStarted = true;
        document.body.style.background = "white";
        nextLevel();
      }
    });

    // Flash animation for game-chosen button
    function gameFlash(buttonElement) {
      buttonElement.classList.add("flash");
      setTimeout(() => {
        buttonElement.classList.remove("flash");
      }, 250);
    }

    // Flash animation for user click
    function userFlash(buttonElement) {
      buttonElement.classList.add("userflash");
      setTimeout(() => {
        buttonElement.classList.remove("userflash");
      }, 250);
    }

    // Move to the next level
    function nextLevel() {
      // Clear user's current entries
      userSequence = [];
      // Increase level and update heading text
      level++;
      heading.innerText = `Level ${level}`;

      // Choose a random color from the 4 possible colors
      let randIndex = Math.floor(Math.random() * 4);
      let chosenColor = colors[randIndex];
      let chosenButton = document.querySelector(`.${chosenColor}`);

      // Add to the game sequence, and flash on screen
      gameSequence.push(chosenColor);
      gameFlash(chosenButton);
    }

    // Check the user's input against the game sequence
    function checkAnswer(currentIndex) {
      if (userSequence[currentIndex] === gameSequence[currentIndex]) {
        // If user has matched the entire sequence, go to next level
        if (userSequence.length === gameSequence.length) {
          setTimeout(nextLevel, 1000);
        }
      } else {
        // Incorrect sequence -> Game Over
        heading.innerHTML = `Game Over! Your score was <b>${level}</b> <br> Press any key to restart`;
        document.body.style.background = "red";
        setTimeout(() => {
          document.body.style.background = "white";
        }, 150);
        resetGame();
      }
    }

    // Handle user button clicks
    function handleButtonClick() {
      let button = this;
      userFlash(button);

      let userColor = button.getAttribute("id");
      userSequence.push(userColor);

      // Pass the index of the last pressed color to check if it matches the game sequence
      checkAnswer(userSequence.length - 1);
    }

    // Attach click listeners to all color buttons
    for (let btn of allButtons) {
      btn.addEventListener("click", handleButtonClick);
    }

    // Reset the game
    function resetGame() {
      gameStarted = false;
      gameSequence = [];
      userSequence = [];
      level = 0;
    }
  </script>
</body>
</html>
