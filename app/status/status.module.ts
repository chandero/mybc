import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { MdlModule } from '@angular-mdl/core';
import { MdlSelectModule } from '@angular-mdl/select';
import { MdlPopoverModule } from '@angular-mdl/popover';

import { StatusComponent } from './status.component';

import { AuthGuard } from '../_guards/auth.guard';
import { WindowRefService } from '../services/windowref.service';

@NgModule({
    declarations: [
        StatusComponent 
    ],
    imports: [
        CommonModule,
    	RouterModule,
        MdlModule,
        MdlSelectModule,
        MdlPopoverModule,          
    ],
    exports: [
        StatusComponent],
    providers: [WindowRefService, AuthGuard]        
})

export class StatusModule {}