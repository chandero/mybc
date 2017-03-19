import { Component, OnInit, Input, Output, OnChanges, SimpleChange } from '@angular/core';

@Component({
  selector: 'app-clock',
  templateUrl: './clock.component.html',
  styleUrls: ['./clock.component.css']
})
export class ClockComponent implements OnInit, OnChanges {

  private _data;
  private _format;
  private _timer = true;
  private _intervalSet = false;

  @Input() enabled:boolean = false;

  constructor() { 

    this.createClock();

  }

  ngOnInit() {
  }

  ngOnChanges(changes: {[propKey: string]: SimpleChange}){
    for (let propName in changes){
      if (propName = "enabled") {
        let changedProp = changes[propName];
        if (changedProp.currentValue = true){
          this.start();
        } else {
          this.reset;
        }
      }
    }
  }

  createClock(){
    var data = new Date();
    data.setHours(0);
    data.setMinutes(0);
    data.setSeconds(0);
    data.setMilliseconds(0);
    var date, miliseconds;
    this._format = 'HH:mm:ss';
    this._data = data;
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
    this._data.setHours(0);
    this._data.setMinutes(0);
    this._data.setSeconds(0);
    this._data.setMilliseconds(0);

    if (!this._intervalSet) {
      window.setInterval(() => { this.refreshTime() }, 60000);
      this._intervalSet = true;
    }
  }

  reset(){
    this._timer = false;
  }

  start(){
    this.refreshTime();
    this._timer = true;
  }

}
