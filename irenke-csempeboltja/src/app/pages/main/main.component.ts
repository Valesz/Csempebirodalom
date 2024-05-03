import { Component, OnInit } from '@angular/core';
import { GalleryItem, ImageItem } from 'ng-gallery';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss'
})
export class MainComponent implements OnInit {

  images: GalleryItem[];

  constructor() {
    this.images = [];
  }

  ngOnInit() {
    this.images = [
      new ImageItem({ src: 'assets/main_gallery_1.jpg'}),
      new ImageItem({ src: 'assets/main_gallery_2.jpg'}),
      new ImageItem({ src: 'assets/main_gallery_3.jpg'}),
      new ImageItem({ src: 'assets/main_gallery_4.jpg'})
    ];
  }

}
