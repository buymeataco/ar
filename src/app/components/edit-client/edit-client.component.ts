import { Component, OnInit } from '@angular/core';

import { ClientService } from '../../services/client.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Client } from '../../models/Client';
import { SettingsService } from '../../services/settings.service';

@Component({
  selector: 'app-edit-client',
  templateUrl: './edit-client.component.html'
})
export class EditClientComponent implements OnInit {
  id: string;
  client: Client = {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    balance: 0
  }

  disableBalanceOnEdit: boolean;

  constructor(
    private _clientService: ClientService,
    private _router: Router,
    private _route: ActivatedRoute,
    private _flashMessage: FlashMessagesService,
    private _settingsService: SettingsService
  ) {}

  ngOnInit() {
    this.disableBalanceOnEdit = this._settingsService.getSettings().disableBalanceOnEdit;
    //get id from URI using the route service
    this.id = this._route.snapshot.params['id'];
    //get client
    this._clientService.getClient(this.id).subscribe(client => this.client = client);
  }//ngOnInit

  onSubmit({value, valid}: {value: Client, valid: boolean}) {
     if (!valid) {
       this._flashMessage.show('Please fill out form correctly', {cssClass: 'alert-danger', timeout: 4000});
     } else {
       value.id = this.id;
       this._clientService.updateClient(value);
       this._flashMessage.show('Client updated.', { cssClass: 'alert-success', timeout: 4000 });
       this._router.navigate(['/client/' + this.id]);
     }
  }

}
