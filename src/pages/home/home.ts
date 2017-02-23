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
      this.players.player1Icon = "X";
      this.players.player2Icon = "O";
    }  

    players:any = {};

    changeIcon()
    {
      if(this.players.player1Icon == "X") {
        this.players.player1Icon = "O";
      }
      else{
        (this.players.player1icon == "O") 
        this.players.player1Icon = "X";
      }

      if(this.players.player2Icon == "O") {
        this.players.player2Icon = "X";
      }
      else{
        this.players.player2Icon = "O";
      }
    }


    selectPlayers()
    {
      this.navCtrl.push(GamePage, this.players);
    }





}
