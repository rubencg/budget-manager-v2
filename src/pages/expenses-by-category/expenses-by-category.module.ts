import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ExpensesByCategoryPage } from './expenses-by-category';
import { ComponentsModule } from '../../components/components.module';

@NgModule({
  declarations: [
    ExpensesByCategoryPage,
  ],
  imports: [
    IonicPageModule.forChild(ExpensesByCategoryPage),
    ComponentsModule
  ],
})
export class ExpensesByCategoryPageModule {}
