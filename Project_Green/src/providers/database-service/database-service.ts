import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import {AngularFireDatabase, FirebaseListObservable, FirebaseObjectFactory, FirebaseObjectObservable } from 'angularfire2/database';
import { query } from '@angular/core/src/animation/dsl';
import { User } from '../../app/classes/user';
import { Plant } from '../../app/classes/plant';
import { Parent_Plant } from '../../app/classes/parent_plant';
import { error } from 'util';
//import { database } from 'firebase/app';
//import { AngularFireModule } from 'angularfire2';

/*
  Generated class for the DatabaseServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class DatabaseServiceProvider {

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
   * Connects to the Database and returns the user that is currently logged in (if he exists).
   */
  public listGetUser(): FirebaseObjectObservable<User[]>{
    let key = this._af.auth.currentUser.uid;
    //console.log(key);
    return this._db.object(`/users/${key}`);
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
   * Connects to the Database and returns a list of all plants with the given id.
   * @param offset amount of items to get
   * @param plant_id id of the plant type
   */
  public listUserPlantsWithId(offset: number, plant_id: number) : FirebaseListObservable<Plant[]>{
    return this._db.list('/plants',{
      query: {
        orderByChild: 'parent_plant_id',
        equalTo: plant_id,
        limitToFirst: offset + 1
      }
    })
  }

  /**
   * Todo Connect to the database check if user already part of database if not add user
   *
   */
  public addUserToDatabase(nickName = ""){
    let key = this._af.auth.currentUser.uid;
    /*let user = this.listGetUser();
    var sub = user.subscribe((response) => {
      if(response.id == undefined){
        console.log("could not find a user!");
        let n_user = new User(
          this._af.auth.currentUser.uid,
          this._af.auth.currentUser.displayName,
          "",
          "",
          this._af.auth.currentUser.email
        )
        if(nickName !== "")
          n_user.nick = nickName;
        user.set({
          "id" : n_user.id,
          "nick" : n_user.nick,
          "name" : n_user.name,
          "lastname" : n_user.lastname,
          "mail" : n_user.mail
        });
        sub.unsubscribe();
      } else {
        console.log("user already exists!");
        sub.unsubscribe();
      }
    })*/

    let users = this._db.list(`/users/${key}`);
    var sub = users.subscribe((response) => {
      if(response.length == 0){
        console.log("no user found");
        let user = new User(
          this._af.auth.currentUser.uid,
          this._af.auth.currentUser.displayName,
          "",
          "",
          this._af.auth.currentUser.email
        )
        console.log(nickName);
        console.log(user);
        if(nickName !== "")
          user.nick = nickName;
        console.log(user);
        //this.listAccounts().push(user);
        this.listGetUser().set(user);
        sub.unsubscribe();
      } else {
        console.log("user found")
        sub.unsubscribe();
      }
    })
    console.log(this.auth.auth.currentUser);
  }

  /**
   * Updates the Users Email with the given one
   * @param email email to update
   */
  public updateUserEmail(email: string){
    var user = this.listGetUser();
    var sub = user.subscribe((response) => {
      if(response.length == 0){
        console.log("could not find a user to update!");
        sub.unsubscribe();
      } else {
        user.update({"mail" : email});
        sub.unsubscribe();
      }
    })
  }

  /**
   * Updates the users nick name.
   * @param name name to change
   */
  public updateUserNick(name: string){
    var user = this.listGetUser();
    var sub = user.subscribe((response) => {
      if(response.length == 0){
        console.log("could not find a user to update!");
        sub.unsubscribe();
      } else {
        user.update({"nick" : name});
        sub.unsubscribe();
      }
    })
  }

  /**
   * Updates the Users name with the given one
   * @param name
   */
  public updateUserName(name: string){
    var user = this.listGetUser();
    var sub = user.subscribe((response) => {
      if(response.length == 0){
        console.log("could not find a user to update!");
        sub.unsubscribe();
      } else {
        user.update({"name" : name});
        sub.unsubscribe();
      }
    })
  }

  /**
   * Updates the Users lastname with the given one
   * @param lastname
   */
  public updateUserLastname(lastname: string){
    var user = this.listGetUser();
    var sub = user.subscribe((response) => {
      if(response.length == 0){
        console.log("could not find a user to update!");
        sub.unsubscribe();
      } else {
        user.update({"lastname" : lastname});
        sub.unsubscribe();
      }
    })
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
   * Connects to the Database and returns a List of Parent_Plant Object starting by the given key.
   * @param offset number of items to return.
   * @param key key to start at (Optional) not giving a key results in starting from begining.
   */
  public listParentPlantsFromTo(offset, key?): FirebaseListObservable<Parent_Plant[]>{
    return this._db.list('/parent-plant',{
      query: {
        orderByKey: true,
        startAt: key,
        limitToFirst: offset + 1
      }
    })
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
   * function to fill Parent_Plant Lexicon (DO NOT USE UNLESS YOU KNOW WHAT YOU ARE DOING!!!)
   */
  private initParentPlants(){
    var plant;
    /*plant = new Parent_Plant(
      "Schneeglöckchen",
      "Schneeglöckchen-Arten sind ausdauernde krautige Pflanzen. Diese Geophyten bilden Zwiebeln als Überdauerungsorgane. Zwei bis – selten – drei parallelnervige Laubblätter stehen grundständig zusammen.",
      [2], [0], [0,1], [0,1], [0], [0,3,4,9,10], [0], [1], [0], [0], [0], [3], [7], [8]
    );
    this.addDatabasePlantToDatabase(plant);
    plant = new Parent_Plant(
      "Märzenbecher",
      "Die Frühlingsknotenblume ist eine ausdauernde krautige Pflanze, die Wuchshöhen von 10 bis 30 cm erreicht. Sie bildet unterirdische Zwiebeln als Überdauerungsorgane aus und zählt daher zu den Zwiebel-Geophyten.",
      [2], [0,1], [0,1,2], [1], [3], [0,3,4,8,9,10], [0], [1], [0], [0], [0], [3], [7], [8]
    );
    this.addDatabasePlantToDatabase(plant);
    plant = new Parent_Plant(
      "Vogelbeere",
      "Die Vogelbeere, gemeinsprachlich häufiger die Eberesche oder der Vogelbeerbaum (Sorbus aucuparia), ist eine Pflanzenart aus der Gattung Mehlbeeren (Sorbus) innerhalb der Familie der Rosengewächse (Rosaceae).",
      [0], [0], [3,4,5,6,7,8], [1,2], [2], [0,1,2,3,4,5,6,7,9,10], [0], [1], [2], [3], [0], [0], [6], [3]
    );
    this.addDatabasePlantToDatabase(plant);
    plant = new Parent_Plant(
      "Färberröte",
      "Die Färberröten oder Krappe (Rubia) sind eine Pflanzengattung innerhalb der Familie der Rötegewächse (Rubiaceae). Die 60 bis 80 Arten sind in der Alten Welt in Afrika und Eurasien weitverbreitet.",
      [3], [1,4], [1,2,3,4,5], [1,2,3], [2], [3], [3], [1], [3], [0,1], [0], [0,3], [7], [11]
    );
    this.addDatabasePlantToDatabase(plant);

    plant = new Parent_Plant(
      "Efeu",
      "Der Gemeine Efeu, auch Gewöhnlicher Efeu oder kurz Efeu (Hedera helix), ist eine Pflanzenart aus der Gattung Efeu (Hedera) innerhalb der Familie der Araliengewächse (Araliaceae) und wurde früher auch mit Epheu bezeichnet.",
      [3], [1,4], [2,3,4,5,6,7,8,9], [4], [1], [2,3,4,10,11], [1], [1], [2], [0,6], [1], [0,6], [3,5], [5]
    );
    this.addDatabasePlantToDatabase(plant);

    plant = new Parent_Plant(
      "Heidelbeere",
      "Die Heidelbeere (Vaccinium myrtillus), regional auch Besing, Blaubeere, Schwarzbeere, Mollbeere, Wildbeere, Waldbeere, Bickbeere, Zeckbeere, Moosbeere oder (besonders auch schweiz. und süddeut.) Heubeere genannt, ist eine Art aus der Gattung der Heidelbeeren (Vaccinium) in der Familie der Heidekrautgewächse (Ericaceae).",
      [1], [0,2], [1,2], [1,2,3], [2], [0,3,7,9,10], [1], [1], [2], [1], [3], [0], [3], [0]
    );
    this.addDatabasePlantToDatabase(plant);

    plant = new Parent_Plant(
      "Gemeiner Goldregen",
      "Der Gemeine Goldregen (Laburnum anagyroides), auch Gewöhnlicher Goldregen genannt, ist eine Pflanzenart aus der Gattung Goldregen (Laburnum). Sie ist giftig.",
      [0,1], [0,1], [5,6,7], [1,2], [5], [3,4,10], [1], [0], [2], [0], [2], [14], [7], [0]
    );
    this.addDatabasePlantToDatabase(plant);

    */

    /*plant = new Parent_Plant(
      "Efeu",
      "",
      [], [], [], [], [], [], [], [], [], [], [], [], [], []
    );
    this.addDatabasePlantToDatabase(plant);*/
  }
}
