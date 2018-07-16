import { NgModule } from '@angular/core';
import { EndOfTheMonthComponent } from './end-of-the-month/end-of-the-month';
import { AddEntryComponent } from './add-entry/add-entry';
import { BudgetOverviewComponent } from './budget-overview/budget-overview';
import { IonicModule } from 'ionic-angular';

@NgModule({
	declarations: [EndOfTheMonthComponent,
    AddEntryComponent,
    BudgetOverviewComponent],
	imports: [
    IonicModule
  ],
	exports: [EndOfTheMonthComponent,
    AddEntryComponent,
    BudgetOverviewComponent]
})
export class ComponentsModule {}
