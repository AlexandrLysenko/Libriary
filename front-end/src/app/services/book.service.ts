import { Book } from '../models/book.model';
import { Observable } from 'rxjs/Rx';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import {Response} from '@angular/http';
import { Injectable } from '@angular/core';


@Injectable()
export class BookService {

  api_url = 'http://localhost:3000';
  bookUrl = `${this.api_url}/api/books`;

  constructor(
    private http: HttpClient
  ) { }

  getBook(id: string): Observable<Book> {
    let getBookUrl = `${this.bookUrl}/details/${id}`
    return this.http.get(getBookUrl)
    .map(res => {
      return res["data"] as Book
    })
  }

  createBook(book: Book): Observable<any>{
    //returns the observable of http post request
    return this.http.post(`${this.bookUrl}`, book);
  }

  //Read todo, takes no arguments
  getBooks(page: number): Observable<Book[]>{
    return this.http.get(this.bookUrl + `?page=${page}`)
    .map(res  => {
      //Maps the response object sent from the server

      return res["data"].docs as Book[];
    })
  }

  getAllBooks(): Observable<Book[]>{
    return this.http.get(this.bookUrl)
    .map(res  => {
      //Maps the response object sent from the server

      return res["data"].docs as Book[];
    })
  }

  getTotal():Observable<number> {
    return this.http.get(this.bookUrl).map(res  => {
      //Maps the response object sent from the server

      return res["data"].total as number;
    })
  }
  //Update todo, takes a ToDo Object as parameter
  editBook(book:Book){
    let editUrl = `${this.bookUrl}`
    //returns the observable of http put request
    return this.http.put(editUrl, book);
  }

  deleteBook(id:string):any{
    //Delete the object by the id
    let deleteUrl = `${this.bookUrl}/${id}`
    return this.http.delete(deleteUrl)
    .map(res  => {
      return res;
    })
  }

  changeBookStatus(book: Book) {
    let editUrl = `${this.bookUrl}/changeStatus`
      return this.http.put(editUrl, book);
  }

  //Default Error handling method.
  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }

}
