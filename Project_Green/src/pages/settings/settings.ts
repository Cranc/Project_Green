import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { DatabaseServiceProvider } from '../../providers/database-service/database-service';

import { resolve } from 'url';

import { SettingsProvider } from '../../providers/settings/settings';

/**
 * Generated class for the SettingsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html',
})
export class SettingsPage {
  names: FormGroup;
  pagination_count: number;
  user_pagination_count: number;
  map_points: number;

  //settings: Settings;

  constructor(public settings: SettingsProvider, public navCtrl: NavController, public navParams: NavParams, public fb : FormBuilder, public db : DatabaseServiceProvider) {
    this.names = fb.group({
      'name' : ['', Validators.compose([Validators.required,Validators.minLength(1)])],
      'lastname' : ['', Validators.compose([Validators.required,Validators.minLength(1)])]
    })

    this.initSettings();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SettingsPage');
  }

  /**
   * Initializes the Settings of the app
   */
  private initSettings(){
    //this.settings = new Settings(this.storage);
    this.settings.load().then((val) => {
      //console.log(val);
      if(val == true) {
        this.pagination_count = this.settings.public_plant_pagination_count;
        this.user_pagination_count = this.settings.user_plant_pagination_count;
        this.map_points = this.settings.map_points;
      }
    });
  }

  /**
   * called when pagination settings are changed
   */
  public onPaginationChange() {
    //console.log(this.pagination_count);
    //toDO create Settings Class and add to publish
    this.settings.public_plant_pagination_count = this.pagination_count;
    this.settings.user_plant_pagination_count = this.user_pagination_count;
    this.settings.save();
  }

  /**
   * called when number of map points are changed
   */
  public onMapCountChange() {
    this.settings.map_points = this.map_points;
    this.settings.save();
  }

  /**
   * called when apply button for name change is pressed
   */
  public applyNames() {
    //console.log(this.names);
    if(this.names.get('name').valid)
      this.db.updateUserName(this.names.get('name').value);

    if(this.names.get('lastname').valid)
      this.db.updateUserLastname(this.names.get('lastname').value);
  }
}
