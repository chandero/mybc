import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

//import { routing_login } from './login.routes';
import { LoginComponent } from './login.component';
import { IdentifierComponent } from '../identifier/index';
import { PasswordComponent } from '../password/index';

@NgModule({
    declarations: [
        LoginComponent, 
        IdentifierComponent, 
        PasswordComponent],
    imports: [
        CommonModule,
    	RouterModule,
        //routing_login,
    ],
    exports: [
        LoginComponent, 
        IdentifierComponent, 
        PasswordComponent]
})

export class LoginModule { }