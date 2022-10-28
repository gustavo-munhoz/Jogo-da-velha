/*
-----REQUISITOS------
> receber e interpretar clique
> posicionar a jogada
> verificar vitória ou empate
> alternar jogador
> possibilidade de voltar atrás
> jogar contra o computador
 */

const cellElements = document.querySelectorAll("[data-cell]")
const board = document.querySelector("[data-board]");
const endingScreen = document.querySelector("[data-ending-screen]");
const button = document.querySelector("[data-button]");

let isCircleTurn = false;
let winner;
let moveHistory = []

/*
const choosePlayers = () => {
    // escolher vs computador nao
}
*/

const winningCombinations = [
    ["cell1","cell2", "cell3"],
    ["cell4", "cell5", "cell6"],
    ["cell7", "cell8", "cell9"],
    ["cell1", "cell4", "cell7"],
    ["cell2", "cell5", "cell8"],
    ["cell3", "cell6", "cell9"],
    ["cell1", "cell5", "cell9"],
    ["cell3", "cell5", "cell7"]
]

const makePlay = (cell, player) => {
    cell.target.classList.add(player);
    moveHistory.push({[player]: cell.target.getAttribute('id')});
}

const swapPlayer = () => {
    isCircleTurn = !isCircleTurn;

    board.classList.remove('x', 'circle');

    board.classList.add(isCircleTurn ? 'circle' : 'x');
}

const handleGameClick = (cell) => {
    // colocar jogada
    const player = isCircleTurn ? "circle" : "x";
    makePlay(cell, player);

    // verificar vitoria
    if (checkForWin()) {
        winner = player === 'x' ? 'X' : "O";
        document.getElementsByTagName("p")[0].innerHTML = `${winner} venceu!`;
        window.setTimeout(function () {
            endingScreen.style.display = "flex";
        }, 200);

    }
    // verificar empate
    if (checkForDraw()) {
        document.getElementsByTagName("p")[0].innerHTML = "Deu velha!";
        window.setTimeout(function () {
            endingScreen.style.display = "flex";
        }, 200);
    }
    // mudar jogador
    swapPlayer();
}


const checkForWin = () => {
    let movesX = moveHistory.map(e => e["x"]);
    let movesC = moveHistory.map(e => e["circle"]);

    for (const combination of winningCombinations) {
        if (combination.every(v => movesX.includes(v)) || combination.every(v => movesC.includes(v))) {
            return true;
        }
    }
    return false;
}

const checkForDraw = () => {
    return moveHistory.length === 9 && !checkForWin();
}

const handleRestartClick = () => {
    cellElements.forEach(e => e.classList.remove('x', 'circle'));
    endingScreen.style.display = "none";
    moveHistory = [];
}

button.addEventListener("click", handleRestartClick);

for (const cell of cellElements) {
    cell.addEventListener("click", handleGameClick);
}