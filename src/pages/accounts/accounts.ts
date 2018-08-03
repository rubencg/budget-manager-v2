import { Component } from '@angular/core';
import { NavController, NavParams, ModalController } from 'ionic-angular';
import { AccountProvider } from '../../providers/account/account';
import { Account, AccountType } from '../../interfaces';
import * as _ from 'lodash';
import moment from 'moment';
import { ExpensesByCategoryPage } from '../expenses-by-category/expenses-by-category';
import { TransferProvider } from '../../providers/transfer/transfer';
import { AddTransferPage } from '../add-transfer/add-transfer';
import { initDomAdapter } from '../../../node_modules/@angular/platform-browser/src/browser';

@Component({
  selector: 'page-accounts',
  templateUrl: 'accounts.html',
})
export class AccountsPage {
  accounts: Account[];
  accountsChunk: any = [];

  constructor(public navCtrl: NavController, private accountProvider: AccountProvider,
    private modalCtrl: ModalController, private transferProvider: TransferProvider) {
  }

  ionViewWillEnter() {
    this.init();
  }

  init(){
    this.accounts = this.accountProvider.getAccountsLocal();
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
  }

  accountSelected(account: Account){
    this.navCtrl.push(ExpensesByCategoryPage, {
      account: account
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

  transfer(){
    let modal = this.modalCtrl.create(AddTransferPage);

    modal.onDidDismiss((data: TransferData) => {
      if(data){
        let newOriginBalance: number = data.originAccount.currentBalance - data.amount;
        this.accountProvider.updateBalance(data.originAccount.key, newOriginBalance);

        let newDestinationBalance: number = data.destinationAccount.currentBalance + data.amount;
        this.accountProvider.updateBalance(data.destinationAccount.key, newDestinationBalance);

        this.transferProvider.saveTransfer({
          amount: data.amount,
          date: moment(new Date()).format('x'),
          fromAccount: {
            id: data.originAccount.key,
            img: data.originAccount.img,
            name: data.originAccount.name
          },
          toAccount: {
            id: data.destinationAccount.key,
            img: data.destinationAccount.img,
            name: data.destinationAccount.name
          }
        }).then(() => this.init());
      }
    });

    modal.present();

  }

}

interface TransferData{
  originAccount: Account;
  destinationAccount: Account;
  amount: number;
}
