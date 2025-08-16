import { Component } from '@angular/core';
import { Food } from '../../../shared/models/food';
import { ActivatedRoute, Router } from '@angular/router';
import { FoodService } from '../../../services/food.service';
import { CommonModule } from '@angular/common';
import { StarRatingComponent } from '../../../star-rating/star-rating.component';
import { CartService } from '../../../services/cart.service';
import { NotFoundComponent } from "../../partials/not-found/not-found.component";

@Component({
  selector: 'app-food-page',
  standalone: true,
  imports: [CommonModule, StarRatingComponent, NotFoundComponent],
  templateUrl: './food-page.component.html',
  styleUrl: './food-page.component.scss'
})
export class FoodPageComponent {
  food!: Food;

  constructor(activatedRoute: ActivatedRoute,
     foodService: FoodService, private cartService: CartService,
     private router:Router
    ) {
    activatedRoute.params.subscribe((params)=> {
      if (params.foodId) {
        foodService.getFoodById(params.foodId).subscribe((food)=>{
          this.food = food;
        }
        )
      }
    })
  }

  addtoCart() {
    this.cartService.addtoCart(this.food);
    this.router.navigateByUrl('/cart-page');
  }

}
