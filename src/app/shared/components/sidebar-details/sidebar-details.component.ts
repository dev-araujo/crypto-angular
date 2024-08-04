import {
  ChangeDetectorRef,
  Component,
  inject,
  Input,
  output,
  SimpleChanges,
} from '@angular/core';
import { SidebarModule } from 'primeng/sidebar';

@Component({
  selector: 'app-sidebar-details',
  standalone: true,
  imports: [SidebarModule],
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
      this.cdr.detectChanges();
    }
  }

  hidden() {
    this.close.emit(true);
  }
}
