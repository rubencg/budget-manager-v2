import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { EnterQuantityPage } from '../../pages/enter-quantity/enter-quantity';
import { EntryType } from '../../interfaces';

@Component({
  selector: 'add-entry',
  templateUrl: 'add-entry.html'
})
export class AddEntryComponent {

  constructor(private nav: NavController) {

  }

  addExpense(){
    this.nav.push(EnterQuantityPage,{
      entryType: EntryType.Expense
    });
  }

  addIncome(){
    this.nav.push(EnterQuantityPage,{
      entryType: EntryType.Income
    });
  }

  addBudgetExpense(){
    this.nav.push(EnterQuantityPage,{
      entryType: EntryType.BudgetExpense
    });
  }

}
