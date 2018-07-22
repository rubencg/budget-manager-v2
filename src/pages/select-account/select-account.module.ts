import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SelectAccountPage } from './select-account';
import { ComponentsModule } from '../../components/components.module';

@NgModule({
  declarations: [
    SelectAccountPage
  ],
  imports: [
    ComponentsModule,
    IonicPageModule.forChild(SelectAccountPage),
  ],
})
export class SelectAccountPageModule {}
