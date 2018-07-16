import { Component } from '@angular/core';

/**
 * Generated class for the EndOfTheMonthComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'end-of-the-month',
  templateUrl: 'end-of-the-month.html'
})
export class EndOfTheMonthComponent {

  text: string;

  constructor() {
    console.log('Hello EndOfTheMonthComponent Component');
    this.text = 'End of the month Component';
  }

}
