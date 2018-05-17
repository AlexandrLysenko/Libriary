import { Component, OnInit } from '@angular/core';
import { Response } from '@angular/http';
import { BookService } from '../services/book.service';
import { Book } from '../models/book.model';
import {NgxPaginationModule} from 'ngx-pagination';
import { AuthenticationService } from '../services/authentication.service';


@Component({
  selector: 'app-books',
  templateUrl: './subject-books.component.html',
  styleUrls: ['./subject-books.component.css']
})
export class SubjectBooksComponent implements OnInit {
imageUrl: any = 'imgs/';
previewUrl: any;
p: number = 1;
  constructor(
    private bookService: BookService,
    public auth: AuthenticationService
  ) { }

  public newBook: Book = new Book();
  booksList: Book[];
  allBooks: Book[];

  editBooks: Book[] = [];
  pages: number;
  total: number;

  ngOnInit() {
    this.getSubjectBooks();

    this.bookService.getTotal()
      .subscribe(total => {
        this.total = total;
        console.log(total);
      })

  }

  getSubjectBooks() {
    this.bookService.getBooks(this.p)
      .subscribe(books => {
        //assign the todolist property to the proper http response
        this.booksList = books.filter(book => book.Discriminator == "StudyBook");
        console.log(books);
      })
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


  create() {
    var img = (<HTMLInputElement>document.getElementById('book-img')).files[0].name || "";
    this.newBook.Img = img;
    this.newBook.Discriminator = "StudyBook";
    var download = (<HTMLInputElement>document.getElementById('book-download')).files[0].name || "";
    this.newBook.Download = download;
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
