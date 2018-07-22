import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SelectSubcategoryPage } from './select-subcategory';
import { ComponentsModule } from '../../components/components.module';

@NgModule({
  declarations: [
    SelectSubcategoryPage,
  ],
  imports: [
    ComponentsModule,
    IonicPageModule.forChild(SelectSubcategoryPage),
  ],
})
export class SelectSubcategoryPageModule {}
