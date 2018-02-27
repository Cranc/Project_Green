import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { DatabaseServiceProvider } from '../../providers/database-service/database-service';
import { FirebaseListObservable } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import { Plant } from '../../app/classes/plant';
import { PopoverController } from 'ionic-angular';
import { PopoverPage } from '../popover/popover';

//setting stuff
import { SettingsProvider } from '../../providers/settings/settings';

import { Events } from 'ionic-angular';
import { Settings } from '../../app/classes/settings';
import { Storage } from '@ionic/storage';

import * as _ from "lodash";

/**
 * Generated class for the UserPlantPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-user-plant',
  templateUrl: 'user-plant.html',
})
export class UserPlantPage {
  plants: Plant[] = [];
  nextKey: any; // for next button
  prevKeys: any[] = []; // for prev button
  subscription: any;

  error: boolean;

  list: FirebaseListObservable<Plant[]>;

  constructor(public auth:AngularFireAuth, public events: Events, public settings: SettingsProvider, public navCtrl: NavController, public navParams: NavParams, public db: DatabaseServiceProvider, public popoverCtrl: PopoverController) {
    this.list = this.db.listMyUserPlants();

    /*this.db.listMyUserPlants().subscribe(snapshots=>{
      snapshots.forEach(snapshot => {
        console.log(snapshot.key, snapshot.val());
      });
    })*/
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad UserPlantPage');
    this.error = false;
    this.settings.load().then(() => {
      this.loadMore();
    });

    let plant = new Plant("", "testplant 2", "this is a test plant designed to be found by test@test.com", 21,20,"","-L4LgfHiGJlYmb4KnQIr",null);

    //this.db.addUserPlantToDatabase(plant);
    this.events.subscribe('settings:changed', () => {
      // user and time are the same arguments passed in `events.publish(user, time)`
      this.settings.load().then(() => {
        this.loadMore();
      });
    });
  }

   /**
   * opens a popover for the picked plant.
   * @param plant item that was clicked
   */
  public itemClicked(plant: Plant){
    //console.log(plant);
    let popover = this.popoverCtrl.create(PopoverPage, plant);
    popover.present();
  }

  /**
   * loads the next "page" of items.
   */
  nextPage() {
    if(this.error){
      this.loadMore();
      this.error = false;
      return;
    }

    if(this.plants.length < this.settings.user_plant_pagination_count)
      return;


    this.prevKeys.push(_.first(this.plants)['$key']) // set current key as pointer for previous page
    this.loadMore(this.nextKey)
    //console.log(this.prevKeys);
  }

  /**
   * returns to the previous "page" of items.
   */
  prevPage() {
    if(this.error){
      this.loadMore();
      this.error = false;
      return;
    }

    const prevKey = _.last(this.prevKeys) // use last key in array
    this.prevKeys = _.dropRight(this.prevKeys) // then remove the last key in the array

    if(this.prevKeys.length === 0){
      this.loadMore();
      return;
    }

      this.loadMore(prevKey)
  }

  /**
   * loads the next batch of items from the database.
   * @param key key to continue with.
   */
  public loadMore(key = ""){
    this.plants = [];

    var offset = this.settings.user_plant_pagination_count;
    if(offset === undefined){
      //this.settings = new Settings(this.storage);
      this.settings.load()
      .then((val) => {

        let sub = this.list.subscribe((plant) => {
          var index = 0;
          for (let p of plant){

            this.plants.push(p);
            if(p.id === key)
              index = this.plants.indexOf(p);
          }

          this.plants = this.plants.slice(index,index + this.settings.user_plant_pagination_count);
          this.nextKey = this.plants[this.plants.length - 1].id;

          sub.unsubscribe();
        })

      },error => {
        console.log(error);
        this.error = true;
      })

    } else {

      let sub = this.list.subscribe((plant) => {
        var index = 0;
        for (let p of plant){

          this.plants.push(p);
          if(p.id === key)
            index = this.plants.indexOf(p);
        }

        this.plants = this.plants.slice(index,index + this.settings.user_plant_pagination_count);
        this.nextKey = this.plants[this.plants.length - 1].id;

        sub.unsubscribe();
      })


    }
  }

}
