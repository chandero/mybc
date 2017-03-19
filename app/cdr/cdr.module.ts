import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { MdlModule } from 'angular2-mdl';
import { MdlSelectModule } from '@angular2-mdl-ext/select';
import { MdlPopoverModule } from '@angular2-mdl-ext/popover';


import { CdrComponent } from './cdr.component';

@NgModule({
    declarations: [
        CdrComponent
    ],
    imports: [
        CommonModule,
    	RouterModule,
        MdlModule,
        MdlSelectModule,
        MdlPopoverModule,
    ],
    exports: [
        CdrComponent]
})

export class CdrModule {}