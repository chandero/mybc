import { Component, OnInit } from '@angular/core';
import { conference } from '../models/conference.model';
import { contact } from '../models/contact.model';

@Component({
  selector: 'app-conferences',
  templateUrl: './conferences.component.html',
  styleUrls: ['./conferences.component.css']
})
export class ConferencesComponent implements OnInit {

  private _conferences = [
        new conference("1","ConfOne","Conferencia Test Uno", "01.01.2016", [ new contact('Alexander Cruz','San Agustin','alexcruz@tmtek.net',['5623366','3142425575']),
    new contact('Alexander Cruz','San Agustin','alexcruz@tmtek.net',['5623366','3142425575']),
    new contact('Alexander Cruz','San Agustin','alexcruz@tmtek.net',['5623366','3142425575'])]),
        new conference("1","ConfOne","Conferencia Test Uno", "01.01.2016", [ new contact('Alexander Cruz','San Agustin','alexcruz@tmtek.net',['5623366','3142425575']),
    new contact('Alexander Cruz','San Agustin','alexcruz@tmtek.net',['5623366','3142425575']),
    new contact('Alexander Cruz','San Agustin','alexcruz@tmtek.net',['5623366','3142425575'])]),
        new conference("1","ConfOne","Conferencia Test Uno", "01.01.2016", [ new contact('Alexander Cruz','San Agustin','alexcruz@tmtek.net',['5623366','3142425575']),
    new contact('Alexander Cruz','San Agustin','alexcruz@tmtek.net',['5623366','3142425575']),
    new contact('Alexander Cruz','San Agustin','alexcruz@tmtek.net',['5623366','3142425575'])]),
        new conference("1","ConfOne","Conferencia Test Uno", "01.01.2016", [ new contact('Alexander Cruz','San Agustin','alexcruz@tmtek.net',['5623366','3142425575']),
    new contact('Alexander Cruz','San Agustin','alexcruz@tmtek.net',['5623366','3142425575']),
    new contact('Alexander Cruz','San Agustin','alexcruz@tmtek.net',['5623366','3142425575'])])
  ]

  constructor() { }

  ngOnInit() {
  }

}
