import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import {AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';
import { database } from 'firebase/app';
import { AngularFireModule } from 'angularfire2';

/*
  Generated class for the DatabaseServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class DatabaseServiceProvider {

  constructor(private _af: AngularFireAuth, private _db: AngularFireDatabase) {
    //af.auth.signInWithPopup;
    _af.authState;
    console.log('Hello DatabaseServiceProvider Provider');
  }

  public listAccounts(): FirebaseListObservable<any[]>{
    return this._db.list('/users');
  }

}
