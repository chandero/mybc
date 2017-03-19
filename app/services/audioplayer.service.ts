import { EventEmitter, Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class AudioPlayerService {

        private _initialized:boolean = false;

        private FILES = require('./sounds.json');

        private SOUNDS = new Map(
	[
		[ 'ringback', { audio: new Audio(this.FILES['ringback']), volume: 1.0 } ],
		[ 'ringing',  { audio: new Audio(this.FILES['ringing']),  volume: 1.0 } ],
		[ 'answered', { audio: new Audio(this.FILES['answered']), volume: 1.0 } ],
		[ 'rejected', { audio: new Audio(this.FILES['rejected']), volume: 0.5 } ]
	]);

    constructor(){
        this.initialize();
    }


    private initialize(){
		if (this._initialized)
			return;
        
        this.SOUNDS.forEach((sound: any, key: string) =>
		{
			sound.audio.volume = 0;

			try { sound.audio.play(); } catch (error) {}
        });

		this._initialized = true;
	}        
    
    public play(name:string, relativeVolume: number){
        this.initialize();

		if (typeof relativeVolume !== 'number')
			relativeVolume = 1.0;

		let sound = this.SOUNDS.get(name);

		if (!sound)
			throw new Error(`unknown sound name "${name}"`);

		
		try
		{
			console.debug('play() [name:%s]', name);
			sound.audio.pause();
			sound.audio.currentTime = 0.0;
			sound.audio.volume = (sound.volume || 1.0) * relativeVolume;
			sound.audio.addEventListener('ended', e => {
				sound.audio.currentTime = 0.0;
				sound.audio.play();
			})
			sound.audio.play();
		}
		catch (error)
		{
			console.warn('play() | error: %o', error);
		}

    }

    public 	stop(name)
	{
		console.debug('stop() [name:%s]', name);

		let sound = this.SOUNDS.get(name);

		if (!sound)
			throw new Error(`unknown sound name "${name}"`);

		sound.audio.pause();
		sound.audio.currentTime = 0.0;
	}

}