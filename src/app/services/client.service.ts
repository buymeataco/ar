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
  	// Get the clients with their associated id. The syntax has changed, study it more at: https://github.com/angular/angularfire2
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

  newClient(client: Client) {
    console.log('New Client: ', client);
    this.clientsCollection.add(client);
  }

  getClient(id: string): Observable<Client> {
    this.clientDoc = this._afs.doc<Client>(`clients/${id}`);
    this.client = this.clientDoc.snapshotChanges().pipe(
      map(action => {
      if (action.payload.exists === false) {
        return null;
      } else {
        const data = action.payload.data() as Client;
        data.id = action.payload.id;
        return data;
      }
    }));
    return this.client;
  }//getClient

  updateClient(client: Client) {
    this.clientDoc = this._afs.doc(`clients/${client.id}`);
    this.clientDoc.update(client);
  }

}//ClientService
