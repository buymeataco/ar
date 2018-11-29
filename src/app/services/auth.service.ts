import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Observable } from 'rxjs/Observable';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private _afAuth: AngularFireAuth) { }

  login(email: string, password: string) {
    return new Promise((resolve, reject) => {
      this._afAuth.auth.signInWithEmailAndPassword(email, password).then(userData => resolve(userData), err => reject(err))
    });
  }

  register(email: string, password: string) {
    return new Promise((resolve, reject) => {
      this._afAuth.auth.createUserWithEmailAndPassword(email, password).then(userData => resolve(userData), err => reject(err))
    });
  }

  getAuth() {
  	//in the tutorial, .pipe was .map
  	return this._afAuth.authState.pipe(auth => auth);
  }

  logout() {
    this._afAuth.auth.signOut();
  }

}
