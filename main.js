const gameBoard = (function() {
  const gameBoard = [["", "", ""],["", "", ""],["", "", ""]];
  
  const placeMark = (currentPlayer, choose) => {
    gameBoard[+choose[0]][+choose[1]] = currentPlayer.mark;
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
  const player1 = player("Player 1", "x");
  const player2 = player("Player 2", "o");
  let currentPlayer = player1;

  const switchPlayer = () => {
    currentPlayer = (currentPlayer === player1) ? player2 : player1;
  }

  const playerTurn = () => {
    let choose = window.prompt("select row and column: a, b").split(", ");
    if (gameBoard.showBoard()[+choose[0]][+choose[1]] !== "") return;
    gameBoard.placeMark(currentPlayer, choose);
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
      winner = (gameStatus().winnerMark === player1.mark) 
      ? player1.name 
      : player2.name;
      console.log(winner);
      gameReset();
    }
    else if (gameBoard.showBoard().every((item) => item === "x" || item === "o")){
      console.log("tie")
    }
    else {
      console.log("game isn't finished yet");
    }
    function gameReset() {
      gameBoard.showBoard().splice(0);
      gameBoard.showBoard().push(["", "", ""],["", "", ""],["", "", ""]);
      gameStatus().status = "";
      gameStatus().winnerMark = "";
      winner = "";
      currentPlayer = player1;
    }
  }

  return {
    player1,
    player2,
    playerTurn,
    gameCheck,
  }
})();

// tie condition (every element on array !== "" and status !== "end")