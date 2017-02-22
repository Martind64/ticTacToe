// Import models
import { Board } from '../models/Board';
import { Player } from '../models/Player';

export class Game{

  constructor() {
  }

  public player1 = new Player('Delfs', 'X');
  public player2 = new Player('John', 'O');
  public board = new Board();  
  public playerTurn = true;


  setPiece(x, y)
  {
    if(this.board.board[x][y] == this.player1.sign || this.board.board[x][y] == this.player2.sign)
    {
      console.log("sign is taken");
    }
    else if(this.playerTurn == true) {
      this.board.board[x][y] = this.player1.sign;
      this.playerTurn = false;
    }
    else
    {
      this.board.board[x][y] = this.player2.sign;
      this.playerTurn = true;
    }
    this.checkWin();
  }
  
  checkWin()
  {
    // Check first row
    if(this.board.board[0][0] == this.player1.sign || this.board.board[0][0] == this.player2.sign) {
      if(this.board.board[0][0] == this.board.board[0][1]) {
        if(this.board.board[0][1] == this.board.board[0][2]) {
          console.log("You win");
        }
      }
    }
    // Check second row
    if(this.board.board[1][0] == this.player1.sign || this.board.board[1][0] == this.player2.sign) {
      if(this.board.board[1][0] == this.board.board[1][1]) {
        if(this.board.board[1][1] == this.board.board[1][2]) {
          console.log("You win");
        }
      }
    }
    // Check third row
    if(this.board.board[2][0] == this.player1.sign || this.board.board[2][0] == this.player2.sign) {
      if(this.board.board[2][0] == this.board.board[2][1]) {
        if(this.board.board[2][1] == this.board.board[2][2]) {
          console.log("You win");
        }
      }
    }

    // Check left top down
    if(this.board.board[0][0] == this.player1.sign || this.board.board[0][0] == this.player2.sign) {
      if(this.board.board[0][0] == this.board.board[1][0]) {
        if(this.board.board[1][0] == this.board.board[2][0]) {
        console.log("You win");
      }
    }
  }

    // Check middle top down
    if(this.board.board[0][1] == this.player1.sign || this.board.board[0][1] == this.player2.sign) {
      if(this.board.board[0][1] == this.board.board[1][1]) {
        if(this.board.board[1][1] == this.board.board[2][1]) {
        console.log("You win");
      }
    }
  }

  // Check right top down
    if(this.board.board[0][2] == this.player1.sign || this.board.board[0][2] == this.player2.sign) {
      if(this.board.board[0][2] == this.board.board[1][2]) {
        if(this.board.board[1][2] == this.board.board[2][2]) {
        console.log("You win");
      }
    }
  }

  // Check crossses
    if(this.board.board[0][0] == this.player1.sign || this.board.board[0][0] == this.player2.sign) {
      if(this.board.board[0][0] == this.board.board[1][1]) {
        if(this.board.board[1][1] == this.board.board[2][2]) {
        console.log("You win");
      }
    }
  }
    if(this.board.board[0][2] == this.player1.sign || this.board.board[0][2] == this.player2.sign) {
      if(this.board.board[0][2] == this.board.board[1][1]) {
        if(this.board.board[1][1] == this.board.board[2][0]) {
        console.log("You win");
      }
    }
  }
  }

}