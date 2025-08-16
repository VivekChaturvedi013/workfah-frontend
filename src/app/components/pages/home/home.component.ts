import { Component } from '@angular/core';
import { Food } from '../../../shared/models/food';
import { FoodService } from '../../../services/food.service';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
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

  constructor(private http: HttpClient) {}

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

  listYourSpaceDialog() {
    this.visible = true;
  }

  submitForm() {
    console.log('Form Submitted:', this.form);
    if ( !this.form.pincode || !this.form.address || !this.form.description || !this.form.hours || !this.form.image) {
      alert('Please fill all fields');
      return;
    }
    const formData = new FormData();
    formData.append('pincode', this.form.pincode);
    formData.append('address', this.form.address);
    formData.append('description', this.form.description);
    formData.append('availableHours', this.form.hours);
    formData.append('image', this.form.image);
    this.http.post('http://localhost:5000/api/listings', formData).subscribe(
      (response) => {
        console.log('listing created sucessfully', response);
      }
    )
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
  this.http.get('http://localhost:5000/api/listings/' + this.pincode).subscribe((response: any) => {
    this.listings = response;
  })
}

}
