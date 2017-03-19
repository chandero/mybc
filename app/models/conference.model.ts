import { Optional } from '@angular/core';
import { contact } from './contact.model';

export class conference {
    public confId:string;
    public confName:string;
    public confDescription:string;
    public confDate:string;
    public confParticipants:contact[];
    public confSelected:boolean;

    constructor(confId:string, confName:string, confDescription:string, confDate:string, @Optional() confParticipants:contact[]){
        this.confId = confId;
        this.confName = confName;
        this.confDescription = confDescription;
        this.confDate = confDate;
        this.confParticipants = confParticipants;
    }
}