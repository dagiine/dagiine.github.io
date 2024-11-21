const words = ["JAVASCRIPT", "SOFTWARE", "HTML", "INTERNET", "DEVELOPER"];
let word = getRandomWord();
let guessedWord = Array(word.length).fill("_");
let wrongGuesses = 0;
const maxGuesses = 6;

const wordDisplay = document.getElementById("wordDisplay");
const letterInput = document.getElementById("letterInput");
const guessButton = document.getElementById("guessButton");
const message = document.getElementById("message");
const canvas = document.getElementById("hangmanCanvas");
const ctx = canvas.getContext("2d");
const resetButton = document.getElementById("resetButton");

// Draw the gallows and the initial hangman structure
function drawGallows() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.lineWidth = 3;
  ctx.strokeStyle = "#333";
  
  // Draw the gallows
  ctx.strokeRect(50, 250, 200, 10); // Base
  ctx.strokeRect(100, 50, 10, 200); // Vertical pole
  ctx.strokeRect(100, 50, 100, 10); // Top beam
  ctx.strokeRect(180, 50, 10, 50);  // Rope
}

// Draw the hangman figure (body parts added step by step)
function drawHangman(wrongGuesses) {
  // Head
  if (wrongGuesses >= 1) ctx.beginPath(), ctx.arc(185, 120, 25, 0, Math.PI * 2), ctx.stroke(); // Head
  // Body
  if (wrongGuesses >= 2) ctx.moveTo(185, 145), ctx.lineTo(185, 175), ctx.stroke(); // Body
  // Arms
  if (wrongGuesses >= 3) {
    ctx.moveTo(185, 150), ctx.lineTo(150, 180), ctx.stroke(); // Left arm
    ctx.moveTo(185, 150), ctx.lineTo(220, 180), ctx.stroke(); // Right arm
  }
  // Legs
  if (wrongGuesses >= 4) {
    ctx.moveTo(185, 175), ctx.lineTo(150, 210), ctx.stroke(); // Left leg
    ctx.moveTo(185, 175), ctx.lineTo(220, 210), ctx.stroke(); // Right leg
  }
}

// Update the word display
function updateWordDisplay() {
  wordDisplay.textContent = guessedWord.join(" ");
}

// Handle the guess
guessButton.addEventListener("click", () => {
  const letter = letterInput.value.toUpperCase();
  letterInput.value = "";

  if (!letter || letter.length > 1) {
    message.textContent = "Please enter a single letter!";
    return;
  }

  if (guessedWord.includes(letter) || wrongGuesses >= maxGuesses) return;

  if (word.includes(letter)) {
    word.split("").forEach((char, index) => {
      if (char === letter) guessedWord[index] = letter;
    });
    updateWordDisplay();
    message.textContent = guessedWord.join("") === word ? "Congratulations! You guessed the word!" : "";
  } else {
    wrongGuesses++;
    drawHangman(wrongGuesses);
    if (wrongGuesses === maxGuesses) message.textContent = "Game over! The word was: " + word;
  }
});

// Reset the game
resetButton.addEventListener("click", () => {
  word = getRandomWord();
  guessedWord = Array(word.length).fill("_");
  wrongGuesses = 0;
  message.textContent = "";
  updateWordDisplay();
  drawHangman(wrongGuesses);
  resetButton.style.display = "none";
  guessButton.style.display = "inline-block";
  letterInput.disabled = false;
});

// Get a random word from the list
function getRandomWord() {
  return words[Math.floor(Math.random() * words.length)];
}

// Initialize the game
updateWordDisplay();
drawGallows();  // Draw the gallows initially
