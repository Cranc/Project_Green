import { Component } from '@angular/core';

import { AboutPage } from '../about/about';
import { ContactPage } from '../contact/contact';
import { HomePage } from '../home/home';
import { SettingsPage } from '../settings/settings';
import { DatabasePlantsPage } from '../database-plants/database-plants';
import { UserPlantPage } from '../user-plant/user-plant';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = HomePage;
  tab2Root = AboutPage;
  tab3Root = UserPlantPage;
  tab5Root = DatabasePlantsPage;
  tab4Root = SettingsPage;

  constructor() {

  }
}
