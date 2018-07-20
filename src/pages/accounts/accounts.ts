import { Component } from '@angular/core';
import { NavController, NavParams, Loading, LoadingController } from 'ionic-angular';
import { AccountProvider } from '../../providers/account/account';
import { Account, AccountType } from '../../interfaces';
import * as _ from 'lodash';

@Component({
  selector: 'page-accounts',
  templateUrl: 'accounts.html',
})
export class AccountsPage {
  accounts: Account[];
  accountsChunk: any = [];

  constructor(public navCtrl: NavController, private accountProvider: AccountProvider,
    private loadingCtrl: LoadingController) {
  }

  ionViewDidLoad() {
    let loading: Loading = this.loadingCtrl.create();
    loading.present();

    this.accountProvider.getAllAccounts()
      .subscribe((accounts: Account[]) => {
        this.accounts = accounts;
        this.accountsChunk = _.chain(this.accounts)
          .groupBy((account: Account) => account.type)
          .map((value: Account[], key: string) => {

            return {
              title: this.getAccountTypeName(value[0].type),
              entries: value,
              totalValue: _.sumBy(value, v => v.currentBalance)
            };
          })
          .value();
        loading.dismiss();
      });
  }

  getAccountTypeName(type): string {
    switch (type) {
      case AccountType.Debit:
        return "Debito";
      case AccountType.Cash:
        return "Efectivo";
      case AccountType.Credit:
        return "Credito";
      case AccountType.Savings:
        return "Ahorros Ruben";
      case AccountType.SarahiSavings:
        return "Ahorros Sarahi";
    }
    return "";
  }

}
