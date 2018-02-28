import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { DatabaseServiceProvider } from '../../providers/database-service/database-service';
import { FirebaseListObservable } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { LoginPage } from '../login/login';
import { MailAuthPage } from '../mail-auth/mail-auth';
import { ModalController, Platform } from 'ionic-angular';

import { InAppBrowser, InAppBrowserOptions } from "@ionic-native/in-app-browser";
import { Promise } from 'firebase/app';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})

export class HomePage {
  accounts : FirebaseListObservable<any[]>;
  blossomcolor : FirebaseListObservable<any[]>;

  constructor(public browser: InAppBrowser ,private platform: Platform, public navCtrl: NavController, public db:DatabaseServiceProvider, public auth:AngularFireAuth, public modalCtrl : ModalController) {
    this.accounts = this.db.listAccounts();
    this.blossomcolor = this.db.listBlossomColor();


    console.log(this.auth.auth.currentUser);
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
    /*
    this.auth.auth.signInWithRedirect(new firebase.auth.GithubAuthProvider())
    .then((result) => {
      if(result.credential) {
        console.log(result.credential.accessToken);
        this.db.addUserToDatabase();
      }
    }).catch((error) => {
      console.log(error);
      console.log(error.message);
    });
    */
    /*
    const options: InAppBrowserOptions = {
      zoom: 'no',
      location: 'yes',
      clearsessioncache: 'yes',
      clearcache: 'yes'
    }

    var url =
    'https://github.com/login/oauth/authorize?client_id=' +
    'c40b38f7ac2bd95f535c' +
    '&redirect_uri=https://project-green-192912.firebaseapp.com/__/auth/handler';

    const ref = this.browser.create(
      url,
      '_blank',
      options
    );

    //alert("here");

    var sub = ref.on("loadstart").subscribe((event) => {
    //alert(event.url);
    //alert((event.url).indexOf("https://project-green-192912.firebaseapp.com/__/auth/handler"));
    if((event.url).indexOf("https://project-green-192912.firebaseapp.com/__/auth/handler") === 0) {
      //this.test(event.url);
      sub.unsubscribe();
      ref.close();

      var code = event.url.split("code=");

      //alert(parsedResponse);

      if (code[1] !== undefined && code[1] !== null) {
        //alert("about to go deeper");
        this.gitHubLogin(code[1]);
        //alert(parsedResponse);
      } else {
        alert("Problem authenticating with Github");
      }
    }
    });*/

    /*
    this.platform.ready().then(() => {
      alert("platform rdy");
      this.gitHubLogin().then(success => {
        alert(success.access_token);
      }, (error) => {
        alert(error);
      });
    });
    */
    /*this.auth.auth
      .signInWithPopup(new firebase.auth.GithubAuthProvider())
      .then(res => {
        console.log(res);
        this.db.addUserToDatabase(); //adds the user to the database if he doesnt already exists
      }, error => {
        console.log("could not auth");
      });*/
  }

  public gitHubLogin(code) {
    const options: InAppBrowserOptions = {
      zoom: 'yes',
      location: 'yes',
      clearsessioncache: 'yes',
      clearcache: 'yes'
    }

    var code_url="https://github.com/login/oauth/access_token?client_id=" + 'c40b38f7ac2bd95f535c' +
      '&redirect_uri=https://project-green-192912.firebaseapp.com/__/auth/handler' +
      '&client_secret=' + 'c46fbe38119d62a2463e90fcf026ddbab8c4e68e' +
      "&code=" + code;


    const ref = this.browser.create(
      code_url,
      '_blank',
      options
    );
    //alert(code);

    //https://project-green-192912.firebaseapp.com/__/auth/handler
    var code_sub = ref.on("loadstart").subscribe((event) => {
      alert(event);
      alert(event.url);
      if((event.url).indexOf("https://project-green-192912.firebaseapp.com/__/auth/handler") === 0) {
        alert("inside code callback");
        //code_sub.unsubscribe();
        //ref.close();
        /*var responseParameters = ((event.url).split("#")[1]).split("&");
        var parsedResponse = {};
        for (var i = 0; i < responseParameters.length; i++) {
          parsedResponse[responseParameters[i].split("=")[0]] = responseParameters[i].split("=")[1];
        }
        if (parsedResponse["access_token"] !== undefined && parsedResponse["access_token"] !== null) {
          alert(parsedResponse);
          this.auth.auth.signInWithCredential(firebase.auth.GithubAuthProvider.credential(parsedResponse['access_token']));
        } else {
          alert("Problem authenticating with Github");
        }*/
      }
    });
  }

  /**
   * Signs Out of the Database
   */
  public signOut() {
    this.auth.auth.signOut();
  }
}
