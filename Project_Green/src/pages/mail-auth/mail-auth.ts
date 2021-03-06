import { Component } from '@angular/core';
import { IonicPage, NavParams } from 'ionic-angular';
import { ViewController } from 'ionic-angular';
import { MailCreateAccountPage } from '../mail-create-account/mail-create-account';
import { ModalController } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { DatabaseServiceProvider } from '../../providers/database-service/database-service';

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
  private form: FormGroup;
  private failed_login: boolean;
  private failed_login_msg: string;

  constructor(public db:DatabaseServiceProvider, private viewCtrl : ViewController, private navParams: NavParams, private modalCtrl : ModalController, private auth : AngularFireAuth, private fb: FormBuilder) {
    this.form = fb.group({
      'mail': ['', Validators.compose([Validators.required, Validators.email])],
      'pwd': ['', Validators.compose([Validators.required, Validators.minLength(6)])],
    });
    this.failed_login = false;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MailAuthPage');
  }

  /**
   * Closes Modal with a do not apply message.
   */
  public closeModal() {
    this.viewCtrl.dismiss(false);
  }

  /**
   * Closes Modal with a do apply message
   */
  public applyModal() {
    let email = this.form.get('mail');
    let pwd = this.form.get('pwd');
    this.auth.auth.signInWithEmailAndPassword(email.value, pwd.value)
    .then( res => {
      console.log(res);
      this.db.addUserToDatabase(); //adds the user to the database if he doesnt already exists
      this.viewCtrl.dismiss(true);
    },
    error => {
      //todo correct error handling
      this.failed_login = true;
      this.failed_login_msg = error.message;
      console.log(error);
    });


  }

  /**
   * Opens a new modal for the creation of a new account.
   */
  public createAccount() {
    var modal = this.modalCtrl.create(MailCreateAccountPage);
    modal.present();
  }

  /**
   * logForm that logs the values of the formGroup.
   */
  public logForm(){
    console.log(this.form.value);
  }
}
