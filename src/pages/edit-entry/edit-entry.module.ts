import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EditEntryPage } from './edit-entry';
import { EditAmountComponent } from '../../components/edit-amount/edit-amount';
import { EditAccountComponent } from '../../components/edit-account/edit-account';
import { EditCategoryComponent } from '../../components/edit-category/edit-category';
import { ComponentsModule } from '../../components/components.module';
import { ElementSelectComponent } from '../../components/element-select/element-select';

@NgModule({
  declarations: [
    EditEntryPage,
  ],
  entryComponents: [
    EditAmountComponent,
    EditAccountComponent,
    EditCategoryComponent,
    ElementSelectComponent
  ],
  imports: [
    ComponentsModule,
    IonicPageModule.forChild(EditEntryPage),
  ],
})
export class EditEntryPageModule {}
