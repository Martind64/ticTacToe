import { Component } from '@angular/core';
import { NavController, AlertController, NavParams } from 'ionic-angular';
import { HomePage } from '../home/home';
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

  public player1Name = this.navParams.get('player1');
  public player2Name = this.navParams.get('player2');

  public player1 = new Player(this.player1Name, 'X');
  public player2 = new Player(this.player2Name, 'O');
  public board = new Board();
  public winner:string;
  public playerTurn = true;

  //Used for determining a draw
  public numOfTurns = 8;
  public turnsTaken = 0;

  setPiece(x, y)
  {
    // Checks if a board position has been taken
    if(this.board.board[x][y] == this.player1.sign || this.board.board[x][y] == this.player2.sign)
    {
      return;
    }
    
    if(this.playerTurn == true) {
  		this.board.board[x][y] = this.player1.sign;
  		this.playerTurn = false;
  	}
  	else
  	{
  		this.board.board[x][y] = this.player2.sign;
  		this.playerTurn = true;
  	}
    this.checkWin();
    this.checkForDraw();
    console.log(this.turnsTaken);
    this.turnsTaken++;
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

  newNames()
  {
    this.navCtrl.setRoot(HomePage);
  }

  clearGame()
  {
     this.board.board = [['', '', ''], ['', '', ''], ['', '', '']];
     this.playerTurn = true;
     this.turnsTaken = 0;
  }

}
