import { AngularFireDatabase } from 'angularfire2/database';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import { Expense, BudgetExpense, Income } from '../../interfaces';
import { AccountProvider } from '../account/account';

@Injectable()
export class EntryProvider {
  private expenseUrl: string;
  private incomeUrl: string;
  private budgetExpenseUrl: string;
  private expenseRef: Observable<any[]>;
  private incomeRef: Observable<any[]>;
  private budgetExpenseRef: Observable<any[]>;

  expenses: Expense[];
  incomes: Income[];
  budgetExpenses: BudgetExpense[];

  constructor(private db: AngularFireDatabase) {
    this.expenseUrl = 'expenses/';
    this.incomeUrl = 'incomes/';
    this.budgetExpenseUrl = 'budgetExpenses/';

    this.expenseRef = db.list(this.expenseUrl).snapshotChanges().map(changes => {
      return changes.map(c => ({ key: c.payload.key, ...c.payload.val() }));
    });
    this.incomeRef = db.list(this.incomeUrl).snapshotChanges().map(changes => {
      return changes.map(c => ({ key: c.payload.key, ...c.payload.val() }));
    });
    this.budgetExpenseRef = db.list(this.budgetExpenseUrl).snapshotChanges().map(changes => {
      return changes.map(c => ({ key: c.payload.key, ...c.payload.val() }));
    });
  }

  getAllExpenses(): Observable<Expense[]> {
    this.expenseRef.subscribe(a => {
      this.expenses = a;
    });

    return this.expenseRef;
  }

  getExpensesLocal(): Expense[] {
    return this.expenses;
  }

  getAllIncomes(): Observable<Income[]> {
    this.incomeRef.subscribe(a => {
      this.incomes = a;
    });

    return this.incomeRef;
  }

  getIncomesLocal(): Income[] {
    return this.incomes;
  }

  getAllBudgetExpenses(): Observable<BudgetExpense[]> {
    this.budgetExpenseRef.subscribe(a => {
      this.budgetExpenses = a;
    });

    return this.budgetExpenseRef;
  }

  getBudgetExpensesLocal(): BudgetExpense[] {
    return this.budgetExpenses;
  }

}
