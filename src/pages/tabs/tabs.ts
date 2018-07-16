import { Component } from '@angular/core';

import { AccountsPage } from '../accounts/accounts';
import { StatisticsPage } from '../statistics/statistics';
import { HomePage } from '../home/home';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = HomePage;
  tab2Root = StatisticsPage;
  tab3Root = AccountsPage;

  constructor() {

  }
}
