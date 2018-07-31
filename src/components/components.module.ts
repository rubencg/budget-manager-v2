import { NgModule } from '@angular/core';
import { EndOfTheMonthComponent } from './end-of-the-month/end-of-the-month';
import { AddEntryComponent } from './add-entry/add-entry';
import { BudgetOverviewComponent } from './budget-overview/budget-overview';
import { IonicModule } from 'ionic-angular';
import { CalculatorComponent } from './calculator/calculator';
import { ElementSelectComponent } from './element-select/element-select';
import { EntryListComponent } from './entry-list/entry-list';

@NgModule({
	declarations: [EndOfTheMonthComponent,
    AddEntryComponent,
    BudgetOverviewComponent,
    ElementSelectComponent,
    EntryListComponent,
    ],
	imports: [
    IonicModule
  ],
	exports: [EndOfTheMonthComponent,
    AddEntryComponent,
    BudgetOverviewComponent,
    ElementSelectComponent,
    EntryListComponent,
    ]
})
export class ComponentsModule {}
