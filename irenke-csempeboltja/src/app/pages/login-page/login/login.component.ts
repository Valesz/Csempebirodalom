import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../shared/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  loginEmail = new FormControl<string>('')
  loginPassword = new FormControl<string>('')

  constructor(private router: Router, private authService:AuthService) {

  }

  login() {
    this.authService.login(this.loginEmail.value as string, this.loginPassword.value as string).then(
      cred => {
        console.log(cred.user?.email)
      }
    ).catch(
      error => {
        console.log(error)
      }
    )
    this.router.navigateByUrl("/main")
  }
}
