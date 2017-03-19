import { Component, OnInit } from '@angular/core';
import { contact } from '../models/contact.model'; 
import { Router } from '@angular/router';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.css']
})
export class ContactsComponent implements OnInit {

  private _contacts = [
    new contact('Alexander Cruz','San Agustin','alexcruz@tmtek.net',['5623366','3142425575']),
    new contact('Alexander Cruz','San Agustin','alexcruz@tmtek.net',['5623366','3142425575']),
    new contact('Alexander Cruz','San Agustin','alexcruz@tmtek.net',['5623366','3142425575']),
    new contact('Alexander Cruz','San Agustin','alexcruz@tmtek.net',['5623366','3142425575']),
    new contact('Alexander Cruz','San Agustin','alexcruz@tmtek.net',['5623366','3142425575']),
    new contact('Alexander Cruz','San Agustin','alexcruz@tmtek.net',['5623366','3142425575']),
    new contact('Alexander Cruz','San Agustin','alexcruz@tmtek.net',['5623366','3142425575']),
    new contact('Alexander Cruz','San Agustin','alexcruz@tmtek.net',['5623366','3142425575']),
    new contact('Alexander Cruz','San Agustin','alexcruz@tmtek.net',['5623366','3142425575']),
    new contact('Alexander Cruz','San Agustin','alexcruz@tmtek.net',['5623366','3142425575']),
    new contact('Alexander Cruz','San Agustin','alexcruz@tmtek.net',['5623366','3142425575']),
    new contact('Alexander Cruz','San Agustin','alexcruz@tmtek.net',['5623366','3142425575']),
    new contact('Alexander Cruz','San Agustin','alexcruz@tmtek.net',['5623366','3142425575'])
  ]

  private _searchText:string;

  constructor(private router: Router) { }

  ngOnInit() {
  }

  newContact(){
    this.router.navigate(['/dashboard/contact']);
  }

}
