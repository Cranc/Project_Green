import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { DatabaseServiceProvider } from '../../providers/database-service/database-service';
import { FirebaseListObservable } from 'angularfire2/database';
import { debug } from 'util';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  accounts : FirebaseListObservable<any[]>;
  constructor(public navCtrl: NavController, public db:DatabaseServiceProvider) {
    this.accounts = this.db.listAccounts();
    debugger;
  }

}
