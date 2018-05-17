import { Component } from '@angular/core';
import { AuthenticationService, TokenPayload } from '../services/authentication.service';
import { Router } from '@angular/router';
import { SocketIoService } from '../services/socketIo.service'

@Component({
  templateUrl: './login.component.html'
})
export class LoginComponent {
  credentials: TokenPayload = {
    ticket: '',
    password: ''
  };


  constructor(private auth: AuthenticationService,
              private router: Router,
              public socketService: SocketIoService
            ) {}

  login() {
    this.auth.login(this.credentials).subscribe(() => {
      this.router.navigateByUrl('/profile');
      this.socketService.connect();
    }, (err) => {
      console.error(err);
    });
  }
}
