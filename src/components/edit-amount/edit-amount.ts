import { Component, ViewChild } from '@angular/core';
import { CalculatorComponent } from '../calculator/calculator';
import { ViewController, NavParams } from 'ionic-angular';

@Component({
  selector: 'edit-amount',
  templateUrl: 'edit-amount.html'
})
export class EditAmountComponent {

  @ViewChild('calculator') calculator: CalculatorComponent;

  constructor(private viewCtrl: ViewController, private navParams: NavParams) {

  }

  ionViewDidLoad() {
    this.calculator.setResult(this.navParams.get("amount"));
  }

  cancel() {
    this.viewCtrl.dismiss();
  }

  saveAmount() {
    let amount: number = this.calculator.getResult();

    this.viewCtrl.dismiss({
      amount: amount
    });
  }

}
