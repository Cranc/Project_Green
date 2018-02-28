import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { DatabaseServiceProvider } from '../../providers/database-service/database-service';
import { FirebaseListObservable } from 'angularfire2/database';
import { AngularFireDatabase } from 'angularfire2/database';
import * as firebase from 'firebase/app';
import * as lodash from 'lodash';


/**
 * Generated class for the IdentifyPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-identify',
  templateUrl: 'identify.html',
})
export class IdentifyPage {

  parentplants: any[];
  filteredParentplants: any[];

  /// filter-able properties
  blossom_color_id : number;
  blossom_shape_id : number;
  fruit_color_id : number;
  inflorescence_id : number;
  leaf_blade_id : number;
  leaf_edge_id : number;
  leaf_nerves_id : number;
  leaf_presentation_id : number;
  leaf_shape_id : number;
  location_id : number;
  plant_blossoms_id : number;
  plant_flowering_time_id : number;
  plant_size_id : number;
  plant_type_id : number;

  /// Active filter rules
  filters = {}

  planttype : FirebaseListObservable<any[]>;
  plantsize : FirebaseListObservable<any[]>;
  planttime : FirebaseListObservable<any[]>;
  plantblossoms : FirebaseListObservable<any[]>;
  plantlocation : FirebaseListObservable<any[]>;
  plantleafshape : FirebaseListObservable<any[]>;
  plantleafpresentation : FirebaseListObservable<any[]>;
  plantleafnerves : FirebaseListObservable<any[]>;
  plantleafedge : FirebaseListObservable<any[]>;
  plantleafblade : FirebaseListObservable<any[]>;
  plantinflorescence : FirebaseListObservable<any[]>;
  plantfruitcolor : FirebaseListObservable<any[]>;
  plantblossomshape : FirebaseListObservable<any[]>;
  plantblossomcolor : FirebaseListObservable<any[]>;

  constructor(public navCtrl: NavController, public navParams: NavParams, public db: DatabaseServiceProvider, public af: AngularFireDatabase) {

    this.planttype = this.db.listPlantType();
    this.plantsize = this.db.listPlantSize();
    this.planttime = this.db.listPlantFloweringTime();
    this.plantblossoms = this.db.listPlantBlossoms();
    this.plantlocation = this.db.listLocation();
    this.plantleafshape = this.db.listLeafShape();
    this.plantleafpresentation = this.db.listLeafPresentation();
    this.plantleafnerves = this.db.listLeafNerves();
    this.plantleafedge = this.db.listLeafEdge();
    this.plantleafblade = this.db.listLeafBlade();
    this.plantinflorescence = this.db.listInflorescence();
    this.plantfruitcolor = this.db.listFruitColor();
    this.plantblossomshape = this.db.listBlossomShape();
    this.plantblossomcolor = this.db.listBlossomColor();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad IdentifyPage');
  }

  ngOnInit() {
    this.af.list('/parent-plant')
      .subscribe(parentplants => {
        this.parentplants = parentplants;
        this.applyFilters()
    })
   }

  applyFilters() {
    this.filteredParentplants = lodash.filter(this.parentplants, lodash.conforms(this.filters) );
  }

  /// filter property by equality to rule
 filterExact(property: string, rule: any) {
  this.filters[property] = val => {
    let counter: number = 0;
    
    for(let i of rule)
      for(let j of val)
        if(i == j)
          counter++;
    if(counter == rule.length)
      return true;
    return false;
  };
  this.applyFilters();
 }

 /// removes filter
  removeFilter() {
    this.filters = {};
    this.blossom_color_id = null;
    this.blossom_shape_id = null;
    this.fruit_color_id = null;
    this.inflorescence_id = null;
    this.leaf_blade_id = null;
    this.leaf_edge_id = null;
    this.leaf_nerves_id = null;
    this.leaf_presentation_id = null;
    this.leaf_shape_id = null;
    this.location_id = null;
    this.plant_blossoms_id = null;
    this.plant_flowering_time_id = null;
    this.plant_size_id = null;
    this.plant_type_id = null;
    this.applyFilters();
  }

}
