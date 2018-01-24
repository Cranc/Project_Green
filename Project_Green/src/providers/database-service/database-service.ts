import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import {AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { query } from '@angular/core/src/animation/dsl';
import { error } from 'util';
import { User } from '../../app/classes/user';
//import { database } from 'firebase/app';
//import { AngularFireModule } from 'angularfire2';

/*
  Generated class for the DatabaseServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class DatabaseServiceProvider {

  i: number;

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
    return this._db.list('/plantproperties/plantgroup');
  }
  /**
   * Conencts to the Database and returns a List of all Plant Sub Group Objects.
   */
  public listPlantSubGroup() : FirebaseListObservable<any[]>{
    return this._db.list('/plantproperties/plantsubgroup');
  }

  /**
   * Todo Connect to the database check if user already part of database if not add user
   * @param nick nickname of user
   * @param name name
   * @param lastname lastname
   * @param uid user id
   */
  public addUserToDatabase(nick : string, name : string, lastname : string ,uid : number) {

    /*var users = this._db.list('/users/*', {
      query:
      {
        orderByChild : '/id',
        equalTo : uid
      },
      preserveSnapshot : true
    });*/

    /*
    var users = this.listAccounts();
    this.i = 0;

    console.log(users);
    let request = users.forEach((user) => {
      console.log(user);
      console.log(this.i);
      if(user[0].id == 1)
      this.i++;

      console.log(this.i);
      //console.log("found something [" + i + "]");
    })
    .then(res => {
      console.log(this.i);
      console.log("here now");
        if(this.i === 0){
          console.log("add new user");
          var user = new User(uid,nick,name,lastname);
          {
            "nick" : nick,
            "id" : uid,
            "name" : name,
            "lastname" : lastname
          }
          this.listAccounts().push(user);
          return;
        }
      }, error => {
        console.log("error while trying to determin user!");
      });
      console.log(this.i);
      */
  }
}
