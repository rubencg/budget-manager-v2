import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ExpensesPage } from './expenses';
import { ComponentsModule } from '../../components/components.module';

@NgModule({
  declarations: [
    ExpensesPage,
  ],
  imports: [
    ComponentsModule,
    IonicPageModule.forChild(ExpensesPage),
  ],
})
export class ExpensesPageModule {}
