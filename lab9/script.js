const words = ["түүлай", "мэлхий", "ямаа", "үнэг", "баавгай", "арслан", "анааш", "тэмээ", "муур", "морь"];
let word = words[Math.floor(Math.random() * words.length)];
let guessedWord = Array(word.length).fill("_");
let wrongGuesses = 0;

const wordDisplay = document.getElementById("word");
const keyboard = document.getElementById("keyboard");
const body = document.body; 

function updateWordDisplay() {
  wordDisplay.textContent = guessedWord.join(" ");
}

function handleGuess(letter) {
  const button = document.getElementById(letter.toUpperCase());

  if (button.disabled) return;

  button.disabled = true;

  if (word.includes(letter)) {
    for (let i = 0; i < word.length; i++) {
      if (word[i].toLowerCase() === letter) guessedWord[i] = word[i];
    }
    updateWordDisplay();
    button.classList.add("correct");

    if (!guessedWord.includes("_")) {
      setTimeout(() => {
        alert(`Баяр хүргэе! Нуусан үгийг зөв таалаа. 🎉`);
        resetGame();
      }, 500);
    }
  } else {
    wrongGuesses++;
    updateBackground(wrongGuesses);
    button.classList.add("wrong");

    if (wrongGuesses === 6) {
      setTimeout(() => {
        alert(`Тоглоом дууслаа! Нуусан үг "${word}" байлаа. 😢`);
        resetGame();
      }, 500);
    }
  }
}

function updateBackground(guesses) {
  if (guesses <= 6) {
    body.style.backgroundImage = `url('cowboy_${guesses}.png')`;
  }
}

function resetGame() {
  word = words[Math.floor(Math.random() * words.length)];
  guessedWord = Array(word.length).fill("_");
  wrongGuesses = 0;
  updateWordDisplay();

  const buttons = document.querySelectorAll("#keyboard button");
  buttons.forEach(button => {
    button.disabled = false;
    button.classList.remove("correct", "wrong");
  });

  body.style.backgroundImage = `url('desert_hang.png')`;
}

function createKeyboard() {
  const mongolianAlphabet = "АБВГДЕЁЖЗИЙКЛМНОӨПРСТУҮФХЦЧШЩЪЫЬЭЮЯ".split("");
  mongolianAlphabet.forEach(letter => {
    const button = document.createElement("button");
    button.textContent = letter;
    button.id = letter;
    button.onclick = () => handleGuess(letter.toLowerCase());
    keyboard.appendChild(button);
  });
}

updateWordDisplay();
createKeyboard();
