import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../shared/services/product.service';
import { Product } from '../../shared/models/product';
import { FormControl } from '@angular/forms';
import { Observable, map, of, startWith } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FeedbackComponent } from './feedback/feedback.component';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrl: './shop.component.scss',
})
export class ShopComponent implements OnInit {
  filteredProducts?: Observable<Array<Product>>;
  products: Array<Product> = [];
  ofProducts?: Observable<Array<Product>>;
  loadedImages: Array<string> = [];
  nameFilter: FormControl = new FormControl('');
  filteredOptions?: Observable<Array<string>>;
  options: Array<string> = [];
  ofOptions?: Observable<Array<string>>;

  constructor(
    private productService: ProductService,
    private _snackbar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.productService.getAll().subscribe(
      data => {
        this.products = data;
        data.forEach(value => {
          this.options.push(value.name);
          this.productService.loadImage(value.imgUrl).subscribe(next=> {
            value.imgUrl = next;
          });
        });
        this.ofProducts = of(this.products);
        this.ofOptions = of(this.options);
        this.searchChanged('');
      }
    );

    this.filteredOptions = this.nameFilter.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value || ''))
    )

    this.filteredProducts = this.nameFilter.valueChanges.pipe(
      startWith(''),
      map(value => this._prodFilter(value))
    )

  }


  private _prodFilter(name: string) {
    const filterValue = name.toLowerCase()

    return this.products.filter(product => product.name.toLowerCase().includes(filterValue))
  }

  private _filter(value: string) {
    const filterValue = value.toLowerCase();

    return this.options.filter(option => option.toLowerCase().includes(filterValue));
  }

  searchChanged(event:string | null) {
    this.nameFilter.setValue(event);
  }

  openSnackbar() {
    this._snackbar.openFromComponent(FeedbackComponent, {
      duration: 1.5 * 1000
    });
  }

}
