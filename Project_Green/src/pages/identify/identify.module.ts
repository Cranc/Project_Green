import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { IdentifyPage } from './identify';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


@NgModule({
  declarations: [
    IdentifyPage,
  ],
  imports: [
    IonicPageModule.forChild(IdentifyPage),
  ],
})

export class IdentifyPageModule {}
