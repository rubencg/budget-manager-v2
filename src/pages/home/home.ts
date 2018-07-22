import { Component } from '@angular/core';
import { NavController, AlertController, Loading, LoadingController } from 'ionic-angular';
import { AuthProvider } from '../../providers/auth/auth';
import { LoginPage } from '../login/login';
import { AccountProvider } from '../../providers/account/account';
import { Account } from '../../interfaces';
import { CategoryProvider } from '../../providers/category/category';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController, private authProvider: AuthProvider, private accountProvider: AccountProvider,
    private alertCtrl: AlertController, private loadingCtrl: LoadingController, private categoryProvider:CategoryProvider) {
    let loading: Loading = this.loadingCtrl.create();
    loading.present();

    this.categoryProvider.getAllExpenseCategories();
    this.categoryProvider.getAllIncomeCategories();
    this.accountProvider.getAllAccounts()
      .subscribe((accounts: Account[]) => {
        loading.dismiss();        
      });

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
