import { Component, OnInit } from '@angular/core';
import { Response } from '@angular/http';
import { BookService } from '../services/book.service';
import { Book } from '../models/book.model';
import {NgxPaginationModule} from 'ngx-pagination';


@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.css']
})
export class BooksComponent implements OnInit {
imageUrl: any = 'imgs/';
p: number = 1;
  constructor(
    private bookService: BookService
  ) { }

  public newBook: Book = new Book();
  booksList: Book[];

  editBooks: Book[] = [];
  pages: number;

  ngOnInit() {
    this.bookService.getBooks(1)
      .subscribe(books => {
        //assign the todolist property to the proper http response
        this.booksList = books;
        console.log(books);
      })
      this.bookService.getPages()
      .subscribe(pages => {
        this.pages = pages;
        console.log(pages);
      })
  }

  create() {
    var img = (<HTMLInputElement>document.getElementById('upload')).files[0].name || "";
    this.newBook.Img = img;
    this.bookService.createBook(this.newBook)
      .subscribe((res) => {
        this.booksList.unshift(res.data)
        this.newBook = new Book()
      })
    }

      editBook(book: Book) {
      console.log(book)
      if(this.booksList.includes(book)){
        if(!this.editBooks.includes(book)){
          this.editBooks.push(book)
        }else{
          this.editBooks.splice(this.editBooks.indexOf(book), 1)
          this.bookService.editBook(book).subscribe(res => {
            console.log('Update Succesful')
          }, err => {
            this.editBook(book)
            console.error('Update Unsuccesful')
          })
        }
      }
    }

    deleteBook(book: Book) {
      this.bookService.deleteBook(book._id).subscribe(res => {
        this.booksList.splice(this.booksList.indexOf(book), 1);
      })
    }
}
