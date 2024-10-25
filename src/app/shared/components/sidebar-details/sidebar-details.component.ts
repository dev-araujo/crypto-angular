import {
  ChangeDetectorRef,
  Component,
  Input,
  SimpleChanges,
  inject,
  output,
} from '@angular/core';
import { CurrencyPipe, NgStyle, PercentPipe } from '@angular/common';

import { PercentageHelper } from '../utils/percentageHelper';
import { SidebarModule } from 'primeng/sidebar';

@Component({
  selector: 'app-sidebar-details',
  standalone: true,
  imports: [SidebarModule, CurrencyPipe, NgStyle, PercentPipe],
  templateUrl: './sidebar-details.component.html',
  styleUrl: './sidebar-details.component.scss',
})
export class SidebarDetailsComponent {
  @Input() isVisible = false;
  @Input() info: any;
  @Input() signal: any;
  close = output<boolean>();
  percentageStyle = PercentageHelper;

  private cdr = inject(ChangeDetectorRef);

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['info']) {
      this.cdr.detectChanges();
    }
  }

  hidden() {
    this.close.emit(true);
  }
}
