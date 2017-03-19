import { Optional } from '@angular/core';

export class contact {
    public name:string;
    public address:string;
    public email:string;
    public phone:string[];
    public selected:boolean;

    constructor(name:string, address:string, email:string, phone:string[]){
        this.name = name;
        this.address = address;
        this.email = email;
        this.phone = phone;
        this.selected = false;
    } 
}