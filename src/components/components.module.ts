import { NgModule } from '@angular/core';
import { EndOfTheMonthComponent } from './end-of-the-month/end-of-the-month';
import { AddEntryComponent } from './add-entry/add-entry';
import { BudgetOverviewComponent } from './budget-overview/budget-overview';
import { IonicModule } from 'ionic-angular';
import { CalculatorComponent } from './calculator/calculator';
import { ElementSelectComponent } from './element-select/element-select';
import { EntryListComponent } from './entry-list/entry-list';
import { EditAmountComponent } from './edit-amount/edit-amount';
import { EditAccountComponent } from './edit-account/edit-account';
import { EditCategoryComponent } from './edit-category/edit-category';

@NgModule({
	declarations: [EndOfTheMonthComponent,
    AddEntryComponent,
    BudgetOverviewComponent,
    ElementSelectComponent,
    EntryListComponent,
    EditAmountComponent,
    EditAccountComponent,
    CalculatorComponent,
    EditCategoryComponent
    ],
	imports: [
    IonicModule
  ],
	exports: [EndOfTheMonthComponent,
    AddEntryComponent,
    BudgetOverviewComponent,
    ElementSelectComponent,
    EntryListComponent,
    EditAmountComponent,
    EditAccountComponent,
    CalculatorComponent,
    EditCategoryComponent
    ]
})
export class ComponentsModule {}
