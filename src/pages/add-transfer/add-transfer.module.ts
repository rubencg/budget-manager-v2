import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AddTransferPage } from './add-transfer';
import { ComponentsModule } from '../../components/components.module';

@NgModule({
  declarations: [
    AddTransferPage,
  ],
  imports: [
    ComponentsModule,
    IonicPageModule.forChild(AddTransferPage),
  ],
})
export class AddTransferPageModule {}
