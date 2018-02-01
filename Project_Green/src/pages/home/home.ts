import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { DatabaseServiceProvider } from '../../providers/database-service/database-service';
import { FirebaseListObservable } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { MailAuthPage } from '../mail-auth/mail-auth';
import { ModalController } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  accounts : FirebaseListObservable<any[]>;
  blossomcolor : FirebaseListObservable<any[]>;

  constructor(public navCtrl: NavController, public db:DatabaseServiceProvider, public auth:AngularFireAuth, public modalCtrl : ModalController) {
    this.accounts = this.db.listAccounts();
    this.blossomcolor = this.db.listBlossomColor();
  }

  /**
   * Signs into the Database with a Mail and Password (that is already in the user base)
   */
  public signInWithMail() {
    var modal = this.modalCtrl.create(MailAuthPage);
    modal.present();
  }
  /**
   * Signs into the Database with a GitHub account
   */
  public signInWithGitHub() {
    this.auth.auth
      .signInWithPopup(new firebase.auth.GithubAuthProvider())
      .then(res => {
        console.log(res);
        this.db.addUserToDatabase(); //adds the user to the database if he doesnt already exists
      }, error => {
        console.log("could not auth");
      });
  }

  /**
   * Signs Out of the Database
   */
  public signOut() {
    this.auth.auth.signOut();
  }
}
