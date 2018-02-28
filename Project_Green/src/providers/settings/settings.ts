import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Events } from 'ionic-angular';

/*
  Generated class for the SettingsProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class SettingsProvider {

    public_plant_pagination_count : number;
    user_plant_pagination_count : number;
    map_points : number;

    constructor(public storage: Storage, public events: Events) {
        console.log('Hello SettingsProvider Provider');
        this.public_plant_pagination_count = 10;
        this.user_plant_pagination_count = 10;
        this.map_points = 10;
        this.load();
    }
    /**
     * saves the settings to local storage
     * returns a promise<boolean>
     */
    public save() : Promise<boolean>{
        return new Promise((resolve) => {
            this.storage.set('public_plant_pagination_count', this.public_plant_pagination_count)
            .then(() => {
                this.storage.set('user_plant_pagination_count', this.user_plant_pagination_count)
                .then(() => {
                    this.storage.set('map_points', this.map_points)
                    .then(() => {
                        this.events.publish('settings:changed');
                        resolve(true);
                    })
                });
            });
        });
    }

    /**
     * loads the setting saved to local storage if there
     * returns a promise<boolean>
     */
    public load() : Promise<boolean> {
        return new Promise((resolve) => {
            this.storage.get('public_plant_pagination_count')
            .then((val) => {
              if(val)
                this.public_plant_pagination_count = val;
            })
            .then(() => {
              this.storage.get('user_plant_pagination_count')
              .then((val) => {
                if(val)
                  this.user_plant_pagination_count = val;
              }).then(() => {
                  this.storage.get('map_points')
                  .then((val) => {
                      if(val)
                        this.map_points = val;
                  }).then(() => {resolve(true);})
                })
            });
          });
    }

}
