import { UsefullLink } from '../models/usefull-link.model';
import { Observable } from 'rxjs/Rx';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import {Response} from '@angular/http';
import { Injectable } from '@angular/core';


@Injectable()
export class UsefullLinkService {

  api_url = 'http://localhost:3000';
  usefull_link_url = `${this.api_url}/api/usefull-links`;

  constructor(
    private http: HttpClient
  ) { }

 //Create todo, takes a ToDo Object
  createUsefullLink(usefull_link: UsefullLink): Observable<any>{
    //returns the observable of http post request
    return this.http.post(`${this.usefull_link_url}`, usefull_link);
  }

  //Read todo, takes no arguments
  getUsefullLinks(): Observable<UsefullLink[]>{
    return this.http.get(this.usefull_link_url)
    .map(res  => {
      //Maps the response object sent from the server

      return res["data"].docs as UsefullLink[];
    })
  }
  //Update todo, takes a ToDo Object as parameter
  editUsefullLink(usefull_link:UsefullLink){
    let editUrl = `${this.usefull_link_url}`
    //returns the observable of http put request
    return this.http.put(editUrl, usefull_link);
  }

  deleteUsefullLink(id:string):any{
    //Delete the object by the id
    let deleteUrl = `${this.usefull_link_url}/${id}`
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
