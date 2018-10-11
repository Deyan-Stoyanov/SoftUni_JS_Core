;
const snake = (function () {
    const snakeData = {
        headPositionX: null,
        headPositionY: null,
        body: [],
        move: null
    };

    function generateSnakeUI(snakeSize, boardSize) {
        snakeData.headPositionX = parseInt(boardSize / 2);
        snakeData.headPositionY = parseInt(boardSize / 2);

        for (let i = 0; i < snakeSize; i++) {
            snakeData.body.push(`${snakeData.headPositionX - i}${snakeData.headPositionY}`);
        }

        snakeData.body.forEach((item) => {
            document.getElementById(item).className = "snake";
        });
    }

    function createSnake(config) {
        generateSnakeUI(config.snakeSize, config.boardSize);
    }

    function moveHead() {
        snakeData.move();
    }

    function updateSnakePosition() {
        const headIndex = `${snakeData.headPositionX}${snakeData.headPositionY}`;
        snakeData.body.unshift(headIndex);
        const tail = snakeData.body.pop();
        document.getElementById(tail).className = "";
        document.getElementById(headIndex).className = "snake";
    }

    function setMoveDirection(direction) {
        if (direction === "right") {
            snakeData.move = () => {
                snakeData.headPositionX += 1;
            }
        } else if (direction === "left") {
            snakeData.move = () => {
                snakeData.headPositionX -= 1;
            }
        } else if (direction === "down") {
            snakeData.move = () => {
                snakeData.headPositionY += 1;
            }
        } else if (direction === "up") {
            snakeData.move = () => {
                snakeData.headPositionY -= 1;
            }
        }
    }

    function grow() {
        snakeData.body.unshift(`${snakeData.headPositionX}${snakeData.headPositionY}`);
        snakeData.move();
    }

    function getSnake() {
        return snakeData;
    }
    
    return {
        createSnake,
        moveHead,
        setMoveDirection,
        getSnake,
        updateSnakePosition,
        grow
    };
})();
