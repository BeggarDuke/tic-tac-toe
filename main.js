const gameBoard = (function() {
  const gameBoard = [["", "", ""],["", "", ""],["", "", ""]];
  
  const placeMark = (currentPlayer, choose) => {
    gameBoard[+choose[0]][+choose[1]] = currentPlayer.mark;
    console.log(gameBoard[0]);
  }

  const showBoard = () => gameBoard;

  const gameStatus = () => {
    let status;
    let winner;
    for (i=0;i<3;i++) {
      if (gameBoard[i][0] === gameBoard[i][1] 
        && gameBoard[i][0] === gameBoard[i][2] 
        && gameBoard[i][0] !== "") {
        status = "end";
        winner = `${gameBoard[i][0]}`;  
      }
      if (gameBoard[0][i] === gameBoard[1][i] 
        && gameBoard[0][i] === gameBoard[2][i] 
        && gameBoard[0][i] !== "") {
        status = "end";
        winner = `${gameBoard[0][i]}`;  
      }
    }
    if (gameBoard[0][0] === gameBoard[1][1] 
      && gameBoard[0][0] === gameBoard[2][2] 
      && gameBoard[0][0] !== "") {
      status = "win";
      winner = `${gameBoard[0][0]}`;  
    }
    if (gameBoard[0][2] === gameBoard[1][1] 
      && gameBoard[0][2] === gameBoard[2][0] 
      && gameBoard[0][2] !== "") {
      status = "end";
      winner = `${gameBoard[0][2]}`;  
    }
      return {
        status,
        winner,
      }
  }

  return {
    placeMark, 
    showBoard,
    gameStatus,
  }
})();

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
    gameCheck();
    switchPlayer();
  }

  const gameCheck = () => {
    if (gameBoard.gameStatus().status === "end") {
      console.log(`Winner is ${gameBoard.gameStatus().winner}`);
      // gameReset();
    }
    else {
      console.log("123124");
    }
    function gameReset() {
      //some func
    }
  }

  return {
    playerTurn,
  }
})();

const player = (name, mark) => {
  return {name, mark}
}