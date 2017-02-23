import { Component } from '@angular/core';
import { NavController, AlertController, NavParams } from 'ionic-angular';
// Import models
import { Board } from '../../models/Board';
import { Player } from '../../models/Player';

@Component({
  selector: 'page-game',
  templateUrl: 'game.html'
})
export class GamePage {

	constructor(public navCtrl: NavController, public alertCtrl: AlertController, public navParams: NavParams) {
  			}

  // Get player information from navParams
  private player1Name = this.navParams.get('player1');
  private player2Name = this.navParams.get('player2');
  private player1Sign = this.navParams.get('player1Sign');
  private player2Sign = this.navParams.get('player2Sign');


  // Create new Player Objects
  private player1 = new Player(this.player1Name, this.player1Sign);
  private player2 = new Player(this.player2Name, this.player2Sign);

  // Create new Board object
  private board = new Board();

  // Variables for the game
  private winner:string;
  private playerTurn = true;
  private player1Turn = true;
  private player2Turn = false;

  //Used for determining a draw
  private numOfTurns = 9;
  private turnsTaken = 0;

  setPiece(x:number, y:number)
  {
    // Checks if a board position has been taken
    if(this.board.board[x][y] == this.player1.sign || this.board.board[x][y] == this.player2.sign)
    {
      return;
    }
    
    if(this.playerTurn == this.player1Turn) {
  		this.board.board[x][y] = this.player1.sign;
  		this.playerTurn = this.player2Turn;
  	}
  	else
  	{
  		this.board.board[x][y] = this.player2.sign;
  		this.playerTurn = this.player1Turn;
  	}
    this.checkWin();

    this.turnsTaken++;
    this.checkForDraw();
  }

  movePiece(x:number, y:number)
  {
    if(this.board.board[x][y] != "") {

      if(this.board.board[x][y] == this.player1Sign) {
        this.playerTurn = this.player1Turn;
      }
      else{
        this.playerTurn = this.player2Turn;
      }
      this.board.board[x][y] = "";

      this.turnsTaken -=1;
    }
  }

  // Checks for a draw
  checkForDraw()
  {
    if(this.turnsTaken == this.numOfTurns && this.winner == null) {
      this.alertAtDraw();
    }
  }
  checkWin()
  {
    // Check first row
    if(this.board.board[0][0] == this.player1.sign || this.board.board[0][0] == this.player2.sign) {
      if(this.board.board[0][0] == this.board.board[0][1]) {
        if(this.board.board[0][1] == this.board.board[0][2]) {
          this.board.board[0][0] == this.player1.sign ? this.winner = this.player1.name : this.winner = this.player2.name;
          this.alertAtWin();
        }
      }
    }
    // Check second row
    if(this.board.board[1][0] == this.player1.sign || this.board.board[1][0] == this.player2.sign) {
      if(this.board.board[1][0] == this.board.board[1][1]) {
        if(this.board.board[1][1] == this.board.board[1][2]) {
          this.board.board[1][0] == this.player1.sign ? this.winner = this.player1.name : this.winner = this.player2.name;
          this.alertAtWin();
        }
      }
    }
    // Check third row
    if(this.board.board[2][0] == this.player1.sign || this.board.board[2][0] == this.player2.sign) {
      if(this.board.board[2][0] == this.board.board[2][1]) {
        if(this.board.board[2][1] == this.board.board[2][2]) {
          this.board.board[2][0] == this.player1.sign ? this.winner = this.player1.name : this.winner = this.player2.name;
          this.alertAtWin();
        }
      }
    }

    // Check left top down
    if(this.board.board[0][0] == this.player1.sign || this.board.board[0][0] == this.player2.sign) {
      if(this.board.board[0][0] == this.board.board[1][0]) {
        if(this.board.board[1][0] == this.board.board[2][0]) {
          this.board.board[0][0] == this.player1.sign ? this.winner = this.player1.name : this.winner = this.player2.name;
          this.alertAtWin();          
      }
    }
  }

    // Check middle top down
    if(this.board.board[0][1] == this.player1.sign || this.board.board[0][1] == this.player2.sign) {
      if(this.board.board[0][1] == this.board.board[1][1]) {
        if(this.board.board[1][1] == this.board.board[2][1]) {
          this.board.board[0][1] == this.player1.sign ? this.winner = this.player1.name : this.winner = this.player2.name;
          this.alertAtWin();                    
      }
    }
  }

  // Check right top down
    if(this.board.board[0][2] == this.player1.sign || this.board.board[0][2] == this.player2.sign) {
      if(this.board.board[0][2] == this.board.board[1][2]) {
        if(this.board.board[1][2] == this.board.board[2][2]) {
          this.board.board[0][2] == this.player1.sign ? this.winner = this.player1.name : this.winner = this.player2.name;
          this.alertAtWin();
      }
    }
  }

  // Check crossses
    if(this.board.board[0][0] == this.player1.sign || this.board.board[0][0] == this.player2.sign) {
      if(this.board.board[0][0] == this.board.board[1][1]) {
        if(this.board.board[1][1] == this.board.board[2][2]) {
          this.board.board[0][0] == this.player1.sign ? this.winner = this.player1.name : this.winner = this.player2.name;
          this.alertAtWin();          
      }
    }
  }
    if(this.board.board[0][2] == this.player1.sign || this.board.board[0][2] == this.player2.sign) {
      if(this.board.board[0][2] == this.board.board[1][1]) {
        if(this.board.board[1][1] == this.board.board[2][0]) {
          this.board.board[0][2] == this.player1.sign ? this.winner = this.player1.name : this.winner = this.player2.name;
          this.alertAtWin();
      }
    }
  }

  }

  alertAtWin()
  {
    let alert = this.alertCtrl.create({
      title: "Game over",
      subTitle: "The winner is " + this.winner,
      buttons: [{
        text: 'OK'
      }
      ]
    });

    alert.present();
  }

  alertAtDraw()
  {    
    let alert = this.alertCtrl.create({
      title: "Game over",
      subTitle: "Sorry guys, it's a draw!",
      buttons: [{
        text: 'OK'
      }
      ]
    });
    alert.present();
  }

  clearGame()
  {
     this.board.board = [['', '', ''], ['', '', ''], ['', '', '']];
     this.playerTurn = true;
     this.winner = null;
     this.turnsTaken = 0;
  }

}
