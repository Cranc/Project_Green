import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

//Tabs
import { AboutPage } from '../pages/about/about';
import { ContactPage } from '../pages/contact/contact';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
import { SettingsPage } from '../pages/settings/settings';
import { UserPlantPage } from '../pages/user-plant/user-plant';

//Popoups
import { MailAuthPage } from '../pages/mail-auth/mail-auth';
import { MailCreateAccountPage } from '../pages/mail-create-account/mail-create-account';
import { PopoverPage } from '../pages/popover/popover';

//misc
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

//Firebase and Database stuff
import { Firebase } from '@ionic-native/firebase'; // import Firebase
import { HttpModule } from '@angular/http';
import { AngularFireAuth, AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireModule } from 'angularfire2';
import { DatabaseServiceProvider } from '../providers/database-service/database-service';

//local storage
import { IonicStorageModule } from '@ionic/storage';
import { DatabasePlantsPage } from '../pages/database-plants/database-plants';

//google maps
import { Geolocation } from '@ionic-native/geolocation';

//settings
import { SettingsProvider } from '../providers/settings/settings';

//Login
import { InAppBrowser } from '@ionic-native/in-app-browser';

const firebaseConfig = {
  apiKey: "AIzaSyDGVRgRhRSMQGa39jMyviVWQGKm8jwY_Mo",
  authDomain: "project-green-192912.firebaseapp.com",
  databaseURL: "https://project-green-192912.firebaseio.com",
  projectId: "project-green-192912",
  storageBucket: "project-green-192912.appspot.com",
  messagingSenderId: "514275054314"
};

@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    UserPlantPage,
    TabsPage,
    DatabasePlantsPage,
    SettingsPage,
    PopoverPage,
    MailAuthPage,
    MailCreateAccountPage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    IonicStorageModule.forRoot(),
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    UserPlantPage,
    TabsPage,
    DatabasePlantsPage,
    SettingsPage,
    PopoverPage,
    MailAuthPage,
    MailCreateAccountPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    DatabaseServiceProvider,
    Geolocation,
    SettingsProvider,
    InAppBrowser
  ]
})
export class AppModule {}
