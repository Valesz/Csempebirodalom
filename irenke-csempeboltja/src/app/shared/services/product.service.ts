import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { Observable } from 'rxjs';
import { Product } from '../models/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  collection: string = "Products";

  constructor(
    private afs: AngularFirestore,
    private storage: AngularFireStorage
  ) { }

  getAll(): Observable<Array<Product>> {
    return this.afs.collection<Product>(this.collection).valueChanges();
  }
  
  loadImage(imageUrl: string) {
    return this.storage.ref(imageUrl).getDownloadURL();
  }

}
