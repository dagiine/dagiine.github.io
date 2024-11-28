const words = ["cat", "elephant", "giraffe", "frog", "rabbit"];
let word = words[Math.floor(Math.random() * words.length)];
let guessedWord = Array(word.length).fill("_");
let wrongGuesses = 0;

const wordDisplay = document.getElementById("word");
const keyboard = document.getElementById("keyboard");

const hangmanParts = {
  head: document.getElementById("head"),
  body: document.getElementById("body"),
  leftArm: document.getElementById("left-arm"),
  rightArm: document.getElementById("right-arm"),
  leftLeg: document.getElementById("left-leg"),
  rightLeg: document.getElementById("right-leg"),
};

function updateWordDisplay() {
  wordDisplay.textContent = guessedWord.join(" ");
}

function handleGuess(letter) {
  if (word.includes(letter)) {
    for (let i = 0; i < word.length; i++) {
      if (word[i] === letter) {
        guessedWord[i] = letter;
      }
    }
    updateWordDisplay();
    checkWin();
  } else {
    wrongGuesses++;
    drawHangman(wrongGuesses);
    if (wrongGuesses === 6) {
      alert(`Game Over! The word was "${word}".`);
      resetGame();
    }
  }
  document.getElementById(letter).disabled = true;
  document.getElementById(letter).classList.add(word.includes(letter) ? "correct" : "wrong");
}

function checkWin() {
  if (!guessedWord.includes("_")) {
    alert("Congratulations! You guessed the word!");
    resetGame();
  }
}

function drawHangman(guesses) {
  switch (guesses) {
    case 1: hangmanParts.head.style.display = "block"; break;
    case 2: hangmanParts.body.style.display = "block"; break;
    case 3: hangmanParts.leftArm.style.display = "block"; break;
    case 4: hangmanParts.rightArm.style.display = "block"; break;
    case 5: hangmanParts.leftLeg.style.display = "block"; break;
    case 6: hangmanParts.rightLeg.style.display = "block"; break;
  }
}

function resetGame() {
  word = words[Math.floor(Math.random() * words.length)];
  guessedWord = Array(word.length).fill("_");
  wrongGuesses = 0;
  wordDisplay.textContent = guessedWord.join(" ");
  const buttons = document.querySelectorAll("#keyboard button");
  buttons.forEach(button => {
    button.disabled = false;
    button.classList.remove("correct", "wrong");
  });
  Object.values(hangmanParts).forEach(part => part.style.display = "none");
}

function createKeyboard() {
  const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
  alphabet.forEach(letter => {
    const button = document.createElement("button");
    button.textContent = letter;
    button.id = letter;
    button.onclick = () => handleGuess(letter.toLowerCase());
    keyboard.appendChild(button);
  });
}

updateWordDisplay();
createKeyboard();
