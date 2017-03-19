import { EventEmitter, Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AudioPlayerService } from './audioplayer.service';

declare var JsSIP: any;

export class call {
    public callId:string;
    public callSrc:string;
    public callDst:string;
    public callTripart:string;
    public callStatus:number;
    public callDate:string;
    public callMicOn:boolean;
    public callVideo:boolean;

    constructor(){}
}

@Injectable()
export class WebphoneJsSIPService {
    public progressCall$:EventEmitter<any>;
    public failedCall$:EventEmitter<any>;
    public endedCall$:EventEmitter<any>;
    public confirmedCall$:EventEmitter<any>;
    public succeededCall$:EventEmitter<any>;
    public holdCall$:EventEmitter<any>;
    public unholdCall$:EventEmitter<any>;
    public muteCall$:EventEmitter<any>;
    public unmuteCall$:EventEmitter<any>;
    public incomingCall$:EventEmitter<any>;
    public answerCall$:EventEmitter<any>;
    public remoteStreamCall$:EventEmitter<any>;


    private _socket: any;
    private _configuration: any;
    private _sip: any;
    private _session:any; 
    private _eventHandlers:any;   
    private _options:any;

    private _domain:string = "192.168.3.143";

	private state =
		{
			// 'connecting' / disconnected' / 'connected' / 'registered'
			status          : 'disconnected',
			session         : null,
			incomingSession : null
		};    

    constructor(private audioPlayer: AudioPlayerService){
        this.progressCall$ = new EventEmitter();
        this.failedCall$ = new EventEmitter<any>();
        this.confirmedCall$ = new EventEmitter<any>();
        this.endedCall$ = new EventEmitter<any>();
        this.confirmedCall$ = new EventEmitter<any>();
        this.succeededCall$ = new EventEmitter<any>();
        this.holdCall$ = new EventEmitter<any>();
        this.unholdCall$ = new EventEmitter<any>();
        this.muteCall$ = new EventEmitter<any>();
        this.unmuteCall$ = new EventEmitter<any>();
        this.incomingCall$ = new EventEmitter<any>();
        this.answerCall$ = new EventEmitter<any>();
        this.remoteStreamCall$ = new EventEmitter<any>();

        this.startRegister();
    }

    private startRegister(){
    this._socket = new JsSIP.WebSocketInterface('ws://'+this._domain+':8088/ws');
    this._configuration = {
        sockets  : [ this._socket ],
        uri      : 'sip:my2022bc@'+this._domain,
        password : '$UWkf42&',
        trace_sip: true
    };
    this._sip = new JsSIP.UA(this._configuration);
    
    this._sip.on('connecting', e => {

    });

    this._sip.on('connected', e => {

    });

    this._sip.on('disconnected', e => {

    });

    this._sip.on('registered', e => {

    });

    this._sip.on('unregistered', e => {

    });

    this._sip.on('registrationFailed', e => {

    });

    this._sip.on('newRTCSession', e => {
			if (e.originator === 'local')
				return;

            let session = e.session;
            if (this.state.session || this.state.incomingSession) {
				console.debug('incoming call replied with 486 "Busy Here"');

				session.terminate(
					{
						status_code   : 486,
						reason_phrase : 'Busy Here'
					});

				return;
			}
            this.audioPlayer.play('ringing',1);
            this.state.incomingSession = session;
            this.emitIncomingcallEvent(session);
            session.on('failed', e =>
			{
                console.log('Failed Incoming Call');
				this.audioPlayer.stop('ringing');
				this.state.session = null;
                this.state.incomingSession = null;
			});

			session.on('ended', () =>
			{
                console.log('Ended Incoming Call');
                this.state.session = null;
                this.state.incomingSession = null;
			});

			session.on('accepted', () =>
			{
                console.log('Accepted Incoming Call');
				this.audioPlayer.stop('ringing');
                this.state.session = session;
                this.state.incomingSession = null;
                this.emitAnswerEvent(session);
			});

            session.on('addstream', e => {
                this.emitRemoteStreamEvent(e.stream);
            })

    });        
    
    this._sip.start();

    // Register callbacks to desired call events
    this._eventHandlers = {
      'connecting': e => {

      },
      'progress': e => {
            this.emitProgressEvent(e);
      },
      'failed': e => {
                    this.emitFailedEvent(e);
                },
      'ended': e =>  {
                    this.emitEndedEvent(e);
                },
      'confirmed': e => {
                    this.emitConfirmedEvent(e);
                   },
      'succeeded': e => { 
                    this.emitSucceededEvent(e);
                },
      'addstream': e => {
                    this.emitRemoteStreamEvent(e.stream);
      },
      'accepted': e => {
			this.audioPlayer.stop('ringback');
      }
    };

    this._options = {
      'eventHandlers'    : this._eventHandlers,
      'mediaConstraints' : { 'audio': true, 'video': true },
      'rtcOfferConstraints' : { offerToReceiveAudio : 1, offerToReceiveVideo : 1 }
    };
        
    }

