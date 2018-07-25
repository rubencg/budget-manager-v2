import { Component } from '@angular/core';
import { Income, BudgetExpense, Account, Entry } from '../../interfaces';
import _ from 'lodash';
import moment from 'moment';

@Component({
  selector: 'end-of-the-month',
  templateUrl: 'end-of-the-month.html'
})
export class EndOfTheMonthComponent {

  private moneyLeft: number;

  public setMoneyLeft(accounts: Account[], incomes: Income[], budgets: BudgetExpense[]){
      let b: number = this.getSumAfterTodaysDate(budgets);
      let i: number = this.getSumAfterTodaysDate(incomes);

      let accountsBalance = _.chain(accounts)
        .filter(a => a.isSummable)
        .sumBy((a : Account) => a.currentBalance)
        .value();

      this.moneyLeft = accountsBalance + i - b;
  }

  private getSumAfterTodaysDate(items : Entry[]) : number{
    return _.chain(items)
        .filter((i : Entry) => {
          var date = new Date(+i.date), y = date.getFullYear(), m = date.getMonth();

          let endOfMonth: Date = moment(new Date(y, m, 1)).add(1, 'M').subtract(1, 'd').toDate();
          let today: Date = new Date();

          return date > today && date <= endOfMonth;
        })
        .sumBy('amount')
        .value();
  }

}
