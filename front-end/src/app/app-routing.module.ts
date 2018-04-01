import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { NewsComponent } from './news/news.component';
import { BooksComponent } from './books/books.component'
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ProfileComponent } from './profile/profile.component';
import { AuthGuardService } from './services/auth-guard.service';


const routes: Routes = [
  { path: '', redirectTo: '/books', pathMatch: 'full' },
  { path: 'news', component: NewsComponent},
  { path: 'books', component: BooksComponent},
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'profile', component: ProfileComponent, canActivate: [AuthGuardService]}

];


@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
