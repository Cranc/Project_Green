import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Events } from 'ionic-angular';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { DatabaseServiceProvider } from '../../providers/database-service/database-service';

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

  constructor(public navCtrl: NavController, public navParams: NavParams, public events: Events, public fb : FormBuilder, public db : DatabaseServiceProvider) {
    this.names = fb.group({
      'name' : ['', Validators.compose([Validators.required,Validators.minLength(1)])],
      'lastname' : ['', Validators.compose([Validators.required,Validators.minLength(1)])]
    })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SettingsPage');
  }

  public onPaginationChange() {
    //console.log(this.pagination_count);
    //toDO create Settings Class and add to publish
    this.events.publish("settingsChanged",null);
  }

  public applyNames() {
    //console.log(this.names);
    if(this.names.get('name').valid)
      this.db.updateUserName(this.names.get('name').value);

    if(this.names.get('lastname').valid)
      this.db.updateUserLastname(this.names.get('lastname').value);
  }
}
