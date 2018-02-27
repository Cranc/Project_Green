import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { UserPlantPage } from './user-plant';

@NgModule({
  declarations: [
    UserPlantPage,
  ],
  imports: [
    IonicPageModule.forChild(UserPlantPage),
  ],
})
export class UserPlantPageModule {}
