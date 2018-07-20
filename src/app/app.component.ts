import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { TabsPage } from '../pages/tabs/tabs';
import { LoginPage } from '../pages/login/login';
import { FIREBASE_CONFIG } from './firebase.config';
import { Unsubscribe } from "@firebase/util";
import firebase from 'firebase';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen) {
    platform.ready().then(() => {
      firebase.initializeApp(FIREBASE_CONFIG);

      const unsubscribe:Unsubscribe = firebase.auth().onAuthStateChanged(user => {
        if(user){
          this.rootPage = TabsPage;
          unsubscribe();
        }else{
          this.rootPage = LoginPage;
          unsubscribe();
        }
      });

      statusBar.styleDefault();
      splashScreen.hide();
    });
  }
}
