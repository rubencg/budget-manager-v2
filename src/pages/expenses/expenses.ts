import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, ModalController } from 'ionic-angular';
import { EntryListComponent, EntryListOptions } from '../../components/entry-list/entry-list';
import { Expense, Account, EntryType } from '../../interfaces';
import { ExpenseProvider } from '../../providers/expense/expense';
import { EntryProvider } from '../../providers/entry/entry';
import moment from 'moment';
import { AccountProvider } from '../../providers/account/account';
import { EditEntryOptions, EditEntryPage } from '../edit-entry/edit-entry';

@IonicPage()
@Component({
  selector: 'page-expenses',
  templateUrl: 'expenses.html',
})
export class ExpensesPage {
  private date: Date;
  title: string;

  constructor(public navCtrl: NavController, private entryProvider: EntryProvider
    , private expenseProvider: ExpenseProvider, private accountProvider: AccountProvider,
    private modalCtrl: ModalController) {
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

  expenseSelected(expense: Expense): void {
    let initialAccount: Account = this.accountProvider.getAccountById(expense.fromAccount.id);
    let initialAmount: number = expense.amount;
    let options: EditEntryOptions = {
      account: expense.fromAccount,
      amount: expense.amount,
      date: moment(new Date(+expense.date)).toDate(),
      entryType: EntryType.Expense,
      notes: expense.notes,
      category: expense.category,
      $key: expense.key,
      showIncomeButton: false
    };
    let modal = this.modalCtrl.create(EditEntryPage, {
      options: options
    });

    modal.onDidDismiss((data: EditEntryOptions) => {
      if (data) {
        let newExpense: Expense = {
          date: moment(data.date).format('x'),
          amount: data.amount,
          category: {
            id: data.category.id,
            name: data.category.name,
            subcategory: {
              id: data.category.subcategory.id,
              name: data.category.subcategory.name,
              img: data.category.subcategory.img
            },
            img: data.category.img
          },
          notes: data.notes,
          fromAccount: data.account
        };
        console.log(newExpense);

        this.expenseProvider.updateExpense(expense.key, newExpense)
          .then(() => {
            this.setNewDate(this.date);

            if (initialAccount.key != newExpense.fromAccount.id) {
              this.accountProvider.updateBalance(initialAccount.key, initialAccount.currentBalance + initialAmount);
              let newAccount: Account = this.accountProvider.getAccountById(newExpense.fromAccount.id);
              this.accountProvider.updateBalance(newAccount.key, newAccount.currentBalance - newExpense.amount);
            } else if (initialAmount != newExpense.amount) {
              this.accountProvider.updateBalance(initialAccount.key, initialAccount.currentBalance + (initialAmount - newExpense.amount));
            }
          });
      }
    });

    modal.present();
  }

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
