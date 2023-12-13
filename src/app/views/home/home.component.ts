import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CryptoService } from '../../service/crypto.service';
import { take } from 'rxjs';
import { TableComponent } from '../../shared/components/table/table.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, TableComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  constructor(private service: CryptoService) {}

  ngOnInit(): void {}
}
