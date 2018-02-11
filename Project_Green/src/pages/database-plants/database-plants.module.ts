import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DatabasePlantsPage } from './database-plants';

@NgModule({
  declarations: [
    DatabasePlantsPage,
  ],
  imports: [
    IonicPageModule.forChild(DatabasePlantsPage),
  ],
})
export class DatabasePlantsPageModule {}
