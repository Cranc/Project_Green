import { Component } from '@angular/core';
import { ViewController } from 'ionic-angular';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { AngularFireAuth } from 'angularfire2/auth';
import { DatabaseServiceProvider } from '../../providers/database-service/database-service';

/**
 * Generated class for the MailCreateAccountPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-mail-create-account',
  templateUrl: 'mail-create-account.html',
})
export class MailCreateAccountPage {
  form: FormGroup;
  failed_creation: boolean;
  failed_creation_msg: string;

  constructor(public viewCtrl : ViewController, public navCtrl: NavController, public navParams: NavParams, fb: FormBuilder, private auth : AngularFireAuth, private db: DatabaseServiceProvider) {
    this.form = fb.group({
      'nick': ['', Validators.compose([Validators.required, Validators.minLength(3)])],
      'mail': ['', Validators.compose([Validators.required, Validators.email])],
      'pwd1': ['', Validators.compose([Validators.required, Validators.minLength(6)])],
      'pwd2': ['', Validators.compose([Validators.required, Validators.minLength(6)])]
    }, {validator: MailCreateAccountPage.passwordsMatch});
    this.failed_creation = false;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MailCreateAccountPage');
  }

  /**
   * Closes Modal with a do not apply message.
   */
  public closeModal() {
    this.viewCtrl.dismiss(false);
  }

  /**
   * Closes Modal with a do apply message.
   */
  public applyModal() {
    let email = this.form.get('mail');
    let pwd = this.form.get('pwd1');
    this.auth.auth.createUserWithEmailAndPassword(email.value, pwd.value)
      .then(res => {
        let nick = String(this.form.get('nick').value);
        this.auth.auth.currentUser.updateProfile({displayName: nick, photoURL: ""});
        this.db.addUserToDatabase(nick);
        this.viewCtrl.dismiss(true);
      },
      error => {
        //todo correct error handling
        console.log(error);
        this.failed_creation = true;
        this.failed_creation_msg = error.message;
    });
  }

  /**
   * Checks if password is matched to the validation of the password.
   * @param cg formGroup that contains at least the two pw fields (pwd1, pwd2).
   */
  static passwordsMatch(cg: FormGroup): {[err: string]: any} {
    let pwd1 = cg.get('pwd1');
    let pwd2 = cg.get('pwd2');
    let rv: {[error: string]: any} = {};
    if ((pwd1.touched || pwd2.touched) && pwd1.value !== pwd2.value) {
      rv['passwordMismatch'] = true;
    }
    return rv;
  }

  /**
   * logForm that logs the values of the formGroup.
   */
  public logForm(){
    console.log(this.form.value);
  }
}
