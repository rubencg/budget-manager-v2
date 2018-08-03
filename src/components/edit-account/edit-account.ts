import { Component } from '@angular/core';

/**
 * Generated class for the EditAccountComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'edit-account',
  templateUrl: 'edit-account.html'
})
export class EditAccountComponent {

  text: string;

  constructor() {
    console.log('Hello EditAccountComponent Component');
    this.text = 'Hello World';
  }

}
