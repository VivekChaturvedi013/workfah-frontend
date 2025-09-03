import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { TabViewModule } from 'primeng/tabview';
import { TableModule } from 'primeng/table';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { TagModule } from 'primeng/tag';
import { MessageModule } from 'primeng/message';
import { RouterModule } from '@angular/router';
import { environment } from '../../../../environments/environment';
import { LoaderService } from '../../../services/loader.service';
import { MyBookingsComponent } from "../my-bookings/my-bookings.component";

@Component({
  selector: 'app-my-listings',
  standalone: true,
  imports: [
    CommonModule,
    TabViewModule,
    TableModule,
    CardModule,
    ButtonModule,
    TagModule,
    MessageModule,
    RouterModule,
    MyBookingsComponent,
  ],
  templateUrl: './my-listings.component.html',
  styleUrl: './my-listings.component.scss',
})
export class MyListingsComponent implements OnInit {
  activeTab: 'bookings' | 'listings' = 'bookings';
  myBookings: any[] = [];
  myListings: any[] = [];
  openListingId: string | number | null = null;

  constructor(private http: HttpClient, private loaderService: LoaderService) {}

  ngOnInit() {
    this.loadBookings();
    this.loadRequests();
  }

  // Guest: load my bookings
  loadBookings() {
    this.loaderService.show();
    this.http
      .get<any[]>(`${environment.apiUrl}/bookings/my-bookings`)
      .subscribe({
        next: (data) => {
          this.myBookings = data;
          this.loaderService.hide();
        },
        error: (err) => console.error('Error fetching bookings', err),
        complete: () => this.loaderService.hide(),
      });
  }

  // Host: load booking requests for my listings
  loadRequests() {
    this.loaderService.show();
    this.http.get<any[]>(`${environment.apiUrl}/bookings/requests`).subscribe({
      next: (data) => {
        this.myListings = this.transformRequests(data);
        console.log('Transformed listings with requests:', this.myListings);
        this.loaderService.hide();
      },
      error: (err) => console.error('Error fetching requests', err),
      complete: () => this.loaderService.hide(),
    });
  }

  //load my listings
  // loadMyListings() {
  //   this.http
  //     .get<any[]>(`${environment.apiUrl}/bookings/my-listings`)
  //     .subscribe({
  //       next: (data) => (this.myListings = data),
  //       error: (err) => console.error('Error fetching my listings', err),
  //     });
  // }

  // Transform backend response into listing-wise grouping
  private transformRequests(bookings: any[]) {
   
    const grouped: { [listingId: string]: any } = {};

    bookings.forEach((b) => {
      const l = b.listingId;

      // let imageUrl = undefined;
      // if (l.image && l.image.data) {
      //   imageUrl = `data:image/png;base64,${Buffer.from(l.image.data).toString(
      //     'base64'
      //   )}`;
      // }
      if (!grouped[l._id]) {
        grouped[l._id] = {
          ...l, // ✅ includes image as base64 string from backend
          requests: [],
        };
      }

      grouped[l._id].requests.push({
        id: b._id,
        guestName: b.guestId?.name,
        guestEmail: b.guestId?.email,
        date: b.date,
        status: b.status,
        guestId: b.guestId?._id,
      });
    });

    return Object.values(grouped);
  }

  toggleRequests(listingId: string | number) {
    this.openListingId = this.openListingId === listingId ? null : listingId;
  }

  updateRequest(requestId: string, status: 'approve' | 'reject') {
    this.loaderService.show();
    this.http
      .put(`${environment.apiUrl}/bookings/${requestId}/${status}`, {})
      .subscribe({
        next: () => {
          this.loadRequests();
          this.loaderService.hide();
        },
        error: (err) => console.error(`Error updating request ${status}`, err),
        complete: () => this.loaderService.hide(),
      });
  }

  cancelBooking(bookingId: string) {
    this.loaderService.show();
    this.http
      .put(`${environment.apiUrl}/bookings/${bookingId}/cancel`, {})
      .subscribe({
        next: () => {
          this.loadBookings();
          this.loaderService.hide();
        },
        error: (err) => console.error('Error cancelling booking', err),
        complete: () => this.loaderService.hide(),
      });
  }
}
