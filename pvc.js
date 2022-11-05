const cellElements = document.querySelectorAll("[data-cell]")
const board = document.querySelector("[data-board]");
const startingScreen = document.querySelector(".starting-screen");
const endingScreen = document.querySelector("[data-ending-screen]");
const returnButton = document.querySelector(".return-button");

const player = 'x';
const computer = 'circle';
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

const showEndingScreen = (text) => {
    document.querySelector("#ending-message").textContent = text;
    window.setTimeout(function () {
        endingScreen.style.display = "flex";
    }, 200);
}

const checkForDraw = () => {
    return moveHistory.length === 9 && !checkForWin(player) && !checkForWin(computer);
}

const checkForWin = () => {
    let movesX = moveHistory.map(e => e["x"]).filter(e => e !== undefined);
    let movesC = moveHistory.map(e => e["circle"]).filter(e => e !== undefined);
    for (const combination of winningCombinations) {
        if (combination.every(v => movesX.includes(v)) || (combination.every(v => movesC.includes(v)))) {
            return true;
        }
    }
    return false;
}

const makePlayerPlay = (cell) => {
    cell.target.classList.add(player);
    moveHistory.push({[player]: cell.target.getAttribute('id')});
}

const makeComputerPlay = () => {
    let availablePlays = [];
    for (const cell of cellElements) {
        if (!cell.classList.contains('x') && !cell.classList.contains('circle')) {
            availablePlays.push(cell);
        }
    }
    const randomCell = Math.floor(Math.random() * (availablePlays.length));
    const cell = document.body.querySelector(`#${availablePlays[randomCell].id}`);

    cell.classList.add(computer);
    moveHistory.push({[computer]: `${availablePlays[randomCell].id}`});
}

const handleGameClick = (cell) => {
    makePlayerPlay(cell, player);

    if (checkForWin()) {
        showEndingScreen(`X venceu!`)
        return;
    }
    if (checkForDraw()) {
        showEndingScreen("Deu velha!");
        return;
    }

    makeComputerPlay();

    if (checkForWin()) {
        showEndingScreen(`O venceu!`);
    }
    if (checkForDraw()) {
        showEndingScreen("Deu velha!");
    }
}

const returnLastMove = () => {
    if (moveHistory.length >= 1) {
        const cellsToClear = [
            Object.values(moveHistory[moveHistory.length - 1])[0],
            Object.values(moveHistory[moveHistory.length - 2])[0]
            ];

        for (const cell of cellsToClear) {
            cellElements.forEach(e => {
                if (e.id === cell) {
                    e.classList.remove('x', 'circle');
                    e.addEventListener("click", handleGameClick, {once: true});
                }
            });
        }
        moveHistory.pop();
        moveHistory.pop();
    }
}

for (const cell of cellElements) {
    cell.addEventListener("click", handleGameClick, {once: true});
}
