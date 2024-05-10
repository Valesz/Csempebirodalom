import { Component, Input } from '@angular/core';
import { Product } from '../../../shared/models/product';
import { Observable } from 'rxjs';
import { ProductService } from '../../../shared/services/product.service';

@Component({
  selector: 'app-shop-listing',
  templateUrl: './listing.component.html',
  styleUrl: './listing.component.scss'
})
export class ListingComponent {
  @Input() fillteredProducts?: Observable<Array<Product>>;
  @Input() products?: Array<Product>;

  constructor(
    private productService: ProductService
  ) {}

  addItemToCart(id: string) {
    this.productService.putIntoCart(id)
  }
}
