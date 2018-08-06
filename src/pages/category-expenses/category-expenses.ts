import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import moment from 'moment';
import _ from 'lodash';
import { EntryProvider } from '../../providers/entry/entry';
import { Expense } from '../../interfaces';

@IonicPage()
@Component({
  selector: 'page-category-expenses',
  templateUrl: 'category-expenses.html',
})
export class CategoryExpensesPage {
  private date: Date;
  title: string;
  groupedExpenses: ValueData[];
  expenses: Expense[];

  constructor(public navCtrl: NavController, private entryProvider: EntryProvider) {
  }

  ionViewDidLoad() {
    let month: number = moment(new Date()).month();
    let year: number = moment(new Date()).year();
    this.date = new Date(year, month, 1);
    this.expenses = this.entryProvider.getExpensesLocal();
    this.setNewDate(this.date);
  }

  previous() {
    this.date = moment(this.date).subtract(1, 'month').toDate();
    this.setNewDate(this.date);
  }

  next() {
    this.date = moment(this.date).add(1, 'month').toDate();
    this.setNewDate(this.date);
  }

  activate(group: ValueData) {
    group.isActive = !group.isActive;
  }

  setNewDate(date: Date) {
    this.title = moment(date).locale('es').format('MMMM YYYY');

    this.groupedExpenses = _.chain(this.expenses)
      .filter(e => moment(+ e.date).isSame(date, 'month'))
      .groupBy(e => e.category.name)
      .map((value: Expense[], key: string) => {
        return {
          name: key,
          amount: _.sumBy(value, v => v.amount),
          img: value[0] ? value[0].category.img : null,
          data: value,
          isActive: false
        };
      })
      .value();

  }

  getDate(date: string){
    return moment(+date).locale('es').format('dddd D');
  }

}

interface ValueData {
  name: string;
  amount: number;
  img: string;
  data: Expense[];
  isActive: boolean;
}
