import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { TagModule } from 'primeng/tag';
import { MessageModule } from 'primeng/message';
import { RouterModule } from '@angular/router';
import { environment } from '../../../../environments/environment';
import { LoaderService } from '../../../services/loader.service';

@Component({
  selector: 'app-my-bookings',
  standalone: true,
  imports: [
    CommonModule,
    CardModule,
    ButtonModule,
    TagModule,
    MessageModule,
    RouterModule,
  ],
  templateUrl: './my-bookings.component.html',
  styleUrl: './my-bookings.component.scss',
})
export class MyBookingsComponent implements OnInit {
  @Input() myBookings: any[] = [];

  constructor(private http: HttpClient, private loaderService: LoaderService) {}

  ngOnInit() {
    this.loadBookings();
  }

  // Guest: load my bookings
  loadBookings() {
    this.loaderService.show();
    this.http
      .get<any[]>(`${environment.apiUrl}/bookings/my-bookings`)
      .subscribe({
        next: (data) => {this.myBookings = data; this.loaderService.hide();},
        error: (err) => console.error('Error fetching bookings', err),
        complete: () => this.loaderService.hide(),
      });
  }

  cancelBooking(bookingId: string) {
    this.loaderService.show();
    this.http
      .put(`${environment.apiUrl}/bookings/${bookingId}/cancel`, {})
      .subscribe({
        next: () => {this.loadBookings(); this.loaderService.hide();},
        error: (err) => console.error('Error cancelling booking', err),
        complete: () => this.loaderService.hide(),
      });
  }

  isHost(): boolean {
    const userJson = localStorage.getItem('user');
    if (userJson) {
      const user = JSON.parse(userJson);
      return Array.isArray(user.roles) && user.roles.includes('host');
    }
    return false;
  }
}
