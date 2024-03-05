const domData = (function() {
  const display = document.querySelectorAll(".game-display div");
  const announce = document.querySelector(".game-announce h2");
  const playerBox = document.querySelectorAll(".footer div");
  announce.textContent = "Player one's turn";
  display.forEach((item) => {
    item.addEventListener("click", () => {
      if (item.innerText !== "") return;
      item.innerText = game.cPlayer().mark;
      game.playerTurn();
    });
  });
  playerBox[0].addEventListener("click", (item) => {
    const name = prompt();
    if (name === null) return;
    item.target.textContent = name;
    game.player1.name = name;
    game.gameCheck();
  });
  playerBox[1].addEventListener("click", (item) => {
    const name = prompt();
    if (name === null) return;
    item.target.textContent = name;
    game.player2.name = name;
    game.gameCheck();
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
  }

  const showBoard = () => gameBoard;

  return {
    placeMark, 
    showBoard,
  }
})();

const game = (function() { 
  const player = (name, mark) => {
    return {name, mark}
  }
  const player1 = player("Player 1", "X");
  const player2 = player("Player 2", "O");
  let currentPlayer = player1;

  const switchPlayer = () => {
    currentPlayer = (currentPlayer === player1) ? player2 : player1;
  }

  const cPlayer = () => currentPlayer;

  const playerTurn = () => {
    gameBoard.placeMark();
    switchPlayer();
    gameCheck();
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
      alert(`The winner is ${winner}`);
      gameReset();
    } else if (
      gameBoard
        .showBoard()[0]
        .concat(gameBoard.showBoard()[1], gameBoard.showBoard()[2])
        .every((item) => item !== "")
    ) {
      alert("Tie");
      gameReset();
    } else {
      switch (currentPlayer) {
        case player1: 
          domData.announce.textContent = `${currentPlayer.name}'s turn`;
          break;
        case player2: 
          domData.announce.textContent = `${currentPlayer.name}'s turn`;
          break;
      }
      
    }
    function gameReset() {
      gameBoard.showBoard().splice(0);
      gameBoard.showBoard().push(["", "", ""],["", "", ""],["", "", ""]);
      gameStatus().status = "";
      gameStatus().winnerMark = "";
      winner = "";
      currentPlayer = player1;
      domData.announce.textContent = `${currentPlayer.name}'s turn`;
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