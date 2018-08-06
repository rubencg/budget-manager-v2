import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ApplyBudgetExpensePage } from './apply-budget-expense';
import { ComponentsModule } from '../../components/components.module';

@NgModule({
  declarations: [
    ApplyBudgetExpensePage,
  ],
  imports: [
    ComponentsModule,
    IonicPageModule.forChild(ApplyBudgetExpensePage),
  ],
})
export class ApplyBudgetExpensePageModule {}
