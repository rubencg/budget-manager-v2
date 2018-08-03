import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AccountsPage } from './accounts';
import { ComponentsModule } from '../../components/components.module';
import { EditAmountComponent } from '../../components/edit-amount/edit-amount';
import { EditAccountComponent } from '../../components/edit-account/edit-account';

@NgModule({
  declarations: [
    AccountsPage,
  ],
  entryComponents: [
    EditAmountComponent,
    EditAccountComponent
  ],
  imports: [
    ComponentsModule,
    IonicPageModule.forChild(AccountsPage),
  ],
})
export class AccountsPageModule {}
