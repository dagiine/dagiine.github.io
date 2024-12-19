const words = ["туулай", "мэлхий", "ямаа", "үнэг", "баавгай", "арслан", "анааш", "тэмээ", "муур", "морь"];

let chosenWord = "";
let guessedLetters = [];
let wrongGuesses = 0;

const wordDisplay = document.getElementById("word");
const keyboardContainer = document.getElementById("keyboard");
const manImages = [
  document.getElementById("man_1"),
  document.getElementById("man_2"),
  document.getElementById("man_3"),
  document.getElementById("man_4"),
  document.getElementById("man_5"),
  document.getElementById("man_6")
];

function startGame() {
  chosenWord = words[Math.floor(Math.random() * words.length)];
  guessedLetters = [];
  wrongGuesses = 0;

  updateWordDisplay();
  createLetterButtons();
  resetManImages();
}

function updateWordDisplay() {
  wordDisplay.textContent = chosenWord
    .split("")
    .map(letter => (guessedLetters.includes(letter) ? letter : "_ "))
    .join(" ");
}

function createLetterButtons() {
  const mongolianAlphabet = "АБВГДЕЁЖЗИИЙЛМНОӨПРСТУҮФХЦЧШЩЪЫЬЭЮЯ".split("");

  mongolianAlphabet.forEach(letter => {
    const button = document.createElement("button");
    button.textContent = letter;
    button.onclick = () => handleGuess(letter, button);
    keyboardContainer.appendChild(button);
  });
}

function handleGuess(letter, button) {
  letter = letter.toLowerCase();

  if (guessedLetters.includes(letter)) return;

  guessedLetters.push(letter);
  button.disabled = true;

  if (chosenWord.toLowerCase().includes(letter)) {
    button.classList.add("correct");
    updateWordDisplay();
    if (chosenWord.split("").every(char => guessedLetters.includes(char.toLowerCase()))) {
      wordDisplay.textContent = "Баяр хүргэе! Нуусан үгийг зөв таалаа. 🎉";
    }
  } else {
    button.classList.add("wrong");
    wrongGuesses++;
    updateHangmanImage();
    if (wrongGuesses === 6) {
      wordDisplay.textContent = `Тоглоом дууслаа! 😢 Нуусан үг: ${chosenWord}`;
    }
  }
}

function updateHangmanImage() {
  if (wrongGuesses > 0) {
    manImages[wrongGuesses - 1].style.visibility = "visible";
  }
}

function resetManImages() {
  manImages.forEach(image => (image.style.visibility = "hidden"));
}

startGame();