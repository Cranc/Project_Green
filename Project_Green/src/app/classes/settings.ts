import { Storage } from '@ionic/storage';

export class Settings {
    public_plant_pagination_count : number;
    user_plant_pagination_count : number;

    private storage : Storage;

    constructor(public_pag_count : number = 10, user_pag_count : number = 10, storage: Storage) {
        this.public_plant_pagination_count = public_pag_count;
        this.user_plant_pagination_count = user_pag_count;
        this.storage = storage;
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
                    resolve(true);
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
              }).then(() => {resolve(true);})
            });
          });
    }
}
