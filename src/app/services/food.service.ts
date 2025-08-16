import { Injectable } from '@angular/core';
import { Food } from '../shared/models/food';
import { Sample_Foods, Sample_Tags } from '../../data';
import { Tag } from '../shared/models/Tag';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { FOOD_BY_ID_URL, FOODS_BY_SEARCH_URL, FOODS_BY_TAG_URL, FOODS_TAGS_URL, FOODS_URL } from '../shared/constants/urls';

@Injectable({
  providedIn: 'root'
})
export class FoodService {

  constructor(private http: HttpClient) { 
    // This constructor is empty, but you can inject HttpClient if needed for future enhancements.
    
  }

  getAllFoods(): Observable <Food[]>  {
    return this.http.get <Food[]>(FOODS_URL);
  }

  getAllfoodsBySearchTerm(searchTerm: string) {
    return this.http.get<Food[]>(FOODS_BY_SEARCH_URL + searchTerm);
  }

  getAllTags(): Observable <Tag[]> {
    return this.http.get <Tag[]>(FOODS_TAGS_URL);
  }

  getAllFoodsByTag(tag: string): Observable <Food[]> {
    return tag === 'All' ? this.getAllFoods() :
      this.http.get <Food[]>(FOODS_BY_TAG_URL + tag)
  }

  getFoodById(foodId: string): Observable <Food> {
    return this.http.get <Food>(FOOD_BY_ID_URL+ foodId)
  }
}
