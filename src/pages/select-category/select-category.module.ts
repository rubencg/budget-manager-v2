import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SelectCategoryPage } from './select-category';
import { ComponentsModule } from '../../components/components.module';

@NgModule({
  declarations: [
    SelectCategoryPage 
  ],
  imports: [
    ComponentsModule,
    IonicPageModule.forChild(SelectCategoryPage),
  ],
})
export class SelectCategoryPageModule {}
