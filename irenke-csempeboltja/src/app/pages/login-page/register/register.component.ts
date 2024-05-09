import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  registerEmail = new FormControl<string>('')
  registerPassword = new FormControl<string>('')

  constructor(private router: Router) {

  }

  register() {
    console.log("Registered " + this.registerEmail.get)
    this.router.navigateByUrl("/main")
  }

}
