import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { EntryListComponent, EntryListOptions } from '../../components/entry-list/entry-list';
import { Expense } from '../../interfaces';
import { ExpenseProvider } from '../../providers/expense/expense';
import { EntryProvider } from '../../providers/entry/entry';
import moment from 'moment';

@IonicPage()
@Component({
  selector: 'page-expenses',
  templateUrl: 'expenses.html',
})
export class ExpensesPage {
  private date: Date;
  title: string;

  constructor(public navCtrl: NavController, private entryProvider: EntryProvider
    , private expenseProvider: ExpenseProvider) {
  }

  @ViewChild('expensesList') expensesList: EntryListComponent<Expense>;
  expenseOptions: EntryListOptions<Expense> = {
    noElementsText: "No existen gastos",
    getEntries: () => {
      return this.entryProvider.getExpensesLocal();
    },
    badgeColor: 'danger',
    elementTitle: (expense: Expense) => {
      return expense.category.name + " > " + expense.category.subcategory.name;
    },
    sliderOptions: [
      {
        text: "Eliminar",
        color: "expense",
        icon: "close-circle",
        callbackMethod: (expense: Expense) => {
          return new Promise<void>((resolve, reject) => {
            this.expenseProvider.deleteExpense(expense)
              .then(() => {
                resolve();
              });
          });
        }
      }
    ],
    currentDate: new Date(),
    getImage: (expense: Expense) => {
      if (expense.category.subcategory.img) {
        return expense.category.subcategory.img;
      } else {
        return "assets/imgs/categories/png/signs.png";
      }
    }
  };



  ionViewDidLoad() {
    let month: number = moment(new Date()).month();
    let year: number = moment(new Date()).year();
    this.date = new Date(year, month, 1);
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

  private setNewDate(date: Date) {
    this.title = moment(date).locale('es-mx').format('MMMM YYYY');
    this.expensesList.setEntries(date, this.entryProvider.getExpensesLocal());
  }

}
