import { Injectable } from '@angular/core';
import { deleteUser } from '@angular/fire/auth';
import { AngularFireAuth } from '@angular/fire/compat/auth'

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private auth: AngularFireAuth) { }

  login(email: string, password: string) {
    return this.auth.signInWithEmailAndPassword(email, password);
  }

  register(email: string, password: string) {
    return this.auth.createUserWithEmailAndPassword(email, password);
  }

  getUser() {
    return this.auth.user;
  }

  deleteUser() {
    return this.auth.currentUser.then(valami => valami?.delete());
  }

  logout() {
    this.auth.signOut();
  }
}
