import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { MzIconModule, MzIconMdiModule } from 'ng2-materialize'

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { AsideComponent } from './aside/aside.component';
import { NewsComponent } from './news/news.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ProfileComponent } from './profile/profile.component';


import { AppRoutingModule } from './/app-routing.module';
import { EntryService } from './services/entry.service';
import { BooksComponent } from './books/books.component'
import { Entry }  from './models/entry.model'
import { Book }  from './models/book.model'
import { BookService } from './services/book.service';
import { MzModalModule } from 'ng2-materialize';
import { MzButtonModule } from 'ng2-materialize'
import {NgxPaginationModule} from 'ngx-pagination';


import { AuthenticationService } from './services/authentication.service';
import { AuthGuardService } from './services/auth-guard.service';



@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    AsideComponent,
    NewsComponent,
    BooksComponent,
    LoginComponent,
    RegisterComponent,
    ProfileComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    MzIconModule,
    MzIconMdiModule,
    AppRoutingModule,
    HttpClientModule,
    MzModalModule,
    MzButtonModule,
    NgxPaginationModule
  ],
  providers: [
    EntryService,
    BookService,
    AuthenticationService,
    AuthGuardService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
