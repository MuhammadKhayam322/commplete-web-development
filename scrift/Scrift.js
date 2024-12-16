const cells = document.querySelectorAll('[data-cell]');
const statusText = document.getElementById('game-status');
const resetButton = document.getElementById('reset-button');
let currentPlayer = 'X';
let board = ['', '', '', '', '', '', '', '', ''];
let gameActive = true;

const winningCombinations = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
];

// Update status text
function updateStatus(message) {
  statusText.textContent = message;
}

// Check for a win or draw
function checkGameStatus() {
  // Check for a win
  for (const combination of winningCombinations) {
    const [a, b, c] = combination;
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      gameActive = false;
      updateStatus(`Player ${currentPlayer} wins!`);
      return;
    }
  }
  // Check for a draw
  if (!board.includes('')) {
    gameActive = false;
    updateStatus("It's a draw!");
    return;
  }
}

// Handle cell click
function handleCellClick(e) {
  const cell = e.target;
  const cellIndex = Array.from(cells).indexOf(cell);

  if (board[cellIndex] === '' && gameActive) {
    board[cellIndex] = currentPlayer;
    cell.textContent = currentPlayer;
    cell.disabled = true;

    checkGameStatus();

    if (gameActive) {
      currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
      updateStatus(`Player ${currentPlayer}'s turn`);
    }
  }
}

// Reset the game
function resetGame() {
  board = ['', '', '', '', '', '', '', '', ''];
  gameActive = true;
  currentPlayer = 'X';
  cells.forEach(cell => {
    cell.textContent = '';
    cell.disabled = false;
  });
  updateStatus("Player X's turn");
}

// Add event listeners
cells.forEach(cell => cell.addEventListener('click', handleCellClick));
resetButton.addEventListener('click', resetGame);

// Initialize the game
updateStatus("Player X's turn");

