import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { DatabaseServiceProvider } from '../../providers/database-service/database-service';
import { FirebaseListObservable } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import { DatabaseServiceProvider } from '../../providers/database-service/database-service';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { CollectionPage } from '../collection/collection'

/**
 * Generated class for the ProfilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {
  public uid : FirebaseListObservable<any[]>;
  public eMail : FirebaseListObservable<any[]>;
  public displayName : FirebaseListObservable<any[]>;

  constructor(public navCtrl: NavController, public navParams: NavParams, public db: DatabaseServiceProvider, public af: AngularFireAuth, public fb: FormBuilder) {
    this.uid = this.af.auth.currentUser.uid;
    this.eMail = this.af.auth.currentUser.email;
    this.displayName = this.af.auth.currentUser.displayName;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProfilePage');
  }

  /**
   * Opens a new modal for the creation of a new account.
   */
  public collectionPage() {
    this.navCtrl.push(CollectionPage);
  }


}
