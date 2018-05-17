import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { User } from '../models/user.model';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
@Component({
  selector: 'app-admin-page',
  templateUrl: './admin-page.component.html',
  styleUrls: ['./admin-page.component.css']
})
export class AdminPageComponent implements OnInit {

  private userList: User[];
  user: User;
  imageUrl: any = 'imgs/';
  classes: string[] = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11']
  classess: string[] = ['1-', '2-', '3-', '4-', '5-', '6-', '7-', '8-', '9-', '10-', '11-']
  constructor(
    public userService: UserService
  ) { }

  ngOnInit() {
    this.getUsers()
  }

  getUsers() {
    this.userService.getUsers().subscribe(users => {
      this.userList = users;
      console.log(this.userList);
    })
  }



}
