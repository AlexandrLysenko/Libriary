import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { NewsComponent } from './news/news.component';
import { SubjectBooksComponent } from './subject-books/subject-books.component'
import { FictionBooksComponent } from './fiction-books/fiction-books.component'
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ProfileComponent } from './profile/profile.component';
import { AuthGuardService } from './services/auth-guard.service';
import { BookDetailsComponent } from './book-details/book-details.component'
import { AdminPageComponent } from './admin-page/admin-page.component'
import { UserDetailsComponent } from './user-details/user-details.component'



const routes: Routes = [
  { path: '', redirectTo: '/subject-books', pathMatch: 'full' },
  { path: 'news', component: NewsComponent},
  { path: 'subject-books', component: SubjectBooksComponent},
  { path: 'fiction-books', component: FictionBooksComponent},
  { path: 'details/:id', component: BookDetailsComponent},
  { path: 'user-details/:id', component: UserDetailsComponent},
  { path: 'login', component: LoginComponent },
  { path: 'admin', component: AdminPageComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'profile', component: ProfileComponent, canActivate: [AuthGuardService]}

];


@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
