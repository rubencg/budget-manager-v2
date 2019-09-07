import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, Loading, AlertController, ToastController } from 'ionic-angular';
import { DatePicker } from '@ionic-native/date-picker';
import * as moment from 'moment';
import { Expense, EntryType, Category, IdNameBasic, CategoryBasic, Account, Income, BudgetExpense } from '../../interfaces';
import { ExpenseProvider } from '../../providers/expense/expense';
import { IncomeProvider } from '../../providers/income/income';
import { BudgetExpenseProvider } from '../../providers/budget-expense/budget-expense';

@IonicPage()
@Component({
  selector: 'page-select-date',
  templateUrl: 'select-date.html',
})
export class SelectDatePage {
  result: number;
  notes: string;
  entryType: EntryType;
  date: Date = moment().toDate();
  title: string;
  loadingScreen: Loading;
  repeatTimes: number;

  constructor(public navCtrl: NavController, public navParams: NavParams, private datePicker: DatePicker,
    private loadingCtrl: LoadingController, private alertCtrl: AlertController,
    private expenseProvider: ExpenseProvider, private toastCtrl: ToastController,
    private incomeProvider: IncomeProvider, private budgetExpenseProvider: BudgetExpenseProvider) {
  }

  ionViewDidLoad() {
    this.notes = "";
    this.result = this.navParams.get('result');
    this.entryType = this.navParams.get('entryType');
    this.loadingScreen = this.loadingCtrl.create({
      content: 'Guardando...'
    });
  }

  saveEntry(): void {
    this.loadingScreen.present();
    if (this.entryType == EntryType.Expense && moment(this.date).isAfter(new Date())) {
      this.showAlert("La fecha de un gasto no puede ser mayor a la de hoy. ¿Quieres agregar un gasto presupuestado acaso?");

      return;
    }

    let paramCategory: Category = this.navParams.get("category");
    let paramSubCategory: IdNameBasic = this.navParams.get("subcategory");
    let paramAccount: Account = this.navParams.get("account");

    let subcategory;
    if (paramSubCategory) {
      subcategory = {
        id: paramSubCategory.id,
        name: paramSubCategory.name,
        img: paramSubCategory.img
      };
    }

    let category: CategoryBasic = {
      id: paramCategory.key.toString(),
      name: paramCategory.name,
      subcategory: subcategory,
      img: paramCategory.img
    };

    let account: IdNameBasic;
    if (paramAccount) {
      account = {
        id: paramAccount.key,
        name: paramAccount.name,
        img: paramAccount.img
      };
    }
    let momentDate = moment(this.date);

    if (this.entryType == EntryType.Income) {
      let i: Income = {
        amount: +this.navParams.data.result,
        category: {
          id: paramCategory.key.toString(),
          name: paramCategory.name,
          subcategory: null,
          img: paramCategory.img
        },
        date: momentDate.format('x'),
        toAccount: account,
        notes: this.notes,
        isApplied: false
      };

      this.navCtrl.popToRoot()
        .then(() => {
          this.incomeProvider.saveIncome(i)
            .then(() => {
              this.close();
            });
        });
    } else if (this.entryType == EntryType.BudgetExpense) {
      let date = momentDate;
      if (this.repeatTimes > 1) {
        let budgetExpense: BudgetExpense = {
          amount: +this.navParams.data.result,
          category: category,
          date: date.format('x'),
          notes: this.notes
        }
        let times: number = this.repeatTimes;

        for (let index = 0; index < times; index++) {
          if(index > 0) date.add(7, 'days');
          
          budgetExpense.date = moment(date).format('x');
          if (index < times - 1) {
            this.budgetExpenseProvider.saveBudgetExpense(budgetExpense);
          }
        }
      }

      let e: BudgetExpense = {
        amount: +this.navParams.data.result,
        category: category,
        date: date.format('x'),
        notes: this.notes
      }

      this.navCtrl.popToRoot()
        .then(() => {
          this.budgetExpenseProvider.saveBudgetExpense(e)
            .then(() => {
              this.close();
            });
        });
    } else {
      let e: Expense = {
        amount: +this.navParams.data.result,
        category: category,
        date: momentDate.format('x'),
        fromAccount: account,
        notes: this.notes
      };

      this.navCtrl.popToRoot()
        .then(() => {
          this.expenseProvider.saveExpense(e)
            .then(() => {
              this.close();
            });
        });
    }


  }

  close() {
    this.loadingScreen.dismiss();
    this.presentToast("Elemento guardado");
  }

  presentToast(msg: string) {
    let toast = this.toastCtrl.create({
      message: msg,
      duration: 3000,
      position: 'bottom'
    });

    toast.present();
  }

  showDatePicker() {
    this.datePicker.show({
      date: this.date,
      mode: 'date',
      androidTheme: 4
    }).then(
      date => { this.date = date; },
      err => console.log('Error occurred while getting date: ', err)
    );
  }

  showAlert(message: string) {
    let alert = this.alertCtrl.create({
      title: 'Error!',
      message: message,
      buttons: [
        {
          text: 'Cancelar',
          handler: data => {
            this.loadingScreen.dismiss();
          }
        },
        {
          text: 'Si, cambiar',
          handler: data => {
            this.entryType = EntryType.BudgetExpense;
          }
        }
      ]
    });
    alert.present();
  }

}
