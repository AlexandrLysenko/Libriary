import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { User } from '../models/user.model';
import { BookService } from '../services/book.service';
import { Book } from '../models/book.model';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css']
})
export class UserDetailsComponent implements OnInit {
  private user: User
  private userBooks: Book[] = []
  imageUrl: any = 'imgs/';


  constructor(
    private route: ActivatedRoute,
    private location: Location,
    public userService: UserService,
    public bookService: BookService
  ) { }

  ngOnInit() {
    this.getUser()
  }

  getUser() {
    const id = this.route.snapshot.paramMap.get('id');
    this.userService.getUser(id).subscribe(user => {
      this.user = user;
      this.user.Books.forEach( id => {
        this.bookService.getBook(id).subscribe(book => {
        this.userBooks.push(book);
        })
      })
      console.log(this.user);
    })
  }

  confirmReservation(user: User, book: Book) {
    book.Status = 3;
    this.bookService.changeBookStatus(book).subscribe(res => {
      console.log('Update Succesful')
    }, err => {
      this.bookService.changeBookStatus(book)
      console.error('Update Unsuccesful')
    });
  }

  confirmReturn(user: User, book: Book) {
    book.Status = 1;
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
