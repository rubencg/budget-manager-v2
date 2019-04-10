import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { EntryListComponent, EntryListOptions } from '../../components/entry-list/entry-list';
import { Income, Account, EntryType } from '../../interfaces';
import { EntryProvider } from '../../providers/entry/entry';
import { IncomeProvider } from '../../providers/income/income';
import moment from 'moment';
import { AccountProvider } from '../../providers/account/account';
import { EditEntryOptions, EditEntryPage } from '../edit-entry/edit-entry';

@IonicPage()
@Component({
  selector: 'page-incomes',
  templateUrl: 'incomes.html',
})
export class IncomesPage {
  private date: Date;
  title: string;

  constructor(public navCtrl: NavController, private entryProvider: EntryProvider,
    private incomeProvider: IncomeProvider, private accountProvider: AccountProvider,
    private modalCtrl: ModalController) {
  }

  @ViewChild('incomeList') incomeList: EntryListComponent<Income>;
  incomeOptions: EntryListOptions<Income> = {
    noElementsText: "No existen entradas",
    getEntries: () => {
      return this.entryProvider.getIncomesLocal();
    },
    badgeColor: 'secondary',
    elementTitle: (income: Income) => {
      return income.category.name;
    },
    sliderOptions: [
      {
        text: "Eliminar",
        color: "danger",
        icon: "close-circle",
        callbackMethod: (income: Income) => {
          return new Promise<void>((resolve, reject) => {
            this.incomeProvider.deleteIncome(income)
              .then(() => {
                resolve();
              });
          });
        }
      }
    ],
    currentDate: new Date(),
    getImage: (income: Income) => income.category.img
  };

  incomeSelected(income: Income): void {
    let initialAccount: Account = this.accountProvider.getAccountById(income.toAccount.id);
    let initialAmount: number = income.amount;
    let options: EditEntryOptions = {
      account: income.toAccount,
      amount: income.amount,
      date: moment(new Date(+income.date)).toDate(),
      entryType: EntryType.Income,
      notes: income.notes,
      category: income.category,
      $key: income.key,
      showIncomeButton: !income.isApplied
    };
    let modal = this.modalCtrl.create(EditEntryPage, {
      options: options
    });

    modal.onDidDismiss((data: EditEntryOptions) => {
      if (data) {
        if (data.applyIncome) {
          this.incomeProvider.applyIncome(income);
        } else {
          let newIncome: Income = {
            date: moment(data.date).format('x'),
            amount: data.amount,
            category: {
              id: data.category.id,
              name: data.category.name,
              subcategory: null,
              img: data.category.img
            },
            notes: data.notes,
            toAccount: data.account
          };

          this.incomeProvider.updateIncome(income.key, newIncome)
            .then(() => {
              this.setNewDate(this.date);
              if(data.applyIncome || income.isApplied){
                if (initialAccount.key != newIncome.toAccount.id) {
                  this.accountProvider.updateBalance(initialAccount.key, initialAccount.currentBalance - initialAmount);
                  let newAccount: Account = this.accountProvider.getAccountById(newIncome.toAccount.id);
                  this.accountProvider.updateBalance(newAccount.key, newAccount.currentBalance + newIncome.amount);
                } else if (initialAmount != newIncome.amount) {
                  this.accountProvider.updateBalance(initialAccount.key, initialAccount.currentBalance - (initialAmount - newIncome.amount));
                }
              }
            });
        }
      }
    });

    modal.present();
  }

  ionViewDidLoad() {
    let month: number = moment(new Date()).month();
    let year: number = moment(new Date()).year();
    this.date = new Date(year, month, 1);
    this.setNewDate(this.date);
  }

  previous() {
    this.date = moment(this.date).subtract(1, 'month').toDate();
    this.setNewDate(this.date);
  }

  next() {
    this.date = moment(this.date).add(1, 'month').toDate();
    this.setNewDate(this.date);
  }

  private setNewDate(date: Date) {
    this.title = moment(date).locale('es-mx').format('MMMM YYYY');
    this.incomeList.setEntries(date, this.entryProvider.getIncomesLocal());
  }

}
