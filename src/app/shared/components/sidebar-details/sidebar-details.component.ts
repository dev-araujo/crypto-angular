import {
  ChangeDetectorRef,
  Component,
  Input,
  SimpleChanges,
  inject,
  output,
} from '@angular/core';

import { CurrencyPipe } from '@angular/common';
import { SidebarModule } from 'primeng/sidebar';

@Component({
  selector: 'app-sidebar-details',
  standalone: true,
  imports: [SidebarModule, CurrencyPipe],
  templateUrl: './sidebar-details.component.html',
  styleUrl: './sidebar-details.component.scss',
})
export class SidebarDetailsComponent {
  @Input() isVisible = false;
  @Input() info: any;
  close = output<boolean>();

  private cdr = inject(ChangeDetectorRef);

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['info']) {
      console.log(this.info);
      this.cdr.detectChanges();
    }
  }

  hidden() {
    this.close.emit(true);
  }
}
