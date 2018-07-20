import { NgModule } from '@angular/core';
import { AccountProvider } from './account/account';
import { AuthProvider } from './auth/auth';
import { AngularFireDatabase, AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireModule } from 'angularfire2';

@NgModule({
  imports: [
    AngularFireDatabaseModule,
    AngularFireModule
  ],
    providers: [
      AccountProvider,
      AuthProvider,
      AngularFireDatabase
    ]
})
export class ProvidersModule {

}
