import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import {AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
//import { database } from 'firebase/app';
//import { AngularFireModule } from 'angularfire2';

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

  /**
   * Conencts to the Database and returns a List of all User Objects.
   */
  public listAccounts(): FirebaseListObservable<any[]>{
    return this._db.list('/users');
  }
  /**
   * Conencts to the Database and returns a List of all PlantProperties Objects.
   * NOTE! The objects are of different types!
   */
  public listPlantProperties() : FirebaseListObservable<any[]>{
    return this._db.list('/plantproperties');
  }
  /**
   * Conencts to the Database and returns a List of all BlossomColor Objects.
   */
  public listBlossomColor() : FirebaseListObservable<any[]>{
    return this._db.list('/plantproperties/blossomcolor');
  }
  /**
   * Conencts to the Database and returns a List of all Plant Group Objects.
   */
  public listPlantGroup() : FirebaseListObservable<any[]>{
    return this._db.list('plantproperties/plantgroup');
  }
  /**
   * Conencts to the Database and returns a List of all Plant Sub Group Objects.
   */
  public listPlantSubGroup() : FirebaseListObservable<any[]>{
    return this._db.list('plantproperties/plantsubgroup');
  }
}
