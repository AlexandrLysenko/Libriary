import { Component, OnInit } from '@angular/core';
import { Response } from '@angular/http';
import { BookService } from '../services/book.service';
import { Book } from '../models/book.model';
import {NgxPaginationModule} from 'ngx-pagination';
import { AuthenticationService } from '../services/authentication.service';
import { SocketIoService } from '../services/socketIo.service'

@Component({
  selector: 'app-fiction-books',
  templateUrl: './fiction-books.component.html',
  styleUrls: ['./fiction-books.component.css']
})
export class FictionBooksComponent implements OnInit {
  imageUrl: any = 'imgs/';
  fileUrl: any = 'files/';
  previewUrl: any;
  p: number = 1;
    constructor(
      private bookService: BookService,
      public auth: AuthenticationService,
      public socketService: SocketIoService
    ) { }

    public newBook: Book = new Book();
    booksList: Book[];
    allBooks: Book[];
    editBooks: Book[] = [];
    pages: number;
    total: number;
    discriminator: string;

    ngOnInit() {
      this.getFictionBooks();
    }

    showPreviewImage(event: any) {
        if (event.target.files && event.target.files[0]) {
            var reader = new FileReader();
            reader.onload = (event: any) => {
                this.previewUrl = event.target.result;
            }
            reader.readAsDataURL(event.target.files[0]);
        }
    }

    getTypeOfBook(event: any) {
      this.discriminator = event.target.value;
      console.log(event.target.value);
    }

    getFictionBooks() {
      this.bookService.getBooks(this.p)
        .subscribe(books => {
          //assign the todolist property to the proper http response
          this.booksList = books.filter(book => book.Discriminator == "AdditionalBook");
          console.log(books);
        })
    }

    create() {
      var img = (<HTMLInputElement>document.getElementById('book-img')).files[0].name || "";
      var download = (<HTMLInputElement>document.getElementById('book-download')).files[0].name || "";
      this.newBook.Img = img;
      this.newBook.Download = download;
      this.newBook.Discriminator = "AdditionalBook"
      console.log(this.newBook.Img = img);
      console.log(this.newBook.Discriminator);
      this.bookService.createBook(this.newBook)
        .subscribe((res) => {
          this.booksList.unshift(res.data)
          if(res) {
            this.socketService.emitEventOnFictionBookSaved(res)
          }
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
