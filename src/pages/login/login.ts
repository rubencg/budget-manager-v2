import { Component } from '@angular/core';
import { IonicPage, NavController, Loading, LoadingController, AlertController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthProvider } from '../../providers/auth/auth';
import { TabsPage } from '../tabs/tabs';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  private loginForm: FormGroup;

  constructor(public navCtrl: NavController, private formBuilder: FormBuilder,
    private authProvider: AuthProvider, private loadingCtrl: LoadingController,
    private alertCtrl: AlertController) {
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.compose([Validators.required, Validators.email])],
      password: ['', Validators.required]
    });
  }

  ionViewDidLoad() {

  }

  async submitLogin() {
    if (!this.loginForm.valid) {
      let alert = this.alertCtrl.create({
        title: 'Error',
        message: "Error en los datos. Verifica tu correo y contraseña.",
        buttons: ['Ok']
      });
      alert.present();
    } else {
      let loading: Loading = this.loadingCtrl.create();
      loading.present();

      try {
        this.authProvider.loginUser(this.loginForm.value.email,
          this.loginForm.value.password)
          .then((user: firebase.User) => {
            this.navCtrl.setRoot(TabsPage);
          })
          .catch(error => {
            let alert = this.alertCtrl.create({
              title: 'Error de autenticación',
              message: "Usuario y/o contraseña incorrectas.",
              buttons: ['Ok']
            });
            alert.present();
          });

        await loading.dismiss();
      } catch (error) {
        await loading.dismiss();
      }
    }
  }

}
