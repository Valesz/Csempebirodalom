import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { Observable, take } from 'rxjs';
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

  getById(id: string) {
    return this.afs.collection<Product>(this.collection).doc(id);
  }

  getByName(name: string) {
    return this.afs.collection<Product>(this.collection, ref => ref.where('name', '==', name)).valueChanges();
  }
  
  loadImage(imageUrl: string) {
    return this.storage.ref(imageUrl).getDownloadURL();
  }

  putIntoCart(id: string) {
    if (sessionStorage.getItem('cart') !== null) {
      let curCart: string = sessionStorage.getItem('cart')!;
      curCart += ";" + id;
      console.log(curCart);
      sessionStorage.setItem('cart', curCart);
    } else {
      sessionStorage.setItem('cart', id);
    }
  }

}
