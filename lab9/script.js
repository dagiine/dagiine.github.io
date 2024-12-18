words = ["туулай", "мэлхий", "ямаа", "үнэг", "баавгай", "арслан", "анааш", "тэмээ", "муур", "морь"];
let word = words[Math.floor(Math.random() * words.length)];
let guessedWord = Array(word.length).fill("_");
let wrongGuesses = 0;

const wordDisplay = document.getElementById("word");
const keyboard = document.getElementById("keyboard");

function updateWordDisplay() {
  wordDisplay.textContent = guessedWord.join(" ");
}

function handleGuess(letter) {
  const button = document.getElementById(letter);
  if (button.disabled) 
    return;

  button.disabled = true;
  let correctGuess = false;

  for (let i = 0; i < word.length; i++) {
    if (word[i].toLowerCase() === letter.toLowerCase()) {  
      guessedWord[i] = word[i];
      correctGuess = true;
    }
  }

  updateWordDisplay();

  if (correctGuess) {
    button.classList.add("correct");
    if (!guessedWord.includes("_")) {
      setTimeout(() => {
        alert("Баяр хүргэе! Нуусан үгийг зөв таалаа. 🎉");
      }, 500);
    }
  } else {
    wrongGuesses++;
    const manImage = document.getElementById(`man_${wrongGuesses}`);
    if (manImage) 
      manImage.style.visibility = 'visible';

    button.classList.add("wrong");

    if (wrongGuesses === 6) {
      setTimeout(() => {
        alert(`Тоглоом дууслаа! Нуусан үг "${word}" байлаа. 😢`);
      }, 500);
    }
  }
}

function createKeyboard() {
  "АБВГДЕЁЖЗИЙКЛМНОӨПРСТУҮФХЦЧШЩЪЫЬЭЮЯ".split("").forEach(letter => {
    const button = document.createElement("button");
    button.textContent = letter;
    button.id = letter; 
    button.onclick = () => handleGuess(letter);  
    keyboard.appendChild(button);
  });
}

updateWordDisplay();
createKeyboard();