import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { DatabaseServiceProvider } from '../../providers/database-service/database-service';
import { FirebaseListObservable } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  accounts : FirebaseListObservable<any[]>;
  blossomcolor : FirebaseListObservable<any[]>;
  plantgroup : FirebaseListObservable<any[]>;
  plantsubgroup : FirebaseListObservable<any[]>;

  constructor(public navCtrl: NavController, public db:DatabaseServiceProvider, public auth:AngularFireAuth) {
    this.accounts = this.db.listAccounts();
    this.blossomcolor = this.db.listBlossomColor();
    this.plantgroup = this.db.listPlantGroup();
    this.plantsubgroup = this.db.listPlantSubGroup();
  }

  public signInWithGitHub() {
    this.auth.auth
      .signInWithPopup(new firebase.auth.GithubAuthProvider())
      .then(res => console.log(res));
  }

  public signOut() {
    this.auth.auth.signOut();
  }
}
