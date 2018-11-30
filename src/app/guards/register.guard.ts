import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
// had import this or angular didn't know what the map method was
import { map } from 'rxjs/operators';
import { SettingsService } from '../services/settings.service';


@Injectable()
export class RegisterGuard implements CanActivate {
  constructor(
    private _router: Router,
    private _settingsService: SettingsService
  ) {}

  canActivate(): boolean {
    if (this._settingsService.getSettings().allowRegistration) {
      return true;
    } else {
      this._router.navigate(['/login']);
      return false;
    }
  }//canActivate

}//AuthGuard