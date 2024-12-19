const words = ["туулай", "мэлхий", "ямаа", "үнэг", "баавгай", "арслан", "анааш", "тэмээ", "муур", "морь"];

let chosenWord = "";
let guessedLetters = [];
let wrongGuesses = 0;
const maxWrongGuesses = 6;

const hangmanImages = [
  "man_1.png",
  "man_2.png",
  "man_3.png",
  "man_4.png",
  "man_5.png",
  "man_6.png",
];

const hangmanImage = document.getElementById("hangmanImage");
const wordDisplay = document.getElementById("wordDisplay");
const message = document.getElementById("message");
const lettersContainer = document.getElementById("letters");

function startGame() {
  chosenWord = words[Math.floor(Math.random() * words.length)];
  guessedLetters = [];
  wrongGuesses = 0;

  updateWordDisplay();
  createLetterButtons();
  updateHangmanImage();
  message.textContent = "";
}

function updateWordDisplay() {
  wordDisplay.textContent = chosenWord
    .split("")
    .map(letter => (guessedLetters.includes(letter) ? letter : "_"))
    .join(" ");
}

function createLetterButtons() {
  lettersContainer.innerHTML = "";
  "АБВГДЕЁЖЗИЙКЛМНОӨПРСТУҮФХЦЧШЩЪЫЬЭЮЯ".split("").forEach(letter => {
    const button = document.createElement("button");
    button.textContent = letter;
    button.onclick = () => handleGuess(letter, button);
    lettersContainer.appendChild(button);
  });
}

function handleGuess(letter, button) {
  if (guessedLetters.includes(letter)) return;

  guessedLetters.push(letter);
  button.disabled = true;

  if (chosenWord.includes(letter)) {
    button.classList.add("correct");
    updateWordDisplay();
    if (chosenWord.split("").every(char => guessedLetters.includes(char))) {
      message.textContent = "Баяр хүргэе! Нуусан үгийг зөв таалаа. 🎉";
    }
  } else {
    button.classList.add("wrong");
    wrongGuesses++;
    updateHangmanImage();
    if (wrongGuesses === maxWrongGuesses) {
      message.textContent = `Тоглоом дууслаа! Нуусан үг "${word}" байлаа. 😢`;
    }
  }
}

function updateHangmanImage() {
  hangmanImage.src = hangmanImages[wrongGuesses];
}

startGame();