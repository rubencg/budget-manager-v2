import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { EntryProvider } from '../../providers/entry/entry';
import moment from 'moment';
import { BudgetExpense } from '../../interfaces';
import { EntryListComponent, EntryListOptions } from '../../components/entry-list/entry-list';
import { BudgetExpenseProvider } from '../../providers/budget-expense/budget-expense';


@IonicPage()
@Component({
  selector: 'page-budget-expenses',
  templateUrl: 'budget-expenses.html',
})
export class BudgetExpensesPage {
  private date: Date;
  title: string;

  constructor(public navCtrl: NavController, private entryProvider: EntryProvider
    , private budgetExpenseProvider: BudgetExpenseProvider) {
  }

  @ViewChild('budgetExpensesList') budgetExpensesList : EntryListComponent<BudgetExpense>;
  budgetExpenseOptions: EntryListOptions<BudgetExpense> = {
    noElementsText: "No existen gastos proyectados",
    getEntries: () => {
      return this.entryProvider.getBudgetExpensesLocal();
    },
    badgeColor: 'primary',
    elementTitle: (expense: BudgetExpense) => {
      return expense.category.name + " > " + expense.category.subcategory.name;
    },
    sliderOptions: [
      {
        text: "Eliminar",
        color: "expense",
        icon: "close-circle",
        callbackMethod: (expense: BudgetExpense) => {
          return new Promise<void>((resolve, reject) => {
            this.budgetExpenseProvider.deleteBudgetExpense(expense.key)
              .then(() => {
                resolve();
              });
          });
        }
      },
      // {
      //   text: "Aplicar",
      //   color: "budget",
      //   icon: "checkmark-circle",
      //   callbackMethod: (b: BudgetExpense) => {

      //     // return new Promise<void>((resolve, reject) => {
      //     //   let e: Expense ={
      //     //     amount: b.amount,
      //     //     category: b.category,
      //     //     date: b.date,
      //     //     fromAccount: null,
      //     //     notes: null
      //     //   };

      //       // let modal = this.modalCtrl.create(ApplyBudgetExpensePage, {
      //       //   expense: e,
      //       //   budgetExpense: b
      //       // })
      //     //   let callback: firebase.Promise<void>;
      //     //   modal.present();
      //     //   modal.onDidDismiss(d => {
      //     //     if(d){
      //     //       let budgetExpense: BudgetExpense = d.budgetExpense;
      //     //       this.budgetExpensesService.deleteBudgetExpense(budgetExpense.$key)
      //     //         .then(() => {
      //     //           this.expensesService.saveExpense(d.expense);
      //     //         });
      //     //     }
      //     //     resolve();
      //     //   });

      //     //   return callback;
      //     // });
      //   }
      // }
    ],
    currentDate: new Date(),
    getImage: (budget: BudgetExpense) => {
      if(budget.category.subcategory.img){
        return budget.category.subcategory.img;
      }else{
        return "img/categories/png/signs.png";
      }
    }
  };

  budgetExpenseSelected(budgetExpense: BudgetExpense): void{

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
    this.budgetExpensesList.setEntries(date, this.entryProvider.getBudgetExpensesLocal());
  }

}
