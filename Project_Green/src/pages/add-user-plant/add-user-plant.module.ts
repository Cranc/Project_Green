import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AddUserPlantPage } from './add-user-plant';

@NgModule({
  declarations: [
    AddUserPlantPage,
  ],
  imports: [
    IonicPageModule.forChild(AddUserPlantPage),
  ],
})
export class AddUserPlantPageModule {}
