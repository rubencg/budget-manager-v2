import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the AccountsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-accounts',
  templateUrl: 'accounts.html',
})
export class AccountsPage {

  accountsChunk: any =[
    {
      title: 'Debito',
      totalValue: 300,
      accounts: [
        {
          title: 'Debito Ruben',
          image: '../../assets/imgs/accounts/png/money-1.png',
          total: 100
        },{
          title: 'Debito Sarahi',
          image: '../../assets/imgs/accounts/png/money-1.png',
          total: 200
        },
      ]
    },
    {
      title: 'Efectivo',
      totalValue: 300,
      accounts: [
        {
          title: 'Efectivo Ruben',
          image: '../../assets/imgs/accounts/png/money-1.png',
          total: 100
        },{
          title: 'Efectivo Sarahi',
          image: '../../assets/imgs/accounts/png/money-1.png',
          total: 200
        },
      ]
    }
  ];

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {

  }

}
