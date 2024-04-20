import { NgModule, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MainRoutingModule } from './main-routing.module';
import { MainComponent } from './main.component';
import { GalleryModule } from 'ng-gallery';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { GalleryComponent } from './gallery/gallery.component';

@NgModule({
  declarations: [
    MainComponent,
    GalleryComponent
  ],
  imports: [
    CommonModule,
    MainRoutingModule,
    GalleryModule,
    MatButtonModule,
    MatIconModule
  ]
})
export class MainModule { }
