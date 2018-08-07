import { Component, ViewChild } from '@angular/core';
import { NavController, AlertController, Loading, LoadingController } from 'ionic-angular';
import { AuthProvider } from '../../providers/auth/auth';
import { LoginPage } from '../login/login';
import { AccountProvider } from '../../providers/account/account';
import { Account, Expense, Income, BudgetExpense } from '../../interfaces';
import { CategoryProvider } from '../../providers/category/category';
import { EndOfTheMonthComponent } from '../../components/end-of-the-month/end-of-the-month';
import _ from 'lodash';
import moment from 'moment';
import { EntryProvider } from '../../providers/entry/entry';
import { TransferProvider } from '../../providers/transfer/transfer';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  @ViewChild('endOfMonth') endOfMonth:EndOfTheMonthComponent;
  private loading: Loading;

  constructor(public navCtrl: NavController, private authProvider: AuthProvider, private accountProvider: AccountProvider,
    private alertCtrl: AlertController, private loadingCtrl: LoadingController, private categoryProvider:CategoryProvider,
    private entryProvider: EntryProvider, private transferProvider: TransferProvider) {
    this.loading = this.loadingCtrl.create();
    this.loading.present();

    this.categoryProvider.getAllExpenseCategories();
    this.categoryProvider.getAllIncomeCategories();
    this.loadAccounts();
    this.loadIncomes();
    this.loadBudgets();
    this.loadExpenses();
    this.transferProvider.getAllTransfers();
  }

  loadAccounts(){
    this.accountProvider.getAllAccounts()
      .subscribe((items : Account[]) => {
        this.endOfMonth.setMoneyLeft(items, this.entryProvider.getIncomesLocal(), this.entryProvider.getBudgetExpensesLocal());
    });
  }

  loadIncomes(){
    this.entryProvider.getAllIncomes()
      .subscribe((items: Income[]) => {
        this.endOfMonth.setMoneyLeft(this.accountProvider.getAccountsLocal(), items, this.entryProvider.getBudgetExpensesLocal());
        _.chain(items)
          .filter((e: Income) => moment(new Date(+e.date)).isSame(new Date(), 'month') )
          .sumBy('amount')
          .value();
      })
  }

  loadExpenses(){
    this.entryProvider.getAllExpenses()
      .subscribe((items: Expense[]) => {
        this.loading.dismiss();
      })
  }

  loadBudgets(){
    this.entryProvider.getAllBudgetExpenses()
      .subscribe((items: BudgetExpense[]) => {
        this.endOfMonth.setMoneyLeft(this.accountProvider.getAccountsLocal(), this.entryProvider.getIncomesLocal(), items);
      })
  }

  logout(): void {
    this.authProvider.logoutUser()
      .then(loggedOut => {
        if (loggedOut) {
          this.navCtrl.setRoot(LoginPage);
        }
      })
      .catch(error => {
        let alert = this.alertCtrl.create({
          title: "Error",
          message: error,
          buttons: ['Ok']
        });
        alert.present();
      });
  }
}
