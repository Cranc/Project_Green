import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { DatabaseServiceProvider } from '../../providers/database-service/database-service';
import { FirebaseListObservable } from 'angularfire2/database';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  accounts : FirebaseListObservable<any[]>;
  blossomcolor : FirebaseListObservable<any[]>;
  plantgroup : FirebaseListObservable<any[]>;
  plantsubgroup : FirebaseListObservable<any[]>;

  constructor(public navCtrl: NavController, public db:DatabaseServiceProvider) {
    this.accounts = this.db.listAccounts();
    this.blossomcolor = this.db.listBlossomColor();
    this.plantgroup = this.db.listPlantGroup();
    this.plantsubgroup = this.db.listPlantSubGroup();
  }

}
