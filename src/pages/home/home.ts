import { Component } from '@angular/core';
import { NavController} from 'ionic-angular';
import { GamePage } from '../game/game';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

    constructor(public navCtrl: NavController)
    {
      this.players.player1Sign = "X";
      this.players.player2Sign = "O";
    }  

    players:any = {};

    changeSign()
    {
      if(this.players.player1Sign == "X") {
        this.players.player1Sign = "O";
      }
      else{
        (this.players.player1Sign == "O") 
        this.players.player1Sign = "X";
      }

      if(this.players.player2Sign == "O") {
        this.players.player2Sign = "X";
      }
      else{
        this.players.player2Sign = "O";
      }
    }


    selectPlayers()
    {
      this.navCtrl.push(GamePage, this.players);
    }





}
