import { Component, ViewChild } from '@angular/core';
import { NavController, Slides} from 'ionic-angular';
import { GamePage } from '../game/game';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

    constructor(public navCtrl: NavController)
    {
      this.game.player1Sign = "X";
      this.game.player2Sign = "O";
    }
 
    @ViewChild(Slides) slides: Slides;

    game:any = {};

    changeSign()
    {
      if(this.game.player1Sign == "X") {
        this.game.player1Sign = "O";
      }
      else{
        (this.game.player1Sign == "O") 
        this.game.player1Sign = "X";
      }

      if(this.game.player2Sign == "O") {
        this.game.player2Sign = "X";
      }
      else{
        this.game.player2Sign = "O";
      }
    }

    gameModeIndex()
    {
      let currentIndex = this.slides.getActiveIndex();
      return currentIndex;
    }

    startGame()
    {
      this.game.gameMode = this.gameModeIndex();
      this.navCtrl.push(GamePage, this.game);
    }


}
