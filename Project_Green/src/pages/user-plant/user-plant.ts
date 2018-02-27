import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { DatabaseServiceProvider } from '../../providers/database-service/database-service';
import { FirebaseListObservable } from 'angularfire2/database';
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
  plants: any;
  nextKey: any; // for next button
  prevKeys: any[] = []; // for prev button
  subscription: any;

  error: boolean;

  constructor(public events: Events, public settings: SettingsProvider, public navCtrl: NavController, public navParams: NavParams, public db: DatabaseServiceProvider, public popoverCtrl: PopoverController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad UserPlantPage');
    this.error = false;
    this.settings.load().then(() => {
      this.loadMore();
    });

    /*this.events.subscribe('settings:changed', () => {
      // user and time are the same arguments passed in `events.publish(user, time)`
      this.settings.load().then(() => {
        this.loadMore();
      });
    });*/
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
    this.loadMore(prevKey)
  }

  /**
   * loads the next batch of items from the database.
   * @param key key to continue with.
   */
  public loadMore(key?){
    var offset = this.settings.user_plant_pagination_count;
    if(offset === undefined){
      //this.settings = new Settings(this.storage);
      this.settings.load()
      .then((val) => {
        offset = this.settings.user_plant_pagination_count;
        this.db.listUserPlantsFromTo(offset, key).
        subscribe((plant) => {
          console.log(plant);
          this.plants = _.slice(plant, 0, offset);
          this.nextKey = _.get(plant[offset], '$key')
          //console.log(_.get(plant[this.offset], '$key'));
        });
      },error => {
        console.log(error);
        this.error = true;
      })
    } else {
      this.db.listUserPlantsFromTo(offset, key).
      subscribe((plant) => {
        this.plants = _.slice(plant, 0, offset);
        this.nextKey = _.get(plant[offset], '$key')
      },error => {
        console.log(error);
        this.error = true;
      });
    }
  }

}
