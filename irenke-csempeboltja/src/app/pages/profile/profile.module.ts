import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProfileRoutingModule } from './profile-routing.module';
import { ProfileComponent } from './profile.component';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { DateFormatPipe } from '../../shared/pipes/date-format.pipe';


@NgModule({
  declarations: [
    ProfileComponent,
    DateFormatPipe
  ],
  imports: [
    CommonModule,
    ProfileRoutingModule,
    MatDividerModule,
    MatButtonModule,
    MatFormFieldModule
  ]
})
export class ProfileModule { }
