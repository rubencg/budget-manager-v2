import { Component, ViewChild, OnInit } from '@angular/core';
import { ViewController } from 'ionic-angular';
import { ElementSelectComponent } from '../element-select/element-select';
import { AccountProvider } from '../../providers/account/account';
import _ from 'lodash';
import { Account } from '../../interfaces';

@Component({
  selector: 'edit-account',
  templateUrl: 'edit-account.html'
})
export class EditAccountComponent implements OnInit {

  @ViewChild('a') elementSelect: ElementSelectComponent;

  constructor(private accountsService: AccountProvider, private viewCtrl: ViewController) {

  }

  ngOnInit() {
    let elements = _.chain(this.accountsService.getAccountsLocal())
    .map(a => {
      return {
        key: a.key,
        name: a.name,
        img: a.img
      }
    })
    .value();
    this.elementSelect.loadElements(elements);
  }

  accountSelected(selectedAccount: Account) {
    let account:Account = _.chain(this.accountsService.getAccountsLocal())
      .filter((a :Account) => a.key == selectedAccount.key)
      .first()
      .value();

    this.viewCtrl.dismiss(account);
  }

  cancel() {
    this.viewCtrl.dismiss();
  }

}
