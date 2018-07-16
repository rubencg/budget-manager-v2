import { Component } from '@angular/core';

/**
 * Generated class for the BudgetOverviewComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'budget-overview',
  templateUrl: 'budget-overview.html'
})
export class BudgetOverviewComponent {

  text: string;

  constructor() {
    console.log('Hello BudgetOverviewComponent Component');
    this.text = 'Budget Overview Component';
  }

}
