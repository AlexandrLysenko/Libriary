
export class User{
    _id: string;
    FirstName: string;
  	SurName: string;
  	Patronimic: string;
  	Grade: string;
    Discriminator: string;
  	Street: string;
    House: string;
  	Apartment: string;
  	ticket: string;
    Books: string[];
    constructor(
    ){
        this.FirstName = ""
        this.SurName = ""
        this.Patronimic = ""
        this.Grade = ""
        this.Discriminator = ""
        this.Street = ""
        this.Apartment = ""
        this.House = ""
        this.ticket = ""
        this.Books = []
    }
}