    public dial(dialnumber:string){
        var sipstring:string = "sip:"+dialnumber+"@"+this._domain;
        this._session = this._sip.call(sipstring, this._options);
    }

    public answer(e:any) {
        this.state.incomingSession.answer();
    }

    public reject(e:any){
        this._sip.terminateSessions();
    }

    public hangup(){
        this._sip.terminateSessions();
    }

    public togglemute(){
        var options = this._session.isMuted();
        console.log('toggle mute:'+ JSON.stringify(options));
        if (options.audio === true){
            console.log('to unmute');
            this._session.unmute({audio: true});
        } else {
            console.log('to mute');
            this._session.mute({audio: true});
        }
    }

    public togglehold(){
        var options = this._session.isOnHold();
        console.log('toggle hold:'+ JSON.stringify(options));
        var result:boolean;
        if (options.local){
            result = this._session.unhold();
            if (result) {
                this.emitUnholdEvent();
            }
        } else {
            result = this._session.hold();
            if (result) {
                this.emitHoldEvent();
            }
        }
    }

    public togglevideo(){
        var options = this._session.isMuted();
        console.log('toggle video:'+ JSON.stringify(options));
        if (options.video === true){
            console.log('to with video');
            this._session.unmute({video: true});
        } else {
            console.log('to without video');
            this._session.mute({video: true});
        }
    }

    public transfer(data:string){
        this._session.refer(data);
    }

    



    // Emit events

    public emitRemoteStreamEvent(stream:any){
        this.remoteStreamCall$.emit(stream);
    }    

    public emitProgressEvent(e:any) {
        this.audioPlayer.play('ringback',1);
        this.progressCall$.emit(e);
    }

    public emitFailedEvent(e:any){
        this.audioPlayer.stop('ringback');
		this.audioPlayer.play('rejected',1);
        this.failedCall$.emit(e);
    }

    public emitAnswerEvent(e:any){
        this.answerCall$.emit(e);
    }

    public emitConfirmedEvent(e:any) {
        this.confirmedCall$.emit(e);
    }

    public emitEndedEvent(e:any) {
        this.audioPlayer.stop('ringback');
        this._session = null;
        this.endedCall$.emit(e);
    }

    public emitSucceededEvent(e:any){
        this.succeededCall$.emit(e);
    }

    public emitHoldEvent(){
        this.holdCall$.emit({'result':true});
    }

    public emitUnholdEvent(){
        this.unholdCall$.emit({'result':true});
    }    

    public emitMuteEvent(){
        this.muteCall$.emit({'result':true});
    }

    public emitUnmuteEvent(){
        this.unmuteCall$.emit({'result':true});
    }

    public emitIncomingcallEvent(e:any){
        this.incomingCall$.emit(e);
    }

}