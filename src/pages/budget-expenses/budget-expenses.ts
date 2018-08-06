import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { EntryProvider } from '../../providers/entry/entry';
import moment from 'moment';
import { BudgetExpense, Expense, EntryType } from '../../interfaces';
import { EntryListComponent, EntryListOptions } from '../../components/entry-list/entry-list';
import { BudgetExpenseProvider } from '../../providers/budget-expense/budget-expense';
import { ApplyBudgetExpensePage } from '../apply-budget-expense/apply-budget-expense';
import { ExpenseProvider } from '../../providers/expense/expense';
import { EditEntryOptions, EditEntryPage } from '../edit-entry/edit-entry';


@IonicPage()
@Component({
  selector: 'page-budget-expenses',
  templateUrl: 'budget-expenses.html',
})
export class BudgetExpensesPage {
  private date: Date;
  title: string;

  constructor(public navCtrl: NavController, private entryProvider: EntryProvider, private expenseProvider: ExpenseProvider
    , private budgetExpenseProvider: BudgetExpenseProvider, private modalCtrl: ModalController) {
  }

  @ViewChild('budgetExpensesList') budgetExpensesList: EntryListComponent<BudgetExpense>;
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
      {
        text: "Aplicar",
        color: "budget",
        icon: "checkmark-circle",
        callbackMethod: (b: BudgetExpense) => {

          return new Promise<void>((resolve, reject) => {
            let e: Expense = {
              amount: b.amount,
              category: b.category,
              date: b.date,
              fromAccount: null,
              notes: null
            };

            let modal = this.modalCtrl.create(ApplyBudgetExpensePage, {
              expense: e,
              budgetExpense: b
            });

            modal.present();
            modal.onDidDismiss(data => {
              if (data) {
                let budgetExpense: BudgetExpense = data.budgetExpense;
                this.budgetExpenseProvider.deleteBudgetExpense(budgetExpense.key)
                  .then(() => {
                    this.expenseProvider.saveExpense(data.expense);
                    this.setNewDate(this.date);
                  });
              }
              resolve();
            });

          });
        }
      }
    ],
    currentDate: new Date(),
    getImage: (budget: BudgetExpense) => {
      if (budget.category.subcategory.img) {
        return budget.category.subcategory.img;
      } else {
        return "img/categories/png/signs.png";
      }
    }
  };

  budgetExpenseSelected(budgetExpense: BudgetExpense): void {
    let options: EditEntryOptions = {
      account: null,
      amount: budgetExpense.amount,
      date: moment(new Date(+budgetExpense.date)).toDate(),
      entryType: EntryType.BudgetExpense,
      notes: budgetExpense.notes,
      category: budgetExpense.category,
      $key: budgetExpense.key,
      showIncomeButton: false
    };
    let modal = this.modalCtrl.create(EditEntryPage, {
      options: options
    });

    modal.onDidDismiss((data: EditEntryOptions) => {
      if(data){
        let be: BudgetExpense = {
          date: moment(data.date).format('x'),
          amount: data.amount,
          category: {
            id: data.category.id,
            name: data.category.name,
            subcategory: {
              id: data.category.subcategory.id,
              name: data.category.subcategory.name,
              img: data.category.subcategory.img
            },
            img: data.category.img
          },
          notes: data.notes
        };

        this.budgetExpenseProvider.updateBudgetExpense(budgetExpense.key, be)
          .then(() => {
            this.setNewDate(this.date);
          });
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
    this.budgetExpensesList.setEntries(date, this.entryProvider.getBudgetExpensesLocal());
  }

}
