import { Component, Input } from '@angular/core';
import { Product } from '../../../shared/models/product';

@Component({
  selector: 'app-shop-listing',
  templateUrl: './listing.component.html',
  styleUrl: './listing.component.scss'
})
export class ListingComponent {
  @Input() products?: Array<Product>;
}
