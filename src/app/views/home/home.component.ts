import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CryptoService } from '../../service/crypto.service';
import { take } from 'rxjs';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  coins: any;
  constructor(private service: CryptoService) {}

  responsiveOptions: any[] | any;

  ngOnInit(): void {
    this.getTrending();
  }

  getTrending(): void {
    this.service
      .getTrendingTop('n5fpnvMGNsOS')
      .pipe(take(1))
      .subscribe((res: any) => {
        console.log(res);
      });
  }
}
