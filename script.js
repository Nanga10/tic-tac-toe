let gameBoardElem;
const gameBoard = ["", "", "", "", "", "", "", "", ""];
let currentPlayer;
const startBtn = document.getElementById("start-game");

const Gameboard = (() => {
  //game board arrow function
  const makeGameBoardElem = () => {
    const gameBoardElem = document.createElement("div");
    gameBoardElem.classList.add("game-board"); //adding css class to gameboard
    return gameBoardElem;
  };

  const makeSquareElem = (squareIndex) => {
    const squareElement = document.createElement("div"); // create square
    squareElement.id = `${squareIndex}-square`;
    squareElement.classList.add("game-square");
    return squareElement;
  };

  gameBoardElem = makeGameBoardElem();
  for (let square = 0; square < 9; square++) {
    gameBoardElem.appendChild(makeSquareElem(square));
  }

  currentPlayer = [0]; //Initialize player

  document.body.appendChild(gameBoardElem);
})(); //IIFE

//creating multiple players therefore using a factory to create players
const createPlayer = (marker) => {
  return {
    marker,
  };
};

// encapsulates game logic
const Game = (() => {
  let squareEl = document.getElementsByClassName("game-square"); // returns an array of all ements with specified class
  let players = [];
  let currentPlayer = 0;
  let gameOver;

  players = [createPlayer("X"), createPlayer("O")]; // create player objects

  gameOver = false;

  for (let i = 0; i < squareEl.length; i++) {
    squareEl[i].addEventListener(
      "click",
      (event) => {
        const { target } = event;
        target.textContent = currentPlayer; //write current player marker square when pressed
        let squareElId = squareEl[i].id; // storing id  for specific square in squareElId
        const substring = squareElId.split("-", 1); // split id string into two strings, keeping 1 string
        gameBoard[substring] = currentPlayer; //play marker in indexed position gameBoard array
        checkBoard();
        switchPlayer();
      },
      { once: true } // cannot click on square more than once - event listener is removed once pressed
    );
  }

  const switchPlayer = () => {
    if (currentPlayer === players[0].marker) {
      currentPlayer = players[1].marker;
    } else {
      currentPlayer = players[0].marker;
    }
  };

  const checkBoard = () => {
    // gameBoard
    // ['0', '1', '2']
    // ['3', '4', '5']
    // ['6', '7', '8']
    const winningStates = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    for (let winState of winningStates) {
      const [position1, position2, position3] = winState;
      if (
        gameBoard[position1] !== "" &&
        gameBoard[position1] === gameBoard[position2] &&
        gameBoard[position1] === gameBoard[position3]
      ) {
        console.log(`${gameBoard[position1]} player Wins!`);
        // completeGame(`${gameBoard[position1]} player Wins!`);
      }
    }

    const allSquaresUsed = gameBoard.every((square) => square !== "");

    if (allSquaresUsed) {
      completeGame(`It's a draw!`);
    }
  };
})();

const completeGame = (message) => {
  const overlayElem = document.createElement("div");
  overlayElem.style.position = "fixed";
  overlayElem.style.top = "0";
  overlayElem.style.left = "0";
  overlayElem.style.bottom = "0";
  overlayElem.style.right = "0";
  overlayElem.style.backgroundColor = "rgba(0,0,0,0.8)";
  overlayElem.style.display = "flex";
  overlayElem.style.flexDirection = "column";
  overlayElem.style.justifyContent = "center";
  overlayElem.style.alignItems = "center";
  overlayElem.style.textAlign = "center";

  const messageElem = document.createElement("h2");
  messageElem.textContent = message;
  messageElem.style.color = "white";
  messageElem.style.fontSize = "100px";

  overlayElem.appendChild(messageElem);

  const restartButtonElem = document.createElement("button");
  restartButtonElem.textContent = "Restart";
  restartButtonElem.style.backgroundColor = "transparent";
  restartButtonElem.style.color = "white";
  restartButtonElem.style.border = "1px solid white";
  restartButtonElem.style.padding = "10px 30px";

  restartButtonElem.addEventListener("click", () => {
    resetGame();
    document.body.removeChild(overlayElem);
  });

  overlayElem.appendChild(restartButtonElem);

  document.body.appendChild(overlayElem);
};
