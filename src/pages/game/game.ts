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

  newNames()
  {
    this.navCtrl.setRoot(HomePage);
  }

  clearGame()
  {
     this.board.board = [['', '', ''], ['', '', ''], ['', '', '']];
     this.playerTurn = true;
  }

}
