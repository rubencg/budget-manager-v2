import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { ExpensesPage } from '../expenses/expenses';

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

}
