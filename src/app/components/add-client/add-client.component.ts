import { Component, OnInit, ViewChild } from '@angular/core';
import { FlashMessagesService } from 'angular2-flash-messages';
import { ClientService } from '../../services/client.service';
import { Router } from '@angular/router';

import { Client } from '../../models/Client';

@Component({
  selector: 'app-add-client',
  templateUrl: './add-client.component.html'
})
export class AddClientComponent implements OnInit {
	client: Client = {
		firstName: '',
		lastName: '',
		email: '',
		phone: '',
		balance: 0
	}

	disableBalanceOnAdd: boolean = false;
	@ViewChild('clientForm') form: any;

	constructor(private _flashMessage: FlashMessagesService,
							private _clientService: ClientService, 
							private _router: Router
							) { }

  ngOnInit() {
  }

//form values are passed through value. The valid parameter is either returns true or false.
onSubmit({value, valid}: {value: Client, valid: boolean}) {
	//console.log('value: ', value);
	//console.log('valid: ', valid);

	if (this.disableBalanceOnAdd) {
		value.balance = 0;
	}

	if (!valid) {
		this._flashMessage.show('The form is not properly filled out.', {cssClass: 'alert-danger', timeout: 4000});
	} else {
		//Add new client
		this._clientService.newClient(value);
		this._flashMessage.show('New client successfully added.', {cssClass: 'alert-success', timeout: 4000 });
		this._router.navigate(['/']);
	}

}//onSubmit

}
