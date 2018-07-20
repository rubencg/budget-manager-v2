import { Component } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';
import { AuthProvider } from '../../providers/auth/auth';
import { LoginPage } from '../login/login';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController, private authProvider: AuthProvider,
    private alertCtrl: AlertController) {

  }

  logout(): void {
    this.authProvider.logoutUser()
      .then(loggedOut => {
        if (loggedOut) {
          this.navCtrl.setRoot(LoginPage);
        }
      })
      .catch(error => {
        let alert = this.alertCtrl.create({
          title: "Error",
          message: error,
          buttons: ['Ok']
        });
        alert.present();
      });
  }
}
