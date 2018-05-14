
export class Book{
    _id: string;
    Name: string;
  	Author: string;
  	Genre: string;
  	Grade: string;
    Discriminator: string;
  	Subject: string;
    Img: string;
  	Published: string;
  	Status: number;

    constructor(
    ){
        this.Name = ""
        this.Author = ""
        this.Genre = ""
        this.Grade = ""
        this.Subject = ""
        this.Img = ""
        this.Discriminator = ""
        this.Published = ""
        this.Status = 1
    }
}
