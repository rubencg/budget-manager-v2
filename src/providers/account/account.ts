import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AngularFireDatabase } from 'angularfire2/database';
import { Account } from '../../interfaces';
import * as _ from 'lodash';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';

@Injectable()
export class AccountProvider {
  private accountsUrl: string;
  private accountRef: Observable<any[]>;
  accounts: Account[];

  constructor(private db: AngularFireDatabase) {
    this.accountsUrl = 'accounts/';

    this.accountRef = db.list(this.accountsUrl).snapshotChanges().map(changes => {
      return changes.map(c => ({ key: c.payload.key, ...c.payload.val() }));
    });
  }

  getAllAccounts(): Observable<Account[]> {
    this.accountRef.subscribe(a => {
      this.accounts = a;
    });

    return this.accountRef;
  }

  getAccountsLocal(): Account[] {
    return this.accounts;
  }

  getAccountById(id: string): Account {
    return _.chain(this.accounts)
      .filter((a: Account) => a.$key == id)
      .value()[0];
  }

  updateBalance($key: string, newBalance: number) {
    this.db.list('/accounts')
      .update($key, {
        currentBalance: newBalance
      });
  }

  createNewAccount(account: Account) {
    this.db.list(this.accountsUrl).push(account);
  }

}
