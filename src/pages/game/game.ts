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


  // Get player information from navParams
  private player1Name = this.navParams.get('player1');
  private player2Name = this.navParams.get('player2');
  private player1Sign = this.navParams.get('player1Sign');
  private player2Sign = this.navParams.get('player2Sign');
  private gameMode = this.navParams.get('gameMode');

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
  public gameover:boolean;

  // Used for showing the winner
  private player1Icon:string;
  private player2Icon:string;

  // Array with possitions of array
  private winnerPosColor:string[][] = [['','',''],['','',''],['','','']];

  // To dertermine at what turn a sign was put down
  private pos:{ pos:string }[] = [];

  //Used for determining a draw
  private maxNoOfTurns = 9;
  private turnsTaken = 0;


  setPiece(x:number, y:number)
  {
    // Skip the rest of the function if either a winner has been determined
    // or the spot has already been taken
    if(this.board.board[x][y] != "" || this.winner != null)
    {
      return;
    }

    this.setPosToTurn(x, y);

    if(this.playerTurn == this.player1Turn) {
  		this.board.board[x][y] = this.player1.sign;
  	}
  	else
  	{
  		this.board.board[x][y] = this.player2.sign;
  	}

    this.deleteHasOccured = false;
    this.checkWin();
    this.turnsTaken++;
    this.checkForDraw();

    // Change turns unless a winner has been set
    if(this.winner == null) {
      this.playerTurn == this.player1Turn ? this.playerTurn = this.player2Turn : this.playerTurn = this.player1Turn;
    }
  }

  // Set the currently clicked block to the amount of turns taken +1.
  // +1 is because when a move has been made this.turnstaken is incremented by one
  // used to determine at what turn a character/sign was put down
  setPosToTurn(x:number, y:number)
  {
    if(x == 0 && y == 0) {
      this.pos['pos0'] = this.turnsTaken +1;
    }
    else if(x == 0 && y == 1){
      this.pos['pos1'] = this.turnsTaken +1;
    }
    else if(x == 0 && y == 2){
      this.pos['pos2'] = this.turnsTaken +1;
    }
    else if(x == 1 && y == 0){
      this.pos['pos3'] = this.turnsTaken +1;
    }
    else if(x == 1 && y == 1){
      this.pos['pos4'] = this.turnsTaken +1;
    }
    else if(x == 1 && y == 2){
      this.pos['pos5'] = this.turnsTaken +1;
    }
    else if(x == 2 && y == 0){
      this.pos['pos6'] = this.turnsTaken +1;
    }
    else if(x == 2 && y == 1){
       this.pos['pos7'] = this.turnsTaken +1;
    }
    else if(x == 2 && y == 2){
      this.pos['pos8'] = this.turnsTaken +1;
    }
  }

  movePiece(x:number, y:number, posNo:number)
  {
    // If the position is not filled or a winner has been set end the function
    if(this.board.board[x][y] == "" || this.winner != null) {
      return;
    }
    // If a delete already has been done show alert and end function
    if(this.deleteHasOccured == true) {
      this.alertHasDeleted();
      return;
    }

    // Checks if the position that is trying to be deleted 
    // actually was put down this turn
    switch (posNo) {
      case 0:
        if(this.pos['pos0'] == this.turnsTaken) {
          this.deletePiece(x, y);
        }
      break;
      case 1:
        if(this.pos['pos1'] == this.turnsTaken) {
          this.deletePiece(x, y);            
          }  
      break;
      case 2:
        if(this.pos['pos2'] == this.turnsTaken) {
          this.deletePiece(x, y);            
         } 
      break;
      case 3:
        if(this.pos['pos3'] == this.turnsTaken) {
          this.deletePiece(x, y);
        }
      break;
      case 4:
        if(this.pos['pos4'] == this.turnsTaken) {
          this.deletePiece(x, y);
        }
      break;
      case 5:
        if(this.pos['pos5'] == this.turnsTaken) {
          this.deletePiece(x, y);
        }
      break;
      case 6:
        if(this.pos['pos6'] == this.turnsTaken) {
          this.deletePiece(x, y);
        }
      break;
      case 7:
        if(this.pos['pos7'] == this.turnsTaken) {
          this.deletePiece(x, y);
        }
      break;
      case 8:
        if(this.pos['pos8'] == this.turnsTaken) {
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
    if(this.turnsTaken == this.maxNoOfTurns && this.winner == null) {
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
          this.setWinnerPosColor('0','0','0','1','0','2');
          this.setWinner();
        }
      }
    }
    // Check second row
    if(this.board.board[1][0] == this.player1.sign || this.board.board[1][0] == this.player2.sign) {
      if(this.board.board[1][0] == this.board.board[1][1]) {
        if(this.board.board[1][1] == this.board.board[1][2]) {
          this.board.board[1][0] == this.player1.sign ? this.winner = this.player1.name : this.winner = this.player2.name;
          this.setWinnerPosColor('1','0','1','1','1','2');
          this.setWinner();
        }
      }
    }
    // Check third row
    if(this.board.board[2][0] == this.player1.sign || this.board.board[2][0] == this.player2.sign) {
      if(this.board.board[2][0] == this.board.board[2][1]) {
        if(this.board.board[2][1] == this.board.board[2][2]) {
          this.board.board[2][0] == this.player1.sign ? this.winner = this.player1.name : this.winner = this.player2.name;
          this.setWinnerPosColor('2','0','2','1','2','2');
          this.setWinner();
        }
      }
    }

    // Check left top down
    if(this.board.board[0][0] == this.player1.sign || this.board.board[0][0] == this.player2.sign) {
      if(this.board.board[0][0] == this.board.board[1][0]) {
        if(this.board.board[1][0] == this.board.board[2][0]) {
          this.board.board[0][0] == this.player1.sign ? this.winner = this.player1.name : this.winner = this.player2.name
          this.setWinnerPosColor('0','0','1','0','2','0');
          this.setWinner();
      }
    }
  }

    // Check middle top down
    if(this.board.board[0][1] == this.player1.sign || this.board.board[0][1] == this.player2.sign) {
      if(this.board.board[0][1] == this.board.board[1][1]) {
        if(this.board.board[1][1] == this.board.board[2][1]) {
          this.board.board[0][1] == this.player1.sign ? this.winner = this.player1.name : this.winner = this.player2.name;
          this.setWinnerPosColor('0','1','1','1','2','1');
          this.setWinner();                    
      }
    }
  }

  // Check right top down
    if(this.board.board[0][2] == this.player1.sign || this.board.board[0][2] == this.player2.sign) {
      if(this.board.board[0][2] == this.board.board[1][2]) {
        if(this.board.board[1][2] == this.board.board[2][2]) {
          this.board.board[0][2] == this.player1.sign ? this.winner = this.player1.name : this.winner = this.player2.name;
          this.setWinnerPosColor('0','2','1','2','2','2');
          this.setWinner();
      }
    }
  }

  // Check crossses
    if(this.board.board[0][0] == this.player1.sign || this.board.board[0][0] == this.player2.sign) {
      if(this.board.board[0][0] == this.board.board[1][1]) {
        if(this.board.board[1][1] == this.board.board[2][2]) {
          this.board.board[0][0] == this.player1.sign ? this.winner = this.player1.name : this.winner = this.player2.name;
          this.setWinnerPosColor('0','0','1','1','2','2');
          this.setWinner();          
      }
    }
  }
    if(this.board.board[0][2] == this.player1.sign || this.board.board[0][2] == this.player2.sign) {
      if(this.board.board[0][2] == this.board.board[1][1]) {
        if(this.board.board[1][1] == this.board.board[2][0]) {
          this.board.board[0][2] == this.player1.sign ? this.winner = this.player1.name : this.winner = this.player2.name;
          this.setWinnerPosColor('0','2','1','1','2','0');
          this.setWinner();
      }
    }

  }

    // Check whether or not a game with a best of three or best of 5 has finished
    if(this.gameMode == 1 && this.player1.score == 2 || this.player2.score == 2 || this.gameMode == 2 && this.player1.score == 3 || this.player2.score == 3) {
       this.gameover = true;
       this.alertAtWin();
    }
  }

  setWinnerPosColor(a:string, b:string, c:string, d:string, e:string, f:string)
  { 
    this.winnerPosColor[a][b] = 'Winning spot!';
    this.winnerPosColor[c][d] = 'Winning spot!';
    this.winnerPosColor[e][f] = 'Winning spot!';
  }
  setWinner()
  {
    // Set a trophy above the winner
    this.winner ==  this.player1.name ? this.player1Icon = "trophy" : this.player2Icon = "trophy";

    // Increment the playerscore by one
    this.winner == this.player1.name ? this.player1.setScore(1) : this.player2.setScore(1);
  }

  alertAtWin()
  {
    let alert = this.alertCtrl.create({
      title:'Victory!',
      subTitle: this.winner + ' Has won!',
      buttons: [
      {
        text: "Don't play",
        handler:() =>{
          this.navCtrl.setRoot(HomePage);
        }
      },
      {
        text: 'Play again',
        role: 'cancel',
        handler:() =>{
          this.clearGame();
        }
      }]
    });
    alert.present();
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
    if(this.gameover == true) {
      this.player1.score = 0;
      this.player2.score = 0;
      this.gameover = false;
    }
     this.board.board = [['', '', ''], ['', '', ''], ['', '', '']];
     this.winnerPosColor = [['', '', ''], ['', '', ''], ['', '', '']];
     this.player1Icon = '';
     this.player2Icon = '';
     this.playerTurn = true;
     this.winner = null;
     this.turnsTaken = 0;
  }

}
