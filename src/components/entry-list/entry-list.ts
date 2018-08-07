import { Component, Input, EventEmitter, Output } from '@angular/core';
import _ from 'lodash';
import moment from 'moment';
import { Entry, Income, Account, Transfer } from '../../interfaces';

@Component({
  selector: 'entry-list',
  templateUrl: 'entry-list.html'
})
export class EntryListComponent<T extends Entry> {

  @Input('options') entryOptions: EntryListOptions<T>;
  @Input('changingDate') date: Date;
  @Output() elementSelected = new EventEmitter();

  private groupedEntries: any = [];

  constructor() {
  }

  setEntries(date: Date, entries: T[] = null) {
    this.entryOptions.currentDate = date;
    this.groupedEntries = _.chain(entries)
      .filter(b => moment(date).isSame(new Date(+b.date), 'month'))
      .groupBy((b: T) => moment(new Date(+b.date)).format('DD-MMM-YYYY'))
      .map((value: T[], key: string) => {
        let eDate: Date = new Date(key);
        let transformedDate: string = moment(eDate).locale('es').format('MMMM dddd DD, YYYY');

        return {
          title: transformedDate,
          entries: value,
          date: eDate,
          toggleActive: false,
          totalValue: _.sumBy(value, v => v.amount)
        };
      })
      .value();

    this.groupedEntries = _.orderBy(this.groupedEntries, ['date'], ['desc']);
  }

  activate(group: Group) {
    group.toggleActive = !group.toggleActive;
  }

  callAndReload(entry: T, callbackMethod: (t: T) => Promise<void>) {
    callbackMethod(entry)
      .then(() => {
        this.setEntries(this.entryOptions.currentDate, this.entryOptions.getEntries());
      });
  }

  elemetClicked($event) {
    this.elementSelected.emit($event);
  }

  getAccountName(entry): string{
    if(this.entryOptions.account)
    {
      return "";
    }

    if(entry.fromAccount){
      return entry.fromAccount.name;
    }else if (entry.toAccount) {
      return entry.toAccount.name;
    }
    return "";
  }

  getBadgeColor(entry){
    if(this.entryOptions.account)
    {
      let entryTransfer:Transfer = entry;
      return this.entryOptions.account.key == entryTransfer.fromAccount.id ? 'expense' : 'income';
    }else{
      return this.entryOptions.badgeColor;
    }
  }
}

export interface EntryListOptions<T extends Entry> {
  getEntries: () => T[];
  noElementsText: string;
  badgeColor: string;
  elementTitle: (e: T) => string;
  getImage: (e: T) => string;
  sliderOptions: SliderOption<T>[];
  currentDate: Date;
  account?: Account;
}

export interface SliderOption<T> {
  text: string;
  color: string;
  icon: string;
  callbackMethod: (t: T) => Promise<void>;
}

interface Group {
  title: string,
  date: Date,
  toggleActive: boolean,
  totalValue: number,
  entries: Entry[]
}
