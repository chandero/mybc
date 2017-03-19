import { Component, OnInit, Attribute } from '@angular/core';
//import { WebphoneJsSIPService, call } from '../services/webphone_jssip.service';
import { WebphoneSIPmlService } from '../services/webphone_sipml.service';

//declare var JsSIP: any;

declare var SIPml:any;

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  private _userFullname: string = "Alexander Cruz";
  private _userPhone: string = "2020";

  private _data;
  private _format;
  private _timer = true;
  private _intervalSet = false;

  constructor( @Attribute("data") data, private webphoneService: WebphoneSIPmlService ) {


    this.createClock(data);

  }

  ngOnInit() {
  }

  createClock(data){
    var date, miliseconds;
    this._format = 'hh:mm:ss';
    this._data = data || new Date();
    if (this._timer) {
      if (typeof this._data !== 'Date') {
        date = new Date();
      } else {
        date = this._data;
      }

      miliseconds = (60 - date.getSeconds()) * 1000;
      window.setTimeout(() => { this.refreshTime(); }, miliseconds);
    }    
  }

  refreshTime() {
    this._data = new Date();
    if (!this._intervalSet) {
      window.setInterval(() => { this.refreshTime() }, 60000);
      this._intervalSet = true;
    }
  }  

}
