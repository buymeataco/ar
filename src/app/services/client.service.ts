import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators';

import { Client } from '../models/Client';

@Injectable({
  providedIn: 'root'
})
export class ClientService {
  //this constrains the properties to the Clients model.
	clientsCollection: AngularFirestoreCollection<Client>;
	clientDoc: AngularFirestoreDocument<Client>;
	clients: Observable<Client[]>;
	client: Observable<Client>;

  constructor(private _afs: AngularFirestore) {
    //this is similar to the getXMLHttpRequest() function
  	this.clientsCollection = this._afs.collection('clients', ref => ref.orderBy('lastName', 'asc'));
  }

  getClients(): Observable<Client[]> {
  	// Get the clients with their associated id. Study this more at: https://github.com/angular/angularfire2
  	this.clients = this.clientsCollection.snapshotChanges().pipe(
      map(changes => {
  		return changes.map(action => {
  			const data = action.payload.doc.data() as Client;
  			data.id = action.payload.doc.id;
  			return data;
  		});
  	}));
  	return this.clients;
  }//getClients()
}//ClientService
