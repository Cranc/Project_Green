import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { DatabaseServiceProvider } from '../../providers/database-service/database-service';
import { FirebaseListObservable } from 'angularfire2/database';
import { Parent_Plant } from '../../app/classes/parent_plant';
import { PopoverController } from 'ionic-angular';
import { PopoverPage } from '../popover/popover';

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
  plants: FirebaseListObservable<Parent_Plant[]>;

  constructor(public navCtrl: NavController, public navParams: NavParams, public db: DatabaseServiceProvider, public popoverCtrl: PopoverController) {
    this.plants = this.db.listParentPlants();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DatabasePlantsPage');
  }

  public itemClicked(plant: Parent_Plant){
    //console.log(plant);
    let popover = this.popoverCtrl.create(PopoverPage, plant);
    popover.present();
  }

}
