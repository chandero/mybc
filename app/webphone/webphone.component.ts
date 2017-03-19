import { Component, OnInit, ViewChild } from '@angular/core';
import { WebphoneSIPmlService, call_sipml } from '../services/webphone_sipml.service';
import { WebphoneJsSIPService, call } from '../services/webphone_jssip.service';
import { ClockComponent } from '../clock/clock.component';
import { MdlDialogService, MdlSnackbarService, IOpenCloseRect, MdlDialogComponent } from 'angular2-mdl';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-webphone',
  templateUrl: './webphone.component.html',
  styleUrls: ['./webphone.component.css'],
  entryComponents: [ClockComponent]
})
export class WebphoneComponent implements OnInit {

  private _startclock: boolean = false;

  private _ready: boolean = true;
  private _idle: boolean = false;
  private _ringing: boolean = false;
  private _incall: boolean = false;
  private _inprogress: boolean = false;
  private _isHold: boolean = false;
  private _isMuted: boolean = false;
  private _isRemoteVideo:boolean = false;

  private _callEvent:any;

  private _remoteVideoVisible:boolean = false;

  private _transferDialog: MdlDialogComponent;

  private _statusText: string = "Disponible";

  private _dialnumber: string = "";
  private _identifier: string = "DESCONOCIDO";

  @ViewChild('remoteVideo') _remoteVideo:HTMLMediaElement;
  @ViewChild('_remoteVideo') _remoteVideoDialog: MdlDialogComponent;

  constructor(private webphoneService: WebphoneSIPmlService, private dialogService: MdlDialogService, private snackbarService: MdlSnackbarService ) {
    webphoneService.progressCall$.subscribe(e => this.progressHandler(e));
    webphoneService.confirmedCall$.subscribe(e => this.confirmedHandler(e));
    webphoneService.endedCall$.subscribe(e => this.endedHandler(e));
    webphoneService.failedCall$.subscribe(e => this.failedHandler(e));
    webphoneService.succeededCall$.subscribe(e => this.succeededHandler(e));
    webphoneService.incomingCall$.subscribe(e => this.incomingHandler(e));
    webphoneService.answerCall$.subscribe( e => this.answerHandler(e));
    webphoneService.remoteStreamCall$.subscribe( e => this.remoteStreamHandler(e));
    
  }

  ngOnInit() {
  }

  private validateDialnumber() {
    if (this._dialnumber.length > 0) {
      this._idle = true;
    } else {
      this._idle = false;
    }
  }

  private numberClick(number) {
    this._dialnumber += number;
    this.validateDialnumber();
  }

  private dialerChange(event) {
    this._dialnumber = event.target.value;
    this.validateDialnumber();
  }

  private clear() {
    this._dialnumber = "";
    this._idle = false;
  }

  // webphone methods

  private dial() {
    this.webphoneService.dial(this._dialnumber);
    this._dialnumber = "";
  }

  private answer() {
    this.webphoneService.answer(this._callEvent);
  }

  private reject() {
    this.webphoneService.reject(this._callEvent);
    this._dialnumber = "";
    this.validateDialnumber();
  }

  private hangup() {
    //this.webphoneService.hangup();
    this._dialnumber = "";
    this.validateDialnumber();
  }

  private togglemute() {
    //this.webphoneService.togglemute();
  }

  private togglehold() {
    //this.webphoneService.togglehold();
  }

  private transfer() {
    //this.webphoneService.transfer(this._dialnumber);
  }

  private togglevideo() {
   // this.webphoneService.togglevideo();
  }


  // Event Handler
  
  public remoteStreamHandler(e: any){
    this._remoteVideo.srcObject = e;
    e.addEventListener('addtrack', () =>
                {
                        if (this._remoteVideo.srcObject !== e)
                                return;

                        console.debug('remote stream "addtrack" event');

                        // Refresh remote video
                        this._remoteVideo.srcObject = e;
                });
    e.addEventListener('removetrack', () =>
                {
                        if (this._remoteVideo.srcObject !== e)
                                return;

                        console.debug('remote stream "removetrack" event');

                        // Refresh remote video
                        this._remoteVideo.srcObject = e;
                });


    this._isRemoteVideo = true;
    this._remoteVideoDialog.show();
  }


  public progressHandler(e: any) {
    console.log('progress:' + JSON.stringify(e));
    this._statusText = 'Llamando';
    this._idle = false;
    this._ready = false;
    this._ringing = false;
    this._incall = false;
    this._inprogress = true;

    this._startclock = true;
  }

  public answerHandler(e:any){
    console.log('Answer: ' + JSON.stringify(e.direction));
    this._statusText = 'En Llamada';
    this._idle = false;
    this._ready = false;
    this._ringing = false;
    this._incall = true;
    this._inprogress = false;
    this._startclock = true;    

    let audio = new Audio(e.localMediaStream);
    audio.play();
  }

  public confirmedHandler(e: any) {
    console.log('confirmed:' + JSON.stringify(e));
    this._statusText = 'En Llamada';
    this._idle = false;
    this._ready = false;
    this._ringing = false;
    this._incall = true;
    this._inprogress = true;
  }

  public endedHandler(e: any) {
    console.log('ended:' + JSON.stringify(e.data));
    this._statusText = 'Disponible';
    this._idle = true;
    this._ready = true;
    this._incall = false;
    this._ringing = false;
    this._inprogress = false;

    this._startclock = false;

    if (this._isRemoteVideo) {
      this._remoteVideoDialog.close();
      this._isRemoteVideo = false;
    }
  }

  public failedHandler(e) {
    console.log('failed:' + JSON.stringify(e));
    this._statusText = 'Disponible';
    this._idle = true;
    this._ready = true;
    this._incall = false;
    this._ringing = false;
    this._inprogress = false;

    this._startclock = false;

    if (this._isRemoteVideo) {
      this._remoteVideoDialog.close();
      this._isRemoteVideo = false;
    }
    
  }

  public succeededHandler(e) {
    console.log('succeeded:' + JSON.stringify(e));
  }

  public holdHandler(e) {
    this._isHold = true;
  }

  public unholdHandler(e) {
    this._isHold = false;
  }

  public muteHandler(e) {
    this._isMuted = true;
  }

  public unmuteHandler(e) {
    this._isMuted = false;
  }

  public incomingHandler(e){
    this._statusText = 'Timbrando';
    this._idle = false;
    this._ready = false;
    this._incall = false;
    this._ringing = true;
    this._inprogress = false;

    this._startclock = false;
    this._callEvent = e;
  }

  private onTransferDialogShow(e:any){

  }

  private onTransferDialogHide(){

  }

}
