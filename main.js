const gameBoard = (function() {
  const gameBoard = [["", "", ""],["", "", ""],["", "", ""]];
  
  const placeMark = (currentPlayer, choose) => {
    gameBoard[+choose[0]][+choose[1]] = currentPlayer.mark;
    console.log(gameBoard);
  }

  const showBoard = () => gameBoard;

  const gameStatus = () => {
    let status;
    let winnerMark;
    for (i=0;i<3;i++) {
      if (gameBoard[i][0] === gameBoard[i][1] 
        && gameBoard[i][0] === gameBoard[i][2] 
        && gameBoard[i][0] !== "") {
        status = "end";
        winnerMark = `${gameBoard[i][0]}`;  
      }
      if (gameBoard[0][i] === gameBoard[1][i] 
        && gameBoard[0][i] === gameBoard[2][i] 
        && gameBoard[0][i] !== "") {
        status = "end";
        winnerMark = `${gameBoard[0][i]}`;  
      }
    }
    if (gameBoard[0][0] === gameBoard[1][1] 
      && gameBoard[0][0] === gameBoard[2][2] 
      && gameBoard[0][0] !== "") {
      status = "end";
      winnerMark = `${gameBoard[0][0]}`;  
    }
    if (gameBoard[0][2] === gameBoard[1][1] 
      && gameBoard[0][2] === gameBoard[2][0] 
      && gameBoard[0][2] !== "") {
      status = "end";
      winnerMark = `${gameBoard[0][2]}`;  
    }
      return {
        status,
        winnerMark,
      }
  }

  const gameCheck = () => {
    if (gameStatus().status === "end") {
      console.log(`Winner is ${gameStatus().winnerMark}`);
      // gameReset();
    }
    else {
      console.log("123124");
    }
    // function gameReset() {
    //   gameBoard.slice().push(["", "", ""],["", "", ""],["", "", ""]);
    // }
  }

  return {
    placeMark, 
    showBoard,
    gameCheck,
  }
})();

const player = (name, mark) => {
  return {name, mark}
}

const game = (function() { 
  const player1 = player("a", "x");
  const player2 = player("b", "o");
  let currentPlayer = player1;

  const switchPlayer = () => {
    currentPlayer = (currentPlayer === player1) ? player2 : player1;
  }

  const playerTurn = () => {
    let choose = window.prompt("select row and column: a, b").split(", ");
    if (gameBoard.showBoard()[+choose[0]][+choose[1]] !== "") return;
    gameBoard.placeMark(currentPlayer, choose);
    gameBoard.gameCheck();
    switchPlayer();
  }

  return {
    playerTurn,
  }
})();




// 1) configure winner announcement
// 2) UI