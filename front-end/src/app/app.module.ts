import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { AsideComponent } from './aside/aside.component';
import { NewsComponent } from './news/news.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ProfileComponent } from './profile/profile.component';
import { MzSelectModule } from 'ng2-materialize'
import { MzIconModule, MzIconMdiModule } from 'ng2-materialize'
import { MzSidenavModule } from 'ng2-materialize'
import { MzCollectionModule } from 'ng2-materialize'
import { MzCardModule } from 'ng2-materialize'
import { MzBadgeModule } from 'ng2-materialize'
import { MzTabModule } from 'ng2-materialize'

import { AppRoutingModule } from './/app-routing.module';
import { EntryService } from './services/entry.service';
import { UserService } from './services/user.service';
import { SubjectBooksComponent } from './subject-books/subject-books.component'
import { Entry }  from './models/entry.model'
import { Book }  from './models/book.model'
import { User }  from './models/user.model'
import { BookService } from './services/book.service';
import { SocketIoService } from './services/socketIo.service';
import { MzModalModule } from 'ng2-materialize';
import { MzButtonModule } from 'ng2-materialize'
import { MzInputModule } from 'ng2-materialize'
import {NgxPaginationModule} from 'ngx-pagination';
import { Ng2SearchPipeModule } from 'ng2-search-filter';


import { AuthenticationService } from './services/authentication.service';
import { AuthGuardService } from './services/auth-guard.service';
import { BookDetailsComponent } from './book-details/book-details.component';
import { FictionBooksComponent } from './fiction-books/fiction-books.component';
import { UsefullLinkComponent } from './usefull-link/usefull-link.component';
import { UsefullLinkService } from './services/usefull-link.service';
import { AdminPageComponent } from './admin-page/admin-page.component';
import { UserDetailsComponent } from './user-details/user-details.component'



@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    AsideComponent,
    NewsComponent,
    SubjectBooksComponent,
    LoginComponent,
    RegisterComponent,
    ProfileComponent,
    BookDetailsComponent,
    FictionBooksComponent,
    UsefullLinkComponent,
    AdminPageComponent,
    UserDetailsComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    MzIconModule,
    MzIconMdiModule,
    MzSidenavModule,
    AppRoutingModule,
    HttpClientModule,
    MzModalModule,
    MzButtonModule,
    MzInputModule,
    MzSelectModule,
    NgxPaginationModule,
    Ng2SearchPipeModule,
    MzCollectionModule,
    MzCardModule,
    MzBadgeModule,
    MzTabModule
  ],
  providers: [
    EntryService,
    BookService,
    UserService,
    UsefullLinkService,
    AuthenticationService,
    AuthGuardService,
    SocketIoService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
