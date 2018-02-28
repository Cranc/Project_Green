import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ViewController } from 'ionic-angular';
import { RegisterPage } from '../register/register';
import { TabsPage } from '../tabs/tabs';
import { ModalController } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { DatabaseServiceProvider } from '../../providers/database-service/database-service';
import { ToastController } from 'ionic-angular';

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  private form: FormGroup;
  private failed_login: boolean;
  private failed_login_msg: string;

  constructor(public navCtrl: NavController, public db:DatabaseServiceProvider, private viewCtrl : ViewController, private navParams: NavParams,
              private modalCtrl : ModalController, private auth : AngularFireAuth, private fb: FormBuilder, private toastCtrl: ToastController) {
    this.form = fb.group({
      'mail': ['', Validators.compose([Validators.required, Validators.email])],
      'pwd': ['', Validators.compose([Validators.required, Validators.minLength(6)])],
    });
    this.failed_login = false;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  /**
   * Show toast if input is invalid
   */
  presentToast(text: any) {
    let toast = this.toastCtrl.create({
      message: text,
      position: 'top',
      duration: '5000',
      showCloseButton: 'true',
      dismissOnPageChange: 'true',
      closeButtonText: 'OK'
    });

    toast.present();
  }

  /**
   * Closes Modal with a do apply message
   */
  public login() {
    let email = this.form.get('mail');
    let pwd = this.form.get('pwd');
    this.auth.auth.signInWithEmailAndPassword(email.value, pwd.value)
    .then( res => {
      console.log(res);
      this.db.addUserToDatabase(); //adds the user to the database if he doesnt already exists
      this.navCtrl.push(TabsPage);
    },
    error => {
      //todo correct error handling
      console.log(error);
      this.presentToast(error.message);
      //this.failed_login = true;
      //this.failed_login_msg = error.message;
    });
  }

  /**
   * Opens a new modal for the creation of a new account.
   */
  public registerPage() {
    this.navCtrl.push(RegisterPage);
  }

  /**
   * logForm that logs the values of the formGroup.
   */
  public logForm(){
    console.log(this.form.value);
  }
}
