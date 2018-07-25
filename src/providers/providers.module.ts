import { NgModule } from '@angular/core';
import { AccountProvider } from './account/account';
import { AuthProvider } from './auth/auth';
import { AngularFireDatabase, AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireModule } from 'angularfire2';
import { CategoryProvider } from './category/category';
import { ExpenseProvider } from './expense/expense';
import { EntryProvider } from './entry/entry';

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
      EntryProvider
    ]
})
export class ProvidersModule {

}
