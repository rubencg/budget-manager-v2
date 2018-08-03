import { NgModule } from '@angular/core';
import { AccountProvider } from './account/account';
import { AuthProvider } from './auth/auth';
import { AngularFireDatabase, AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireModule } from 'angularfire2';
import { CategoryProvider } from './category/category';
import { ExpenseProvider } from './expense/expense';
import { EntryProvider } from './entry/entry';
import { IncomeProvider } from './income/income';
import { BudgetExpenseProvider } from './budget-expense/budget-expense';
import { TransferProvider } from './transfer/transfer';

@NgModule({
  imports: [
    AngularFireDatabaseModule,
    AngularFireModule
  ],
    providers: [
      AccountProvider,
      AuthProvider,
      CategoryProvider,
      AngularFireDatabase,
      ExpenseProvider,
      EntryProvider,
      IncomeProvider,
      BudgetExpenseProvider,
      TransferProvider
    ]
})
export class ProvidersModule {

}
