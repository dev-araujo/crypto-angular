import { Component } from '@angular/core';

@Component({
  selector: 'app-no-graphic',
  standalone: true,
  template: `<section class="no-graphic">
    <div class="no-graphic__box">
      <div>
        Não há dados históricos sobre essa crypto em nossa base de dados
      </div>
    </div>
  </section>`,
  styleUrl: './no-graphic.component.scss',
})
export class NoGraphicComponent {}
