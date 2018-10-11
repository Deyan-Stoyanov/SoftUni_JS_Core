; const snakeGame = (function () {
    function createGame(config){
        return gameBoard.createGameBoard(config);
    }

    function start(){
        gameBoard.start();
    }

    return{
        createGame,
        start
    };
})();
