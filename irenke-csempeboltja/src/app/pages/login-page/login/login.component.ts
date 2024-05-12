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
  loginFailed?: boolean;

  constructor(private router: Router, private authService:AuthService) {

  }

  login() {
    if (!this.loginEmail.valid || (this.loginPassword.value?.length || 0) < 6) {
      this.loginFailed = true;
      return;
    }

    this.authService.login(this.loginEmail.value as string, this.loginPassword.value as string).then(
      cred => {
        this.router.navigateByUrl("/main")
      }
    ).catch(
      error => {
        this.loginFailed = true;
      }
    )
  }
}
