import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../../shared/services/product.service';
import { Product } from '../../../shared/models/product';
import { Observable, of } from 'rxjs';
import { CartService } from '../../../shared/services/cart.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FeedbackComponent } from '../../shop/feedback/feedback.component';

@Component({
  selector: 'app-main-recommend',
  templateUrl: './recommend.component.html',
  styleUrl: './recommend.component.scss'
})
export class RecommendComponent implements OnInit {
  images: Array<Product> = [];
  imagesObs?: Observable<Array<Product>>;

  constructor(
    private productService: ProductService,
    private cartService: CartService,
    private snackbar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.productService.getForMain().subscribe(
      next => {
        if (next) {
          this.images = [];
          next.forEach(
            product => {
              this.productService.loadImage(product.imgUrl).subscribe(
                url => product.imgUrl = url
              );
              this.images.push(product);
              this.imagesObs = of(this.images);
            });
        }
      });
  }

  addItemToCart(id: string) {
    this.cartService.putIntoCart(id);
    this.openSnackBar();
  }

  openSnackBar() {
    this.snackbar.openFromComponent(FeedbackComponent, {
      duration: 1.5 * 1000
    })
  }

}
