import { Component } from '@angular/core';
import { HeaderComponent } from './components/header/header';
import { BannerComponent } from './components/banner/banner';

@Component({
  selector: 'app-layout',
  imports: [HeaderComponent, BannerComponent],
  templateUrl: './layout.html',
  styleUrl: './layout.scss'
})
export class LayoutComponent {

}
