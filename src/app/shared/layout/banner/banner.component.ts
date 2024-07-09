import { Component } from '@angular/core';

@Component({
  selector: 'app-banner',
  standalone: true,
  imports: [],
  template: `<div class="banner">
    <section class="banner__text">
      <h1 class="banner__text__title">Acompanhe o Mercado</h1>
      <h1 class="banner__text__subtitle"><u>CRIPTO</u> Aqui</h1>
    </section>

    <img class="banner__img" src="../../../../assets/banner.svg" />
  </div>`,
  styleUrl: './banner.component.scss',
})
export class BannerComponent {}
