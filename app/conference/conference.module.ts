import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';


import { MdlModule } from 'angular2-mdl';
import { MdlSelectModule } from '@angular-mdl/select';
import { MdlPopoverModule } from '@angular-mdl/popover';

import { ConferenceComponent } from './conference.component';

@NgModule({
    declarations: [
        ConferenceComponent
    ],
    imports: [
        CommonModule,
    	RouterModule,
        MdlModule,
        MdlSelectModule,
        MdlPopoverModule
    ],
    exports: [
        ConferenceComponent]
})

export class ConferenceModule {}