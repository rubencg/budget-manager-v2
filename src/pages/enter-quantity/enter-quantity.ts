import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { SelectAccountPage } from '../select-account/select-account';
import { CalculatorComponent } from '../../components/calculator/calculator';
import { EntryType } from '../../interfaces';
import { SelectCategoryPage } from '../select-category/select-category';

@IonicPage()
@Component({
  selector: 'page-enter-quantity',
  templateUrl: 'enter-quantity.html',
})
export class EnterQuantityPage {
  @ViewChild('calculator') calculator: CalculatorComponent;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    private toastCtrl: ToastController) {
  }

  ionViewDidLoad() {

  }

  saveAmount(){
    let result: number = this.calculator.getResult();
    let entryType: EntryType = this.navParams.get('entryType');
    let goToPage: any;

    if(result <= 0){
      this.presentToast("Valor tiene que ser mayor a 0");
      return;
    }

    if(entryType == EntryType.BudgetExpense){
      goToPage = SelectCategoryPage;
    }else{
      goToPage = SelectAccountPage;
    }

    this.navCtrl.push(goToPage, {
      result: result,
      entryType: entryType
    });
  }

  presentToast(msg: string) {
    let toast = this.toastCtrl.create({
      duration: 3000,
      message: msg,
      position: 'bottom'
    });

    toast.present();
  }

}
