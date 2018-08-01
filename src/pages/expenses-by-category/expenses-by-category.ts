import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import moment from 'moment';
import { EntryListComponent, EntryListOptions } from '../../components/entry-list/entry-list';
import { Income, Expense, BudgetExpense, Account } from '../../interfaces';
import { EntryProvider } from '../../providers/entry/entry';
import _ from 'lodash';

@IonicPage()
@Component({
  selector: 'page-expenses-by-category',
  templateUrl: 'expenses-by-category.html',
})
export class ExpensesByCategoryPage {
  title: string;
  private date: Date;
  private entryType: string = "1";
  account: Account;

  @ViewChild('expensesList') expensesList: EntryListComponent<Expense>;
  expenseOptions: EntryListOptions<Expense>= {
    noElementsText: "No existen gastos",
    getEntries: () => {
      return _.filter(this.entryProvider.getExpensesLocal(), (e:Expense) => e.fromAccount.id == this.account.key);
    },
    badgeColor: 'primary',
    elementTitle: (expense: Expense) => {
      return expense.category.name + " > " + expense.category.subcategory.name;
    },
    sliderOptions: null,
    currentDate: new Date(),
    getImage: (expense: Expense) => {
      if(expense.category.subcategory.img){
        return expense.category.subcategory.img;
      }else{
        return "assets/imgs/categories/png/signs.png";
      }
    }
  };
  @ViewChild('incomesList') incomesList: EntryListComponent<Income>;
  incomeOptions: EntryListOptions<Income> = {
    noElementsText: "No existen entradas",
    getEntries: () => {
      return _.filter(this.entryProvider.getIncomesLocal(), (e:Income) => e.toAccount.id == this.account.key);
    },
    badgeColor: 'secondary',
    elementTitle: (income: Income) => {
      return income.category.name;
    },
    sliderOptions: null,
    currentDate: new Date(),
    getImage: (income: Income) => income.category.img
  };


  constructor(public navCtrl: NavController, public navParams: NavParams,
    private entryProvider: EntryProvider) {
  }

  ionViewDidLoad() {
    this.account = this.navParams.get("account");
    let month: number = moment(new Date()).month();
    let year: number = moment(new Date()).year();
    this.date = new Date(year, month, 1);
    this.setNewDate(this.date);
  }

  segmentChanged() {
    setTimeout(() => {
      this.setNewDate(this.date);
    }, 10);
  }

  private setNewDate(date: Date) {
    this.title = moment(date).locale('es-mx').format('MMMM YYYY');

    if (this.expensesList) {
      this.expensesList.setEntries(date, this.entryProvider.getExpensesLocal());
    }

    if (this.incomesList) {
      this.incomesList.setEntries(date, this.entryProvider.getIncomesLocal());
    }
  }

  previous() {
    this.date = moment(this.date).subtract(1, 'month').toDate();
    this.setNewDate(this.date);
  }

  next() {
    this.date = moment(this.date).add(1, 'month').toDate();
    this.setNewDate(this.date);
  }

}
