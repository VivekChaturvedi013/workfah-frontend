import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { TagModule } from 'primeng/tag';
import { MessageModule } from 'primeng/message';
import { RouterModule } from '@angular/router';
import { environment } from '../../../../environments/environment';

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
  myBookings: any[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.loadBookings();
  }

  // Guest: load my bookings
  loadBookings() {
    this.http
      .get<any[]>(`${environment.apiUrl}/bookings/my-bookings`)
      .subscribe({
        next: (data) => (this.myBookings = data),
        error: (err) => console.error('Error fetching bookings', err),
      });
  }

  cancelBooking(bookingId: string) {
    this.http
      .put(`${environment.apiUrl}//bookings/${bookingId}/cancel`, {})
      .subscribe({
        next: () => this.loadBookings(),
        error: (err) => console.error('Error cancelling booking', err),
      });
  }
}
