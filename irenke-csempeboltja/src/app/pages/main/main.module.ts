import { NgModule, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MainRoutingModule } from './main-routing.module';
import { MainComponent } from './main.component';
import { GalleryModule } from 'ng-gallery';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { GalleryComponent } from './gallery/gallery.component';
import { MatCardModule } from '@angular/material/card';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatDividerModule } from '@angular/material/divider';
import { RecommendComponent } from './recommend/recommend.component';
import { ServicesComponent } from './services/services.component';
import { TeamComponent } from './team/team.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';

@NgModule({
  declarations: [
    MainComponent,
    GalleryComponent,
    RecommendComponent,
    ServicesComponent,
    TeamComponent
  ],
  imports: [
    CommonModule,
    MainRoutingModule,
    GalleryModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    FlexLayoutModule,
    MatDividerModule,
    MatSnackBarModule
  ]
})
export class MainModule { }
