import { AngularFireDatabase } from 'angularfire2/database';
import { Injectable } from '@angular/core';
import * as _ from 'lodash';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import { Expense, Account } from '../../interfaces';
import { AccountProvider } from '../account/account';

@Injectable()
export class ExpenseProvider {
  private expensesUrl: string;

  constructor(private db: AngularFireDatabase, private accountProvider: AccountProvider) {
    this.expensesUrl = 'expenses/';
  }

  saveExpense(expense: Expense): firebase.database.ThenableReference {
    let returnType = this.db.list(this.expensesUrl).push(expense);
    returnType.then(() => {
      let account: Account = _.chain(this.accountProvider.getAccountsLocal())
        .filter((a: Account) => a.key == expense.fromAccount.id)
        .value()[0];

      if (account) {
        let newBalance: number = account.currentBalance - expense.amount;
        this.accountProvider.updateBalance(account.key, newBalance);
      }
    });

    return returnType;
  }

  deleteExpense(expense: Expense): Promise<void> {
    let promise = this.db.list(this.expensesUrl).remove(expense.key);

    promise.then(() => {
      let account: Account = _.chain(this.accountProvider.getAccountsLocal())
        .filter((a: Account) => a.key == expense.fromAccount.id)
        .value()[0];

      if (account) {
        let newBalance: number = account.currentBalance + expense.amount;
        this.accountProvider.updateBalance(account.key, newBalance);
      }
    });

    return promise;
  }

  updateExpense(key: string, expense: Expense): Promise<void> {
    return this.db.list(this.expensesUrl)
      .update(key, {
        amount: expense.amount,
        date: expense.date,
        notes: expense.notes,
        category: expense.category,
        fromAccount: {
          id: expense.fromAccount.id,
          name: expense.fromAccount.name,
          img: expense.fromAccount.img
        }
      });
  }

}
