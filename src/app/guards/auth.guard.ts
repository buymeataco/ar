import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { Observable } from 'rxjs/Observable';
// had import this or angular didn't know what the map method was
import { map } from 'rxjs/operators'; 


@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private _router: Router,
    private _afAuth: AngularFireAuth
  ) {
  }

  canActivate(): Observable<boolean> {
    return this._afAuth.authState.pipe(
      map(auth => {
      if (!auth) {
       this._router.navigate(['login/']);
       return false;
      } else {
       return true;
      }
    }));
  }
}//AuthGuard