import { Component } from '@angular/core';
import { IonicPage, NavParams } from 'ionic-angular';
import { ViewController } from 'ionic-angular';
import { MailCreateAccountPage } from '../mail-create-account/mail-create-account';
import { ModalController } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';

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

  constructor(public viewCtrl : ViewController, public navParams: NavParams, public modalCtrl : ModalController, public auth : AngularFireAuth) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MailAuthPage');
  }

  /**
   * Closes Modal with a do not apply message.
   */
  public closeModal() {
    var item = {
      mail : this.mail,
      password : this.password,
      apply: false
    }
    this.viewCtrl.dismiss(item);
  }

  /**
   * Closes Modal with a do apply message
   */
  public applyModal() {
    var item = {
      mail : this.mail,
      password : this.password,
      apply: true
    }
    this.viewCtrl.dismiss(item);
  }

  /**
   * Opens a new modal for the creation of a new account.
   */
  public createAccount() {
    var modal = this.modalCtrl.create(MailCreateAccountPage);
    modal.present();
    modal.onDidDismiss(data => {
      if(data.apply == false)
        return;
      console.log(data);
      this.auth.auth.createUserWithEmailAndPassword(data.mail.value, data.password.value)
      .then(res => {
        console.log(res);
      },
      error => {
        //todo correct error handling
        console.log(error);
      });
    });
  }
}
