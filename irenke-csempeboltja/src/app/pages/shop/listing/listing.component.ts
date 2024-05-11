import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Product } from '../../../shared/models/product';
import { Observable } from 'rxjs';
import { CartService } from '../../../shared/services/cart.service';

@Component({
  selector: 'app-shop-listing',
  templateUrl: './listing.component.html',
  styleUrl: './listing.component.scss'
})
export class ListingComponent {
  @Input() fillteredProducts?: Observable<Array<Product>>;
  @Input() products?: Array<Product>;
  @Output() itemAddedtoCart = new EventEmitter<boolean>();

  constructor(
    private cartService: CartService
  ) {}

  addItemToCart(id: string) {
    this.cartService.putIntoCart(id);
    this.itemAddedtoCart.emit(true);
  }
}
