import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EnterQuantityPage } from './enter-quantity';
import { CalculatorComponent } from '../../components/calculator/calculator';

@NgModule({
  declarations: [
    EnterQuantityPage,
    CalculatorComponent
  ],
  imports: [
    IonicPageModule.forChild(EnterQuantityPage),
  ],
})
export class EnterQuantityPageModule {}
