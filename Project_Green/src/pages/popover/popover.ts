import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ViewController } from 'ionic-angular';

/**
 * Generated class for the PopoverPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-popover',
  template: `
    <ion-list id="il1" (click)="close()">
      <ion-list-header>{{header}}</ion-list-header>
      <div>
        {{msg}}
      </div>
    </ion-list>
  `
})
export class PopoverPage {
  msg: string;
  header: string;

  constructor(public viewCtrl: ViewController) {
    this.msg = this.viewCtrl.data.desc;
    this.header = this.viewCtrl.data.name;
  }

  close() {
    this.viewCtrl.dismiss();
  }
}
