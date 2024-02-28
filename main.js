const domData = (function() {
  let display = document.querySelectorAll(".game-display div");
  let announce = document.querySelector(".game-announce h2");
  display.forEach((item) => {
    item.addEventListener("click", () => {
      console.log(item);
      if (item.innerText !== "") return;
      console.log(true);
      item.innerText = game.cPlayer().mark;
      game.playerTurn();
    });
  });
  return {
    display,
    announce,
  }
})();

const gameBoard = (function() {
  const gameBoard = [["", "", ""],["", "", ""],["", "", ""]];
  
  const placeMark = () => {
    for (i=0; i<domData.display.length;i++) {
      if (i<3) {
        showBoard()[0][i] = domData.display[i].textContent;
      }
      else if (i>2 && i<6) {
        showBoard()[1][i-3] = domData.display[i].textContent;
      }
      else if (i>5 && i<9) {
        showBoard()[2][i-6] = domData.display[i].textContent;
      }
    }
    console.table(gameBoard);
  }

  const showBoard = () => gameBoard;

  return {
    placeMark, 
    showBoard,
  }
})();

const player = (name, mark) => {
  return {name, mark}
}

const game = (function() { 
  const player1 = player("Player 1", "X");
  const player2 = player("Player 2", "O");
  let currentPlayer = player1;

  const switchPlayer = () => {
    currentPlayer = (currentPlayer === player1) ? player2 : player1;
  }

  const cPlayer = () => currentPlayer;

  const playerTurn = () => {
    gameBoard.placeMark();
    gameCheck();
    switchPlayer();
  }

  const gameStatus = () => {
    let status = "";
    let winnerMark = "";
    for (i=0;i<3;i++) {
      if (gameBoard.showBoard()[i][0] === gameBoard.showBoard()[i][1] 
        && gameBoard.showBoard()[i][0] === gameBoard.showBoard()[i][2] 
        && gameBoard.showBoard()[i][0] !== "") {
        status = "end";
        winnerMark = `${gameBoard.showBoard()[i][0]}`;  
      }
      if (gameBoard.showBoard()[0][i] === gameBoard.showBoard()[1][i] 
        && gameBoard.showBoard()[0][i] === gameBoard.showBoard()[2][i] 
        && gameBoard.showBoard()[0][i] !== "") {
        status = "end";
        winnerMark = `${gameBoard.showBoard()[0][i]}`;  
      }
    }
    if (gameBoard.showBoard()[0][0] === gameBoard.showBoard()[1][1] 
      && gameBoard.showBoard()[0][0] === gameBoard.showBoard()[2][2] 
      && gameBoard.showBoard()[0][0] !== "") {
      status = "end";
      winnerMark = `${gameBoard.showBoard()[0][0]}`;  
    }
    if (gameBoard.showBoard()[0][2] === gameBoard.showBoard()[1][1] 
      && gameBoard.showBoard()[0][2] === gameBoard.showBoard()[2][0] 
      && gameBoard.showBoard()[0][2] !== "") {
      status = "end";
      winnerMark = `${gameBoard.showBoard()[0][2]}`;  
    }
      return {
        status,
        winnerMark,
      }
  }

  const gameCheck = () => {
    let winner = "";
    if (gameStatus().status === "end") {
      winner =
        gameStatus().winnerMark === player1.mark ? player1.name : player2.name;
      console.log(winner);
      domData.announce.textContent = `winner is ${winner}`;
      gameReset();
    } else if (
      gameBoard
        .showBoard()[0]
        .concat(gameBoard.showBoard()[1], gameBoard.showBoard()[2])
        .every((item) => item !== "")
    ) {
      console.log("tie");
      domData.announce.textContent = "Tie";
      gameReset();
    } else {
      console.log("game isn't finished yet");
      domData.announce.textContent = "game isn't finished yet";
      // gameReset();
    }
    function gameReset() {
      gameBoard.showBoard().splice(0);
      gameBoard.showBoard().push(["", "", ""],["", "", ""],["", "", ""]);
      gameStatus().status = "";
      gameStatus().winnerMark = "";
      winner = "";
      currentPlayer = player1;
      domData.display.forEach((item) => item.textContent = "");
    }
  }
  return {
    player1,
    player2,
    playerTurn,
    gameCheck,
    cPlayer,
  }
})();