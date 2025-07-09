const cells = document.querySelectorAll('.cell');
const statusText = document.getElementById('status');
const resetButton = document.getElementById('reset');

let board = ["", "", "", "", "", "", "", "", ""];
let currentPlayer = "X";
let running = true;

const winConditions = [
  [0,1,2], [3,4,5], [6,7,8],  // rows
  [0,3,6], [1,4,7], [2,5,8],  // columns
  [0,4,8], [2,4,6]            // diagonals
];

function initializeGame() {
  cells.forEach(cell => cell.addEventListener('click', cellClicked));
  resetButton.addEventListener('click', resetGame);
  statusText.textContent = `Player ${currentPlayer}'s turn`;
}

function cellClicked() {
  const index = this.getAttribute('data-index');

  if (board[index] !== "" || !running) return;

  updateCell(this, index);
  checkWinner();
}

function updateCell(cell, index) {
  board[index] = currentPlayer;
  cell.textContent = currentPlayer;
}

function switchPlayer() {
  currentPlayer = currentPlayer === "X" ? "O" : "X";
  statusText.textContent = `Player ${currentPlayer}'s turn`;
}

function checkWinner() {
  let winner = false;

  for (let condition of winConditions) {
    const [a, b, c] = condition;
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      winner = true;
      break;
    }
  }

  if (winner) {
    statusText.textContent = `Player ${currentPlayer} wins!`;
    running = false;
  } else if (!board.includes("")) {
    statusText.textContent = "It's a draw!";
    running = false;
  } else {
    switchPlayer();
  }
}

function resetGame() {
  board = ["", "", "", "", "", "", "", "", ""];
  currentPlayer = "X";
  running = true;
  statusText.textContent = `Player ${currentPlayer}'s turn`;
  cells.forEach(cell => cell.textContent = "");
}

initializeGame();
