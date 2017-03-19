import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'login-password',
  templateUrl: './password.component.html',
  styleUrls: ['./password.component.css']
})

export class PasswordComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  redirectToHome(){
    this.router.navigate(['/dashboard']);
  }

}
