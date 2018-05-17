import { Component, Input } from '@angular/core';
import { AuthenticationService, UserDetails } from '../services/authentication.service';
import { BookService } from '../services/book.service';
import { Book } from '../models/book.model';
import { UserService } from '../services/user.service';
import { User } from '../models/user.model';

@Component({
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {

   details: UserDetails;
   userBooksId: string[];
   imageUrl: any = 'imgs/';
   currentUser: User

  constructor(
    public auth: AuthenticationService,
    public bookService: BookService,
    public userService: UserService,
  ) {}

  public userBooks: Book[] = [];

  ngOnInit() {
    this.auth.profile().subscribe(user => {
      this.details = user;
      this.userBooksId = this.details.Books;
      this.userService.getUser(user._id).subscribe( curUser => {
        this.currentUser = curUser;
        console.log(this.currentUser);
      });
      if(this.userBooksId) {
        this.userBooksId.forEach( id => {
          this.bookService.getBook(id).subscribe(book => {
          this.userBooks.push(book);
          })
        })
      }
      console.log(this.userBooks);
      console.log(this.details);
    }, (err) => {
      console.error(err);
    });

  }

  returnBook(user: User, book: Book){
    book.Status = 4;
    console.log({user: user, book: book});
    this.bookService.changeBookStatus(book).subscribe(res => {
      console.log('Update Succesful')
    }, err => {
      this.bookService.changeBookStatus(book)
      console.error('Update Unsuccesful')
    });
  }

  cancelReservation(user: User, book: Book) {
    book.Status = 1;
    console.log({user: user, book: book});
    this.bookService.changeBookStatus(book).subscribe(res => {
      console.log('Update Succesful')
    }, err => {
      this.bookService.changeBookStatus(book)
      console.error('Update Unsuccesful')
    });
    this.userService.cancelReservation(user, book._id).subscribe(res => {
      console.log('Reservation canceled')
    }, err => {
      this.userService.cancelReservation(user, book._id)
      console.error('Something goes wrong')
    })
  }
  }
