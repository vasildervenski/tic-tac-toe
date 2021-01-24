const ticTacToeGame = new TicTacToeGame();
ticTacToeGame.start();

function TicTacToeGame() {
    const board = new Board();
    const humanPlayer = new HumanPlayer(board);
    const computerPlayer = new ComputerPlayer(board);
    let turn = 0;

    this.start = function() {
        const config = {childList:true};
        const observer = new MutationObserver(() => takeTurn());
        board.positions.forEach((el) => observer.observe(el, config));
        takeTurn();
    }

    function takeTurn() {
        
        if(board.checkForWinner()) {
            document.querySelector('.btn').style.visibility = 'visible';
            document.querySelector('.btn').addEventListener('click', restartGame);
            return;
        }

        if(turn % 2 === 0) {
            humanPlayer.takeTurn();
        } else {
            computerPlayer.takeTurn();
        }
        turn++;
    }

    function restartGame() {
        board.positions.forEach(el => {
            el.innerText = '';
            el.classList.remove('winner')
        });
        turn = 0;
    }


}


function Board() {
    this.positions = Array.from(document.querySelectorAll(".col"));

    //0, 1, 2
    //3, 4, 5
    //6, 7, 8

    this.checkForWinner = () => {
        let winner = false;

        const winningCombinations = [
            [0,1,2],
            [3,4,5],
            [6,7,8],
            [0,3,6],
            [1,4,7],
            [2,5,8],
            [0,4,8],
            [2,4,6]
        ];

        winningCombinations.forEach(winningCombo => {

            const positions = this.positions;
            const pos0InnerText = positions[winningCombo[0]].innerText;
            const pos1InnerText = positions[winningCombo[1]].innerText;
            const pos2InnerText = positions[winningCombo[2]].innerText;

            const isWinningCombo = pos0InnerText !== '' && pos0InnerText === pos1InnerText && pos0InnerText ===pos2InnerText;

            if(isWinningCombo) {
                winner = true;
                winningCombo.forEach(i => this.positions[i].className += ' winner')
            }
        })

        return winner;
    }
}    

function HumanPlayer(board) {
    this.takeTurn = function() {
        board.positions.forEach((el) => el.addEventListener('click', handleTurnTaken));
    }

    function handleTurnTaken(event) {
        if(event.target.innerText !== '') return;
        event.target.innerText = 'X';
        board.positions.forEach(el => el.removeEventListener('click', handleTurnTaken));    
    }
}

function ComputerPlayer(board) {
    this.takeTurn = function() {
        const availablePositions = board.positions.filter(el => el.innerText === '');
        const move = Math.floor(Math.random() *availablePositions.length);
        availablePositions[move].innerText = 'O';        
    }
}
