import { Component, OnInit } from '@angular/core';
import { Response } from '@angular/http';
import { UsefullLinkService } from '../services/usefull-link.service';
import { UsefullLink } from '../models/usefull-link.model';
import { AuthenticationService } from '../services/authentication.service';
import * as $ from 'jquery';

@Component({
  selector: 'app-usefull-link',
  templateUrl: './usefull-link.component.html',
  styleUrls: ['./usefull-link.component.css']
})
export class UsefullLinkComponent implements OnInit {
  imageUrl: any = 'imgs/';

  constructor(
    private usefullLinkService: UsefullLinkService,
    public auth: AuthenticationService
    ) { }

  public newUsefullLink: UsefullLink = new UsefullLink();
  usefullLinksList: UsefullLink[];

  editUsefullLinks: UsefullLink[] = [];

  ngOnInit() {
     //At component initialization the
    this.usefullLinkService.getUsefullLinks()
      .subscribe(usefullLinks => {
        //assign the todolist property to the proper http response
        this.usefullLinksList = usefullLinks.reverse();
        console.log(usefullLinks);
      })
  }


  create() {
    let img = (<HTMLInputElement>document.getElementById('create-upload')).files[0].name;
    console.log(img);
    this.newUsefullLink.img = img;
    this.usefullLinkService.createUsefullLink(this.newUsefullLink)
      .subscribe((res) => {
        this.usefullLinksList.unshift(res.data)
        this.newUsefullLink = new UsefullLink()
      })

  }

    editUsefullLink(usefullLinks: UsefullLink) {
    console.log(usefullLinks)
    if(this.usefullLinksList.includes(usefullLinks)){
      if(!this.editUsefullLinks.includes(usefullLinks)){
        this.editUsefullLinks.push(usefullLinks)
      }else{
        let img = (<HTMLInputElement>document.getElementById('update-upload')).files[0].name;
        usefullLinks.img = img;
        this.editUsefullLinks.splice(this.editUsefullLinks.indexOf(usefullLinks), 1)
        this.usefullLinkService.editUsefullLink(usefullLinks).subscribe(res => {
          console.log('Update Succesful')
        }, err => {
          this.editUsefullLink(usefullLinks)
          console.error('Update Unsuccesful')
        })
      }
    }

  }

  deleteUsefullLink(usefullLinks: UsefullLink) {
    this.usefullLinkService.deleteUsefullLink(usefullLinks._id).subscribe(res => {
      this.usefullLinksList.splice(this.usefullLinksList.indexOf(usefullLinks), 1);
    })
  }
}
