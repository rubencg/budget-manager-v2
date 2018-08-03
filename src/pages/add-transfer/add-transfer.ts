import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, ViewController, ToastController } from 'ionic-angular';
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
    private viewCtrl: ViewController, private toastCtrl:ToastController) {
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
    if(!this.originAccount)
    {
      this.toastCtrl.create({
        message: "Selecciona la cuenta origen",
        duration: 3
      }).present();
      return;
    }
    if(!this.destinationAccount)
    {
      this.toastCtrl.create({
        message: "Selecciona la cuenta destino",
        duration: 3
      }).present();
      return;
    }
    if(this.amount <= 0)
    {
      this.toastCtrl.create({
        message: "La cantidad tiene que ser mayor que 0",
        duration: 3
      }).present();
      return;
    }
    this.viewCtrl.dismiss({
      originAccount: this.originAccount,
      destinationAccount: this.destinationAccount,
      amount: this.amount
    });
  }

}
