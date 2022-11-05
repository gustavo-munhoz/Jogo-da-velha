

let game = document.createElement('script');
game.id = 'script';

const startPvpGame = () => {
    game.src = "pvp.js";
    document.head.appendChild(game);
}

const startPvcGame = () => {
    game.src = "pvc.js"
    document.head.appendChild(game);
}