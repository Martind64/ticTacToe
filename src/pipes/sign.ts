import { Injectable, Pipe } from '@angular/core';

/*
  Generated class for the Sign pipe.

  See https://angular.io/docs/ts/latest/guide/pipes.html for more info on
  Angular 2 Pipes.
*/
@Pipe({
  name: 'sign'
})
@Injectable()
export class Sign {
  /*
    Takes a value and makes it lowercase.
   */
  transform(value:string) {


    if(value == 'X') {
      value = 'img/cross.png';
    }
    else if(value == 'O')
    {
      value = 'img/circle.png';
    }
    
    return value;
  }
}
