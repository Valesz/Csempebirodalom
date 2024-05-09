import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../shared/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  registerEmail = new FormControl<string>('')
  registerPassword = new FormControl<string>('')

  constructor(private router: Router, private authService:AuthService) {

  }

  register() {
    this.authService.register(this.registerEmail.value as string, this.registerPassword.value as string).then(
      cred => {
        console.log(cred)
      }
    ).catch(
      error => {
        console.log(error)
      }
    )
    this.router.navigateByUrl("/main")
  }

}
