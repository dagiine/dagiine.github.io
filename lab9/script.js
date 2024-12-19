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
    let displayedWord = "";
    for (let i = 0; i < chosenWord.length; i++) {
      const letter = chosenWord[i];
      displayedWord += guessedLetters.includes(letter.toLowerCase()) ? letter + " " : "_ ";
    }
    wordDisplay.textContent = displayedWord.trim();
  }
  
function createLetterButtons() {
  const alphabet = "АБВГДЕЁЖЗИИЙЛМНОӨПРСТУҮФХЦЧШЩЪЫЬЭЮЯ".split("");

  for (let i = 0; i < alphabet.length; i++) {
    const letter = alphabet[i];
    const button = document.createElement("button");
    button.textContent = letter;
    button.onclick = () => handleGuess(letter, button);
    keyboardContainer.appendChild(button);
  }
}

function handleGuess(letter, button) {
  letter = letter.toLowerCase();

  if (guessedLetters.includes(letter)) 
    return;

  guessedLetters.push(letter);
  button.disabled = true;

  if (chosenWord.toLowerCase().includes(letter)) {
    button.classList.add("correct");
    updateWordDisplay();
    if (isWordComplete()) {
      wordDisplay.textContent = "Баяр хүргэе! Нуусан үгийг зөв таалаа. ";
      disableKeyboard();
    }
  } else {
    button.classList.add("wrong");
    wrongGuesses++;
    updateHangmanImage();
    if (wrongGuesses === 6) {
      wordDisplay.textContent = `Тоглоом дууслаа! Нуусан үг: ${chosenWord}`;
      disableKeyboard(); 
    }
  }
}

function updateHangmanImage() {
  if (wrongGuesses > 0) {
    manImages[wrongGuesses - 1].style.visibility = "visible";
  }
}

function resetManImages() {
  for (let i = 0; i < manImages.length; i++) {
    manImages[i].style.visibility = "hidden";
  }
}

function isWordComplete() {
  for (let i = 0; i < chosenWord.length; i++) {
    const letter = chosenWord[i];
    if (!guessedLetters.includes(letter.toLowerCase())) {
      return false;
    }
  }
  return true;
}

function disableKeyboard() {
  const buttons = document.querySelectorAll("#keyboard button");
  buttons.forEach(button => button.disabled = true);
}

startGame();