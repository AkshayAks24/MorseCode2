// Morse code dictionary
const morseCode = {
    'A': '.-', 'B': '-...', 'C': '-.-.', 'D': '-..', 'E': '.',
    'F': '..-.', 'G': '--.', 'H': '....', 'I': '..', 'J': '.---',
    'K': '-.-', 'L': '.-..', 'M': '--', 'N': '-.', 'O': '---',
    'P': '.--.', 'Q': '--.-', 'R': '.-.', 'S': '...', 'T': '-',
    'U': '..-', 'V': '...-', 'W': '.--', 'X': '-..-', 'Y': '-.--',
    'Z': '--..'
  };
  
  
  
  // Function to fetch a list of random words from the API
  async function getRandomWords(numWords) {
    const apiUrl = `https://random-word-api.herokuapp.com/word?number=${numWords}`;
    const response = await fetch(apiUrl);
    const data = await response.json();
    
    // Filter out words with more than 6 characters
    const filteredWords = data.filter(word => word.length < 7);
    return filteredWords;
  }
  
  // Store the list of random words
  let randomWords = [];
  let currentIndex = -1;
  
  // Convert the given word to Morse code
  function convertToMorseCode(word) {
    return word.split('').map(char => morseCode[char] || '').join(' ');
  }
  
  function displayNextWord() {
    currentIndex++;
    if (currentIndex >= randomWords.length) {
      // If we've displayed all the words, fetch a new set of words
      currentIndex = 0;
      getRandomWords(100).then(words => {
        randomWords = words.map(word => word.toUpperCase());
        displayMorseCode(randomWords[currentIndex]);
      });
    } else {
      displayMorseCode(randomWords[currentIndex]);
    }
  }
  
  function displayMorseCode(word) {
    const morseCodeElement = document.getElementById('morse-code');
    morseCodeElement.textContent = convertToMorseCode(word);
  }
  
  function checkGuess() {
    const userGuess = document.getElementById('user-guess').value.trim();
    const randomWord = randomWords[currentIndex];
  
    if (userGuess.toUpperCase() === randomWord) {
      // Play the correct sound
      const correctSound = document.getElementById('correct-sound');
      correctSound.play();
  
      alert('Congratulations! Your guess is correct.');
    } else {
      alert(`Oops! The correct word was "${randomWord}".`);
    }
  
    // Clear the user input and display the next word
    document.getElementById('user-guess').value = '';
    displayNextWord();
  }
  
  document.addEventListener('DOMContentLoaded', function () {
    // Fetch the initial set of random words
    getRandomWords(100).then(words => {
      randomWords = words.map(word => word.toUpperCase());
      displayNextWord();
    });
  
    const userGuessInput = document.getElementById('user-guess');
    userGuessInput.addEventListener('keyup', function (event) {
      if (event.key === 'Enter') {
        checkGuess();
      }
    });
  });