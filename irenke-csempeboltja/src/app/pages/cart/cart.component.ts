import { Component, OnInit } from '@angular/core';
import { Product } from '../../shared/models/product';
import { ProductService } from '../../shared/services/product.service';
import { CartService } from '../../shared/services/cart.service';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss'
})
export class CartComponent implements OnInit {
  productsInCart: Array<[Product, number]> = [];
  productsInCartObs?: Observable<Array<[Product, number]>>;
  sumOfProductCosts: number = 0;

  constructor(
    private productService: ProductService,
    private cartService: CartService
  ) {}

  ngOnInit(): void {
    this.cartService.getAll()?.forEach(
      item => {
        if (item) {
          this.productService.getById(item.trim()).subscribe(
            next =>  {
              if (next != undefined) {
                this.productService.loadImage(next.imgUrl).subscribe(
                  _next => {
                    next.imgUrl = _next;
                    let filtered = this.productsInCart.filter(a => a[0].id === next.id);
                    let db: number = 0;
                    if (filtered.length > 0) {
                      db = filtered[0][1];
                      this.productsInCart = this.productsInCart.filter(x => x[0].id !== next.id);
                    }
                    this.productsInCart.push([next, db + 1]);
                    this.productsInCartObs = of(this.productsInCart);
                  });
              }
            });
        }
      });

  }

  addItem(id: string) {
    for (let i = 0; i < this.productsInCart.length; i++) {
      if (this.productsInCart[i][0].id === id) {
        this.productsInCart[i][1] += 1;
        break;
      }
    }
    this.cartService.putIntoCart(id);
  }

  removeItem(id: string) {
    for (let i = 0; i < this.productsInCart.length; i++) {
      if (this.productsInCart[i][0].id === id) {
        this.productsInCart[i][1] -= 1;
        if (this.productsInCart[i][1] < 1) {
          this.productsInCart.splice(i, 1);
        }
        break;
      }
    }
    this.productsInCartObs = of(this.productsInCart);
    this.cartService.removeItem(id);
    console.log(this.productsInCart)
  }

  clearCart() {
    this.cartService.clear();
    this.productsInCart = [];
    this.productsInCartObs = of(this.productsInCart);
  }

}
