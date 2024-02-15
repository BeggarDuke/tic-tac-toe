const gameBoard = (function() {
  const gameBoard = [["", "", ""],["", "", ""],["", "", ""]];
  
  const placeMark = () => {
    let choose = window.prompt("select row and column: a, b").split(", ");
    gameBoard[+choose[0]][+choose[1]] = "x";
    console.log(gameBoard[0]);
    gameCheck();
  }
  const showBoard = () => gameBoard;
  return {
    placeMark, 
    showBoard,
  }
})();

const game = (function() { 
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
  const gameCheck = () => {
    if (gameStatus().status === "end") {
      console.log(`Winner is ${gameStatus().winner}`);
      // gameReset();
    }
    else {
      console.log("123124");
    }
    function gameReset() {
      //some func
    }
  }
})();

console.log(gameBoard.show());