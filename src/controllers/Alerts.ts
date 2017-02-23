import { AlertController } from 'ionic-angular';
import { Game } from '../../pages/game/game';

export class Alerts{

constructor(public alertCtrl: AlertController){
}

private game = new Game();
	
alertHasDeleted()
  {
    let alert = this.alertCtrl.create({
      title: "Can't delete",
      subTitle: "You can only redo one turn",
      buttons: [{
        text: 'OK'
      }]
    });
    alert.present();
  }
  alertAtWin()
  {
    let alert = this.alertCtrl.create({
      title: "Game over",
      subTitle: "The winner is " + this.game.winner,
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
}