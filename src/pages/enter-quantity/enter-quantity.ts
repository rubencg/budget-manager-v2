import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { SelectAccountPage } from '../select-account/select-account';
import { CalculatorComponent } from '../../components/calculator/calculator';

/**
 * Generated class for the EnterQuantityPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-enter-quantity',
  templateUrl: 'enter-quantity.html',
})
export class EnterQuantityPage {
  @ViewChild('calculator') calculator: CalculatorComponent;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {

  }

  saveAmount(){
    let result: number = this.calculator.getResult();

    // ToDo: Validate result

    this.navCtrl.push(SelectAccountPage, {
      result: result,
      entryType: this.navParams.get('entryType')
    });
  }

}
