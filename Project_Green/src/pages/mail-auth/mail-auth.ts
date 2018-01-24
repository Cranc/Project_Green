import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ViewController } from 'ionic-angular';

/**
 * Generated class for the MailAuthPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-mail-auth',
  templateUrl: 'mail-auth.html',
})
export class MailAuthPage {
  public mail: string;
  public password: string;
  public apply: boolean;

  constructor(public viewCtrl : ViewController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MailAuthPage');
  }

  public closeModal() {
    this.viewCtrl.dismiss();
  }

  public applyModal() {
    var item = {
      mail : this.mail,
      password : this.password
    }
    this.viewCtrl.dismiss(item);
  }
}
