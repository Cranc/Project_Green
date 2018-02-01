import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import {AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { query } from '@angular/core/src/animation/dsl';
import { User } from '../../app/classes/user';
import { Plant } from '../../app/classes/plant';
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

  constructor(private _af: AngularFireAuth, private _db: AngularFireDatabase, private auth:AngularFireAuth) {
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
   * Conencts to the Database and returns a List of all Blossom color Objects.
   */
  public listBlossomColor() : FirebaseListObservable<any[]>{
    return this._db.list('/plantproperties/blossom-color');
  }
  /**
   * Conencts to the Database and returns a List of all Blossom shape Objects.
   */
  public listBlossomShape() : FirebaseListObservable<any[]>{
    return this._db.list('/plantproperties/blossom-shape');
  }
  /**
   * Conencts to the Database and returns a List of all fruit color Objects.
   */
  public listFruitColor() : FirebaseListObservable<any[]>{
    return this._db.list('/plantproperties/fruit-color');
  }
  /**
   * Conencts to the Database and returns a List of all inflorescence Objects.
   */
  public listInflorescence() : FirebaseListObservable<any[]>{
    return this._db.list('/plantproperties/inflorescence');
  }
  /**
   * Conencts to the Database and returns a List of all leaf blade Objects.
   */
  public listLeafBlade() : FirebaseListObservable<any[]>{
    return this._db.list('/plantproperties/leaf-blade');
  }
  /**
   * Conencts to the Database and returns a List of all leaf edge Objects.
   */
  public listLeafEdge() : FirebaseListObservable<any[]>{
    return this._db.list('/plantproperties/leaf-edge');
  }
  /**
   * Conencts to the Database and returns a List of all leaf nerve Objects.
   */
  public listLeafNerves() : FirebaseListObservable<any[]>{
    return this._db.list('/plantproperties/leaf-nerves');
  }
  /**
   * Conencts to the Database and returns a List of all leaf presentation Objects.
   */
  public listLeafPresentation() : FirebaseListObservable<any[]>{
    return this._db.list('/plantproperties/leaf-presentation');
  }
  /**
   * Conencts to the Database and returns a List of all leaf shape Objects.
   */
  public listLeafShape() : FirebaseListObservable<any[]>{
    return this._db.list('/plantproperties/leaf-shape');
  }
  /**
   * Conencts to the Database and returns a List of all location Objects.
   */
  public listLocation() : FirebaseListObservable<any[]>{
    return this._db.list('/plantproperties/location');
  }
  /**
   * Conencts to the Database and returns a List of all plant blossom Objects.
   */
  public listPlantBlossoms() : FirebaseListObservable<any[]>{
    return this._db.list('/plantproperties/plant-blossoms');
  }
  /**
   * Conencts to the Database and returns a List of all plant flowering time Objects.
   */
  public listPlantFloweringTime() : FirebaseListObservable<any[]>{
    return this._db.list('/plantproperties/plant-flowering-time');
  }
  /**
   * Conencts to the Database and returns a List of all plant size Objects.
   */
  public listPlantSize() : FirebaseListObservable<any[]>{
    return this._db.list('/plantproperties/plant-size');
  }
  /**
   * Conencts to the Database and returns a List of all plant blossom Objects.
   */
  public listPlantType() : FirebaseListObservable<any[]>{
    return this._db.list('/plantproperties/plant-type');
  }

  /**
   * Connects to the Database and returns a List of all Plant Objects.
   */
  public listUserPlants() : FirebaseListObservable<Plant[]>{
    return this._db.list('/plants');
  }

  /**
   * Todo Connect to the database check if user already part of database if not add user
   * @param nick nickname of user
   * @param name name
   * @param lastname lastname
   * @param uid user id
   */
  //public addUserToDatabase(nick : string, name : string, lastname : string ,uid : number)
  public addUserToDatabase() {
    let users = this._db.list('/users',{
      query : {
        orderByChild : 'id',
        equalTo: this._af.auth.currentUser.uid
      }
    });
    users.subscribe((response) => {
      if(response.length == 0){
        console.log("no user found");
        let user = new User(
          this._af.auth.currentUser.uid,
          this._af.auth.currentUser.displayName,
          "",
          "",
          this._af.auth.currentUser.email
        )
        this.listAccounts().push(user);
      } else {
        console.log("user found")
      }
    })

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
      console.log(this.auth.auth.currentUser);
  }

  /**
   * Adds a new Plant to the database.
   * @param plant plant to add
   */
  public addPlantToDatabase(plant : Plant){
    this.listPlants().push(plant);
  }
}
