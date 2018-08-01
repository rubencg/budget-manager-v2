import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CategoryExpensesPage } from './category-expenses';

@NgModule({
  declarations: [
    CategoryExpensesPage,
  ],
  imports: [
    IonicPageModule.forChild(CategoryExpensesPage),
  ],
})
export class CategoryExpensesPageModule {}
