import { Entry } from '../models/entry.model';
import { Observable } from 'rxjs/Rx';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import {Response} from '@angular/http';
import { Injectable } from '@angular/core';


@Injectable()
export class EntryService {

  api_url = 'http://localhost:3000';
  entryUrl = `${this.api_url}/api/entries`;

  constructor(
    private http: HttpClient
  ) { }

 //Create todo, takes a ToDo Object
  createEntry(entry: Entry): Observable<any>{
    //returns the observable of http post request 
    return this.http.post(`${this.entryUrl}`, entry);
  }

  //Read todo, takes no arguments
  getEntries(): Observable<Entry[]>{
    return this.http.get(this.entryUrl)
    .map(res  => {
      //Maps the response object sent from the server
        
      return res["data"].docs as Entry[];
    })
  }
  //Update todo, takes a ToDo Object as parameter
  editEntry(entry:Entry){
    let editUrl = `${this.entryUrl}`
    //returns the observable of http put request 
    return this.http.put(editUrl, entry);
  }

  deleteEntry(id:string):any{
    //Delete the object by the id
    let deleteUrl = `${this.entryUrl}/${id}`
    return this.http.delete(deleteUrl)
    .map(res  => {
      return res;
    })
  }

  //Default Error handling method.
  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }

}

