import { Injectable } from '@angular/core';
import firebase from 'firebase';

@Injectable()
export class AuthProvider {

  constructor() {

  }

  loginUser(email:string, password:string):Promise<any>{
    return firebase.auth().signInWithEmailAndPassword(email, password);
  }

  logoutUser(){
    return new Promise((resolve, reject) => {
      firebase.auth().signOut()
        .then(() => {
          let loggedOut = true;
          resolve(loggedOut);
        })
        .catch((error:any) => {
          reject(error);
        });
    });
  }

}
