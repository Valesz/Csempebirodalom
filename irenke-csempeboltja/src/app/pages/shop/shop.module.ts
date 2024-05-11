import { NgModule } from '@angular/core';
import { AsyncPipe, CommonModule, NgOptimizedImage } from '@angular/common';

import { ShopRoutingModule } from './shop-routing.module';
import { ShopComponent } from './shop.component';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { ListingComponent } from './listing/listing.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBarModule } from '@angular/material/snack-bar';

import { ReactiveFormsModule } from '@angular/forms';
import { FilterComponent } from './filter/filter.component';
import { FeedbackComponent } from './feedback/feedback.component';


@NgModule({
  declarations: [
    ShopComponent,
    ListingComponent,
    FilterComponent,
    FeedbackComponent
  ],
  imports: [
    CommonModule,
    ShopRoutingModule,
    MatCardModule,
    MatButtonModule,
    MatAutocompleteModule,
    MatFormFieldModule,
    MatInputModule,
    MatSnackBarModule,
    ReactiveFormsModule,
    NgOptimizedImage,
    AsyncPipe
  ]
})
export class ShopModule { }
