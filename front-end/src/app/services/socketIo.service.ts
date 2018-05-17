import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';
import { BookService} from './book.service'
import { Book } from '../models/book.model'

@Injectable()
export class SocketIoService {

  private socket: SocketIOClient.Socket;
  private token: string;
  constructor(
    private bookService: BookService;
  ) {
    this.socket = io.connect('localhost:3001')
   }

     emitEventOnFictionBookSaved(bookSaved) {
      this.socket.emit('bookSaved', bookSaved);
      console.log(bookSaved);
  }

  // Emit: gist updated event
  emitEventOnBookUpdated(bookUpdated) {
    this.socket.emit('bookUpdated', bookUpdated);
  }

  // Consume: on gist saved
  consumeEventOnFictionBookSaved() {
    const self = this;
    this.socket.on('bookSaved', function() {
      self.bookService.getBooks(1)
        .subscribe(books => {
          //assign the todolist property to the proper http response
          this.booksList = books.filter(book => book.Discriminator == "AdditionalBook");
          console.log(books);
        })
      console.log('book saved');
    });
  }

  // Consume on gist updated
  consumeEventOnGistUpdated() {
    const self = this;
    this.socket.on('gistUpdated', function(book: Book) {

    });
  }

  connect() {

    this.socket = io.connect('localhost:3001', {
  'query': 'token=' + this.getToken()
  });
}


  getToken(): string {
    if (!this.token) {
      this.token = localStorage.getItem('mean-token');
    }
    console.log(this.token);
    return this.token;
  }
}
