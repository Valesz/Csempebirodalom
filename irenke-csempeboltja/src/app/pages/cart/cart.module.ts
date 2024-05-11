import { NgModule } from '@angular/core';
import { AsyncPipe, CommonModule } from '@angular/common';

import { CartRoutingModule } from './cart-routing.module';
import { CartComponent } from './cart.component';

import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';


@NgModule({
  declarations: [
    CartComponent
  ],
  imports: [
    CommonModule,
    CartRoutingModule,
    MatButtonModule,
    MatCardModule,
    MatDividerModule,
    AsyncPipe
  ]
})
export class CartModule { }
