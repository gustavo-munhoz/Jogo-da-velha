// JOGO DA VELHA
// Criado por: Gustavo Munhoz Corrêa

const cellElements = document.querySelectorAll("[data-cell]")
const board = document.querySelector("[data-board]");
const startingScreen = document.querySelector(".starting-screen");
const endingScreen = document.querySelector("[data-ending-screen]");
const returnButton = document.querySelector(".return-button");

let isCircleTurn = false;
let winner;
let moveHistory = []


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

startingScreen.style.display = "none";
board.style.visibility = "visible";
returnButton.style.visibility = "visible";

const makePlay = (cell, player) => {
    cell.target.classList.add(player);
    moveHistory.push({[player]: cell.target.getAttribute('id')});
}

const swapPlayer = () => {
    isCircleTurn = !isCircleTurn;
    board.classList.remove('x', 'circle');
    board.classList.add(isCircleTurn ? 'circle' : 'x');
}

const showEndingScreen = (text) => {
    document.querySelector("#ending-message").textContent = text;
    window.setTimeout(function () {
        endingScreen.style.display = "flex";
    }, 200);
}

const handleGameClick = (cell) => {
    // colocar jogada
    const player = isCircleTurn ? "circle" : "x";
    makePlay(cell, player);

    // verificar vitoria
    if (checkForWin()) {
        winner = player === 'x' ? 'X' : "O";
        showEndingScreen(`${winner} venceu!`);

    }
    // verificar empate
    if (checkForDraw()) {
        showEndingScreen("Deu velha!")
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


const returnLastMove = () => {
    if (moveHistory.length >= 1) {
        const cellToClear = Object.values(moveHistory[moveHistory.length - 1])[0];
        cellElements.forEach(e => {
            if (e.id === cellToClear) {
                e.classList.remove('x', 'circle');
                e.addEventListener("click", handleGameClick, {once: true})
            }
        })
        moveHistory.pop();
        swapPlayer();
    }
}

for (const cell of cellElements) {
    cell.addEventListener("click", handleGameClick, {once: true});
}