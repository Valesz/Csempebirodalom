import { Injectable, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth'
import { UserService } from './user.service';
import { roles } from '../constants/constants';
import { take } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  isLoggedIn?: boolean;
  isAdmin?: boolean;

  constructor(
    private auth: AngularFireAuth,
    private userService: UserService
  ) {
    this.updateGuardCheckVariables();
  }

  login(email: string, password: string) {
    this.updateGuardCheckVariables();
    return this.auth.signInWithEmailAndPassword(email, password);
  }

  register(email: string, password: string) {
    this.updateGuardCheckVariables();
    return this.auth.createUserWithEmailAndPassword(email, password);
  }

  getUser() {
    return this.auth.user;
  }

  deleteUser() {
    this.isAdmin = false;
    this.isLoggedIn = false;
    return this.auth.currentUser.then(valami => valami?.delete());
  }

  logout() {
    this.isAdmin = false;
    this.isLoggedIn = false;
    this.auth.signOut();
  }

  async updateGuardCheckVariables() {
    await this.getUser().subscribe(
      async authUser => {
        this.isLoggedIn = authUser ? true : false;
        if (authUser) {
          await this.userService.getByUid(authUser.uid.trim()).subscribe(
            user => {
              if (user && authUser.uid === user.at(0)?.uid) {
                this.isAdmin = user.at(0)?.role === roles.admin;
              }
            });
        }
      });
  }
}
