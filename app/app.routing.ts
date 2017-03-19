import { ModuleWithProviders } from '@angular/core'
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './login/index';
import { DashboardComponent } from './dashboard/index';
import { IdentifierComponent } from './identifier/index';
import { PasswordComponent } from './password/index';
import { WebphoneComponent } from './webphone/index';
import { CdrComponent } from './cdr/index';
import { ContactsComponent } from './contacts/index';
import { ContactComponent } from './contact/index';
import { ConferenceComponent } from './conference/index';
import { ConferencesComponent } from './conferences/index';
import { VoicemailComponent } from './voicemail/index';
import { FollowmeComponent } from './followme/index';
import { SettingsComponent } from './settings/index';
import { AuthGuard } from './_guards/index';

export const appRoutes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  {
    path: 'login',
    component: LoginComponent,
    children: [
      { path: '', redirectTo: 'identifier', pathMatch: 'full' },
      { path: 'identifier', component: IdentifierComponent },
      { path: 'password', component: PasswordComponent }
    ]
  },
    	{	
		path: 'dashboard',
		component: DashboardComponent,
    	children: [
			{ path : '', redirectTo: 'webphone', pathMatch: 'full'},
	    	{ path: 'webphone', component: WebphoneComponent },
        { path: 'cdr', component: CdrComponent },
        { path: 'contacts', component: ContactsComponent },
        { path: 'contact', component: ContactComponent },
        { path: 'conference', component: ConferenceComponent },
        { path: 'conferences', component: ConferencesComponent },
        { path: 'voicemail', component: VoicemailComponent },
        { path: 'followme' , component: FollowmeComponent },
        { path: 'settings', component: SettingsComponent }
    	]
  	},
	{ path: '**', component: DashboardComponent }
];

export const routing_app = RouterModule.forRoot(appRoutes, { useHash: true });