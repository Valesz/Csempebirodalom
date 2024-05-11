import { Injectable } from '@angular/core';
import { Product } from '../models/product';
import { ProductService } from './product.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor(
    private productService: ProductService
  ) { }

  getAll(): Array<string> | null {
    if (sessionStorage.getItem('cart') === null) {
      return null;
    }

    return sessionStorage.getItem('cart')!.split(';');
  }

  putIntoCart(product_id: string) {
    if (sessionStorage.getItem('cart') !== null && sessionStorage.getItem('cart')!.length > 0) {
      let curCart: string = sessionStorage.getItem('cart')!;
      curCart += ";" + product_id;
      console.log(curCart);
      sessionStorage.setItem('cart', curCart);
    } else {
      sessionStorage.setItem('cart', product_id);
    }
  }

  removeItem(id: string) {
    let newCart = sessionStorage.getItem('cart')!.split(';');
    for (let i = 0; i < newCart.length; i++) {
      if (newCart[i] === id) {
        newCart.splice(i, 1);
        break;
      }
    }
    sessionStorage.setItem('cart', newCart!.join(';'));
  }

  clear() {
    sessionStorage.removeItem('cart');
  }

}
