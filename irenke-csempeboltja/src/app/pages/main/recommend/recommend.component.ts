import { Component } from '@angular/core';
import { ShopElements } from '../../../shared/constants/constants';

@Component({
  selector: 'app-main-recommend',
  templateUrl: './recommend.component.html',
  styleUrl: './recommend.component.scss'
})
export class RecommendComponent {
  shopImages = ShopElements.filter((item) => item.id < 4);

}
