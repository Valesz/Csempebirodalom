import { NgModule } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';

import { ShopRoutingModule } from './shop-routing.module';
import { ShopComponent } from './shop.component';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { ListingComponent } from './listing/listing.component';


@NgModule({
  declarations: [
    ShopComponent,
    ListingComponent
  ],
  imports: [
    CommonModule,
    ShopRoutingModule,
    MatCardModule,
    MatButtonModule,
    NgOptimizedImage
  ]
})
export class ShopModule { }
