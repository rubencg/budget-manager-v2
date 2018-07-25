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
import { DatePicker } from '../../node_modules/@ionic-native/date-picker';
import { ExpenseProvider } from '../providers/expense/expense';
import { EntryProvider } from '../providers/entry/entry';

@NgModule({
  declarations: [
    MyApp,
    AccountsPage,
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
    SelectDatePage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    NativeStorage,
    CategoryProvider,
    DatePicker,
    ExpenseProvider,
    EntryProvider
  ]
})
export class AppModule {}
