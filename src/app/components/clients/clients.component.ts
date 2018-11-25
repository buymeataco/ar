import { Component, OnInit } from '@angular/core';
import { ClientService } from '../../services/client.service';

import { Client } from '../../models/Client';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html'
})

export class ClientsComponent implements OnInit {
	clients: Client[];
	totalOwed: number;

  constructor(private _clientService: ClientService) { }

  ngOnInit() {
  	this._clientService.getClients().subscribe(clients => { 
     this.clients = clients;
      this.getTotalOwed();
   });
  }//ngOnInit

  getTotalOwed() {
    this.totalOwed = this.clients.reduce((a,b) => a + b.balance, 0);
  }

}//ClientsComponent
