import { Injectable, Pipe } from '@angular/core';

/*
  Generated class for the Ucname pipe.

  See https://angular.io/docs/ts/latest/guide/pipes.html for more info on
  Angular 2 Pipes.
*/
@Pipe({
  name: 'ucname'
})
@Injectable()
export class Ucname {
  /*
    Takes a value and makes it lowercase.
   */
  transform(name) {
    name = name + ''; // make sure it's a string
    name = name.toLowerCase();
    return name.charAt(0).toUpperCase() + name.slice(1);
  }
}
