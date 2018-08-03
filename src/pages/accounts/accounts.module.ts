import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AccountsPage } from './accounts';
import { ComponentsModule } from '../../components/components.module';
import { EditAmountComponent } from '../../components/edit-amount/edit-amount';

@NgModule({
  declarations: [
    AccountsPage,
  ],
  entryComponents: [
    EditAmountComponent
  ],
  imports: [
    ComponentsModule,
    IonicPageModule.forChild(AccountsPage),
  ],
})
export class AccountsPageModule {}
