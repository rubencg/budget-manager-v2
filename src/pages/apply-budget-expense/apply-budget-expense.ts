import { Component } from '@angular/core';
import { IonicPage, NavParams, ModalController, ViewController } from 'ionic-angular';
import { Expense, BudgetExpense, Account } from '../../interfaces';
import { EditAmountComponent } from '../../components/edit-amount/edit-amount';
import moment from 'moment';
import { DatePicker } from '@ionic-native/date-picker';
import { EditAccountComponent } from '../../components/edit-account/edit-account';

@IonicPage()
@Component({
  selector: 'page-apply-budget-expense',
  templateUrl: 'apply-budget-expense.html',
})
export class ApplyBudgetExpensePage {
  date: Date = new Date();
  account: Account;
  expense: Expense;
  dateString: string;
  amount: string = "0";
  budgetExpense: BudgetExpense;

  constructor(public navParams: NavParams, private datePicker: DatePicker,
    private modalCtrl: ModalController, private viewCtrl: ViewController) {
  }

  ionViewDidLoad() {
    this.expense = this.navParams.get("expense");
    this.budgetExpense = this.navParams.get("budgetExpense");
    this.amount = this.budgetExpense.amount.toString();
    this.setDate(new Date());
  }

  showDatePicker(){
    this.datePicker.show({
      date: this.date,
      mode: 'date',
      androidTheme: 4
    }).then(
      date => {
        this.date = date;
        this.setDate(date);
      },
      err => console.log('Error occurred while getting date: ', err)
    );
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

  setDate(date: Date){
    this.dateString = moment(date).locale('es').format('ddd, DD MMMM YYYY');
  }

  dismiss(){
    this.viewCtrl.dismiss();
  }

  save(){
    this.expense.amount = +this.amount;
    this.expense.fromAccount = {
      id: this.account.key,
      img: this.account.img,
      name: this.account.name
    };
    this.expense.date = moment(this.date).format('x');
    this.expense.category = this.budgetExpense.category;

    this.viewCtrl.dismiss({
      expense: this.expense,
      budgetExpense: this.budgetExpense
    });
  }

  editFromAccount(){
    let modal = this.modalCtrl.create(EditAccountComponent);

    modal.onDidDismiss((account: Account) => {
      if(account){
        this.account = {
          key: account.key,
          img: account.img,
          name: account.name,
          currentBalance: account.currentBalance
        };
      }
    });

    modal.present();
  }

}
