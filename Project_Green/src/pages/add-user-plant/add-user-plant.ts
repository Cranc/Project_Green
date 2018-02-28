import { Component } from '@angular/core';
import { ViewController } from 'ionic-angular';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { AngularFireAuth } from 'angularfire2/auth';
import { DatabaseServiceProvider } from '../../providers/database-service/database-service';
import { Geolocation } from '@ionic-native/geolocation';
import { Plant } from '../../app/classes/plant';
import { Camera } from '@ionic-native/camera';
import { FirebaseListObservable } from 'angularfire2/database';
import { CollectionPage } from '../collection/collection';

/**
 * Generated class for the AddUserPlantPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-add-user-plant',
  templateUrl: 'add-user-plant.html',
})
export class AddUserPlantPage {
  form: FormGroup;
  newPlant: Plant = {id: null,name: null,desc: null,lat: null,lng: null,img: null,user_id: null,parent_plant_id: null};
  listMyUserPlants: FirebaseListObservable<any[]>;
  parentplants: FirebaseListObservable<any[]>;
  uid : FirebaseListObservable<any[]>;
  image: string;
  failed_creation: boolean;
  failed_creation_msg: string;

  constructor(public viewCtrl: ViewController, public navCtrl: NavController, public navParams: NavParams, private camera: Camera,
    fb: FormBuilder, private auth: AngularFireAuth, private db: DatabaseServiceProvider, private geolocation: Geolocation) {
    this.listMyUserPlants = this.db.listMyUserPlants();
    this.parentplants = this.db.listParentPlants();
    this.uid = this.auth.auth.currentUser.uid;
    this.form = fb.group({
      'name': ['', Validators.compose([Validators.required, Validators.minLength(3)])],
      'desc': ['', Validators.compose([Validators.minLength(1)])]
    });
    this.failed_creation = false;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddUserPlantPage');
  }

  /**
   * Call this function to take a picture, its data is saved under "image" variable
   */
  takePicture(){
    this.camera.getPicture({
        quality: 100,
        destinationType: this.camera.DestinationType.DATA_URL,
        encodingType: this.camera.EncodingType.JPEG,
        mediaType: this.camera.MediaType.PICTURE,
        targetWidth: 1000,
        targetHeight: 1000
    }).then((imageData) => {
      // imageData is a base64 encoded string
        this.image = "data:image/jpeg;base64," + imageData;
    }, (err) => {
        console.log(err);
    });
  }

  /**
   * Add Plant to User-Plant-Database
   */
  public addPlant() {
    let newID: number = 0;
    for(let i of this.listMyUserPlants){
      newID = newID+1;
    }
    this.newPlant.id = newID+1;
    this.newPlant.name = this.form.get('name')._value;
    this.newPlant.desc = this.form.get('desc')._value;

    this.geolocation.getCurrentPosition().then((resp) => {
      this.newPlant.lat = resp.coords.latitude;
      this.newPlant.lng = resp.coords.longitude;
    }).catch((error) => {
      console.log('Error getting location', error);
      this.failed_creation = true;
      this.failed_creation_msg = error.message;
    });

    this.newPlant.user_id = this.uid;

    for(let i of this.parentplants){
      if(this.newPlant.name == i.name)
        this.newPlant.parent_plant_id = i.id;
    }

    this.db.addUserPlantToDatabase(this.newPlant);
    this.navCtrl.push(CollectionPage);
  }

  /**
   * logForm that logs the values of the formGroup.
   */
  public logForm(){
    console.log(this.form.value);
  }

}
