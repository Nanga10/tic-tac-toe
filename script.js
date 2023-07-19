let gameBoardElem;
const gameBoard = ["", "", "", "", "", "", "", "", ""];
let currentPlayer;

const titleEl = document.createElement("h1");
titleEl.textContent = "Tic Tac Toe";
titleEl.classList.add("title");
document.body.appendChild(titleEl);

const subTitleEl = document.createElement("p");
subTitleEl.textContent = "Select a square from the game board to begin";
subTitleEl.classList.add("sub-title");
document.body.appendChild(subTitleEl);

const Gameboard = (() => {
  //game board arrow function
  const makeGameBoardElem = () => {
    gameBoardElem = document.createElement("div");
    gameBoardElem.classList.add("game-board"); //adding css class to gameboard
    return gameBoardElem;
  };

  const makeSquareElem = (squareIndex) => {
    const squareElement = document.createElement("div"); // create square
    squareElement.id = `${squareIndex}-square`;
    squareElement.classList.add("game-square");
    return squareElement;
  };

  const render = () => {
    if (gameBoardElem) {
      // check if old gameboard exists
      document.body.removeChild(gameBoardElem); // remove old gameboard
    }
    gameBoardElem = makeGameBoardElem();

    for (let square = 0; square < 9; square++) {
      gameBoardElem.appendChild(makeSquareElem(square));
    }
    
    currentPlayer = [0]; //initialize current player
    return document.body.appendChild(gameBoardElem);
  };

  return {
    render,
  };

})(); //IIFE

Gameboard.render(); //calling render game funtion inside Gameboard

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
  let currentPlayer = "O";


  players = [createPlayer("X"), createPlayer("O")]; // create player objects

  for (let i = 0; i < squareEl.length; i++) {
    squareEl[i].addEventListener(
      "click",
      (event) => {
        const { target } = event;
        target.textContent = currentPlayer; //draw current player marker square when pressed
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
        completeGame(`${gameBoard[position1]} player Wins!`);
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
  overlayElem.classList.add("overlay");

  const messageElem = document.createElement("h2");
  messageElem.textContent = message;
  messageElem.classList.add("game-over-message");
  overlayElem.appendChild(messageElem);

  const restartButtonElem = document.createElement("button");
  restartButtonElem.classList.add("restart-button");
  restartButtonElem.textContent = "Restart";

  restartButtonElem.addEventListener("click", () => {
    document.body.removeChild(overlayElem);
    Gameboard.render();
  });
  overlayElem.appendChild(restartButtonElem);
  document.body.appendChild(overlayElem);
};
