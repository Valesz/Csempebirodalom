import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  collection: string = "Users";

  constructor(
    private afs: AngularFirestore
  ) { }

  create(user: User) {
    return this.afs.collection<User>(this.collection).doc(user.uid).set(user);
  }

  getByUid(uid: string) {
    return this.afs.collection<User>(this.collection, ref => ref.where("uid", "==", uid)).valueChanges();
  }

  delete(user: User) {
    return this.afs.collection<User>(this.collection).doc(user.uid).delete();
  }
}
