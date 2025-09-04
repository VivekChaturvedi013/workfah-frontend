import { Component } from '@angular/core';
import { Food } from '../../../shared/models/food';
import { FoodService } from '../../../services/food.service';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { StarRatingComponent } from '../../../star-rating/star-rating.component';
import { SerachComponent } from '../../partials/serach/serach.component';
import { TagsComponent } from '../../partial/tags/tags.component';
import { NotFoundComponent } from '../../partials/not-found/not-found.component';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { FileUploadModule } from 'primeng/fileupload';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';
import { TextareaModule } from 'primeng/textarea';
import { environment } from '../../../../environments/environment';
import { AuthService } from '../../../auth-service.service';
import { LoaderService } from '../../../services/loader.service';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';



@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    StarRatingComponent,
    SerachComponent,
    TagsComponent,
    NotFoundComponent,
    FormsModule,
    ButtonModule,
    DialogModule,
    InputTextModule,
    TextareaModule,
    FileUploadModule,
    InputNumberModule,
  ],
  animations: [
    trigger('overlayMenu', [
      state('closed', style({
        opacity: 0,
        width: '0%',
        visibility: 'hidden'
      })),
      state('open', style({
        opacity: 1,
        width: '80%',
        visibility: 'visible'
      })),
      transition('closed <=> open', [
        animate('300ms ease-in-out')
      ])
    ])
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  // foods:Food[] = [];;
  // constructor(private foodService:FoodService,
  //   activatedRoute: ActivatedRoute
  // ){
  //   let foodsObservable : Observable<Food[]>;
  //   console.log(activatedRoute.params.subscribe((params) => {
  //   console.log(params);
  // }));
  //   activatedRoute.params.subscribe((params)=>
  //   {
  //     if(params.searchTerm) {
  //       foodsObservable = foodService.getAllfoodsBySearchTerm(params.searchTerm);
  //     } else if (params.tag) {
  //       foodsObservable = foodService.getAllFoodsByTag(params.tag);
  //     } else {
  //       foodsObservable = foodService.getAllFoods();

  //     }
  //     foodsObservable.subscribe((serverFoods) => {
  //       this.foods = serverFoods;
  //     });
  //   }
  //   )
  // }
  isMenuOpen: boolean = false;
  pincode: string = '';
  listings: any[] = [];
  visible: boolean = false;
  form = {
    pincode: '',
    address: '',
    description: '',
    hours: '',
    image: null as File | null,
  };

  showBookingModal = false;
  selectedListing: any = null;
  bookingDate: string = '';
  bookingTime: string = '';
  host: string = '';

  timeSlots: string[] = [
    '9:00 AM - 12:00 PM',
    '12:00 PM - 3:00 PM',
    '3:00 PM - 6:00 PM',
    '6:00 PM - 9:00 PM',
  ];

  constructor(
    private router: Router,
    public auth: AuthService,
    private http: HttpClient,
    private loaderService: LoaderService
  ) {}

  getLocationAndLogPincode() {
    if (!navigator.geolocation) {
      alert('Geolocation is not supported by your browser');
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;

        console.log('Latitude:', lat, 'Longitude:', lon);

        const url = `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${lat}&lon=${lon}`;

        this.http.get<any>(url).subscribe((res) => {
          const postcode = res?.address?.postcode;
          console.log('Detected Pincode:', postcode);

          if (postcode) {
            this.pincode = postcode; // autofill input
          } else {
            alert('Could not determine pincode');
          }
        });
      },
      (error) => {
        console.error('Geolocation error:', error);
        alert('Failed to get location');
      }
    );
  }

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }
  listYourSpaceDialog() {
    this.visible = true;
  }

  closeMenu() {
    this.isMenuOpen = false;
  }

  submitForm() {
    console.log('Form Submitted:', this.form);
    if (
      !this.form.pincode ||
      !this.form.address ||
      !this.form.description ||
      !this.form.hours ||
      !this.form.image
    ) {
      alert('Please fill all fields');
      return;
    }
    this.loaderService.show();
    const formData = new FormData();
    formData.append('pincode', this.form.pincode);
    formData.append('address', this.form.address);
    formData.append('description', this.form.description);
    formData.append('availableHours', this.form.hours);
    formData.append('image', this.form.image);
    this.http
      .post(`${environment.apiUrl}/listings`, formData)
      .subscribe((response: any) => {
        console.log('listing created sucessfully', response);
        localStorage.setItem("user", JSON.stringify(response?.user));
        this.loaderService.hide();
      });
    this.visible = false;
  }

  onImageUpload(event: any) {
    const file: File = event.files[0]; // ✅ correctly access the first file
    console.log('Uploaded image:', file);

    if (file) {
      this.form.image = file;

      // Optional: convert to base64 if you want to store the preview or send to API
      const reader = new FileReader();
      reader.onload = () => {
        const base64 = reader.result;
        console.log('Base64 image:', base64);
      };
      reader.readAsDataURL(file);
    }

    event.options.clear(); // ✅ clears the upload input after upload
  }

  getListings() {
    this.loaderService.show();
    this.http.get(`${environment.apiUrl}/listings/` + this.pincode).subscribe(
      (response: any) => {
        this.listings = response;
        this.loaderService.hide();
      },
      (error) => {
        this.loaderService.hide();
      },
      () => this.loaderService.hide()
    );
  }

  logout() {
    this.auth.logout();
    this.listings = []; // Clear listings on logout
    this.pincode = ''; // Clear pincode input
    alert('Logged out successfully');
    // Optionally, redirect to home or login page
    this.router.navigate(['/login']);
    console.log('User logged out');
  }

  isHost(): boolean {
    const userJson = localStorage.getItem('user');
    if (userJson) {
      const user = JSON.parse(userJson);
      return Array.isArray(user.roles) && user.roles.includes('host');
    }
    return false;
  }

  // getListings() {
  //   this.http.get<any[]>(`http://localhost:5000/api/listings?pincode=${this.pincode}`)
  //     .subscribe(data => this.listings = data);
  // }

  openBookingModal(listing: any) {
    this.selectedListing = listing;
    this.showBookingModal = true;
  }

  closeBookingModal() {
    this.showBookingModal = false;
    this.selectedListing = null;
    this.bookingDate = '';
    this.bookingTime = '';
  }

  confirmBooking() {
    if (!this.bookingDate || !this.bookingTime) {
      alert('Please select date and time!');
      return;
    }

    const bookingData = {
      listingId: this.selectedListing._id,
      date: this.bookingDate,
      time: this.bookingTime,
      host: this.selectedListing.host,
    };

    this.http
      .post(`${environment.apiUrl}/bookings/request`, bookingData)
      .subscribe({
        next: () => {
          alert('Booking request sent!');
          this.closeBookingModal();
        },
        error: () => alert('Failed to send booking request.'),
        complete: () => this.loaderService.hide(),
      });
  }
}
