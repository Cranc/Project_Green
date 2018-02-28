import { Component, ViewChild, ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ViewController } from 'ionic-angular';

//Geolocation
import { Geolocation } from '@ionic-native/geolocation';
import { DatabaseServiceProvider } from '../../providers/database-service/database-service';

//Settings
import { SettingsProvider } from '../../providers/settings/settings';
import { Promise } from 'firebase/app';

declare var google;

/**
 * Generated class for the PopoverPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-popover',
  templateUrl: 'popover.html',

})
export class PopoverPage {

  user_flag: boolean;

  msg: string;
  header: string;
  id: string;

  //map stuff
  @ViewChild('map') mapElement: ElementRef;
  map: any;
  start = 'chicago, il';
  end = 'chicago, il';
  directionsService = new google.maps.DirectionsService;
  directionsDisplay = new google.maps.DirectionsRenderer;
  markers = [];

  constructor(private settings: SettingsProvider, public viewCtrl: ViewController, public navCtrl: NavController, private geolocation: Geolocation, private db: DatabaseServiceProvider) {
    this.msg = this.viewCtrl.data.desc;
    this.header = this.viewCtrl.data.name;
    this.id = this.viewCtrl.data.id;

    if(this.viewCtrl.data.lat === undefined)
      this.user_flag = false;
    else
      this.user_flag = true;
  }

  ionViewDidLoad(){
    console.log("Popover was loaded!");

    this.settings.load().then(() => {
      this.initMap().then(() => {google.maps.event.trigger(this.map, 'resize');});
    });
  }

  /**
   * initalizes the map.
   */
  initMap() : Promise<boolean> {
    return new Promise ((resolve) => {
      this.geolocation.getCurrentPosition({ maximumAge: Infinity, timeout: 10000, enableHighAccuracy: true }).then((resp) => {
      let mylocation = new google.maps.LatLng(resp.coords.latitude,resp.coords.longitude);
      let image = 'assets/imgs/user_icon_small.png';

      this.addMarker(mylocation, image);
      this.getPlantLocations();
      this.getUserPlantLocation();

      this.map = new google.maps.Map(this.mapElement.nativeElement, {
        zoom: 7,
        center: mylocation,
        mapTypeId: google.maps.MapTypeId.ROADMAP,
      });

      this.setMapOnAll(this.map);
      this.directionsDisplay.setMap(this.map);
      resolve(true);
    }, error => {
      console.log(error);
      resolve(false);
    });

    let watch = this.geolocation.watchPosition();
    watch.subscribe((data) => {
      this.deleteMarkers();
      let updatelocation = new google.maps.LatLng(data.coords.latitude,data.coords.longitude);
      let image = 'assets/imgs/user_icon_small.png';
      this.addMarker(updatelocation,image);
      this.setMapOnAll(this.map);
      this.directionsDisplay.setMap(this.map);
    }, error => {
      console.log(error);
    });
    });
  }

  public setUserFlag(){
    this.user_flag = true;
  }

  /**
   * gets user plant location and places the marker on the map.
   */
  public getUserPlantLocation() {
    if(!this.user_flag)
      return;

      let updatelocation = new google.maps.LatLng(this.viewCtrl.data.lat, this.viewCtrl.data.lng);
      let image = 'assets/imgs/map_icon_small.png';
      this.addMarker(updatelocation, image);
  }

  /**
   * gets plant locations and places the markers on the map.
   */
  public getPlantLocations() {
    if(this.user_flag)
      return;

    this.db.listUserPlantsWithId(this.settings.map_points,this.id).subscribe((val) => {
      //this.clearMarkers();
      val.forEach((value) => {
        let updatelocation = new google.maps.LatLng(value.lat, value.lng);
        let image = 'assets/imgs/map_icon_small.png';
        this.addMarker(updatelocation, image);
        //console.log(this.markers);
      })
    })
  }

  /**
   * Adds a marker to the buffer.
   * @param location location of the marker..
   * @param image icon of the marker
   */
  addMarker(location, image) {
    let marker = new google.maps.Marker({
      position: location,
      map: this.map,
      icon: image
    });
    this.markers.push(marker);
    console.log("markers: " + marker);
  }

  /**
   * adds markers from the buffer to the map.
   * @param map map the marker are added to.
   */
  setMapOnAll(map) {
    console.log(this.markers);
    for (var i = 0; i < this.markers.length; i++) {
      this.markers[i].setMap(map);
    }
  }

  /**
   * cleares all maps.
   */
  clearMarkers() {
    this.setMapOnAll(null);
  }

  /**
   * cleares the marker buffer and maps.
   */
  deleteMarkers() {
    this.clearMarkers();
    this.markers = [];
  }

  /**
   * removes a plant from the database
   */
  deleteUserPlant(){
    if(!this.user_flag)
      return;

    this.db.removeUserPlant(this.id).then(val => {
      this.close();
    }, error => {
      console.log(error);
    })
  }

  /**
   * called when the popover should be closed.
   */
  close() {
    this.viewCtrl.dismiss();
  }
}
