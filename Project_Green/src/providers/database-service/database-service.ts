import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import {AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { query } from '@angular/core/src/animation/dsl';
import { User } from '../../app/classes/user';
import { Plant } from '../../app/classes/plant';
import { Parent_Plant } from '../../app/classes/parent_plant';
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
    //this.initParentPlants();
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
   *
   */
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
    console.log(this.auth.auth.currentUser);
  }

  /**
   * Adds a new Plant to the database.
   * @param plant plant to add
   */
  public addUserPlantToDatabase(plant : Plant){
    this.listUserPlants().push(plant);
  }

  /**
   * Connects to the Database and returns a List of all Parent_Plant Objects.
   */
  public listParentPlants() : FirebaseListObservable<Parent_Plant[]>{
    return this._db.list('/parent-plant');
  }

  /**
   * Adds a new Parent_Plant to the database (ONLY MEANT TO FILL THE DATABASE INITIALLY).
   * @param plant the parent plant to add to the lexicon.
   */
  private addDatabasePlantToDatabase(plant : Parent_Plant){
    let ref = this.listParentPlants().push(plant);
    ref.update({"id" : ref.key});
  }

  /**
   * function to fill Parent_Plant Lexicon (only use ONCE to fill database if empty)
   */
  public initParentPlants(){
    var plant = new Parent_Plant(
      "Schneeglöckchen",
      "Schneeglöckchen-Arten sind ausdauernde krautige Pflanzen. Diese Geophyten bilden Zwiebeln als Überdauerungsorgane. Zwei bis – selten – drei parallelnervige Laubblätter stehen grundständig zusammen.",
      [2], [0], [0,1], [0,1], [0], [0,3,4,9,10], [0], [1], [0], [0], [0], [3], [7], [8]
    );
    this.addDatabasePlantToDatabase(plant);
  }
}
