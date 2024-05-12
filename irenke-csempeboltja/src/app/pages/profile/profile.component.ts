import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../shared/services/auth.service';
import { UserService } from '../../shared/services/user.service';
import { User } from '../../shared/models/user';
import { Router } from '@angular/router';
import { take } from 'rxjs';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent implements OnInit {
  loggedInUser?: User;
  edit: boolean = false;

  constructor(
    private router: Router,
    private authService: AuthService,
    private userService: UserService
  ) {}

  ngOnInit(): void {

    this.authService.getUser().pipe(take(1)).subscribe(
      authUser => {
        if (authUser != undefined) {
          this.userService.getByUid(authUser?.uid).subscribe(
            user => {
              user.forEach(_user => {
                this.loggedInUser = _user;
              }); 
            });
        }
      });
  }

  deleteAccount() {
    if (this.loggedInUser) {
      this.authService.deleteUser().then(
        () => this.userService.delete(this.loggedInUser!).then(
          () => this.router.navigateByUrl("/main")
        ).catch(
          error => console.log(error)
        )
      ).catch(
        error => console.log(error)
      )
    }
  }

}
