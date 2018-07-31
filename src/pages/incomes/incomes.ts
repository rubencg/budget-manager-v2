import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { EntryListComponent, EntryListOptions } from '../../components/entry-list/entry-list';
import { Income } from '../../interfaces';
import { EntryProvider } from '../../providers/entry/entry';
import { IncomeProvider } from '../../providers/income/income';
import moment from 'moment';

@IonicPage()
@Component({
  selector: 'page-incomes',
  templateUrl: 'incomes.html',
})
export class IncomesPage {
  private date: Date;
  title: string;

  constructor(public navCtrl: NavController, private entryProvider: EntryProvider,
    private incomeProvider: IncomeProvider) {
  }

  @ViewChild('incomeList') incomeList : EntryListComponent<Income>;
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
