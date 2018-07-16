import { Component } from '@angular/core';

/**
 * Generated class for the AddEntryComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'add-entry',
  templateUrl: 'add-entry.html'
})
export class AddEntryComponent {

  text: string;

  constructor() {
    console.log('Hello AddEntryComponent Component');
    this.text = 'Add Entry Component';
  }

}
