import { Component, OnInit, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AccountProvider } from '../../providers/account/account';
import { Account } from '../../interfaces';
import { ElementSelectComponent } from '../../components/element-select/element-select';
import { SelectCategoryPage } from '../select-category/select-category';

@IonicPage()
@Component({
  selector: 'page-select-account',
  templateUrl: 'select-account.html',
})
export class SelectAccountPage {
  
  @ViewChild('elementSelect') elementSelect: ElementSelectComponent;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    private accountProvider: AccountProvider) {

  }

  ionViewDidLoad() {
    let accounts = this.accountProvider.getAccountsLocal();
    this.elementSelect.loadElements(accounts);
  }

  accountSelected(selectedAccount: Account) {
    this.navCtrl.push(SelectCategoryPage, {
      result: this.navParams.get('result'),
      entryType: this.navParams.get('entryType'),
      account: selectedAccount
    });

  }

}
