import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { DatabaseServiceProvider } from '../../providers/database-service/database-service';
import { FirebaseListObservable } from 'angularfire2/database';
import { Parent_Plant } from '../../app/classes/parent_plant';
import { PopoverController } from 'ionic-angular';
import { PopoverPage } from '../popover/popover';

//setting stuff
import { Events } from 'ionic-angular';
import { Settings } from '../../app/classes/settings';
import { Storage } from '@ionic/storage';

import * as _ from "lodash";

/**
 * Generated class for the DatabasePlantsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-database-plants',
  templateUrl: 'database-plants.html',
})
export class DatabasePlantsPage {
  plants: any;
  offset: number;
  nextKey: any; // for next button
  prevKeys: any[] = []; // for prev button
  subscription: any;
  settings: Settings;

  constructor(private storage: Storage, public events: Events, public navCtrl: NavController, public navParams: NavParams, public db: DatabaseServiceProvider, public popoverCtrl: PopoverController) {
    this.events.subscribe('settingsChanged', (settings) => {
      this.settings = settings;
      this.offset = this.settings.public_plant_pagination_count;
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DatabasePlantsPage');
    this.loadMore();
  }

  /**
   * opens a popover for the picked plant.
   * @param plant item that was clicked
   */
  public itemClicked(plant: Parent_Plant){
    //console.log(plant);
    let popover = this.popoverCtrl.create(PopoverPage, plant);
    popover.present();
  }

  /**
   * loads the next "page" of items.
   */
  nextPage() {
    this.prevKeys.push(_.first(this.plants)['$key']) // set current key as pointer for previous page
    this.loadMore(this.nextKey)
    console.log(this.prevKeys);
  }

  /**
   * returns to the previous "page" of items.
   */
  prevPage() {
    const prevKey = _.last(this.prevKeys) // use last key in array
    this.prevKeys = _.dropRight(this.prevKeys) // then remove the last key in the array
    this.loadMore(prevKey)
  }

  /**
   * loads the next batch of items from the database.
   * @param key key to continue with.
   */
  public loadMore(key?){
    if(this.offset === undefined){
      this.settings = new Settings(10,10, this.storage);
      this.settings.load()
      .then((val) => {
        this.offset = this.settings.public_plant_pagination_count;
        this.db.listParentPlantsFromTo(this.offset, key).
        subscribe((plant) => {
          console.log(plant);
          this.plants = _.slice(plant, 0, this.offset);
          this.nextKey = _.get(plant[this.offset], '$key')
          console.log(_.get(plant[this.offset], '$key'));
        });
      })
    } else {
      this.db.listParentPlantsFromTo(this.offset, key).
      subscribe((plant) => {
        console.log(plant);
        this.plants = _.slice(plant, 0, this.offset);
        this.nextKey = _.get(plant[this.offset], '$key')
        console.log(_.get(plant[this.offset], '$key'));
      });
    }
  }
}
