import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MailCreateAccountPage } from './mail-create-account';

@NgModule({
  declarations: [
    MailCreateAccountPage,
  ],
  imports: [
    IonicPageModule.forChild(MailCreateAccountPage),
  ],
})
export class MailCreateAccountPageModule {}
