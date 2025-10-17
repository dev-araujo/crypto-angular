import { Component } from '@angular/core';
import { HeaderComponent } from './components/header/header';
import { Banner } from './components/banner/banner';

@Component({
  selector: 'app-layout',
  imports: [HeaderComponent, Banner],
  templateUrl: './layout.html',
  styleUrl: './layout.scss'
})
export class Layout {

}
