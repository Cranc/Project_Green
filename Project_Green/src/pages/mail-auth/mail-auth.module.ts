import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MailAuthPage } from './mail-auth';

@NgModule({
  declarations: [
    MailAuthPage,
  ],
  imports: [
    IonicPageModule.forChild(MailAuthPage),
  ],
})
export class MailAuthPageModule {}
