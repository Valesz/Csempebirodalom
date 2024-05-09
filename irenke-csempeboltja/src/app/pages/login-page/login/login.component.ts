import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  loginEmail = new FormControl<string>('')
  loginPassword = new FormControl<string>('')

  constructor(private router: Router) {

  }

  login() {
    console.log("Logged in as " + this.loginEmail.get)
    this.router.navigateByUrl("/main")
  }
}
