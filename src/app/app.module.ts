import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { NativeStorage } from '@ionic-native/native-storage';

import { AccountsPage } from '../pages/accounts/accounts';
import { StatisticsPage } from '../pages/statistics/statistics';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { ComponentsModule } from '../components/components.module';
import { LoginPage } from '../pages/login/login';
import { ProvidersModule } from '../providers/providers.module';
import { FIREBASE_CONFIG } from './firebase.config';
import { AngularFireModule } from '../../node_modules/angularfire2';
import { EnterQuantityPageModule } from '../pages/enter-quantity/enter-quantity.module';
import { EnterQuantityPage } from '../pages/enter-quantity/enter-quantity';
import { SelectAccountPage } from '../pages/select-account/select-account';
import { SelectAccountPageModule } from '../pages/select-account/select-account.module';
import { SelectCategoryPage } from '../pages/select-category/select-category';
import { SelectCategoryPageModule } from '../pages/select-category/select-category.module';
import { CategoryProvider } from '../providers/category/category';
import { SelectSubcategoryPage } from '../pages/select-subcategory/select-subcategory';
import { SelectSubcategoryPageModule } from '../pages/select-subcategory/select-subcategory.module';
import { SelectDatePage } from '../pages/select-date/select-date';
import { SelectDatePageModule } from '../pages/select-date/select-date.module';
import { DatePicker } from '@ionic-native/date-picker';
import { ExpenseProvider } from '../providers/expense/expense';
import { EntryProvider } from '../providers/entry/entry';
import { IncomeProvider } from '../providers/income/income';
import { BudgetExpenseProvider } from '../providers/budget-expense/budget-expense';
import { ExpensesPageModule } from '../pages/expenses/expenses.module';
import { ExpensesPage } from '../pages/expenses/expenses';
import { IncomesPageModule } from '../pages/incomes/incomes.module';
import { IncomesPage } from '../pages/incomes/incomes';
import { BudgetExpensesPageModule } from '../pages/budget-expenses/budget-expenses.module';
import { BudgetExpensesPage } from '../pages/budget-expenses/budget-expenses';
import { CategoryExpensesPageModule } from '../pages/category-expenses/category-expenses.module';
import { CategoryExpensesPage } from '../pages/category-expenses/category-expenses';
import { ExpensesByCategoryPage } from '../pages/expenses-by-category/expenses-by-category';
import { ExpensesByCategoryPageModule } from '../pages/expenses-by-category/expenses-by-category.module';
import { TransferProvider } from '../providers/transfer/transfer';
import { AddTransferPageModule } from '../pages/add-transfer/add-transfer.module';
import { AddTransferPage } from '../pages/add-transfer/add-transfer';
import { AccountsPageModule } from '../pages/accounts/accounts.module';
import { EditEntryPageModule } from '../pages/edit-entry/edit-entry.module';
import { EditEntryPage } from '../pages/edit-entry/edit-entry';
import { ApplyBudgetExpensePageModule } from '../pages/apply-budget-expense/apply-budget-expense.module';
import { ApplyBudgetExpensePage } from '../pages/apply-budget-expense/apply-budget-expense';

@NgModule({
  declarations: [
    MyApp,
    StatisticsPage,
    HomePage,
    TabsPage,
    LoginPage
  ],
  imports: [
    BrowserModule,
    ComponentsModule,
    ProvidersModule,
    EnterQuantityPageModule,
    SelectAccountPageModule,
    SelectCategoryPageModule,
    SelectSubcategoryPageModule,
    SelectDatePageModule,
    ExpensesPageModule,
    IncomesPageModule,
    BudgetExpensesPageModule,
    CategoryExpensesPageModule,
    ExpensesByCategoryPageModule,
    AddTransferPageModule,
    AccountsPageModule,
    EditEntryPageModule,
    ApplyBudgetExpensePageModule,
    AngularFireModule.initializeApp(FIREBASE_CONFIG),
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AccountsPage,
    StatisticsPage,
    HomePage,
    TabsPage,
    LoginPage,
    EnterQuantityPage,
    SelectAccountPage,
    SelectCategoryPage,
    SelectSubcategoryPage,
    SelectDatePage,
    ExpensesPage,
    IncomesPage,
    BudgetExpensesPage,
    CategoryExpensesPage,
    ExpensesByCategoryPage,
    AddTransferPage,
    EditEntryPage,
    ApplyBudgetExpensePage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    NativeStorage,
    CategoryProvider,
    DatePicker,
    ExpenseProvider,
    EntryProvider,
    IncomeProvider,
    BudgetExpenseProvider,
    TransferProvider
  ]
})
export class AppModule {}
