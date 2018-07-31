import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { BudgetExpensesPage } from './budget-expenses';
import { ComponentsModule } from '../../components/components.module';

@NgModule({
  declarations: [
    BudgetExpensesPage,
  ],
  imports: [
    ComponentsModule,
    IonicPageModule.forChild(BudgetExpensesPage),
  ],
})
export class BudgetExpensesPageModule {}
