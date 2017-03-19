import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { MdlModule } from 'angular2-mdl';
import { MdlSelectModule } from '@angular-mdl/select';
import { MdlPopoverModule } from '@angular-mdl/popover';

import { WebphoneComponent } from './webphone.component';
import { ClockComponent } from '../clock/clock.component';

@NgModule({
    declarations: [
        ClockComponent,
        WebphoneComponent
    ],
    imports: [
        CommonModule,
    	RouterModule,
        MdlModule,
        MdlSelectModule,
        MdlPopoverModule
    ],
    exports: [
        WebphoneComponent]
})

export class WebphoneModule {}