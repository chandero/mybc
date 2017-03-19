import { EventEmitter, Injectable, ViewContainerRef } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AudioPlayerService } from './audioplayer.service';

import { SIPml } from './sipml';

export class call_sipml {
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
export class WebphoneSIPmlService {
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

    // sipml vars
    private _sipStack:any;
    private _eventListener:any;
    private _sipuri:string;
    private _callerid:string;
    private _registerSession:any;
    private _registerEventListener:any;
    
    private _socket: any;
    private _configuration: any;
    private _session:any; 
    private _eventHandlers:any;   
    private _options:any;

    private _domain:string = "190.252.204.202";
    private _user:string = 'my2020bc';
    private _secret:string = '$UWkf42&';


    constructor(private _sipml: SIPml){
        
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

        this._sipuri = 'sip:'+this._user+'@'+this._domain;
        this._options = {
            realm: this._domain, // obligatorio: nombre de dominio
            impi: this._user, // obligatorio: nombre de usuario
            impu: this._sipuri, // obligatorio: SIP uri valida
            password: this._secret, // opcional: sip secret
            display_name: this._callerid, // opcional: identificador del llamante
            websocket_proxy_url: 'wss://'+this._domain+':8089/asterisk/ws', //opcional
            outbound_proxy_url: '', //udp://'+this._domain+':5060', // opcional
            enable_rtcweb_breaker: false, // opcional
            events_listener: { events: '*', listener: this._eventListener }, // opcional: '*' significa todo los eventos
            ice_servers: [{url:'stun:stun.l.google.com:19302'}],
            enable_media_stream_cache: true,
            sip_caps: [
                            { name: '+g.oma.sip-im' },
                            { name: '+sip.ice' },
                            { name: 'language', value: '\"en,fr\"' }
                    ],
            sip_headers: [
                                { name: 'User-Agent', value: 'Anywhere-MyBC/Beta 1.0' },
                                { name: 'Organization', value: 'Tmsoft SAS' }                
            ]
        }

        this.startRegister();
    }

    private startRegister(){
        this._sipml.init( this._options ).then(() => {
            this._sipml.onSipSessionCallConnected(() => {
        
            });
            this._sipml.onSipSessionCallConnecting(() => {
        
            });
            this._sipml.onSipSessionCallDeclined(() => {
        
             });
            this._sipml.onSipSessionCallIncoming((number) => {
        
            });
            this._sipml.onSipSessionCallRinging(() => {
        
            });
            this._sipml.onSipSessionCallTerminated(() => {
        
            });
        });
    }

    private login(){
        this._registerEventListener = e => {
            console.info('sipml session event ' + e.type);
            if (e.type == 'connected' && e.session == this._registerSession ){
                // pueden hacerse llamadas
            }
        }
        this._registerSession = this._sipStack.newSession('register', {
            events_listener: { events: '*', listener: this._registerEventListener }
        });
        this._registerSession.register();
    }

    public dial(e:string){
        this.makeCall(e);
    }

    public answer(e){
        this.acceptCall(e);
    }

    public reject(e){
        this.rejectCall(e);
    }

    private makeCall(e:string){
        var callSession = this._sipStack.newSession('call-audiovideo', {
            audio_remote: document.getElementById("audio_remote"),
            video_remote: document.getElementById("video_remote")
        });
        callSession.call(e);
    }

    private acceptCall(e:any){
        e.newSession.accept();
    }

    private rejectCall(e:any){
        e.newSession.reject();
    }

    private acceptMessage(e:any){
        e.newSession.accept();
        console.info('Message: ' + e.getContentString() + ' and Type: ' + e.getContentType());
    }

    private rejectMessage(e:any){
        e.newSession.reject();
    }

    private sendMessage(e:string, m:string){
        var eventsListener = e => {
            console.info('message session event: ' + e.type);
        }

        var messageSession = this._sipStack.newSession('message', {
            events_listener: { events: '*', listener: eventsListener}
        })

        messageSession.send(e,m,'text/plain;charset=utf-8');
    }


    // Emit Events
    public emitIncomingcallEvent(e:any){
        this.incomingCall$.emit(e);
    }    

}