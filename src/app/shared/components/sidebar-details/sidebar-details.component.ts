import { Component, Input, output } from '@angular/core';
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
  close = output<boolean>();

  hidden() {
    this.close.emit(true);
  }
}
