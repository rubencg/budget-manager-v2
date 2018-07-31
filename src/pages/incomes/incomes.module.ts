import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { IncomesPage } from './incomes';
import { ComponentsModule } from '../../components/components.module';

@NgModule({
  declarations: [
    IncomesPage
  ],
  imports: [
    ComponentsModule,
    IonicPageModule.forChild(IncomesPage),
  ],
})
export class IncomesPageModule {}
