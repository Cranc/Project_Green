import { Storage } from '@ionic/storage';

export class Settings {
    public_plant_pagination_count : number;
    user_plant_pagination_count : number;
    map_points : number;

    private storage : Storage;

    constructor(storage: Storage,public_pag_count : number = 10, user_pag_count : number = 10, map_points : number = 10) {
        this.public_plant_pagination_count = public_pag_count;
        this.user_plant_pagination_count = user_pag_count;
        this.storage = storage;
        this.map_points = map_points;
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
