import { Component, OnInit, Attribute } from '@angular/core';
import { WebphoneSIPmlService } from '../services/webphone_sipml.service';

declare var gapi: any;

//declare var SIPml:any;

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  private _userFullname: string = localStorage.getItem("mybcname");
  private _userPhone: string = localStorage.getItem("mybcexten");

  private _extensionStatusImageUrl: string;
  private _data;
  private _format;
  private _timer = true;
  private _intervalSet = false;
  private _statusphone: string;

  private auth2: any;

  constructor( @Attribute("data") data, private webphoneService: WebphoneSIPmlService) {
    webphoneService.progressCall$.subscribe(e => this.progressHandler(e));
    webphoneService.confirmedCall$.subscribe(e => this.confirmedHandler(e));
    webphoneService.endedCall$.subscribe(e => this.endedHandler(e));
    webphoneService.failedCall$.subscribe(e => this.failedHandler(e));
    webphoneService.succeededCall$.subscribe(e => this.succeededHandler(e));
    webphoneService.incomingCall$.subscribe(e => this.incomingHandler(e));
    webphoneService.answerCall$.subscribe(e => this.answerHandler(e));
    webphoneService.remoteStreamCall$.subscribe(e => this.remoteStreamHandler(e));
    webphoneService.registryExten$.subscribe(e => this.registryExtenHandler(e));
    webphoneService.tryregistryExten$.subscribe(e => this.tryregistryExtenHandler(e));
    webphoneService.unregistryExten$.subscribe(e => this.unregistryExtenHandler(e));
    this._extensionStatusImageUrl = "";
    this.createClock(data);

  }

  ngOnInit() {
  }

  ngAfterViewInit(): void {
    setTimeout(() => this.signIn(), 1000);
  }

  private signIn() {
    gapi.load('auth2', () => {
      this.auth2 = gapi.auth2.init({
        client_id: '783669865413-v8no6fp43ljeebqdd69km4gnnivq1otk.apps.googleusercontent.com',
        cookie_policy: 'single_host_origin',
        scope: 'profile email https://www.googleapis.com/auth/contacts.readonly'
      });
      this.auth2.attachClickHandler(document.getElementById('googleres'), {}, this.onSignIn, this.onFailure);
    })
  }

  private onSignIn() {
    this.fetchcontact();
  }

  private onFailure() {

  }

  private fetchcontact() {
    gapi.load('client:auth2', () => {
      gapi.client.init({
        apiKey: 'AIzaSyBaw7OWQKc74-MAp09WLYnb21bxRavRkPc',
        discoveryDocs: ['https://people.googleapis.com/$discovery/rest?version=v1'],
        clientId: '783669865413-v8no6fp43ljeebqdd69km4gnnivq1otk.apps.googleusercontent.com',
        scope: 'profile email https://www.googleapis.com/auth/contacts.readonly'
      }).then(() => {
        return gapi.client.people.people.connections.list({
          resourceName: 'people/me',
          personFields: 'emailAddresses,names'
        });
      }).then(
        (res) => {
          console.log("Res: " + JSON.stringify(res));
          //this.userContacts.emit(this.transformToMailListModel(res.result));
        },
        error => console.log("ERROR " + JSON.stringify(error))
        )
    }
  }

  private progressHandler(e: any) {

  }

  private confirmedHandler(e: any) {

  }

  private endedHandler(e: any) {
    this._statusphone = 'Disponible';
  }

  private failedHandler(e: any) {
    this._statusphone = 'Disponible';
  }

  private succeededHandler(e) {
    this._statusphone = '';
  }

  private incomingHandler(e) {
    this._statusphone = 'Timbrando';
  }

  private answerHandler(e) {
    this._statusphone = 'En Llamanda';
  }

  private registryExtenHandler(e) {
    this._extensionStatusImageUrl = "/mybc/assets/images/ext.svg";
  }

  private tryregistryExtenHandler(e) {
    this._extensionStatusImageUrl = "/mybc/assets/images/ext.svg";
  }

  private unregistryExtenHandler(e) {
    this._extensionStatusImageUrl = "/mybc/assets/images/ext.svg";
  }

  private remoteStreamHandler(e) {

  }

  createClock(data) {
    var date, miliseconds;
    this._format = 'hh:mm:ss';
    this._data = data || new Date();
    if (this._timer) {
      if (this._data instanceof Date) {
        date = this._data;
      } else {
        date = new Date();
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
