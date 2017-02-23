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
  private deleteHasOccured = false;

  // To dertermine at what turn a sign was put down
  private pos:{ pos:string }[] = [];

  //Used for determining a draw
  private numOfTurns = 9;
  private turnsTaken = 0;

  setPiece(x:number, y:number)
  {
    if(this.board.board[x][y] != "" || this.winner!= null)
    {
      return;
    }
    this.setPosToTurn(x, y);

    if(this.playerTurn == this.player1Turn) {
  		this.board.board[x][y] = this.player1.sign;
  		this.playerTurn = this.player2Turn;
  	}
  	else
  	{
  		this.board.board[x][y] = this.player2.sign;
  		this.playerTurn = this.player1Turn;
  	}

    this.deleteHasOccured = false;
    this.checkWin();
    this.turnsTaken++;
    this.checkForDraw();
  }

  setPosToTurn(x:number, y:number)
  {
    if(x == 0 && y == 0) {
      this.pos['pos0'] = this.turnsTaken;
    }
    else if(x == 0 && y == 1){
      this.pos['pos1'] = this.turnsTaken;
    }
    else if(x == 0 && y == 2){
      this.pos['pos2'] = this.turnsTaken;
    }
    else if(x == 1 && y == 0){
      this.pos['pos3'] = this.turnsTaken;
    }
    else if(x == 1 && y == 1){
      this.pos['pos4'] = this.turnsTaken;
    }
    else if(x == 1 && y == 2){
      this.pos['pos5'] = this.turnsTaken;
    }
    else if(x == 2 && y == 0){
      this.pos['pos6'] = this.turnsTaken;
    }
    else if(x == 2 && y == 1){
       this.pos['pos7'] = this.turnsTaken;
    }
    else if(x == 2 && y == 2){
      this.pos['pos8'] = this.turnsTaken;
    }
  }

  movePiece(x:number, y:number, posNo:number)
  {
    // If the position is not filled end the function
    if(this.board.board[x][y] == "") {
      return;
    }
    // If a delete already has been done show d and end function
    if(this.deleteHasOccured == true) {
      this.alertHasDeleted();
      return;
    }

    var turnsTaken = this.turnsTaken -1;
    switch (posNo) {
      case 0:
        if(this.pos['pos0'] == turnsTaken) {
          this.deletePiece(x, y);
        }
      break;
      case 1:
        if(this.pos['pos1'] == turnsTaken) {
          this.deletePiece(x, y);            
          }  
      break;
      case 2:
        if(this.pos['pos2'] == turnsTaken) {
          this.deletePiece(x, y);            
         } 
      break;
      case 3:
        if(this.pos['pos3'] == turnsTaken) {
          this.deletePiece(x, y);
        }
      break;
      case 4:
        if(this.pos['pos4'] == turnsTaken) {
          this.deletePiece(x, y);
        }
      break;
      case 5:
        if(this.pos['pos5'] == turnsTaken) {
          this.deletePiece(x, y);
        }
      break;
      case 6:
        if(this.pos['pos6'] == turnsTaken) {
          this.deletePiece(x, y);
        }
      break;
      case 7:
        if(this.pos['pos7'] == turnsTaken) {
          this.deletePiece(x, y);
        }
      break;
      case 8:
        if(this.pos['pos8'] == turnsTaken) {
          this.deletePiece(x, y);
        }
      break;
      default:
        console.log("Could move the piece!")
        break;
    }
  }

  deletePiece(x:number, y:number)
  {

      if(this.board.board[x][y] == this.player1Sign) {
        this.playerTurn = this.player1Turn;
      }
      else{
        this.playerTurn = this.player2Turn;
      }
      this.board.board[x][y] = "";

      this.turnsTaken -=1;
      this.deleteHasOccured = true;
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


  alertHasDeleted()
  {
    let alert = this.alertCtrl.create({
      title: "Can't delete",
      subTitle: "You can only redo one turn",
      buttons: [{
        text: 'OK'
      }]
    });
    alert.present()
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
