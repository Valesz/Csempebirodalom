import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { Observable, finalize, first, take } from 'rxjs';
import { Product } from '../models/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  collection: string = "Products";
  storageUrl: string = "images/products"

  constructor(
    private afs: AngularFirestore,
    private storage: AngularFireStorage
  ) { }

  getAll(): Observable<Array<Product>> {
    return this.afs.collection<Product>(this.collection).valueChanges();
  }

  getById(id: string) {
    return this.afs.collection<Product>(this.collection).doc(id).valueChanges();
  }

  getByName(name: string) {
    return this.afs.collection<Product>(this.collection, ref => ref.where('name', '==', name)).valueChanges();
  }

  save(product: Product, file: File) {
    product.id = this.afs.createId();
    product.imgUrl = `${this.storageUrl}/${file.name}`;
    return this.afs.collection(this.collection).doc(product.id).set(product).then(
      resolve => {
        this.uploadImageToStorage(product, file);
      });
  }

  uploadImageToStorage(product: Product, file: File) {
    const filePath = `${this.storageUrl}/${file.name}`;
    const uploadTask = this.storage.upload(filePath, file);

    uploadTask.snapshotChanges().pipe(
      finalize(
        () => {
          //this.updateProductDb(product);
        })).subscribe();
  }

  private updateProductDb(product: Product) {
    return this.afs.collection(this.collection).doc(product.id).set(product);
  }

  update(product: Product, image?: File)  {
    if (image) {
      this.uploadImageToStorage(product, image);
      return this.updateProductDb(product);
    } else {
      this.getById(product.id).pipe(first()).subscribe(
        next => {
            product.imgUrl = next!.imgUrl;
            
            return this.updateProductDb(product);
        });
    }
    return
  }

  delete(id: string) {
    return this.afs.collection(this.collection).doc(id).delete();
  }
  
  loadImage(imageUrl: string) {
    return this.storage.ref(imageUrl).getDownloadURL();
  }

}
