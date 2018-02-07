import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Events } from 'ionic-angular';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { DatabaseServiceProvider } from '../../providers/database-service/database-service';
import { Settings } from '../../app/classes/settings';
import { Storage } from '@ionic/storage';
import { resolve } from 'url';

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

  settings: Settings;

  constructor(public navCtrl: NavController, public navParams: NavParams, public events: Events, public fb : FormBuilder, public db : DatabaseServiceProvider, private storage: Storage) {
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
    this.settings = new Settings(10, 10, this.storage);
    this.settings.load();
    this.settings.load().then((val) => {
      //console.log(val);
      if(val == true) {
        this.pagination_count = this.settings.public_plant_pagination_count;
        this.user_pagination_count = this.settings.user_plant_pagination_count;
      }
      this.events.publish('settingsChanged', this.settings);
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
    this.events.publish("settingsChanged", this.settings);
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
