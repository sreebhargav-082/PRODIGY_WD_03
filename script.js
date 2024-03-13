document.addEventListener('DOMContentLoaded', function() {
    const aiBtn = document.getElementById('ai-btn');
    const twoPlayerBtn = document.getElementById('2p-btn');
    const board = document.querySelector('.board');
    const cells = document.querySelectorAll('.cell');
    const restartBtn = document.querySelector('.restart-btn');

    let currentPlayer = 'X';
    let gameActive = false;
    let gameState = ['', '', '', '', '', '', '', '', ''];
    let againstAI = false;

    const winningConditions = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    function handleCellClick(event) {
        const clickedCell = event.target;
        const clickedCellIndex = parseInt(clickedCell.getAttribute('data-index'));

        if (gameState[clickedCellIndex] !== '' || !gameActive) {
            return;
        }

        gameState[clickedCellIndex] = currentPlayer;
        clickedCell.textContent = currentPlayer;
        clickedCell.classList.add(currentPlayer);

        if (checkWin()) {
            endGame(false);
        } else if (!gameState.includes('')) {
            endGame(true);
        } else {
            currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
            if (againstAI && currentPlayer === 'O') {
                setTimeout(makeAiMove, 500);
            }
        }
    }

    function checkWin() {
        return winningConditions.some(combination => {
            return combination.every(index => {
                return gameState[index] === currentPlayer;
            });
        });
    }

    function endGame(draw) {
        gameActive = false;
        const message = draw ? 'Draw!' : `${currentPlayer} wins!`;
        alert(message);

        const playAgain = confirm('Do you want to play again?');
        if (playAgain) {
            restartGame();
        } else {
            alert('Game Over!');
        }
    }

    function restartGame() {
        currentPlayer = 'X';
        gameActive = true;
        gameState = ['', '', '', '', '', '', '', '', ''];
        cells.forEach(cell => {
            cell.textContent = '';
            cell.classList.remove('X', 'O');
        });
    }

    function makeAiMove() {
        const emptyCells = gameState.reduce((acc, val, index) => {
            if (val === '') {
                acc.push(index);
            }
            return acc;
        }, []);

        const randomIndex = Math.floor(Math.random() * emptyCells.length);
        const aiMove = emptyCells[randomIndex];
        gameState[aiMove] = currentPlayer;
        cells[aiMove].textContent = currentPlayer;
        cells[aiMove].classList.add(currentPlayer);

        if (checkWin()) {
            endGame(false);
        } else if (!gameState.includes('')) {
            endGame(true);
        } else {
            currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        }
    }

    aiBtn.addEventListener('click', function() {
        againstAI = true;
        gameActive = true;
        board.classList.remove('hidden');
        aiBtn.classList.add('hidden');
        twoPlayerBtn.classList.add('hidden');
    });

    twoPlayerBtn.addEventListener('click', function() {
        againstAI = false;
        gameActive = true;
        board.classList.remove('hidden');
        aiBtn.classList.add('hidden');
        twoPlayerBtn.classList.add('hidden');
    });

    cells.forEach(cell => {
        cell.addEventListener('click', handleCellClick);
    });

    restartBtn.addEventListener('click', restartGame);
});
