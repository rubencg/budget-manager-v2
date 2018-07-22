import { Component, OnInit, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AccountProvider } from '../../providers/account/account';
import { Account } from '../../interfaces';
import { HomePage } from '../home/home';
import { ElementSelectComponent } from '../../components/element-select/element-select';

@IonicPage()
@Component({
  selector: 'page-select-account',
  templateUrl: 'select-account.html',
})
export class SelectAccountPage {
  private accounts:Account[];
  @ViewChild('elementSelect') elementSelect:ElementSelectComponent;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    private accountProvider:AccountProvider) {
      
  }

  ionViewDidLoad() {
    this.elementSelect.loadElements(this.accountProvider.getAccountsLocal());    
  }

  accountSelected(selectedAccount: Account){
       console.log(selectedAccount);
       
    // this.navCtrl.push(HomePage, {
    //   result: this.navParams.get('result'),
    //   entryType: this.navParams.get('entryType'),
    //   account: selectedAccount
    // });
    
  }

}
