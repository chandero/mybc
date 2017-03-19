import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'login-identifier',
  templateUrl: './identifier.component.html',
  styleUrls: ['./identifier.component.css']
})

export class IdentifierComponent implements OnInit {

  private identity:string;

  constructor(private router: Router) { }

  ngOnInit() {
  }

  redirectToPassword(){
    this.router.navigate(['/login/password']);
  }

}
