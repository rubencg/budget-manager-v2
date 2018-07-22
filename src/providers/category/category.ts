import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AngularFireDatabase } from 'angularfire2/database';
import * as _ from 'lodash';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import { Category, Income } from '../../interfaces';

@Injectable()
export class CategoryProvider {
  private expenseCategoryUrl: string;
  private expenseCategoryRef: Observable<any[]>;

  private incomeCategoryUrl: string;
  private incomeCategoryRef: Observable<any[]>;

  expenseCategories: Category[];
  incomeCategories: Category[];

  constructor(private db: AngularFireDatabase) {
    this.expenseCategoryUrl = 'expenseCategories/';
    this.incomeCategoryUrl = 'incomeCategories/';

    this.expenseCategoryRef = db.list(this.expenseCategoryUrl).snapshotChanges().map(changes => {
      return changes.map(c => ({ key: c.payload.key, ...c.payload.val() }));
    });

    this.incomeCategoryRef = db.list(this.incomeCategoryUrl).snapshotChanges().map(changes => {
      return changes.map(c => ({ key: c.payload.key, ...c.payload.val() }));
    });
  }

  getAllExpenseCategories(): Observable<Category[]> {
    this.expenseCategoryRef.subscribe(a => {
      this.expenseCategories = a;
    });
    return this.expenseCategoryRef;
  }

  getExpenseCategoriesLocal(): Category[] {
    return this.expenseCategories;
  }

  getAllIncomeCategories(): Observable<Category[]> {
    this.incomeCategoryRef.subscribe(a => {
      this.incomeCategories = a;
    });
    return this.incomeCategoryRef;
  }

  getIncomeCategoriesLocal(): Category[] {
    return this.incomeCategories;
  }

  createExpenseCategory(category: Category) {
    this.db.list(this.expenseCategoryUrl).push(category);
  }

  createIncomeCategory(category: Category) {
    this.db.list(this.incomeCategoryUrl).push(category);
  }

}
