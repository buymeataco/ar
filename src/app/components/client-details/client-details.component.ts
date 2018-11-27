import { Component, OnInit } from '@angular/core';
import { ClientService } from '../../services/client.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Client } from '../../models/Client';

@Component({
  selector: 'app-client-details',
  templateUrl: './client-details.component.html'
})
export class ClientDetailsComponent implements OnInit {
	id: string;
	client: Client;
	hasBalance: boolean = false;
	showBalanceUpdateInput: boolean= false;

  constructor(
  	private _clientService: ClientService,
  	private _router: Router,
		private _route: ActivatedRoute,
		private _flashMessage: FlashMessagesService
  ) { }

  ngOnInit() {
  	//get id from URI using the route service
  	this.id = this._route.snapshot.params['id'];
  	//get client
  	this._clientService.getClient(this.id).subscribe(client => {
  		if(client != null) {
  			if (client.balance > 0) {
  				this.hasBalance = true;
  			}
  		}
  		this.client = client;
  	});
  }//ngOnInit

  updateBalance() {
   this._clientService.updateClient(this.client);
   this._flashMessage.show('Balance updated.', {cssClass: `alert-success`, timeout: 4000});
  }

}
