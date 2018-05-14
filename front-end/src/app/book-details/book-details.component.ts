import { Component, OnInit } from '@angular/core';
import { BookService } from '../services/book.service';
import { Book } from '../models/book.model';
import { UserService } from '../services/user.service';
import { User } from '../models/user.model';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { AuthenticationService } from '../services/authentication.service';


@Component({
  selector: 'app-book-details',
  templateUrl: './book-details.component.html',
  styleUrls: ['./book-details.component.css']
})
export class BookDetailsComponent implements OnInit {
  public currentUser: User
  constructor(
    public bookService: BookService,
    private route: ActivatedRoute,
    private location: Location,
    public auth: AuthenticationService,
    public userService: UserService
  ) { }

  public book: Book;
  imageUrl: any = 'imgs/';
  ngOnInit() {
      this.getBook();
      this.auth.profile().subscribe(user => {
        this.userService.getUser(user._id).subscribe( curUser => {
          this.currentUser = curUser;
          console.log(this.currentUser);
        });
      })
  }

  getBook() {
    const id = this.route.snapshot.paramMap.get('id');
    this.bookService.getBook(id).subscribe(book => {
      this.book = book;
      console.log(this.book);
    })
  }

  goBack(): void {
    this.location.back();
  }

  reserveBook(user: User, book: Book) {
    book.Status = 2;
    this.bookService.changeBookStatus(book).subscribe(res => {
      console.log('Update Succesful')
    }, err => {
      this.bookService.changeBookStatus(book)
      console.error('Update Unsuccesful')
    });
    this.userService.reserveBook(user, book._id).subscribe(res => {
      console.log('Reservation waiting for confirm')
    }, err => {
      this.userService.reserveBook(user, book._id)
      console.error('Something goes wrong')
    })
  }
}
