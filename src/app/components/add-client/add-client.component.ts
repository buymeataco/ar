import { Component, OnInit } from '@angular/core';

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

  constructor() { }

  ngOnInit() {
  }

}
