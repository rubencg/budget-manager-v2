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

  categoryChunks: any;

  constructor() {
    this.categoryChunks = [
      {
        title: "Despensa",
        currentTotal: 6702,
        currentMax: 6000,
        image: '../../assets/imgs/categories/png/toast.png',
        color: 'expense'
      },
      {
        title: "Entretenimiento",
        currentTotal: 1400,
        currentMax: 3200,
        image: '../../assets/imgs/categories/png/theater.png',
        color: 'income'
      }
    ];
  }

}
