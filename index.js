// Array of words
var words = [
  'bananas',
  'grapes',
  'carousel',
  'milkshake',
  'javascript',
  'limousine',
  'chocolate',
  'programming',
  'meatloaf',
  'ukulele',
  'mango'
];

// Game state variables
let currentWord = '';
let remainingGuesses = 10;
let incorrectLetters = [];
let correctLetters = [];
let wins = 0;
let losses = 0;

// DOM Elements
const wordToGuessEl = document.getElementById('word-to-guess');
const incorrectLettersEl = document.getElementById('incorrect-letters');
const remainingGuessesEl = document.getElementById('remaining-guesses');
const winsEl = document.getElementById('wins');
const lossesEl = document.getElementById('losses');

// Game
function startGame() {
  currentWord = words[Math.floor(Math.random() * words.length)];
  remainingGuesses = 10;
  incorrectLetters = [];
  correctLetters = [];

  // Update the DOM to reflect the initial state
  updateWordToGuess();
  incorrectLettersEl.textContent = 'Incorrect letters:';
  remainingGuessesEl.textContent = `Remaining guesses: ${remainingGuesses}`;
}

// Update the displayed word with correct guesses
function updateWordToGuess() {
  const displayedWord = currentWord.split('').map(letter => (correctLetters.includes(letter) ? letter : '_')).join(' ');
  wordToGuessEl.textContent = displayedWord;
}

// Check if the guessed letter is correct
function handleGuess(letter) {
  if (currentWord.includes(letter)) {
    if (!correctLetters.includes(letter)) {
      correctLetters.push(letter);
    }
  } else {
    if (!incorrectLetters.includes(letter)) {
      incorrectLetters.push(letter);
      remainingGuesses--;
    }
  }
  updateGameStatus();
}

// Update the game status after each guess
function updateGameStatus() {
  updateWordToGuess();
  incorrectLettersEl.textContent = `Incorrect letters: ${incorrectLetters.join(', ')}`;
  remainingGuessesEl.textContent = `Remaining guesses: ${remainingGuesses}`;

  if (remainingGuesses === 0) {
    losses++;
    lossesEl.textContent = `Losses: ${losses}`;
    alert(`You lost! The word was: ${currentWord}`);
    startGame();
  } else if (currentWord.split('').every(letter => correctLetters.includes(letter))) {
    wins++;
    winsEl.textContent = `Wins: ${wins}`;
    alert('Congratulations! You won!');
    startGame();
  }
}

// Event listener
document.addEventListener('keydown', (event) => {
  const guessedLetter = event.key.toLowerCase();
  if (/^[a-z]$/.test(guessedLetter)) { // Only proceed if the key is a valid letter
    handleGuess(guessedLetter);
  }
});

// Start the game when the page loads
startGame();
