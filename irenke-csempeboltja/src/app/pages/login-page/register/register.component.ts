import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../shared/services/auth.service';
import { UserService } from '../../../shared/services/user.service';
import { User } from '../../../shared/models/user';
import { roles } from '../../../shared/constants/constants';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  email = new FormControl<string>('');
  password = new FormControl<string>('');
  displayName = new FormControl<string>('');
  registerFailed: boolean = false;

  constructor(
      private router: Router,
      private authService: AuthService,
      private userService: UserService
    ) { }

  register() {
    if (!this.email.valid || (this.password.value?.length || 0) < 6) {
      this.registerFailed = true;
      console.log("itt")
      return;
    }

    this.authService.register(this.email.value as string, this.password.value as string).then(
      (_user) => {
        let tmpUser: User = {
          uid: _user.user?.uid || "",
          displayName: this.displayName.value || "",
          email: _user.user?.email || "",
          signupDate: new Date().getTime(),
          role: roles.user
        };

        this.userService.create(tmpUser).then(
          () => this.router.navigateByUrl("/main")
        ).catch(
          error => this.registerFailed = true
        );
        
      }
    ).catch(
      error => {
        this.registerFailed = true;
        console.log("itt");
        return;
      }
    )
  }

}
