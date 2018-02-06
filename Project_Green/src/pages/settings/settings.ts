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

  constructor(public navCtrl: NavController, public navParams: NavParams, public events: Events, public fb : FormBuilder, public db : DatabaseServiceProvider, private storage: Storage) {
    this.names = fb.group({
      'name' : ['', Validators.compose([Validators.required,Validators.minLength(1)])],
      'lastname' : ['', Validators.compose([Validators.required,Validators.minLength(1)])]
    })
    this.loadSettings().then((val) => {
      console.log(val);
      this.pagination_count = val.public_plant_pagination_count;
      this.user_pagination_count = val.user_plant_pagination_count;
      this.events.publish('settingsChanged', val);
    });

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SettingsPage');
  }

  public onPaginationChange() {
    //console.log(this.pagination_count);
    //toDO create Settings Class and add to publish
    var set = new Settings(this.pagination_count, this.user_pagination_count)
    this.saveSettings();
    this.events.publish("settingsChanged", set);
  }

  public applyNames() {
    //console.log(this.names);
    if(this.names.get('name').valid)
      this.db.updateUserName(this.names.get('name').value);

    if(this.names.get('lastname').valid)
      this.db.updateUserLastname(this.names.get('lastname').value);
  }

  public saveSettings(){
    this.storage.set('public_plant_pagination_count', this.pagination_count);
    this.storage.set('user_plant_pagination_count', this.user_pagination_count);
  }

  public loadSettings() : Promise<Settings> {
    return new Promise((resolve) => {
      var set = new Settings();
      this.storage.get('public_plant_pagination_count')
      .then((val) => {
        if(val)
          set.public_plant_pagination_count = val;
      })
      .then(() => {
        this.storage.get('user_plant_pagination_count')
        .then((val) => {
          if(val)
            set.user_plant_pagination_count = val;
        }).then(() => {resolve(set);})
      })
    });

  }
}
