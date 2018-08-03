import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, ViewController } from 'ionic-angular';
import moment from 'moment';
import { Account } from '../../interfaces';
import { EditAmountComponent } from '../../components/edit-amount/edit-amount';
import { EditAccountComponent } from '../../components/edit-account/edit-account';

@IonicPage()
@Component({
  selector: 'page-add-transfer',
  templateUrl: 'add-transfer.html',
})
export class AddTransferPage {
  amount: number = 0;
  date: Date = new Date();
  dateString: string;
  originAccount: Account;
  destinationAccount: Account;

  constructor(public navCtrl: NavController, public navParams: NavParams, private modalCtrl: ModalController,
    private viewCtrl: ViewController) {
  }

  ionViewDidLoad() {
    this.dateString = moment(this.date).locale('es').format('ddd, DD MMMM YYYY');
  }

  editAmount(amount: number){
    let modal = this.modalCtrl.create(EditAmountComponent, {
      amount: amount
    });

    modal.onDidDismiss(data => {
      if(data){
        this.amount = data.amount;
      }
    });

    modal.present();
  }

  editFromAccount(){
    let modal = this.modalCtrl.create(EditAccountComponent);

    modal.onDidDismiss((account: Account) => {
      if(account){
        this.originAccount = {
          key: account.key,
          img: account.img,
          name: account.name,
          currentBalance: account.currentBalance
        };
      }
    });

    modal.present();
  }

  editToAccount(){
    let modal = this.modalCtrl.create(EditAccountComponent);

    modal.onDidDismiss((account: Account) => {
      if(account){
        this.destinationAccount = {
          key: account.key,
          img: account.img,
          name: account.name,
          currentBalance: account.currentBalance
        };
      }
    });

    modal.present();
  }

  cancel(){
     this.viewCtrl.dismiss();
  }

  save(){
    this.viewCtrl.dismiss({
      originAccount: this.originAccount,
      destinationAccount: this.destinationAccount,
      amount: this.amount
    });
  }

}
