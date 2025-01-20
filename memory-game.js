// Using plain JavaScript for a basic implementation
// For more advanced graphics, consider Phaser or PixiJS

const gameBoard = document.getElementById('game-board');
const movesCount = document.getElementById('moves');
const timeDisplay = document.getElementById('time');
const startButton = document.getElementById('start-button');

let gridSize = 4; 
let cardSize = 100;
let cardSpacing = 10;
let cardColors = [
  'red', 'blue', 'green', 'yellow', 'purple', 'orange', 
  'red', 'blue', 'green', 'yellow', 'purple', 'orange' 
];
let flippedCards = [];
let startTime;
let moves = 0;

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

function createGameBoard() {
  shuffleArray(cardColors);

  for (let i = 0; i < gridSize * gridSize; i++) {
    const card = document.createElement('div');
    card.classList.add('card');
    card.style.width = cardSize + 'px';
    card.style.height = cardSize + 'px';
    card.style.backgroundColor = 'gray';
    card.style.margin = cardSpacing + 'px';
    card.setAttribute('data-index', i);

    card.addEventListener('click', () => {
      if (card.classList.contains('flipped') || flippedCards.length === 2) {
        return; 
      }

      card.style.backgroundColor = cardColors[i];
      flippedCards.push(card);

      if (flippedCards.length === 2) {
        setTimeout(checkMatch, 500); 
      }
    });

    gameBoard.appendChild(card);
  }
}

function checkMatch() {
  const firstCardColor = flippedCards[0].style.backgroundColor;
  const secondCardColor = flippedCards[1].style.backgroundColor;

  if (firstCardColor === secondCardColor) {
    flippedCards[0].classList.add('matched');
    flippedCards[1].classList.add('matched');
    flippedCards = [];
  } else {
    flippedCards.forEach(card => {
      setTimeout(() => {
        card.style.backgroundColor = 'gray';
      }, 500);
    });
    flippedCards = [];
  }

  moves++;
  movesCount.textContent = moves;
}

function startGame() {
  createGameBoard();
  startTime = new Date().getTime();
  startButton.disabled = true;
  moves = 0;
  movesCount.textContent = moves;
  timeDisplay.textContent = '0';
  setInterval(updateTime, 1000); 
}

function updateTime() {
  const currentTime = new Date().getTime();
  const elapsedTime = (currentTime - startTime) / 1000;
  timeDisplay.textContent = elapsedTime.toFixed(1);
}

startButton.addEventListener('click', startGame); 

// Basic CSS for the game (you can customize this)
const style = document.createElement('style');
style.textContent = `
  .card {
    border-radius: 5px;
    cursor: pointer;
  }
  .matched {
    pointer-events: none; 
  }
`;
document.head.appendChild(style);
