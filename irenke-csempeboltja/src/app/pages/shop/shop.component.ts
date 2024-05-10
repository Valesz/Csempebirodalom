import { Component, OnInit } from '@angular/core';
import { Product } from '../../shared/models/product';
import { ProductService } from '../../shared/services/product.service';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrl: './shop.component.scss'
})
export class ShopComponent implements OnInit {
  products: Array<Product> = [];
  loadedImages: Array<string> = [];

  constructor(
    private productService: ProductService
  ) {}

  ngOnInit(): void {
    this.productService.getAll().subscribe(
      data => {
        this.products = data;
        data.forEach(value => {
          this.productService.loadImage(value.imgUrl).subscribe(next=> {
            value.imgUrl = next;
          });
        });
      }
    );
  }
}
