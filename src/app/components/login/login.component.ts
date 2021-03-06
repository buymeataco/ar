import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {
  email: string;
  password: string;

  constructor(
    private _authService: AuthService,
    private _router: Router,
    private _flashMessage: FlashMessagesService
  ) { }

  ngOnInit() {
    this._authService.getAuth().subscribe(auth => {
      if (auth) {
        this._router.navigate(['/']);
      }
    });
  }

  onSubmit() {
    this._authService.login(this.email, this.password).then(res => {
      this._flashMessage.show('You are now logged in.', {cssClass: 'alert-success', timeout: 4000});
      this._router.navigate(['/']);
    })
    .catch(err => {
      this._flashMessage.show(err.message, { cssClass: 'alert-danger', timeout: 4000 });
    });
  }

}
