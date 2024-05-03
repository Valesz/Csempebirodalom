import { Component } from '@angular/core';
import { GalleryItem, ImageItem } from 'ng-gallery';

@Component({
  selector: 'app-main-gallery',
  templateUrl: './gallery.component.html',
  styleUrl: './gallery.component.scss'
})
export class GalleryComponent {
  images: GalleryItem[];

  constructor() {
    this.images = [];
  }

  ngOnInit() {
    this.images = [
      new ImageItem({ src: 'assets/main/main_gallery_1.jpg'}),
      new ImageItem({ src: 'assets/main/main_gallery_2.jpg'}),
      new ImageItem({ src: 'assets/main/main_gallery_3.jpg'}),
      new ImageItem({ src: 'assets/main/main_gallery_4.jpg'})
    ];
  }
}
