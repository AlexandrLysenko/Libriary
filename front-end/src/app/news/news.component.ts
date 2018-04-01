
import { Response } from '@angular/http';
import { EntryService } from '../services/entry.service';
import { Entry } from '../models/entry.model';
import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';
import * as $ from 'jquery';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.css']
})
export class NewsComponent implements OnInit {
  imageUrl: any = 'imgs/';

  constructor(
  	private entryService: EntryService,
    public auth: AuthenticationService
  	) { }

  public newEntry: Entry = new Entry();
  entriesList: Entry[];

  editEntries: Entry[] = [];

  ngOnInit() {
  	 //At component initialization the
    this.entryService.getEntries()
      .subscribe(entries => {
        //assign the todolist property to the proper http response
        this.entriesList = entries.reverse();
        console.log(entries);
      })
  }


  create() {
    let img = (<HTMLInputElement>document.getElementById('create-upload')).files[0].name;
    console.log(img);
    this.newEntry.img = img;
    this.entryService.createEntry(this.newEntry)
      .subscribe((res) => {
        this.entriesList.unshift(res.data)
        this.newEntry = new Entry()
      })

  }

    editEntry(entry: Entry) {
    console.log(entry)
    if(this.entriesList.includes(entry)){
      if(!this.editEntries.includes(entry)){
        this.editEntries.push(entry)
      }else{
        let img = (<HTMLInputElement>document.getElementById('update-upload')).files[0].name;
        entry.img = img;
        this.editEntries.splice(this.editEntries.indexOf(entry), 1)
        this.entryService.editEntry(entry).subscribe(res => {
          console.log('Update Succesful')
        }, err => {
          this.editEntry(entry)
          console.error('Update Unsuccesful')
        })
      }
    }

}

  deleteEntry(entry: Entry) {
    this.entryService.deleteEntry(entry._id).subscribe(res => {
      this.entriesList.splice(this.entriesList.indexOf(entry), 1);
    })
  }
}
