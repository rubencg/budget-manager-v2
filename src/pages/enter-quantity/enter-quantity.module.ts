import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EnterQuantityPage } from './enter-quantity';
import { ComponentsModule } from '../../components/components.module';

@NgModule({
  declarations: [
    EnterQuantityPage
  ],
  imports: [
    ComponentsModule,
    IonicPageModule.forChild(EnterQuantityPage),
  ],
})
export class EnterQuantityPageModule {}
