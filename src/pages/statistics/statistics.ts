import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { ExpensesPage } from '../expenses/expenses';
import { IncomesPage } from '../incomes/incomes';
import { BudgetExpensesPage } from '../budget-expenses/budget-expenses';

@Component({
  selector: 'page-statistics',
  templateUrl: 'statistics.html',
})
export class StatisticsPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {

  }

  showExpenses(){
    this.navCtrl.push(ExpensesPage);
  }

  showIncomes(){
    this.navCtrl.push(IncomesPage);
  }

  showBudgetExpenses(){
    this.navCtrl.push(BudgetExpensesPage);
  }

}
