import { Component, OnInit } from '@angular/core';
import { cdr } from '../models/cdr.model';

@Component({
  selector: 'app-cdr',
  templateUrl: './cdr.component.html',
  styleUrls: ['./cdr.component.css']
})
export class CdrComponent implements OnInit {  

  _cdrs = [
    new cdr('Alexander 555555', '555555', '../assets/images/missedcall.svg', '18:00 11/11/2016', '../assets/images/callback.svg'),
    new cdr('Alexander 555555', '555555', '../assets/images/incomingcall.svg', '18:00 11/11/2016', '../assets/images/callback.svg'),
    new cdr('Alexander 555555', '555555', '../assets/images/missedcall.svg', '18:00 11/11/2016', '../assets/images/callback.svg'),
    new cdr('Alexander 555555', '555555', '../assets/images/incomingcall.svg', '18:00 11/11/2016', '../assets/images/callback.svg'),
    new cdr('Alexander 555555', '555555', '../assets/images/missedcall.svg', '18:00 11/11/2016', '../assets/images/callback.svg'),
    new cdr('Alexander 555555', '555555', '../assets/images/incomingcall.svg', '18:00 11/11/2016', '../assets/images/callback.svg')
   /* new cdr('Alexander 555555', '555555', '../assets/images/missedcall.svg', '18:00 11/11/2016', '../assets/images/callback.svg'),
    new cdr('Alexander 555555', '555555', '../assets/images/incomingcall.svg', '18:00 11/11/2016', '../assets/images/callback.svg'),
    new cdr('Alexander 555555', '555555', '../assets/images/missedcall.svg', '18:00 11/11/2016', '../assets/images/callback.svg'),
    new cdr('Alexander 555555', '555555', '../assets/images/incomingcall.svg', '18:00 11/11/2016', '../assets/images/callback.svg'),
    new cdr('Alexander 555555', '555555', '../assets/images/missedcall.svg', '18:00 11/11/2016', '../assets/images/callback.svg'),
    new cdr('Alexander 555555', '555555', '../assets/images/incomingcall.svg', '18:00 11/11/2016', '../assets/images/callback.svg'),
    new cdr('Alexander 555555', '555555', '../assets/images/missedcall.svg', '18:00 11/11/2016', '../assets/images/callback.svg'),
    new cdr('Alexander 555555', '555555', '../assets/images/incomingcall.svg', '18:00 11/11/2016', '../assets/images/callback.svg') */                       
  ]

  private _iniDate;
  private _endDate;

  constructor() { }

  ngOnInit() {
  }

}
