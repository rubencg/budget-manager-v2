import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import moment from 'moment';
import { EntryListComponent, EntryListOptions } from '../../components/entry-list/entry-list';
import { Income, Expense, BudgetExpense, Account, EntryType, Transfer } from '../../interfaces';
import { EntryProvider } from '../../providers/entry/entry';
import _ from 'lodash';
import { AccountProvider } from '../../providers/account/account';
import { EditEntryOptions, EditEntryPage } from '../edit-entry/edit-entry';
import { IncomeProvider } from '../../providers/income/income';
import { ExpenseProvider } from '../../providers/expense/expense';
import { TransferProvider } from '../../providers/transfer/transfer';

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
  expenseOptions: EntryListOptions<Expense> = {
    noElementsText: "No existen gastos",
    getEntries: () => {
      return _.filter(this.entryProvider.getExpensesLocal(), (e: Expense) => e.fromAccount.id == this.account.key);
    },
    badgeColor: 'primary',
    elementTitle: (expense: Expense) => {
      return expense.category.name + " > " + expense.category.subcategory.name;
    },
    sliderOptions: null,
    currentDate: new Date(),
    getImage: (expense: Expense) => {
      if (expense.category.subcategory.img) {
        return expense.category.subcategory.img;
      } else {
        return "assets/imgs/categories/png/signs.png";
      }
    }
  };
  @ViewChild('incomesList') incomesList: EntryListComponent<Income>;
  incomeOptions: EntryListOptions<Income> = {
    noElementsText: "No existen entradas",
    getEntries: () => {
      return _.filter(this.entryProvider.getIncomesLocal(), (e: Income) => e.toAccount.id == this.account.key);
    },
    badgeColor: 'secondary',
    elementTitle: (income: Income) => {
      return income.category.name;
    },
    sliderOptions: null,
    currentDate: new Date(),
    getImage: (income: Income) => income.category.img
  };
  @ViewChild('transferList') transferList: EntryListComponent<Transfer>;
  transferOptions: EntryListOptions<Transfer> = {
    noElementsText: "No existen transferencias",
    getEntries: () => {
      return _.filter(this.transferProvider.getLocalTransfers(), (e: Transfer) => e.toAccount.id == this.account.key || e.fromAccount.id == this.account.key);
    },
    badgeColor: 'secondary',
    elementTitle: (transfer: Transfer) => {
      let account: Account = this.navParams.get("account");

      return account.key == transfer.toAccount.id ? transfer.fromAccount.name : transfer.toAccount.name;
    },
    sliderOptions: null,
    currentDate: new Date(),
    getImage: (transfer: Transfer) => {
      let account: Account = this.navParams.get("account");

      return account.key == transfer.toAccount.id ? transfer.fromAccount.img : transfer.toAccount.img;
    },
    account: this.navParams.get("account")
  };


  constructor(public navCtrl: NavController, public navParams: NavParams, private expenseProvider: ExpenseProvider,
    private entryProvider: EntryProvider, private accountProvider: AccountProvider, private transferProvider: TransferProvider,
    private modalCtrl: ModalController, private incomeProvider: IncomeProvider) {
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

  transferSelected(transfer: Transfer){

  }

  incomeSelected(income: Income) {
    let initialAccount: Account = this.accountProvider.getAccountById(income.toAccount.id);
    let initialAmount: number = income.amount;
    let options: EditEntryOptions = {
      account: income.toAccount,
      amount: income.amount,
      date: moment(new Date(+income.date)).toDate(),
      entryType: EntryType.Income,
      notes: income.notes,
      category: income.category,
      $key: income.key,
      showIncomeButton: !income.isApplied
    };
    let modal = this.modalCtrl.create(EditEntryPage, {
      options: options
    });

    modal.onDidDismiss((data: EditEntryOptions) => {
      if (data) {
        if (data.applyIncome) {
          this.incomeProvider.applyIncome(income);
        } else {
          let newIncome: Income = {
            date: moment(data.date).format('x'),
            amount: data.amount,
            category: {
              id: data.category.id,
              name: data.category.name,
              subcategory: null,
              img: data.category.img
            },
            notes: data.notes,
            toAccount: data.account
          };

          this.incomeProvider.updateIncome(income.key, newIncome)
            .then(() => {
              this.setNewDate(this.date);

              if (initialAccount.key != newIncome.toAccount.id) {
                this.accountProvider.updateBalance(initialAccount.key, initialAccount.currentBalance - initialAmount);
                let newAccount: Account = this.accountProvider.getAccountById(newIncome.toAccount.id);
                this.accountProvider.updateBalance(newAccount.key, newAccount.currentBalance + newIncome.amount);
              } else if (initialAmount != newIncome.amount) {
                this.accountProvider.updateBalance(initialAccount.key, initialAccount.currentBalance - (initialAmount - newIncome.amount));
              }
            });
        }
      }
    });

    modal.present();
  }

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

  private setNewDate(date: Date) {
    this.title = moment(date).locale('es-mx').format('MMMM YYYY');

    if (this.expensesList) {
      let entries = _.chain(this.entryProvider.getExpensesLocal())
        .filter((e: Expense) => e.fromAccount.id == this.account.key)
        .value();
      this.expensesList.setEntries(date, entries);
    }

    if (this.incomesList) {
      let entries = _.chain(this.entryProvider.getIncomesLocal())
        .filter((e: Income) => e.toAccount.id == this.account.key)
        .value();
      this.incomesList.setEntries(date, entries);
    }

    if (this.transferList) {
      let entries = _.chain(this.transferProvider.getLocalTransfers())
        .filter((e: Transfer) => e.toAccount.id == this.account.key || e.fromAccount.id == this.account.key)
        .value();
      this.transferList.setEntries(date, entries);
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
